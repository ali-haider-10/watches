import { NextRequest, NextResponse } from "next/server";
import { errorResponse, AppError } from "@/lib/errors";
import { db, products, orders, orderItems, user as userTable, carts, cartItems as dbCartItemsTable } from "@/lib/db";
import { eq, inArray } from "drizzle-orm";
import { generateId, generateOrderNumber } from "@/lib/db/utils";
import { auth } from "@/lib/auth";

type CheckoutCartItem = {
  productId: string;
  quantity: number;
  name?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let cartItems = body.cartItems as CheckoutCartItem[] | undefined;
    let shippingAddress = body.shippingAddress;
    let userEmail = body.email || null;

    let userId: string | null = null;

    // Check for authenticated user - use conditional approach to avoid redirects
    try {
      const session = await auth.api.getSession({ headers: req.headers }).catch(() => null);
      const authUser = session?.user;

      if (authUser) {
        // Find user in db
        const userResult = await db
          .select()
          .from(userTable)
          .where(eq(userTable.authUserId, authUser.id))
          .limit(1);

        const user = userResult[0];
        if (user) {
          userId = user.id;
          if (!userEmail) userEmail = user.email;
          if (!shippingAddress && user.shippingAddress) {
            shippingAddress = JSON.parse(user.shippingAddress);
          }

          if (!cartItems || cartItems.length === 0) {
            const cartResult = await db
              .select()
              .from(carts)
              .where(eq(carts.userId, user.id))
              .limit(1);

            const cart = cartResult[0];
            if (cart) {
              const itemsResult = await db
                .select()
                .from(dbCartItemsTable)
                .where(eq(dbCartItemsTable.cartId, cart.id));
              cartItems = itemsResult.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                name: item.name,
              }));
            }
          }
        }
      }
    } catch {
      // Ignore auth errors for guests - continue with guest checkout
      console.log("Guest checkout - no authentication");
    }

    if (!userEmail) {
      throw new AppError("Email is required for checkout", 400);
    }

    if (!cartItems || cartItems.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    if (!shippingAddress?.street) {
      throw new AppError(
        "Shipping address is required.",
        400
      );
    }


    // Get all products in cart
    const productIds = cartItems.map((item) => item.productId);
    const productsResult = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    const productMap = new Map(productsResult.map((p) => [p.id, p]));

    const orderItemsData = [];
    const productQuantities = new Map<string, number>();
    let subtotal = 0;

    for (const cartItem of cartItems) {
      if (!Number.isInteger(cartItem.quantity) || cartItem.quantity <= 0) {
        throw new AppError("Invalid cart item quantity", 400);
      }

      const product = productMap.get(cartItem.productId);
      const nextQuantityForProduct =
        (productQuantities.get(cartItem.productId) || 0) + cartItem.quantity;

      if (!product || !product.isActive) {
        throw new AppError(
          `Product "${cartItem.name || product?.name || cartItem.productId}" is no longer available`,
          409
        );
      }
      if (product.stock < nextQuantityForProduct) {
        throw new AppError(
          `Insufficient stock for "${product.name}". Available: ${product.stock}`,
          409
        );
      }

      productQuantities.set(cartItem.productId, nextQuantityForProduct);

      const images = product.images ? JSON.parse(product.images) : [];
      const itemTotal = product.price * cartItem.quantity;
      subtotal += itemTotal;

      orderItemsData.push({
        id: generateId(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: images[0] || null,
      });
    }

    const total = subtotal;
    const checkoutId = `cod_${generateId()}`;
    const orderId = generateId();

    // Create COD order
    await db.insert(orders).values({
      id: orderId,
      userId,
      userEmail,
      orderNumber: generateOrderNumber(),
      subtotal,
      tax: 0,
      total,
      status: "pending",
      whopCheckoutId: checkoutId,
      shippingAddress: JSON.stringify(shippingAddress),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create order items
    for (const item of orderItemsData) {
      await db.insert(orderItems).values({
        ...item,
        orderId,
      });
    }

    // Reserve stock at checkout time for COD orders.
    for (const [productId, quantity] of productQuantities) {
      const product = productMap.get(productId);
      if (!product) continue;

      await db
        .update(products)
        .set({
          stock: product.stock - quantity,
          updatedAt: new Date(),
        })
        .where(eq(products.id, productId));
    }

    // Clear persisted cart for authenticated users.
    if (userId) {
      const cartResult = await db
        .select()
        .from(carts)
        .where(eq(carts.userId, userId))
        .limit(1);

      if (cartResult[0]) {
        await db.delete(dbCartItemsTable).where(eq(dbCartItemsTable.cartId, cartResult[0].id));
      }
    }

    return NextResponse.json({
      checkoutId,
      purchaseUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/orders/${orderId}?success=true`,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return errorResponse(error);
  }
}


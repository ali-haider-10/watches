import * as dotenv from "dotenv";
import { db, products, cartItems, orderItems } from "../src/lib/db";
import { generateId } from "../src/lib/db/utils";

dotenv.config({ path: ".env.local" });

const productData = [
  // Men's Watches
  {
    name: "Apex Chronograph Steel",
    slug: "apex-chronograph-steel",
    description:
      "Bold chronograph with a brushed steel case, tachymeter bezel, and precision quartz movement for all-day reliability.",
    price: 189.0,
    images: [],
    category: "Men's Watches",
    stock: 22,
  },
  {
    name: "Northfield Leather Automatic",
    slug: "northfield-leather-automatic",
    description:
      "Automatic watch with exhibition back, domed crystal, and premium leather strap for classic everyday wear.",
    price: 229.0,
    images: [],
    category: "Men's Watches",
    stock: 15,
  },
  {
    name: "Ranger Sport Diver",
    slug: "ranger-sport-diver",
    description:
      "Sport-inspired diver design with luminous markers, rotating bezel, and 100m water resistance.",
    price: 209.0,
    images: [],
    category: "Men's Watches",
    stock: 18,
  },
  {
    name: "Monarch Black Dial",
    slug: "monarch-black-dial",
    description:
      "Minimal black-dial watch with polished case and link bracelet, designed for office and evening looks.",
    price: 199.0,
    images: [],
    category: "Men's Watches",
    stock: 26,
  },
  {
    name: "Atlas GMT Explorer",
    slug: "atlas-gmt-explorer",
    description:
      "Adventure-inspired GMT watch with dual-time tracking, bold bezel markings, and robust stainless-steel construction.",
    price: 239.0,
    images: [],
    category: "Men's Watches",
    stock: 19,
  },
  {
    name: "Vanguard Steel Classic",
    slug: "vanguard-steel-classic",
    description:
      "Classic steel timepiece with clean baton markers, date window, and balanced proportions for formal and casual styling.",
    price: 214.0,
    images: [],
    category: "Men's Watches",
    stock: 23,
  },
  {
    name: "Summit Pilot Chronograph",
    slug: "summit-pilot-chronograph",
    description:
      "Pilot-style chronograph featuring high-contrast dial, oversized crown, and dependable quartz precision.",
    price: 249.0,
    images: [],
    category: "Men's Watches",
    stock: 17,
  },
  {
    name: "Eclipse Date Master",
    slug: "eclipse-date-master",
    description:
      "Refined everyday watch with sunburst dial, quick-set date, and scratch-resistant crystal for long-term wear.",
    price: 219.0,
    images: [],
    category: "Men's Watches",
    stock: 21,
  },

  // Women's Watches
  {
    name: "Luna Rose Gold Mesh",
    slug: "luna-rose-gold-mesh",
    description:
      "Elegant rose-gold watch with slim mesh strap and crystal indices for a refined modern silhouette.",
    price: 169.0,
    images: [],
    category: "Women's Watches",
    stock: 28,
  },
  {
    name: "Aurora Pearl Dial",
    slug: "aurora-pearl-dial",
    description:
      "Pearl dial watch with polished markers and slim profile, built for everyday elegance.",
    price: 179.0,
    images: [],
    category: "Women's Watches",
    stock: 19,
  },
  {
    name: "Crescent Silver Bracelet",
    slug: "crescent-silver-bracelet",
    description:
      "Silver bracelet timepiece with luminous hands and scratch-resistant glass for daily wear.",
    price: 159.0,
    images: [],
    category: "Women's Watches",
    stock: 31,
  },
  {
    name: "Nora Leather Petite",
    slug: "nora-leather-petite",
    description:
      "Petite watch with stitched leather strap, clean dial, and premium finishing details.",
    price: 149.0,
    images: [],
    category: "Women's Watches",
    stock: 24,
  },
  {
    name: "Stella Crystal Rose",
    slug: "stella-crystal-rose",
    description:
      "Rose-tone watch with crystal accents, slender case profile, and polished finish for elegant evening wear.",
    price: 189.0,
    images: [],
    category: "Women's Watches",
    stock: 26,
  },
  {
    name: "Ivy Minimal Silver",
    slug: "ivy-minimal-silver",
    description:
      "Minimal silver watch with clean index dial and lightweight bracelet for effortless all-day comfort.",
    price: 164.0,
    images: [],
    category: "Women's Watches",
    stock: 30,
  },
  {
    name: "Celeste Moonphase Petite",
    slug: "celeste-moonphase-petite",
    description:
      "Petite moonphase-inspired design with subtle texture dial and premium leather strap.",
    price: 199.0,
    images: [],
    category: "Women's Watches",
    stock: 18,
  },
  {
    name: "Mira Gold Link",
    slug: "mira-gold-link",
    description:
      "Gold-link bracelet watch with classic round dial and refined detailing built for versatile styling.",
    price: 179.0,
    images: [],
    category: "Women's Watches",
    stock: 27,
  },

  // Smart Watches
  {
    name: "Pulse X Smartwatch",
    slug: "pulse-x-smartwatch",
    description:
      "Advanced smartwatch with health tracking, notifications, GPS, and 7-day battery life.",
    price: 249.0,
    images: [],
    category: "Smart Watches",
    stock: 34,
  },
  {
    name: "Strive Active Pro",
    slug: "strive-active-pro",
    description:
      "Fitness-ready smartwatch with heart-rate sensors, sleep insights, and water resistance.",
    price: 219.0,
    images: [],
    category: "Smart Watches",
    stock: 27,
  },
  {
    name: "Neo Smart Round",
    slug: "neo-smart-round",
    description:
      "Round-face smartwatch with customizable dials and hybrid classic-smart visual design.",
    price: 199.0,
    images: [],
    category: "Smart Watches",
    stock: 21,
  },
  {
    name: "Vertex LTE Smartwatch",
    slug: "vertex-lte-smartwatch",
    description:
      "Premium LTE-enabled smartwatch with AMOLED display, voice assistant, and fast charging.",
    price: 279.0,
    images: [],
    category: "Smart Watches",
    stock: 16,
  },

  // Couple Watches
  {
    name: "Dual Harmony Set",
    slug: "dual-harmony-set",
    description:
      "Matching his and hers watch set with coordinated dials and premium box packaging.",
    price: 299.0,
    images: [],
    category: "Couple Watches",
    stock: 14,
  },
  {
    name: "Eternity Pair Classic",
    slug: "eternity-pair-classic",
    description:
      "Classic pair watch set with stainless steel finishing and coordinated date display.",
    price: 279.0,
    images: [],
    category: "Couple Watches",
    stock: 17,
  },
  {
    name: "Signature Couple Leather Duo",
    slug: "signature-couple-leather-duo",
    description:
      "Matching leather-strap duo with balanced dial proportions and long-lasting quartz movement.",
    price: 259.0,
    images: [],
    category: "Couple Watches",
    stock: 20,
  },
  {
    name: "Union Gold Pair",
    slug: "union-gold-pair",
    description:
      "Gold-tone couple watches with polished bezels, slim profiles, and gift-ready packaging.",
    price: 319.0,
    images: [],
    category: "Couple Watches",
    stock: 11,
  },

  // Best Sellers
  {
    name: "Titanium Edge Chrono",
    slug: "titanium-edge-chrono",
    description:
      "Top-selling chronograph featuring titanium finish, sapphire-coated glass, and rapid-reset stopwatch.",
    price: 239.0,
    images: [],
    category: "Best Sellers",
    stock: 37,
  },
  {
    name: "Orbit Matte Black",
    slug: "orbit-matte-black",
    description:
      "Best-selling matte black watch with minimalist dial and all-day comfort silicone strap.",
    price: 159.0,
    images: [],
    category: "Best Sellers",
    stock: 42,
  },
  {
    name: "Regal Blue Dial",
    slug: "regal-blue-dial",
    description:
      "Fan-favorite blue dial timepiece with steel bracelet and smooth sweeping seconds hand.",
    price: 189.0,
    images: [],
    category: "Best Sellers",
    stock: 29,
  },
  {
    name: "Aero Smart Fit",
    slug: "aero-smart-fit",
    description:
      "Hybrid best-seller with smartwatch features and classic analog-inspired display aesthetics.",
    price: 229.0,
    images: [],
    category: "Best Sellers",
    stock: 33,
  },
];

async function seed() {
  try {
    console.log("Clearing existing products...");
    await db.delete(cartItems);
    await db.delete(orderItems);
    await db.delete(products);

    console.log("Inserting watch catalog...");
    const now = new Date();

    for (const product of productData) {
      await db.insert(products).values({
        id: generateId(),
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        currency: "usd",
        images: JSON.stringify(product.images),
        category: product.category,
        stock: product.stock,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    }

    console.log(`Successfully seeded ${productData.length} watch products.`);
    console.log("\nCategories added:");
    console.log("- Men's Watches (8 products)");
    console.log("- Women's Watches (8 products)");
    console.log("- Smart Watches (4 products)");
    console.log("- Couple Watches (4 products)");
    console.log("- Best Sellers (4 products)");
    console.log("\nNote: Products have no images. Add images via admin panel.");
    console.log("\nDone.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();

import { redirect } from "next/navigation";
import { authServer } from "@/lib/auth/server";
import { db, user as userTable } from "@/lib/db";
import { eq } from "drizzle-orm";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authServer.getSession();
  const user = session?.user;

  if (!user) {
    redirect("/auth/login");
  }

  const dbUserResult = await db
    .select()
    .from(userTable)
    .where(eq(userTable.authUserId, user.id))
    .limit(1);

  let dbUser = dbUserResult[0];

  if (!dbUser && user.email) {
    const dbUserByEmailResult = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, user.email))
      .limit(1);

    const existingByEmail = dbUserByEmailResult[0];

    if (existingByEmail) {
      await db
        .update(userTable)
        .set({ authUserId: user.id, updatedAt: new Date() })
        .where(eq(userTable.id, existingByEmail.id));

      dbUser = {
        ...existingByEmail,
        authUserId: user.id,
        updatedAt: new Date(),
      };
    }
  }

  if (!dbUser || dbUser.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Welcome,</span>
            <span className="text-sm font-medium text-gray-900">
              {dbUser.name}
            </span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

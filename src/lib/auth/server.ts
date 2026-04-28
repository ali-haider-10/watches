import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const authServer = {
	getSession: async () => auth.api.getSession({ headers: await headers() }),
};

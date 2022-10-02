import type { DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: DefaultUser;
		token: JWT & { accessToken: string };
	}
}

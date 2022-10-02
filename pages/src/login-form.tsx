import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const LoginForm = () => {
	const session = useSession();
	const { address } = useAccount();

	const { connectAsync, error, isLoading, pendingConnector } = useConnect({
		connector: new InjectedConnector(),
	});
	const { disconnect } = useDisconnect();

	const handleLogin = async () => {
		try {
			const callbackUrl = "/";
			if (address) {
				signIn("credentials", { address, callbackUrl });
				return;
			}
			const { account } = await connectAsync();
			if (error) {
				throw error;
			}
			signIn("credentials", { address: account, callbackUrl });
		} catch (error) {
			window.alert(error);
		}
	};

	const handleLogout = async () => {
		try {
			await disconnect();
			await signOut({ callbackUrl: "/" });
			disconnect();
		} catch (error) {
			window.alert(error);
		}
	};

	if (isLoading) return <div>메타마스크 인증 로딩...</div>;

	return (
		<div>
			{session.status === "authenticated" ? (
				<button onClick={handleLogout}>로그아웃</button>
			) : (
				<button onClick={handleLogin}>로그인</button>
			)}
		</div>
	);
};

export default LoginForm;

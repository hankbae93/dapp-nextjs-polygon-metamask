import { signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useIsMounted } from "src/hooks/useIsMounted";
import { chainId, useAccount, useConnect, useDisconnect } from "wagmi";

const LoginForm = () => {
	const isMounted = useIsMounted();
	const { connector, isConnected, isDisconnected, address } = useAccount();
	const { connect, connectAsync, connectors, isLoading, pendingConnector } =
		useConnect({
			chainId: chainId.polygonMumbai,
		});

	const { disconnect } = useDisconnect();

	const login = (address: string) => {
		return signIn("Credential", {
			address,
			callbackUrl: "/",
			redirect: false,
		});
	};

	const handleLogin: typeof connect = async (args) => {
		if (!address) return;

		try {
			if (isDisconnected) {
				const { account } = await connectAsync(args);

				return await login(account);
			}

			await login(address);
		} catch (err) {
			console.error(err);
		}
	};

	const handleLogout = () => {
		disconnect();
		signOut({ callbackUrl: "/", redirect: false });
	};

	useEffect(() => {
		if (connector) {
			connector?.on("change", async function (accounts) {
				// await login();
			});
		}
	}, [connector]);

	if (!isMounted) return <></>;

	return (
		<div>
			{!connectors && <div>메타마스크 설치하러 가기</div>}

			{isConnected && (
				<button onClick={handleLogout}>
					Disconnect from {connector?.name}
				</button>
			)}

			{connectors
				.filter((x) => x.ready && x.id !== connector?.id)
				.map((x) => (
					<button key={x.id} onClick={() => handleLogin({ connector: x })}>
						{x.name}
						{isLoading && x.id === pendingConnector?.id && " (connecting)"}
					</button>
				))}
		</div>
	);
};

export default LoginForm;

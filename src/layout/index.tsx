import { useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect } from "react";

import { chainId, useAccount, useDisconnect, useNetwork } from "wagmi";

const AppLayout = ({ children }: { children: ReactNode }) => {
	const session = useSession();
	const { chain, chains } = useNetwork();
	const { disconnect } = useDisconnect();
	const { isDisconnected } = useAccount();

	const handleChangeNetwork = () => {
		if (chain?.id === chainId.polygonMumbai) return;
		handleDisconnected();
	};

	const handleDisconnected = () => {
		disconnect();
		signOut({ callbackUrl: "/", redirect: false });
	};

	useEffect(() => {
		if (!chain || session.status === "unauthenticated") return;

		handleChangeNetwork();
	}, [chain, chains]);

	useEffect(() => {
		if (isDisconnected) handleDisconnected();
	}, [isDisconnected]);

	return <>{children}</>;
};

export default AppLayout;

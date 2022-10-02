import { useSession } from "next-auth/react";

const UserInfoBox = () => {
	const session = useSession();

	return session ? <p>{session.data?.user.id}</p> : <p>로그인이 필요합니다.</p>;
};

export default UserInfoBox;

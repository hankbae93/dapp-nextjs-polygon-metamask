import type { NextPage } from "next";

import UserInfoBox from "./src/user-info-box";
import LoginForm from "./src/login-form";
import CallSendForm from "./src/call-send-form";

const Home: NextPage = () => {
	return (
		<div>
			<LoginForm />

			<CallSendForm />

			<UserInfoBox />
		</div>
	);
};

export default Home;

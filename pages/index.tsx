import type { NextPage } from "next";

import UserInfoBox from "./src/user-info-box";
import LoginForm from "./src/login-form";
import CallSendForm from "./src/call-send-form";
import BalanceBox from "./src/balance-box";

const Home: NextPage = () => {
  return (
    <div>
      <LoginForm />

      <CallSendForm />

      <UserInfoBox />

      <BalanceBox />
    </div>
  );
};

export default Home;

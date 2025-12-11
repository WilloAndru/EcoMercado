import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <main className="loginPage flex">
    <Outlet />
  </main>
);

export default AuthLayout;

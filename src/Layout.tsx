import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { WalletConnectProvider } from "./components/Setup/Setup";
import { Toaster } from "@/components/ui/toaster";

import "@solana/wallet-adapter-react-ui/styles.css";

function Layout() {
  return (
    <>
      <WalletConnectProvider>
        <Navbar />
        <Outlet />
        <Toaster />
      </WalletConnectProvider>
    </>
  );
}

export default Layout;

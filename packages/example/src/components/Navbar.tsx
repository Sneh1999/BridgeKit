import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b px-6 py-2">
      <Link href="/" className="text-3xl font-extrabold">
        🚀 BridgeKit
      </Link>
      <ConnectButton />
    </div>
  );
};

import Image from "next/image";
import { BridgeButton } from "bridgekit";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BridgeButton />
    </main>
  );
}

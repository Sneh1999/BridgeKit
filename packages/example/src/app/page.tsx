"use client";
import { BridgeButton } from "bridgekit";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex flex-col grow items-center justify-center">
      <BridgeButton />
    </main>
  );
}

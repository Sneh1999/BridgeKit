"use client";

import React from "react";
import { useState } from "react";
import { Button } from "../Button";
import { useBridge } from "../../hooks";
import { parseEther } from "viem";

export const BridgeButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { bridgeToken } = useBridge({
    fromChain: "goerli",
    toChain: "linea-goerli",
    amount: parseEther("0.01"),
    asset: "ETH",
  });

  async function wrapper() {
    try {
      setLoading(true);
      bridgeToken();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <>
      <Button onClick={wrapper} isLoading={loading}>
        Bridge
      </Button>
    </>
  );
};

//0.29381273

//
//0.293749726778076693

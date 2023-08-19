import React from "react";
import { useState } from "react";
import { BridgeModal } from "../BridgeModal";

export const BridgeButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="" onClick={() => setShowModal((prev) => !prev)}>
        Bridge
      </button>

      <BridgeModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

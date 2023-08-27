"use client";

import { RouteData, StatusResponse } from "@0xsquid/sdk";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { formatUnits, parseEther } from "viem";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useBridge } from "../../hooks";
import {
  AssetName,
  CHAIN_DATA,
  CHAIN_NAME_TO_EVM_CHAIN_ID,
  CHAIN_TOKENS,
  ChainName,
} from "../../lib/chains";
import { Button } from "../Button";
import { buttonVariants } from "../Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { Input } from "../Input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../Select";

export interface BridgeButtonProps {
  defaultFromChain?: ChainName;
  defaultToChain?: ChainName;
  defaultFromToken?: AssetName;
  defaultToToken?: AssetName;
  defaultAmountToSend?: string;
}

export const BridgeButton: React.FC<BridgeButtonProps> = (opts) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className={buttonVariants()}>Bridge</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="tw-bk-text-2xl">🔗 BridgeKit</DialogTitle>
        </DialogHeader>
        <ModalContent {...opts} />
      </DialogContent>
    </Dialog>
  );
};

const ModalContent: React.FC<BridgeButtonProps> = ({
  defaultFromChain = "goerli",
  defaultToChain = "base-goerli",
  defaultFromToken = "ETH",
  defaultToToken = "ETH",
  defaultAmountToSend = "",
}) => {
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [isBridging, setIsBridging] = useState(false);

  const [fromChain, setFromChain] = useState<ChainName>(defaultFromChain);
  const [toChain, setToChain] = useState<ChainName>(defaultToChain);
  const [fromToken, setFromToken] = useState<AssetName>(defaultFromToken);
  const [toToken, setToToken] = useState<AssetName>(defaultToToken);
  const [amountToSend, setAmountToSend] = useState(defaultAmountToSend);

  const [routeData, setRouteData] = useState<RouteData>();
  const [txnStatus, setTxnStatus] = useState<StatusResponse>();
  const [txHash, setTxHash] = useState<string>();
  const [requestId, setRequestId] = useState<string>();

  const [error, setError] = useState<string>("");

  function amountToSendChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    let result = "";
    for (const char of e.target.value) {
      if ((char >= "0" && char <= "9") || char === ".") {
        result += char;
      }
    }
    setAmountToSend(result);
  }

  const { bridgeToken, getRoute, getTransactionStatus } = useBridge({
    fromChain,
    toChain,
    fromAsset: fromToken,
    toAsset: toToken,
    fromAmount: parseEther(amountToSend === "" ? "0" : amountToSend.toString()),
  });

  async function fetchRouteInfo() {
    try {
      setIsFetchingRoute(true);
      const route = await getRoute();
      setRouteData(route);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      setRouteData(undefined);
      console.error(e);
    } finally {
      setIsFetchingRoute(false);
    }
  }

  async function handleBridgeClick() {
    try {
      setIsBridging(true);
      const response = await bridgeToken();
      setTxHash(response.txHash);
      setRequestId(response.requestId!);
    } catch (e: any) {
      if (e.code) {
        if (e.code === "ACTION_REJECTED") {
          setError("User rejected transaction signature");
        }
      } else if (e.message) {
        setError(e.message);
      }
      setIsBridging(false);
    }
  }

  async function fetchTxnStatus(txHash: string, requestId: string) {
    try {
      const status = await getTransactionStatus(txHash, requestId);
      setTxnStatus(status);

      if (
        status.squidTransactionStatus === "confirmed" ||
        status.squidTransactionStatus === "success"
      ) {
        setIsBridging(false);
      }
      if (status.error) {
        setError(status.error);
        setRouteData(undefined);
        setIsBridging(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setRouteData(undefined);
        setError(e.message);
      }
      console.error(e);
    }
  }

  useEffect(() => {
    if (amountToSend === "") return;

    if (Number(amountToSend) === 0) return;

    const timeout = setTimeout(() => {
      fetchRouteInfo();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [amountToSend, fromChain, toChain, fromToken, toToken]);

  useEffect(() => {
    if (!txHash) return;
    if (!requestId) return;

    let interval: NodeJS.Timeout;
    fetchTxnStatus(txHash, requestId).finally(() => {
      interval = setInterval(async () => {
        await fetchTxnStatus(txHash, requestId);
      }, 5000);
    });

    return () => {
      clearInterval(interval);
    };
  }, [txHash, requestId]);

  useEffect(() => {
    if (chain?.id !== CHAIN_NAME_TO_EVM_CHAIN_ID[fromChain]) {
      switchNetwork?.(CHAIN_NAME_TO_EVM_CHAIN_ID[fromChain]);
    }
  }, [fromChain]);

  return (
    <div className="tw-bk-flex tw-bk-flex-col tw-bk-gap-2 tw-bk-w-full">
      <span className="tw-bk-font-medium tw-bk-pt-4">Network</span>
      <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-8 tw-bk-justify-between">
        <Select
          defaultValue="goerli"
          onValueChange={(n) => {
            setError("");
            setFromChain(n as ChainName);
          }}
          disabled={isBridging}
        >
          <SelectTrigger>
            <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-2">
              <img
                src={CHAIN_DATA[fromChain].chainIconURI}
                alt={CHAIN_DATA[fromChain].name}
                className="tw-bk-w-4 tw-bk-h-4"
              />
              <span>{CHAIN_DATA[fromChain].name}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CHAIN_DATA).map(([chainName, chainData]) => (
              <SelectItem
                className="tw-bk-flex tw-bk-gap-1 tw-bk-items-center"
                key={`from-${chainName}`}
                value={chainName}
              >
                <img
                  src={chainData.chainIconURI}
                  alt={chainName}
                  className="tw-bk-w-4 tw-bk-h-4"
                />
                <span>{chainData.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue="base-goerli"
          onValueChange={(n) => {
            setError("");
            setToChain(n as ChainName);
          }}
          disabled={isBridging}
        >
          <SelectTrigger>
            <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-2">
              <img
                src={CHAIN_DATA[toChain].chainIconURI}
                alt={CHAIN_DATA[toChain].name}
                className="tw-bk-w-4 tw-bk-h-4"
              />
              <span>{CHAIN_DATA[toChain].name}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CHAIN_DATA).map(([chainName, chainData]) => (
              <SelectItem
                className="tw-bk-flex tw-bk-gap-1 tw-bk-items-center"
                key={`to-${chainName}`}
                value={chainName}
              >
                <img
                  src={chainData.chainIconURI}
                  alt={chainName}
                  className="tw-bk-w-4 tw-bk-h-4"
                />
                <span>{chainData.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="tw-bk-font-medium tw-bk-pt-4">Token</span>
      <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-8 tw-bk-justify-between">
        <Select
          defaultValue="ETH"
          onValueChange={(n) => setFromToken(n as AssetName)}
          disabled={isBridging}
        >
          <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-2">
            <Input
              placeholder="0.01"
              value={amountToSend}
              onChange={amountToSendChangeHandler}
              disabled={isBridging}
            />
            <SelectTrigger>
              <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-2">
                <img
                  src={CHAIN_TOKENS[fromChain][fromToken]?.logoURI}
                  alt={CHAIN_TOKENS[fromChain][fromToken]?.symbol}
                  className="tw-bk-w-4 tw-bk-h-4"
                />
                <span>{CHAIN_TOKENS[fromChain][fromToken]?.symbol}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CHAIN_TOKENS[fromChain]).map(
                ([assetName, tokenData]) => (
                  <SelectItem
                    className="tw-bk-flex tw-bk-gap-1 tw-bk-items-center"
                    key={`from-${assetName}`}
                    value={assetName}
                  >
                    <img
                      src={tokenData.logoURI}
                      alt={assetName}
                      className="tw-bk-w-4 tw-bk-h-4"
                    />
                    <span>{tokenData.symbol}</span>
                  </SelectItem>
                )
              )}
            </SelectContent>
          </div>
        </Select>

        <Select
          defaultValue="ETH"
          onValueChange={(n) => setToToken(n as AssetName)}
          disabled={isBridging}
        >
          <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-2">
            <Input
              placeholder="0.0"
              disabled
              value={
                isFetchingRoute
                  ? "Fetching..."
                  : routeData &&
                    routeData.estimate &&
                    routeData.estimate.toAmount
                  ? `~${formatUnits(
                      BigInt(routeData.estimate.toAmount),
                      CHAIN_TOKENS[toChain][toToken]!.decimals
                    )}`
                  : "0.0"
              }
            />
            <SelectTrigger>
              <div className="tw-bk-flex tw-bk-items-center tw-bk-gap-2">
                <img
                  src={CHAIN_TOKENS[toChain][toToken]?.logoURI}
                  alt={CHAIN_TOKENS[toChain][toToken]?.symbol}
                  className="tw-bk-w-4 tw-bk-h-4"
                />

                <span>{CHAIN_TOKENS[toChain][toToken]?.symbol}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CHAIN_TOKENS[toChain]).map(
                ([assetName, tokenData]) => (
                  <SelectItem
                    className="tw-bk-flex tw-bk-gap-1 tw-bk-items-center"
                    key={`to-${assetName}`}
                    value={assetName}
                  >
                    <img
                      src={tokenData.logoURI}
                      alt={assetName}
                      className="tw-bk-w-4 tw-bk-h-4"
                    />
                    <span>{tokenData.symbol}</span>
                  </SelectItem>
                )
              )}
            </SelectContent>
          </div>
        </Select>
      </div>

      {routeData && !isFetchingRoute && (
        <div className="tw-bk-flex tw-bk-flex-col tw-bk-gap-2 tw-bk-font-medium tw-bk-text-sm">
          <span>
            Minimum Amount Received:{" "}
            {formatUnits(
              BigInt(routeData.estimate.toAmountMin),
              routeData.params.toToken.decimals
            ).toString()}{" "}
            {toToken}
          </span>
          <span>
            Total Fees: ~$
            {routeData.estimate.feeCosts.reduce(
              (acc, fee) => acc + parseFloat(fee.amountUSD),
              0
            )}{" "}
            USD
          </span>
          <span>
            Estimated Time: ~{routeData.estimate.estimatedRouteDuration} seconds
          </span>
          <span className="tw-bk-text-xs tw-bk-font-normal tw-bk-text-muted-foreground">
            Bridging transactions require that your transaction on the source
            chain is finalized before it can be processed on the destination
            chain.
          </span>
          {(fromChain.includes("goerli") || toChain.includes("goerli")) && (
            <span className="tw-bk-text-xs tw-bk-font-medium">
              NOTE: On test networks, the estimated route duration is not
              accurate and can vary greatly. Please refer to the status of your
              transaction and on AxelarScan for more accurate information.
            </span>
          )}
        </div>
      )}

      {txnStatus && (
        <div className="tw-bk-flex tw-bk-flex-col tw-bk-mt-4 tw-bk-pt-2 tw-bk-border-t tw-bk-gap-1 tw-bk-text-xs tw-bk-text-muted-foreground tw-bk-text-center">
          <span className="tw-bk-font-medium">
            Status: {txnStatus.squidTransactionStatus} - ({txnStatus.status})
          </span>

          {txnStatus.fromChain?.transactionId &&
            txnStatus.toChain?.transactionId && (
              <span>
                Your transaction has been processed on the destination chain!
              </span>
            )}

          {txnStatus.fromChain?.transactionId &&
            !txnStatus.toChain?.transactionId && (
              <Fragment>
                <span>
                  Your transaction has been processed on the source chain!
                  Awaiting finality on source chain to process on destination
                  chain.
                </span>
                <span>
                  Time: ~{txnStatus.timeSpent!.total}/
                  {txnStatus.fromChain.chainData.estimatedRouteDuration} seconds
                </span>
              </Fragment>
            )}

          <a
            href={txnStatus.axelarTransactionUrl}
            className="tw-bk-text-blue-500 hover:tw-bk-text-blue-600"
            target="_blank"
          >
            View on AxelarScan
          </a>
        </div>
      )}

      {/* add a span for error */}
      {error && (
        <span className="tw-bk-font-medium tw-bk-text-red-600 tw-bk-text-sm">
          Error: {error}
        </span>
      )}

      <Button
        className="tw-bk-mt-4"
        isLoading={isFetchingRoute || isBridging}
        disabled={isFetchingRoute || isBridging}
        onClick={handleBridgeClick}
      >
        Bridge
      </Button>
    </div>
  );
};

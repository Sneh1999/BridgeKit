export interface TxnStatusResponse {
  data: [SendTokenStatus];
  total: number;
  time_spent: number;
}

export interface SendTokenStatus {
  type: string;
  send: Send;
  link: Link;
  vote: Vote;
  command: Command;
  time_spent: TimeSpent;
  id: string;
  status: string;
  simplified_status: string;
}

interface Send {
  txhash: string;
  height: number;
  status: string;
  type: string;
  created_at: CreatedAt;
  source_chain: string;
  destination_chain: string;
  sender_address: string;
  recipient_address: string;
  denom: string;
  amount: number;
  original_source_chain: string;
  original_destination_chain: string;
  fee: number;
  value: number;
  fee_value: number;
  insufficient_fee: boolean;
  amount_received: number;
}

interface CreatedAt {
  ms: number;
  hour: number;
  day: number;
  week: number;
  month: number;
  quarter: number;
  year: number;
}

interface Link {
  txhash: string;
  height: number;
  type: string;
  created_at: CreatedAt;
  original_source_chain: string;
  original_destination_chain: string;
  source_chain: string;
  destination_chain: string;
  sender_address: string;
  recipient_address: string;
  denom: string;
  asset: string;
  price: number;
}

interface Vote {
  transaction_id: string;
  unconfirmed: boolean;
  created_at: CreatedAt;
  destination_chain: string;
  transfer_id: number;
  confirmation: boolean;
  failed: boolean;
  type: string;
  txhash: string;
  poll_id: string;
  late: boolean;
  success: boolean;
  source_chain: string;
  event: string;
  height: number;
  status: string;
}

interface Command {
  chain: string;
  command_id: string;
  batch_id: string;
  created_at: CreatedAt;
  executed: boolean;
  transfer_id: number;
  logIndex: number;
  blockNumber: number;
  block_timestamp: number;
  transactionIndex: number;
  transactionHash: string;
}

interface TimeSpent {
  type: string;
  destination_chain_type: string;
  source_chain_type: string;
  total: number;
  vote_execute: number;
}

export async function getCrossChainTxnStatus(
  txHash: string,
  network: "testnet" | "mainnet"
): Promise<SendTokenStatus> {
  const baseUrl =
    network === "testnet"
      ? "https://testnet.axelarscan.io"
      : "https://axelarscan.io";

  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({
      txHash,
      size: 1,
      method: "searchTransfers",
    }),
  });

  const data: TxnStatusResponse = await response.json();

  return data.data[0];
}

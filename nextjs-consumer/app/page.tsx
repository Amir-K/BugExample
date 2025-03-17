"use client"
import { useEffect, useState } from "react";
import { sendTransaction, getBalance } from "../lib/api";

export default function Home() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<{ amount: number; id: string }[]>([]);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const data = await getBalance();
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleTransaction = async (transactionAmount: number) => {
    await sendTransaction(transactionAmount);
    fetchBalance(); // Refresh UI after transaction
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px" }}>
      <h1>Bank Account</h1>
      <h2>Balance: {balance !== null ? `$${balance}` : "Loading..."}</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button
        onClick={() => handleTransaction(amount)}
        style={{ padding: "10px", marginRight: "5px", cursor: "pointer" }}
      >
        Deposit
      </button>

      <button
        onClick={() => handleTransaction(-amount)}
        style={{ padding: "10px", cursor: "pointer", backgroundColor: "red", color: "white" }}
      >
        Withdraw
      </button>

      <h3>Transaction History</h3>
      <ul style={{ textAlign: "left", padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}>
        {transactions.map((txn, idx) => (
          <li key={idx} style={{ marginBottom: "5px" }}>
            {txn.amount > 0 ? "Deposit" : "Withdrawal"} of ${Math.abs(txn.amount)}
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client"
import { useEffect, useState } from "react";
import { sendTransaction, getBalance } from "../lib/api";

export default function Home() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<{ amount: number; id: string }[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    if (!userId) {
      alert("Please enter a User ID first");
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await getBalance(userId);
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Error loading account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransaction = async (transactionAmount: number) => {
    if (!userId) {
      alert("Please enter a User ID first");
      return;
    }
    
    setIsLoading(true);
    try {
      await sendTransaction(transactionAmount, userId);
      fetchBalance();
    } catch (error) {
      console.error("Error processing transaction:", error);
      alert("Error processing transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px" }}>
      <h1>Bank Account</h1>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          style={{ flex: 1, padding: "10px" }}
        />
        <button
          onClick={fetchBalance}
          disabled={isLoading}
          style={{ 
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? "Loading..." : "Load Account"}
        </button>
      </div>

      <h2>Balance: {balance !== null ? `$${balance}` : "No account loaded"}</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        disabled={isLoading || balance === null}
      />

      <button
        onClick={() => handleTransaction(amount)}
        style={{ 
          padding: "10px", 
          marginRight: "5px", 
          cursor: isLoading || balance === null ? "not-allowed" : "pointer",
          opacity: isLoading || balance === null ? 0.7 : 1
        }}
        disabled={isLoading || balance === null}
      >
        Deposit
      </button>

      <button
        onClick={() => handleTransaction(-amount)}
        style={{ 
          padding: "10px", 
          cursor: isLoading || balance === null ? "not-allowed" : "pointer",
          backgroundColor: "red", 
          color: "white",
          opacity: isLoading || balance === null ? 0.7 : 1
        }}
        disabled={isLoading || balance === null}
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

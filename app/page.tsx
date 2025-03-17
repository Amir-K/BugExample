"use client"
import { useState } from "react";
import { getBalance, sendTransaction } from "./lib/api";

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
    <div style={{ 
      maxWidth: "500px", 
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <h1 style={{ 
        color: "#2D3748", 
        fontSize: "28px",
        marginBottom: "30px",
        fontWeight: "600"
      }}>Bank Account</h1>
      
      <div style={{ 
        display: "flex", 
        gap: "12px", 
        marginBottom: "30px",
        backgroundColor: "#F7FAFC",
        padding: "16px",
        borderRadius: "12px"
      }}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          style={{ 
            flex: 1, 
            padding: "12px 16px",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            fontSize: "16px",
            outline: "none",
            transition: "border-color 0.2s"
          }}
        />
        <button
          onClick={fetchBalance}
          disabled={isLoading}
          style={{ 
            padding: "12px 24px",
            backgroundColor: "#63B3ED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            fontSize: "16px",
            fontWeight: "500",
            transition: "transform 0.1s, opacity 0.2s",
            transform: isLoading ? "scale(0.98)" : "scale(1)"
          }}
        >
          {isLoading ? "Loading..." : "Load Account"}
        </button>
      </div>

      <div style={{
        backgroundColor: "#EBF8FF",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}>
        <h2 style={{ 
          color: "#2B6CB0",
          fontSize: "24px",
          margin: "0",
          fontWeight: "600"
        }}>
          Balance: {balance !== null ? `$${balance.toLocaleString()}` : "No account loaded"}
        </h2>
      </div>

      <div style={{
        backgroundColor: "#F7FAFC",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px"
      }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          style={{ 
            width: "100%", 
            padding: "12px 16px",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "16px",
            outline: "none",
            transition: "border-color 0.2s"
          }}
          disabled={isLoading || balance === null}
        />

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => handleTransaction(amount)}
            style={{ 
              flex: 1,
              padding: "12px", 
              backgroundColor: "#9AE6B4",
              color: "#276749",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading || balance === null ? "not-allowed" : "pointer",
              opacity: isLoading || balance === null ? 0.7 : 1,
              fontSize: "16px",
              fontWeight: "500",
              transition: "transform 0.1s",
              transform: isLoading ? "scale(0.98)" : "scale(1)"
            }}
            disabled={isLoading || balance === null}
          >
            Deposit
          </button>

          <button
            onClick={() => handleTransaction(-amount)}
            style={{ 
              flex: 1,
              padding: "12px",
              backgroundColor: "#FED7D7",
              color: "#9B2C2C",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading || balance === null ? "not-allowed" : "pointer",
              opacity: isLoading || balance === null ? 0.7 : 1,
              fontSize: "16px",
              fontWeight: "500",
              transition: "transform 0.1s",
              transform: isLoading ? "scale(0.98)" : "scale(1)"
            }}
            disabled={isLoading || balance === null}
          >
            Withdraw
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: "#F7FAFC",
        borderRadius: "12px",
        overflow: "hidden"
      }}>
        <h3 style={{ 
          margin: "0",
          padding: "16px 20px",
          backgroundColor: "#EDF2F7",
          color: "#4A5568",
          fontSize: "18px",
          fontWeight: "600"
        }}>Transaction History</h3>
        <ul style={{ 
          margin: "0",
          padding: "16px 20px",
          listStyle: "none"
        }}>
          {transactions.map((txn, idx) => (
            <li key={idx} style={{ 
              padding: "12px 0",
              borderBottom: idx === transactions.length - 1 ? "none" : "1px solid #E2E8F0",
              color: "#4A5568",
              fontSize: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{
                color: txn.amount > 0 ? "#276749" : "#9B2C2C",
                fontWeight: "500"
              }}>
                {txn.amount > 0 ? "Deposit" : "Withdrawal"}
              </span>
              <span style={{ fontWeight: "600" }}>
                ${Math.abs(txn.amount).toLocaleString()}
              </span>
            </li>
          ))}
          {transactions.length === 0 && (
            <li style={{ 
              padding: "20px 0",
              textAlign: "center",
              color: "#A0AEC0"
            }}>
              No transactions yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

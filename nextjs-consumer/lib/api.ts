import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "https://buggyapi.onrender.com/balance" : "http://localhost:3000/balance"; // Update if deployed

// Function to send a transaction (deposit/withdraw)
export const sendTransaction = async (amount: number, userId: string) => {
  await axios.post(API_URL, { amount, userId });
};

// Function to fetch the balance & transaction history
export const getBalance = async (userId: string) => {
  const response = await axios.get(`${API_URL}?userId=${userId}`);
  return response.data; // { balance: number, transactions: { amount: number, id: string }[] }
};

import axios from "axios";

const API_URL = "http://localhost:3000/balance"; // Update if deployed

// Function to send a transaction (deposit/withdraw)
export const sendTransaction = async (amount: number) => {
  await axios.post(API_URL, { amount });
};

// Function to fetch the balance & transaction history
export const getBalance = async () => {
  const response = await axios.get(API_URL);
  return response.data; // { balance: number, transactions: { amount: number, id: string }[] }
};

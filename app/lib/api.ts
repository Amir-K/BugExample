export const getBalance = async (userId: string) => {
    const response = await fetch(`/api/balance?userId=${userId}`);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch balance');
    }
    return response.json();
};

export const sendTransaction = async (amount: number, userId: string) => {
    const response = await fetch('/api/balance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, userId }),
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process transaction');
    }
    return response.json();
}; 
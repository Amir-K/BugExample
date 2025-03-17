# Bank Account Application

A simple bank account application with Express backend and vanilla JavaScript frontend.

## Features

- User account management with unique user IDs
- Deposit and withdrawal functionality
- Transaction history
- Balance tracking
- Input validation
- Error handling
- Responsive UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Technical Details

- Backend: Express.js
- Frontend: Vanilla JavaScript, HTML, CSS
- Data Storage: In-memory (Map object)
- API Endpoints:
  - GET /api/balance?userId={userId} - Get account balance and transactions
  - POST /api/balance - Process transaction (deposit/withdrawal)

## Notes

- Data is stored in memory and will be lost when the server restarts
- Each user can have up to 10 most recent transactions
- Withdrawals are prevented if the amount exceeds the current balance

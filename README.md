# Re-Tix

Full-stack ticket resale platform built with React, Vite, Express, MongoDB, and JWT authentication.

## Structure

- `backend/` - Express API with authentication, ticket management, and transfer workflow.
- `frontend/` - React + Vite app with authentication, marketplace browsing, and seller workflows.

## Setup

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

3. Create env files from examples:
   - `backend/.env` with `MONGO_URI`, `JWT_SECRET`, `PORT`
   - `frontend/.env` with `VITE_API_BASE_URL`

4. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```

5. Start frontend app:
   ```bash
   cd frontend
   npm run dev
   ```

## Notes

- Only verified tickets are shown in the marketplace.
- Ticket uploads are created as `pending` and must be verified by a `verifier` or `admin`.
- Purchases create transfer requests and require approval before ownership is updated.
# RE_TIX
# RE_TIX

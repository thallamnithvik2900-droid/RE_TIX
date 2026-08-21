# High-Level Design

## Overview
Re-Tix is a full-stack web application with a React/Vite single-page frontend, an Express REST API, and MongoDB persistence. JWT tokens carry authenticated user identity between the browser and API.

## Architecture
```text
+-------------------+       HTTP/JSON        +----------------------+
| React + Vite UI   | <--------------------> | Express REST API     |
| Browser routes    |   Bearer JWT           | Routes/controllers   |
+-------------------+                        +----------+-----------+
                                                        |
                                                        | Mongoose
                                                        v
                                             +----------------------+
                                             | MongoDB              |
                                             | Users, Tickets,      |
                                             | TransferRequests     |
                                             +----------------------+
```

## Frontend
- `App.jsx` defines public, protected, and verifier-protected routes.
- `AuthContext` stores the current user and authentication state.
- Service modules call the API through a shared Axios client.
- The Axios interceptor adds the JWT from local storage to requests.
- Pages implement authentication, marketplace, seller, dashboard, verification, and transfer workflows.

## Backend
- `server.js` loads environment configuration, connects to MongoDB, and starts the HTTP server.
- `app.js` configures CORS, JSON parsing, route mounting, 404 handling, and error handling.
- Routes map HTTP endpoints to controllers.
- Controllers translate HTTP input and authenticated identity into service calls.
- Services contain business rules and coordinate Mongoose models.
- Middleware authenticates JWTs and checks allowed roles.

## Major Workflows
### Authentication
The client submits registration or login credentials. The auth service validates the user, hashes passwords on creation, and returns a signed JWT plus public user information.

### Ticket verification
An authenticated seller creates a ticket with `pending` status and `isVerified: false`. A verifier or admin approves it, changing it to `available` and verified. Marketplace queries filter for both conditions.

### Purchase and transfer
A buyer requests an available ticket. The system creates a pending transfer request and marks the ticket pending. A verifier or admin approves the request, sets the new current owner, marks the request approved, and marks the ticket sold.

## Security Boundaries
- Password hashes are never returned as user response fields.
- JWT authentication is required for all ticket and transfer endpoints.
- Verification and transfer approval require `verifier` or `admin` roles.
- Environment variables hold the MongoDB URI, JWT secret, and server port.
- CORS is enabled for the frontend API connection.

## Deployment View
The frontend and backend can be deployed as separate Node-based services. The frontend receives `VITE_API_BASE_URL`; the backend receives `MONGO_URI`, `JWT_SECRET`, and `PORT`. MongoDB is an external persistence service.

## Reliability and Consistency
The service layer validates resource state before mutations. Pending requests are checked before creating another transfer. Ticket and transfer updates are performed sequentially and should be monitored for partial-failure handling as the system evolves.

# Low-Level Design

## Repository Layout
```text
backend/src/
  config/db.js              MongoDB connection
  controllers/              HTTP request handlers
  middlewares/              JWT, role, and error middleware
  models/                   Mongoose schemas
  routes/                   REST route definitions
  services/                 Business rules
  utils/generateToken.js    JWT creation
frontend/src/
  components/               Shared UI components
  context/                  Authentication state
  pages/                    Route-level screens
  routes/                   Protected route guards
  services/                 Axios API wrappers
  styles/                   Global CSS
```

## API Contract
Base URL: `/api`

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Create a user and return a token |
| POST | `/auth/login` | Public | Authenticate a user and return a token |
| GET | `/tickets` | Authenticated | List verified available tickets, or owned tickets according to controller options |
| GET | `/tickets/:id` | Authenticated | Return one ticket with owner details |
| POST | `/tickets` | Authenticated | Create a pending ticket listing |
| POST | `/tickets/buy` | Authenticated | Create a pending transfer request for a ticket |
| PATCH | `/tickets/:id/verify` | Verifier/Admin | Verify a ticket and make it available |
| GET | `/transfer/requests` | Verifier/Admin | List pending transfer requests |
| POST | `/transfer/request` | Authenticated | Create a transfer request |
| PATCH | `/transfer/approve` | Verifier/Admin | Approve a transfer and update ownership |

Authenticated requests use `Authorization: Bearer <token>`.

## Data Models
### User
- `name`: required string
- `email`: required, unique, lowercase string
- `password`: required string, minimum six characters, bcrypt-hashed in a pre-save hook
- `role`: `buyer`, `seller`, `verifier`, or `admin`; defaults to `buyer`
- timestamps

### Ticket
- `title`: required string
- `category`: `bus`, `movie`, or `event`
- `price`: required non-negative number
- `originalOwner`: User reference
- `currentOwner`: User reference
- `status`: `pending`, `available`, or `sold`
- `eventDate`, `eventTime`, `location`, `seatInfo`: optional strings
- `imageData`: optional string payload
- `isVerified`: boolean, defaults to false
- timestamps
- unique compound index on `title` and `originalOwner`

### TransferRequest
- `ticketId`: Ticket reference
- `oldOwner`: User reference
- `newOwner`: User reference
- `status`: `pending`, `approved`, or `rejected`
- timestamps

## State Transitions
```text
Ticket: pending + unverified -> available + verified -> pending during purchase -> sold after approval
TransferRequest: pending -> approved
```

The service rejects purchases for unverified or unavailable tickets, duplicate pending transfers, and purchases by the current owner.

## Request Processing
1. Express parses the request and selects a route.
2. `protect` validates the bearer JWT and attaches the user identity.
3. `authorizeRoles` checks verifier/admin operations.
4. The controller reads request fields and authenticated user data.
5. The service validates domain rules and queries MongoDB through Mongoose.
6. The controller returns JSON or forwards an error to the error middleware.

## Frontend Route Guards
- `ProtectedRoute` redirects unauthenticated users away from private screens.
- `VerifierRoute` limits verification and transfer-request screens to verifier/admin users.
- Login and registration redirect authenticated users to the dashboard.

## Error Behavior
- Duplicate email or duplicate owner/title listing: HTTP 409.
- Invalid credentials: HTTP 401.
- Missing ticket or transfer request: HTTP 404.
- Invalid ticket state or duplicate pending request: HTTP 400 or 409.
- Insufficient role: HTTP 403.
- Unknown route: HTTP 404.

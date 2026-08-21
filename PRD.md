# Product Requirements Document

## Product
Re-Tix is a secure ticket resale platform for listing, discovering, purchasing, verifying, and transferring bus, movie, and event tickets.

## Problem
Ticket resale needs a simple marketplace while protecting buyers from unverified tickets and preventing ownership from changing before an authorized review.

## Goals
- Allow users to register and sign in securely.
- Allow ticket owners to create listings with event and seat details.
- Show only verified, available tickets in the marketplace.
- Require a verifier or admin to approve ticket authenticity.
- Represent purchases as transfer requests and update ownership only after approval.
- Provide separate workflows for buyers, sellers, verifiers, and admins.

## User Roles
- Buyer: browse verified tickets, purchase tickets, and view owned tickets.
- Seller: create ticket listings and manage tickets currently owned.
- Verifier: verify pending tickets and approve transfer requests.
- Admin: perform verifier-level approval operations.

## Core User Stories
1. As a new user, I can register with my name, email, password, and role.
2. As a user, I can sign in and remain authenticated with a JWT.
3. As an owner, I can list a bus, movie, or event ticket with price, date, time, location, seat, and optional image data.
4. As a buyer, I can browse only verified tickets that are available.
5. As a verifier or admin, I can approve a pending ticket so it becomes available.
6. As a buyer, I can request a purchase for an available ticket.
7. As a verifier or admin, I can approve a pending transfer and assign the ticket to the buyer.
8. As an authenticated user, I can view ticket details and my tickets.

## Functional Requirements
- Passwords must be hashed before persistence.
- Email addresses must be unique.
- Protected API operations require a valid bearer token.
- Role-restricted operations must reject unauthorized roles.
- A ticket starts as `pending` and unverified.
- Verification sets `isVerified` to true and status to `available`.
- A purchase creates one pending transfer request and changes the ticket to `pending`.
- An approved transfer changes the current owner and ticket status to `sold`.
- Duplicate pending transfer requests for one ticket must be rejected.
- Missing resources and invalid operations return meaningful HTTP errors.

## Non-Functional Requirements
- React and Vite provide the browser client.
- Express provides the JSON API.
- MongoDB stores users, tickets, and transfer requests.
- CORS and JSON request parsing are enabled for the client-server workflow.
- Image payloads are accepted as JSON data up to the configured request limit.

## Success Criteria
- Users can complete registration, login, listing, verification, purchase, and transfer approval end to end.
- Unverified or unavailable tickets never appear in the default marketplace query.
- Ownership is unchanged until a transfer is approved.
- Unauthorized users cannot call verifier/admin operations.
- The frontend provides routes for home, authentication, dashboard, browsing, selling, owned tickets, verification, and transfer requests.

## Out of Scope
- Payment processing and refunds.
- External ticket-provider integrations.
- Automated OCR or fraud detection.
- Notifications, chat, ratings, and production file storage.

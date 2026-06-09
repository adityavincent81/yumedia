# DEPENDENCY REPORT

## Project

Social Media Platform Backend

Current Status:

```text
Auth Module Complete
Profile Module Planned
```

Architecture:

```text
Express.js
MongoDB
Mongoose
Repository Pattern
Service Layer Pattern
JWT Authentication
```

---

# Installed Dependencies

## Core

Install:

```bash
npm install express mongoose dotenv cors
```

Purpose:

### express

Web framework.

Used For:

```text
Routing
Middleware
API Server
```

---

### mongoose

MongoDB ODM.

Used For:

```text
Models
Schemas
Queries
Indexes
Relationships
```

---

### dotenv

Environment variable management.

Used For:

```text
JWT Secrets
Database URI
Cloudinary Keys
Application Config
```

---

### cors

Cross-Origin Resource Sharing.

Used For:

```text
Frontend ↔ Backend Communication
```

---

# Authentication

Install:

```bash
npm install jsonwebtoken bcryptjs
```

Purpose:

### jsonwebtoken

JWT Access Token and Refresh Token generation.

Used For:

```text
Authentication
Authorization
Protected Routes
```

---

### bcryptjs

Password hashing.

Used For:

```text
Register
Login
Password Verification
```

---

# Validation

Install:

```bash
npm install zod
```

Purpose:

Schema-based validation.

Used For:

```text
Request Validation
Payload Validation
Input Sanitization
```

Reason Chosen:

```text
Cleaner than Joi
Cleaner than Express Validator
Type-safe friendly
Reusable schemas
```

---

# Upload System

Install:

```bash
npm install multer cloudinary
```

Purpose:

### multer

Multipart form-data processing.

Used For:

```text
Avatar Upload
Cover Upload
Post Images
Story Media
```

---

### cloudinary

Cloud media storage.

Used For:

```text
Profile Avatar
Profile Cover
Post Images
Story Images
```

Database stores:

```text
URL only
```

Files are not stored in MongoDB.

---

# Realtime

Install:

```bash
npm install socket.io
```

Purpose:

Realtime communication.

Used For:

```text
Chat Module
Typing Indicator
Online Status
Read Receipts
Notifications
```

Future Modules:

```text
Conversation
Message
Chat Presence
```

---

# Security

Install:

```bash
npm install helmet compression
```

Purpose:

### helmet

Security headers.

Protection:

```text
XSS Protection
Clickjacking Protection
Header Hardening
```

---

### compression

Response compression.

Benefits:

```text
Smaller Response Size
Faster API Responses
Better Performance
```

---

# Utilities

Install:

```bash
npm install slugify nanoid dayjs
```

Purpose:

### slugify

Generate URL-friendly strings.

Future Usage:

```text
Collection Slugs
Post Slugs
Profile URLs
```

---

### nanoid

Unique ID generation.

Future Usage:

```text
Public IDs
Share Codes
Invite Codes
```

---

### dayjs

Date manipulation.

Future Usage:

```text
Last Seen
Story Expiration
Relative Time
Notifications
Activity Logs
```

Examples:

```text
2 minutes ago
1 hour ago
3 days ago
```

---

# Recommended Additional Dependencies

## Cookie Parser

Install:

```bash
npm install cookie-parser
```

Purpose:

```text
Read Access Token Cookie
Read Refresh Token Cookie
Authentication Middleware
```

Recommended:

```text
Required for Cookie-based Authentication
```

---

## Morgan

Install:

```bash
npm install morgan
```

Purpose:

Request logging.

Example:

```text
GET /users/me 200
POST /auth/login 200
PATCH /users/me 200
```

Benefits:

```text
Debugging
Monitoring
Development Logging
```

---

# Development Dependencies

Install:

```bash
npm install -D nodemon
```

Purpose:

Automatic server restart during development.

Benefits:

```text
Faster Development Workflow
```

---

# Current Dependency Stack

```bash
npm install express mongoose dotenv cors

npm install jsonwebtoken bcryptjs

npm install zod

npm install multer cloudinary

npm install socket.io

npm install helmet compression

npm install slugify nanoid dayjs

npm install cookie-parser

npm install morgan

npm install streamifier
```

Development:

```bash
npm install -D nodemon
```

---

# Dependency Coverage

Current stack fully supports:

```text
✓ Authentication
✓ Profile System
✓ Follow System
✓ Post System
✓ Comment System
✓ Like System
✓ Collection System
✓ Feed System
✓ Notification System
✓ Story System
✓ Chat System
```

---

# Future Dependencies (Not Needed Yet)

Only add when required:

```text
Redis
BullMQ
Nodemailer
Passport
OAuth Providers
Push Notification Services
```

Reason:

```text
Avoid unnecessary complexity.
Current stack is sufficient for MVP and production-ready social media foundation.
```

---

# Project Progress

Backend Foundation:

```text
Authentication System : 100%
Profile System        : Planned
```

Overall Backend Progress:

```text
≈ 15%
```

Next Module:

```text
Profile System
```

First File To Analyze:

```text
src/models/User.js
```

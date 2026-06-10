# COMMENT_SYSTEM_BACKEND_REPORT.md

# Yumedia Comment System Backend Report

## Module Information

Module Name:

Comment System Backend

Status:

Completed

Version:

Comment V1

Completion:

100%

---

# Overview

Comment System memungkinkan pengguna:

* Membuat Comment
* Membuat Reply
* Mengambil daftar Comment
* Mengambil daftar Reply
* Menghapus Comment
* Counter Cache Comment
* Realtime Ready

Sistem dirancang agar kompatibel dengan:

* Feed System
* Notification System
* Activity System
* Socket System
* Future Moderation System

---

# Architecture

User

↓

Create Comment

↓

Comment Collection

↓

Update Post.commentsCount

↓

Feed / Post Detail

---

# Folder Structure

```text
backend/src
│
├── models
│   └── Comment.js
│
├── repositories
│   └── comment.repository.js
│
├── services
│   └── comment
│       └── comment.service.js
│
├── controllers
│   └── comment.controller.js
│
├── validators
│   └── comment.validator.js
│
├── routes
│   └── comment.routes.js
│
├── sockets
│   └── comment.socket.js
│
└── constants
    └── comment.constants.js
```

---

# Database Structure

## Comment Model

File:

```text
backend/src/models/Comment.js
```

Fields:

```js
post
author
content
parentComment
repliesCount
isEdited
isDeleted
createdAt
updatedAt
```

---

# Reply System

Root Comment:

```js
{
  parentComment: null
}
```

Reply:

```js
{
  parentComment: commentId
}
```

Structure:

```text
Comment
 ├─ Reply
 ├─ Reply
 └─ Reply
```

Current Support:

```text
Single-level Reply
```

Future Ready:

```text
Nested Reply Expansion
```

---

# Counter Cache Strategy

## Post Counter

Stored in:

```js
Post.commentsCount
```

Purpose:

* Feed Performance
* Profile Performance
* Explore Performance

---

## Reply Counter

Stored in:

```js
Comment.repliesCount
```

Purpose:

```text
Lihat 15 balasan
```

without expensive count queries.

---

# Constants Layer

File:

```text
backend/src/constants/comment.constants.js
```

Contains:

```js
COMMENT_EVENTS

COMMENT_TYPES

COMMENT_LIMITS
```

---

# Repository Layer

File:

```text
backend/src/repositories/comment.repository.js
```

Responsibilities:

* Database Access
* Pagination
* Populate Author
* Counter Updates

Methods:

```js
create()

findById()

findPostComments()

findReplies()

countPostComments()

countReplies()

incrementRepliesCount()

decrementRepliesCount()

markDeleted()

deleteById()
```

---

# Service Layer

File:

```text
backend/src/services/comment/comment.service.js
```

Responsibilities:

* Business Logic
* Ownership Validation
* Counter Cache
* Reply Logic

Methods:

```js
createComment()

createReply()

getPostComments()

getReplies()

deleteComment()
```

---

# Create Comment Flow

Request

↓

Validate Post

↓

Create Comment

↓

Increment Post.commentsCount

↓

Return Comment

---

# Create Reply Flow

Request

↓

Validate Parent Comment

↓

Create Reply

↓

Increment Parent.repliesCount

↓

Increment Post.commentsCount

↓

Return Reply

---

# Delete Comment Strategy

If No Replies:

```text
Hard Delete
```

If Has Replies:

```text
Soft Delete
```

Implementation:

```js
{
  isDeleted: true,
  content: "[deleted]"
}
```

Purpose:

Keep discussion thread intact.

Example:

```text
[deleted]
 ├─ reply
 ├─ reply
 └─ reply
```

Similar To:

* Reddit
* Discord
* Facebook

---

# Controller Layer

File:

```text
backend/src/controllers/comment.controller.js
```

Methods:

```js
createComment()

createReply()

getPostComments()

getReplies()

deleteComment()
```

Responsibilities:

* Request Handling
* Service Integration
* Response Formatting

---

# Validation Layer

File:

```text
backend/src/validators/comment.validator.js
```

Schemas:

```js
createCommentSchema

createReplySchema

commentParamsSchema

postCommentsParamsSchema

commentQuerySchema
```

Validation Covers:

```text
Post ID
Comment ID
Content Length
Pagination
```

---

# Socket Layer

File:

```text
backend/src/sockets/comment.socket.js
```

Status:

Ready

Events:

```js
comment:created

comment:updated

comment:deleted

comment:reply-created
```

Methods:

```js
initializeCommentSocket()

emitCommentCreated()

emitCommentDeleted()

emitReplyCreated()
```

Purpose:

Future realtime integration.

---

# Routes Layer

File:

```text
backend/src/routes/comment.routes.js
```

---

## Create Comment

```http
POST /api/comments
```

Body:

```json
{
  "postId": "postId",
  "content": "Nice post"
}
```

---

## Create Reply

```http
POST /api/comments/:commentId/reply
```

Body:

```json
{
  "content": "I agree"
}
```

---

## Get Post Comments

```http
GET /api/comments/post/:postId?page=1&limit=20
```

---

## Get Replies

```http
GET /api/comments/:commentId/replies?page=1&limit=20
```

---

## Delete Comment

```http
DELETE /api/comments/:commentId
```

---

# Security

Protected By:

```js
authMiddleware
```

All routes require authentication.

---

# Performance Strategy

Source Of Truth:

```text
Comment Collection
```

Cached Counters:

```text
Post.commentsCount

Comment.repliesCount
```

Benefits:

* Fast Feed Queries
* Fast Post Rendering
* Reduced Database Load

---

# Future Integrations

Prepared For:

```text
Notification System

Activity System

Realtime Feed

Realtime Post Detail

Comment Moderation

Comment Editing

Mentions System

Comment Reactions
```

---

# Testing Checklist

✔ Create Comment

✔ Create Reply

✔ Get Post Comments

✔ Get Replies

✔ Delete Comment

✔ Counter Cache

✔ Ownership Validation

✔ Pagination

✔ Soft Delete Strategy

✔ Socket Preparation

---

# Module Status

Authentication System

100%

Profile System

100%

Follow System

100%

Post System

100%

Feed System

100%

Like System Backend

100%

Like System Frontend

100%

Comment System Backend

100%

---

# Recommended Next Step

Comment System Frontend

Reason:

Backend APIs are complete and ready for integration with:

* Feed
* Post Detail
* Notification
* Activity System

```
```

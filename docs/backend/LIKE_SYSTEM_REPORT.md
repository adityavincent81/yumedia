# LIKE_SYSTEM_BACKEND_REPORT.md

# Yumedia Like System Backend Report

## Module Information

Module Name:

Like System

Status:

Completed

Version:

Like V1

Completion:

100%

---

# Overview

Like System memungkinkan pengguna memberikan reaksi Like pada Post.

Sistem menggunakan collection terpisah:

PostLike

sebagai source of truth dan menggunakan counter cache pada Post:

likesCount

untuk optimasi performa Feed.

---

# Goals

Like System dibuat untuk:

* Like Post
* Unlike Post
* Check Like Status
* Get Post Likes
* Counter Cache
* Feed Integration Ready
* Notification Integration Ready

---

# Architecture

User

↓

Like Post

↓

PostLike Collection

↓

Update Post.likesCount

↓

Feed / PostCard

---

# Design Decision

Selected Option:

Counter Cache

Implementation:

PostLike Collection
+
Post.likesCount

Reason:

* Faster Feed Query
* Faster Post Rendering
* Scalable
* Social Media Standard Pattern

---

# Database Structure

## PostLike Model

File:

backend/src/models/PostLike.js

Schema:

```js
{
  user: ObjectId,
  post: ObjectId
}
```

Indexes:

```js
{
  user: 1,
  post: 1
}
```

Unique Constraint:

```js
user + post
```

Purpose:

Prevent duplicate likes.

---

# Post Model Integration

File:

backend/src/models/Post.js

Existing Counter Fields:

```js
likesCount
commentsCount
savesCount
```

Used Counter:

```js
likesCount
```

Purpose:

Cached like count for Feed and Post rendering.

---

# Repository Layer

File:

backend/src/repositories/postLike.repository.js

Responsibilities:

* Create Like
* Delete Like
* Find Like
* Count Likes
* Get Post Likes
* Check Like Exists

Methods:

```js
createLike()
deleteLike()
findLike()
countLikes()
getPostLikes()
exists()
```

---

# Post Repository Updates

File:

backend/src/repositories/post.repository.js

Added Methods:

```js
incrementLikesCount()
decrementLikesCount()
```

Purpose:

Maintain Post counter cache.

---

# Service Layer

File:

backend/src/services/like/like.service.js

Responsibilities:

* Toggle Like
* Toggle Unlike
* Validate Post Exists
* Return Like Status
* Return Like Count
* Get Post Likes

Methods:

```js
toggleLike()
getLikeStatus()
getPostLikes()
```

---

# Toggle Like Flow

Request

↓

Validate Post

↓

Check Existing Like

↓

If Exists

→ Remove Like

→ Decrement Counter

↓

Else

→ Create Like

→ Increment Counter

↓

Return Result

---

# Controller Layer

File:

backend/src/controllers/like.controller.js

Responsibilities:

* Request Handling
* Service Integration
* API Response Formatting

Methods:

```js
toggleLike()
getLikeStatus()
getPostLikes()
```

---

# Validation Layer

File:

backend/src/validators/like.validator.js

Schemas:

```js
postIdParamsSchema
likeQuerySchema
```

Validation:

* postId
* page
* limit

---

# Routes Layer

File:

backend/src/routes/like.routes.js

Protected Routes:

```http
POST /api/likes/:postId

GET /api/likes/:postId/status

GET /api/likes/post/:postId
```

Authentication:

Required

---

# API Endpoints

## Toggle Like

Request:

```http
POST /api/likes/:postId
```

Response:

```json
{
  "liked": true,
  "likesCount": 25
}
```

Unlike Response:

```json
{
  "liked": false,
  "likesCount": 24
}
```

---

## Get Like Status

Request:

```http
GET /api/likes/:postId/status
```

Response:

```json
{
  "liked": true
}
```

---

## Get Post Likes

Request:

```http
GET /api/likes/post/:postId?page=1&limit=20
```

Response:

```json
{
  "likes": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

---

# Security

Protected by:

```js
authMiddleware
```

All endpoints require authentication.

---

# Performance Strategy

Source Of Truth:

```text
PostLike Collection
```

Fast Read Cache:

```text
Post.likesCount
```

Feed Query:

```js
Post.find(...)
```

No countDocuments required for each Post.

---

# Feed Integration

Ready

Feed receives:

```js
post.likesCount
```

directly from Post document.

No additional query required.

---

# Future Integrations

Like System is prepared for:

* Notification System
* Activity System
* Analytics System
* Engagement Tracking
* User Reputation System
* Recommendation System

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

---

# Next Module

Recommended Next Step:

Like Frontend

Reason:

PostActions UI already exists and can be connected directly to Like API.

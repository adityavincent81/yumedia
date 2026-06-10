# FEED_SYSTEM_REPORT.md

# Yumedia - Feed System Report

## Overview

Feed System bertanggung jawab menyusun timeline pengguna berdasarkan relasi follow yang telah dibuat sebelumnya.

Feed tidak memiliki collection atau model sendiri.

Feed dibangun dari kombinasi:

* User
* Follow
* Post

Feed System bertugas mengambil postingan yang relevan dan mengirimkannya ke frontend dalam bentuk timeline.

---

# Status

## Backend

✅ Completed

## Frontend

❌ Not Started

---

# Feed Version

Current Version:

```text
Feed V1
```

Features:

* Following Feed
* Own Posts Feed
* Pagination
* Visibility Filter
* Newest First Sorting

---

# Feed Sources

Feed mengambil data dari:

```text
User
Follow
Post
```

Tidak ada:

```text
Feed Collection
Feed Schema
Feed Model
```

karena feed bersifat generated data.

---

# Feed Logic

Contoh:

User:

```text
Tegar
```

Following:

```text
Budi
Siti
```

Feed:

```text
Post Budi
Post Tegar
Post Siti
Post Budi
Post Tegar
```

Feed dibuat secara realtime ketika endpoint dipanggil.

---

# Visibility Rules

Supported Visibility:

```text
public
followers
private
```

Rules:

## Public

Semua pengguna dapat melihat.

---

## Followers

Hanya pengguna yang mengikuti author.

---

## Private

Hanya author yang dapat melihat.

---

# Backend Architecture

## Repository

```text
backend/src/repositories/feed.repository.js
```

Responsibilities:

* Feed Query
* Pagination Query
* Sorting Query
* Author Filtering

Methods:

```js
findFeedPosts()
countFeedPosts()
```

---

## Service

```text
backend/src/services/feed/feed.service.js
```

Responsibilities:

* Following Lookup
* Visibility Filtering
* Feed Assembly
* Pagination Response

Methods:

```js
getFeed()
```

---

## Controller

```text
backend/src/controllers/feed.controller.js
```

Responsibilities:

* Request Handling
* Response Formatting
* Service Integration

Methods:

```js
getFeed()
```

---

## Validator

```text
backend/src/validators/feed.validator.js
```

Responsibilities:

* Page Validation
* Limit Validation

Schemas:

```js
feedQuerySchema
```

---

## Routes

```text
backend/src/routes/feed.routes.js
```

Endpoint:

```http
GET /feed
```

---

# Endpoint

## Get Feed

Request:

```http
GET /api/feed
```

Pagination:

```http
GET /api/feed?page=1&limit=10
```

Response:

```json
{
  "success": true,
  "message": "Feed retrieved successfully",
  "data": {
    "posts": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

---

# Feed Query Flow

```text
Current User
↓
Get Following
↓
Build Author List
↓
Fetch Posts
↓
Apply Visibility Rules
↓
Sort Newest First
↓
Return Feed
```

---

# Pagination

Supported:

```text
page
limit
```

Example:

```http
GET /api/feed?page=2&limit=10
```

---

# Sorting

Default:

```text
Newest First
```

MongoDB:

```js
.sort({
  createdAt: -1
})
```

---

# Frontend Planned Structure

```text
frontend/src/features/feed
│
├── hooks
│   └── useFeed.ts
│
├── service
│   └── feed.service.ts
│
├── store
│   └── feed.store.ts
│
└── types
    └── feed.types.ts
```

---

# Planned Components

```text
frontend/src/components/feed
│
├── FeedList.tsx
├── FeedItem.tsx
├── FeedSkeleton.tsx
└── FeedInfiniteLoader.tsx
```

---

# Reused Components

Feed akan menggunakan komponen Post yang sudah ada.

```text
PostCard
PostHeader
PostMedia
PostCaption
PostActions
```

Tidak ada duplikasi card.

---

# Current Progress

## Auth System

100%

## Profile System

100%

## Follow System

100%

## Post System

100%

## Feed Backend

100%

## Feed Frontend

0%

---

# Next Step

Frontend Feed Implementation

Order:

1. feed.types.ts
2. feed.service.ts
3. feed.store.ts
4. useFeed.ts
5. FeedList.tsx
6. FeedSkeleton.tsx
7. Dashboard Feed Integration

After Feed:

1. Like System
2. Comment System
3. Collection System
4. Notification System

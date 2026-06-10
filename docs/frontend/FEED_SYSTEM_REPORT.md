# FEED_SYSTEM_REPORT.md

# Yumedia Feed System Report

## Module Information

Module Name:

```text
Feed System
```

Status:

```text
Completed
```

Version:

```text
Feed V1
```

Completion:

```text
100%
```

---

# Overview

Feed System bertanggung jawab menampilkan timeline utama pengguna berdasarkan relasi Follow dan Post yang telah dibuat sebelumnya.

Feed pada Yumedia bekerja mirip seperti:

* Instagram Home Feed
* Facebook Timeline
* Threads Feed
* Twitter/X Following Feed

Feed tidak memiliki collection atau model sendiri.

Feed dibangun secara realtime dari:

```text
User
Follow
Post
```

---

# Goals

Feed System dibuat untuk:

* Menampilkan postingan pengguna sendiri
* Menampilkan postingan pengguna yang di-follow
* Menyediakan pagination
* Menyediakan infinite scrolling
* Menyediakan filtering visibility
* Menjadi fondasi Like, Comment, Collection, dan Notification System

---

# Feed Logic

Current User

↓

Get Following Users

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

---

# Visibility Rules

Supported Visibility:

```text
public
followers
private
```

## Public

Dapat dilihat semua pengguna.

---

## Followers

Dapat dilihat oleh pengguna yang mengikuti author.

---

## Private

Hanya dapat dilihat oleh pemilik post.

---

# Backend Architecture

## Repository

File:

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

File:

```text
backend/src/services/feed/feed.service.js
```

Responsibilities:

* Following Lookup
* Feed Assembly
* Visibility Filtering
* Pagination Logic

Methods:

```js
getFeed()
```

---

## Controller

File:

```text
backend/src/controllers/feed.controller.js
```

Responsibilities:

* Request Handling
* Service Integration
* Response Formatting

Methods:

```js
getFeed()
```

---

## Validator

File:

```text
backend/src/validators/feed.validator.js
```

Responsibilities:

* Query Validation
* Pagination Validation

Schemas:

```js
feedQuerySchema
```

---

## Routes

File:

```text
backend/src/routes/feed.routes.js
```

Endpoint:

```http
GET /api/feed
```

---

# API

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

# Frontend Architecture

## Feature Structure

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

## Feed Components

```text
frontend/src/components/feed
│
├── FeedList.tsx
├── FeedSkeleton.tsx
└── FeedInfiniteLoader.tsx
```

---

# Feed Types

File:

```text
feed.types.ts
```

Contains:

```ts
FeedPagination
FeedResponse
FeedQuery
FeedState
```

---

# Feed Store

File:

```text
feed.store.ts
```

State:

```ts
posts
pagination
isLoading
error
```

Actions:

```ts
setPosts()
appendPosts()
setPagination()
setLoading()
setError()
clearFeed()
```

---

# Feed Service

File:

```text
feed.service.ts
```

Responsibilities:

```text
API Communication
Feed Retrieval
Pagination Request
```

Methods:

```ts
getFeed()
```

---

# Feed Hook

File:

```text
useFeed.ts
```

Responsibilities:

```text
Fetch Feed
Refresh Feed
Load More Feed
Error Handling
Loading Handling
Store Synchronization
```

Methods:

```ts
fetchFeed()
refreshFeed()
loadMore()
```

---

# Feed Components

## FeedList

Responsibilities:

```text
Initial Feed Load
Empty State
Error State
Render Post Cards
```

---

## FeedSkeleton

Responsibilities:

```text
Loading Placeholder
Layout Preservation
```

---

## FeedInfiniteLoader

Responsibilities:

```text
Intersection Observer
Infinite Scroll Trigger
Auto Load More
```

---

# Reused Components

Feed System menggunakan komponen dari Post System.

```text
PostCard
PostHeader
PostMedia
PostCaption
PostActions
PostMenu
```

Tidak ada duplikasi UI.

---

# Dashboard Integration

File:

```text
frontend/src/app/(protected)/page.tsx
```

Changes:

```text
Removed User Posts Feed
Integrated Home Feed
Integrated FeedList
```

Home Page sekarang menggunakan:

```ts
useFeed()
```

bukan:

```ts
useUserPosts()
```

---

# Infinite Scroll

Status:

```text
Ready
```

Mechanism:

```text
IntersectionObserver
↓
Bottom Reached
↓
loadMore()
↓
Fetch Next Page
```

---

# Current Feed Features

Completed:

```text
Following Feed
Own Posts Feed
Pagination
Infinite Scroll
Visibility Filter
Newest First Sorting
Feed Skeleton
Feed Empty State
Feed Error State
Home Feed Integration
```

---

# Future Feed Features

Planned:

```text
Trending Feed
Explore Feed
Recommended Feed
Pinned Posts
Sponsored Posts
Hashtag Feed
AI Ranking Feed
```

---

# Yumedia Progress

## Authentication System

100%

## Profile System

100%

## Follow System

100%

## Post System

100%

## Feed System

100%

---

# Next Module

Recommended Next System:

```text
Like System
```

Reason:

```text
Feed sudah aktif
Post sudah tampil
PostActions sudah tersedia
Like akan langsung terintegrasi dengan Feed dan Post System
```

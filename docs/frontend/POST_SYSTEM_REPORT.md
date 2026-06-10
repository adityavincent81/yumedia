# POST_SYSTEM_REPORT.md

# Yumedia - Post System Report

## Overview

Post System adalah fitur inti Yumedia yang memungkinkan pengguna membuat, melihat, mengedit, dan menghapus postingan seperti pada Instagram, Facebook, dan Threads.

Sistem ini menjadi fondasi untuk fitur berikutnya seperti:

* Like System
* Comment System
* Feed System
* Collection System
* Notification System
* Explore System
* Reels / Video Feed
* Hashtag System

---

# Status

## Backend

✅ Completed

## Frontend Foundation

✅ Completed

## UI Integration

🟡 In Progress

## Feed System

❌ Not Started

## Like System

❌ Not Started

## Comment System

❌ Not Started

---

# Features Implemented

## Create Post

User dapat membuat post dengan:

* Caption
* Image
* Video
* Visibility

Supported Visibility:

* public
* followers
* private

Media disimpan ke Cloudinary.

---

## Get Post

User dapat melihat detail sebuah post.

Endpoint:

```http
GET /posts/:postId
```

---

## Get User Posts

User dapat mengambil seluruh post miliknya.

Endpoint:

```http
GET /posts/user/:username
```

Support:

* Pagination
* Limit

---

## Update Post

User dapat mengubah:

* Caption
* Visibility

Endpoint:

```http
PATCH /posts/:postId
```

---

## Delete Post

User dapat menghapus post miliknya.

Endpoint:

```http
DELETE /posts/:postId
```

---

# Backend Architecture

## Model

```text
backend/src/models/Post.js
```

Responsibilities:

* Post Schema
* Media Schema
* Visibility
* Hashtags
* Counters
* Metadata

---

## Repository

```text
backend/src/repositories/post.repository.js
```

Responsibilities:

* Database abstraction
* CRUD Operations
* Pagination Query
* Population Query

---

## Service

```text
backend/src/services/post/post.service.js
```

Responsibilities:

* Business Logic
* Hashtag Extraction
* Upload Media
* Authorization Check
* Create / Update / Delete Flow

---

## Controller

```text
backend/src/controllers/post.controller.js
```

Responsibilities:

* Request Handling
* Response Formatting
* Service Integration

---

## Validator

```text
backend/src/validators/post.validator.js
```

Responsibilities:

* Create Validation
* Update Validation
* Params Validation

---

## Route

```text
backend/src/routes/post.routes.js
```

Registered Endpoints:

POST /posts

GET /posts/user/:username

GET /posts/:postId

PATCH /posts/:postId

DELETE /posts/:postId

---

# Cloudinary Integration

## Service

```text
backend/src/services/cloudinary/cloudinary.service.js
```

Supports:

* Image Upload
* Video Upload
* Media Delete

Stored Metadata:

```json
{
  "type": "image",
  "url": "...",
  "publicId": "..."
}
```

or

```json
{
  "type": "video",
  "url": "...",
  "publicId": "..."
}
```

---

# Upload System

## Middleware

```text
backend/src/middleware/upload.middleware.js
```

Supports:

* JPG
* JPEG
* PNG
* WEBP
* MP4
* MOV
* WEBM

Used By:

* Avatar Upload
* Cover Upload
* Post Upload

---

# Frontend Architecture

## Feature Folder

```text
frontend/src/features/post
│
├── hooks
│   ├── useCreatePost.ts
│   ├── useDeletePost.ts
│   ├── usePost.ts
│   ├── useUpdatePost.ts
│   └── useUserPosts.ts
│
├── service
│   └── post.service.ts
│
├── store
│   └── post.store.ts
│
└── types
    └── post.types.ts
```

---

# Components

```text
frontend/src/components/post
│
├── CreatePostModal.tsx
│
├── MediaDropzone.tsx
├── MediaPreview.tsx
│
├── CaptionInput.tsx
├── VisibilitySelector.tsx
│
├── PostMedia.tsx
├── PostHeader.tsx
├── PostCaption.tsx
├── PostActions.tsx
│
├── PostCard.tsx
├── PostGridItem.tsx
├── PostGrid.tsx
│
├── EditPostModal.tsx
├── DeletePostModal.tsx
│
└── PostSkeleton.tsx
```

---

# Create Post Flow

```text
User
↓
Create Button
↓
CreatePostModal
↓
Media Upload
↓
Caption Input
↓
Visibility Selector
↓
useCreatePost()
↓
post.service.ts
↓
POST /posts
↓
Cloudinary Upload
↓
MongoDB Save
↓
Success Response
```

---

# Sidebar Integration

Implemented:

```text
Sidebar
↓
Create Button
↓
openCreatePost()
↓
Zustand Store
↓
CreatePostModal
```

No dedicated route required.

Removed:

```text
/create
```

Modal-based workflow now used.

---

# Database Counters

Implemented:

```text
postsCount
```

Automatically:

* Increment on Create
* Decrement on Delete

Repository:

```text
user.repository.js
```

---

# Current Progress

## Auth System

100%

## Profile System

100%

## Follow System

100%

## Post Backend

100%

## Post Frontend Foundation

100%

## Post UI Integration

70%

## Feed System

0%

## Like System

0%

## Comment System

0%

## Collection System

0%

---

# Next Recommended Module

1. Feed System
2. Like System
3. Comment System
4. Collection System
5. Notification System
6. Explore System

Recommended Next:

Feed System

Reason:

Post System is complete enough to become the data source for Home Feed.
"""

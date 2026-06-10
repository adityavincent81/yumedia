# POST SYSTEM REPORT

## Project

Yumedia Social Media Platform

## Module

Post System Backend

## Status

COMPLETED (100%)

## Completion Date

10 June 2026

---

# 1. OVERVIEW

Post System merupakan fondasi utama seluruh aktivitas sosial pada platform Yumedia.

Module ini bertanggung jawab untuk:

* Membuat post
* Menampilkan post
* Mengubah post
* Menghapus post
* Upload image
* Upload video
* Menyimpan hashtag
* Mengatur visibility post
* Integrasi Cloudinary
* Integrasi Profile Statistics

Post System menjadi dependency utama untuk:

* Like System
* Comment System
* Feed System
* Notification System
* Collection System
* Story System
* Explore System

---

# 2. FEATURES IMPLEMENTED

## Create Post

User dapat membuat post berupa:

* Caption saja
* Caption + Image
* Caption + Video
* Multiple Images
* Multiple Videos
* Mixed Media (Image + Video)

---

## Get Post

Menampilkan detail post berdasarkan ID.

Endpoint:

```http
GET /api/posts/:postId
```

---

## Get User Posts

Menampilkan seluruh post milik user berdasarkan username.

Endpoint:

```http
GET /api/users/:username/posts
```

---

## Update Post

User dapat mengubah:

* Caption
* Visibility

Endpoint:

```http
PATCH /api/posts/:postId
```

---

## Delete Post

User dapat menghapus post miliknya sendiri.

Endpoint:

```http
DELETE /api/posts/:postId
```

---

# 3. POST MODEL

File:

```text
src/models/Post.js
```

Field:

```javascript
{
  author,
  caption,

  media: [
    {
      type,
      url,
      publicId
    }
  ],

  hashtags,

  visibility,

  likesCount,
  commentsCount,
  savesCount
}
```

---

## Supported Media Types

```javascript
image
video
```

---

## Visibility Options

```javascript
public
followers
private
```

---

# 4. HASHTAG SYSTEM

Hashtag diekstrak otomatis dari caption.

Contoh:

```text
Belajar Node.js #nodejs #mongodb #backend
```

Disimpan sebagai:

```javascript
[
  "nodejs",
  "mongodb",
  "backend"
]
```

Digunakan untuk:

* Explore
* Search
* Trending Topics

---

# 5. REPOSITORY LAYER

File:

```text
src/repositories/post.repository.js
```

Methods:

```javascript
create()

findById()

findByAuthor()

updateById()

deleteById()

existsById()
```

Responsibility:

* Database Operations
* Query Optimization
* Pagination Support

---

# 6. SERVICE LAYER

File:

```text
src/services/post/post.service.js
```

Methods:

```javascript
createPost()

getPostById()

getUserPosts()

updatePost()

deletePost()
```

Responsibilities:

* Business Logic
* Ownership Validation
* Hashtag Extraction
* Cloudinary Integration
* Media Processing
* Counter Synchronization

---

# 7. CONTROLLER LAYER

File:

```text
src/controllers/post.controller.js
```

Methods:

```javascript
createPost

getPost

getUserPosts

updatePost

deletePost
```

Responsibilities:

* Handle Request
* Call Service
* Return Response

---

# 8. VALIDATION LAYER

File:

```text
src/validators/post.validator.js
```

Validation:

## Create Post

```javascript
caption
visibility
```

---

## Update Post

```javascript
caption
visibility
```

---

## Params

```javascript
postId
```

Mongo ObjectId validation.

---

# 9. ROUTES

File:

```text
src/routes/post.routes.js
```

Endpoints:

## Create Post

```http
POST /api/posts
```

---

## Get Post

```http
GET /api/posts/:postId
```

---

## Update Post

```http
PATCH /api/posts/:postId
```

---

## Delete Post

```http
DELETE /api/posts/:postId
```

---

# 10. CLOUDINARY INTEGRATION

File:

```text
src/services/cloudinary/cloudinary.service.js
```

Refactored To Support:

```text
Image Upload
Video Upload
Image Delete
Video Delete
```

Methods:

```javascript
uploadMedia()

uploadImage()

deleteMedia()

deleteImage()
```

---

# 11. UPLOAD SYSTEM

File:

```text
src/middleware/upload.middleware.js
```

Supported Upload Types:

## Avatar

```text
JPG
JPEG
PNG
WEBP
```

---

## Cover

```text
JPG
JPEG
PNG
WEBP
```

---

## Post Media

```text
JPG
JPEG
PNG
WEBP

MP4
WEBM
MOV
```

---

Maximum Size:

```text
50 MB
```

for post media.

---

# 12. PROFILE INTEGRATION

File:

```text
src/repositories/user.repository.js
```

Added:

```javascript
incrementPostsCount()

decrementPostsCount()
```

Behavior:

## Create Post

```text
postsCount +1
```

---

## Delete Post

```text
postsCount -1
```

Profile statistics remain synchronized.

---

# 13. SECURITY

Implemented:

* JWT Authentication
* Protected Routes
* Ownership Validation
* Input Validation
* Upload Validation
* Media Type Validation

Users can only:

```text
Update their own posts
Delete their own posts
```

---

# 14. DATABASE INDEXES

Feed Optimization:

```javascript
{
  author: 1,
  createdAt: -1
}
```

---

Hashtag Search:

```javascript
{
  hashtags: 1
}
```

---

# 15. ARCHITECTURE

Pattern:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
MongoDB
```

Architecture Style:

* Layered Architecture
* Repository Pattern
* Service Layer Pattern

---

# 16. FEATURE COMPLETION

Core Post Features:

✅ Create Post

✅ Get Single Post

✅ Get User Posts

✅ Update Post

✅ Delete Post

✅ Multiple Image Upload

✅ Multiple Video Upload

✅ Mixed Media Upload

✅ Cloudinary Integration

✅ Hashtag Extraction

✅ Visibility System

✅ Posts Counter Integration

✅ Ownership Validation

✅ Authentication Protection

---

# 17. CURRENT PROJECT PROGRESS

Backend Modules:

✅ Authentication System

✅ Profile System

✅ Follow System

✅ Post System

⬜ Like System

⬜ Comment System

⬜ Feed System

⬜ Notification System

⬜ Story System

⬜ Chat System

---

# 18. NEXT MODULE

Recommended:

## Like System

Reason:

Like System depends directly on Post System.

Architecture:

```text
User
 ↓
Like
 ↓
Post
```

Features:

* Like Post
* Unlike Post
* Get Like Status
* Get Post Likes
* likesCount Synchronization

After Like:

```text
Comment
↓
Feed
↓
Notification
↓
Story
↓
Chat
```

---

# FINAL STATUS

Authentication Backend: 100%

Profile Backend: 100%

Follow Backend: 100%

Post Backend: 100%

Backend Foundation Status:

STRONG SOCIAL MEDIA CORE READY

Ready For:

* Like System Development
* Comment System Development
* Feed System Development
* Notification System Development

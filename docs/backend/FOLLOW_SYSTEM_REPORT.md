# Follow System Report

## Project

Yumedia Social Media Platform

## Module

Follow System

## Status

Completed (Backend Core)

---

# Overview

Follow System merupakan fondasi utama untuk membangun fitur sosial pada platform Yumedia.

Modul ini memungkinkan pengguna untuk:

* Follow user lain
* Unfollow user lain
* Melihat daftar followers
* Melihat daftar following
* Mengecek status follow
* Menyimpan jumlah followers
* Menyimpan jumlah following

Follow System akan menjadi dependency utama untuk:

* Feed System
* Notification System
* Suggested Users
* Mutual Connections
* Story Viewer
* Chat Permission System

---

# Architecture

Follow System mengikuti arsitektur backend Yumedia:

Controller
↓
Service
↓
Repository
↓
Model

---

# Database Design

## Follow Collection

Model:

```javascript
{
  follower: ObjectId,
  following: ObjectId
}
```

### Timestamps

```javascript
createdAt
updatedAt
```

### Indexes

Unique Follow:

```javascript
{
  follower: 1,
  following: 1
}
```

Followers Query:

```javascript
{
  following: 1
}
```

Following Query:

```javascript
{
  follower: 1
}
```

---

# User Counter Integration

User schema menggunakan counter:

```javascript
followersCount
followingCount
```

Counter diperbarui secara otomatis saat:

* Follow
* Unfollow

Keuntungan:

* Query profile lebih cepat
* Tidak perlu countDocuments setiap request
* Lebih scalable untuk social media

---

# Repository Layer

File:

```text
src/repositories/follow.repository.js
```

Responsibility:

* Create follow
* Find follow relationship
* Delete follow
* Get followers
* Get following
* Count followers
* Count following
* Check follow status

---

# Service Layer

File:

```text
src/services/follow/follow.service.js
```

Business Rules:

## Follow User

Validasi:

* User target harus ada
* Tidak boleh follow diri sendiri
* Tidak boleh duplicate follow

Proses:

* Create follow relation
* Increment followersCount
* Increment followingCount

---

## Unfollow User

Validasi:

* Follow relation harus ada

Proses:

* Delete follow relation
* Decrement followersCount
* Decrement followingCount

---

## Get Followers

Mengambil daftar followers dengan pagination.

---

## Get Following

Mengambil daftar following dengan pagination.

---

## Get Follow Status

Mengembalikan:

```javascript
{
  isFollowing,
  followersCount,
  followingCount
}
```

---

# Controller Layer

File:

```text
src/controllers/follow.controller.js
```

Endpoints:

* Follow User
* Unfollow User
* Get Followers
* Get Following
* Get Follow Status

Menggunakan:

* asyncHandler
* successResponse

Konsisten dengan Auth Module.

---

# Validation Layer

File:

```text
src/validators/follow.validator.js
```

Validasi:

## Params

```javascript
userId
```

Valid Mongo ObjectId.

## Query

```javascript
page
limit
```

Pagination validation.

---

# Routes

File:

```text
src/routes/follow.routes.js
```

Endpoints:

## Follow User

POST

```http
/api/follows/:userId
```

---

## Unfollow User

DELETE

```http
/api/follows/:userId
```

---

## Followers

GET

```http
/api/follows/:userId/followers
```

---

## Following

GET

```http
/api/follows/:userId/following
```

---

## Follow Status

GET

```http
/api/follows/:userId/status
```

---

# App Registration

Registered in:

```text
src/app.js
```

Route:

```javascript
app.use("/api/follows", followRoutes);
```

---

# Security

Protected Endpoints:

* Follow User
* Unfollow User
* Get Followers
* Get Following
* Get Follow Status

Middleware:

```javascript
authMiddleware
```

Required authentication before access.

---

# Files Created

```text
src/models/Follow.js

src/repositories/follow.repository.js

src/services/follow/follow.service.js

src/controllers/follow.controller.js

src/routes/follow.routes.js

src/validators/follow.validator.js
```

---

# Files Updated

```text
src/repositories/user.repository.js
```

Added:

```javascript
incrementFollowersCount()

decrementFollowersCount()

incrementFollowingCount()

decrementFollowingCount()
```

---

# Feature Completion

Backend Follow System Core:

✅ Follow User

✅ Unfollow User

✅ Get Followers

✅ Get Following

✅ Get Follow Status

✅ Followers Counter

✅ Following Counter

✅ Pagination Support

✅ Duplicate Follow Prevention

✅ Self Follow Prevention

✅ Authentication Protection

---

# Current Project Progress

Backend Modules:

✅ Auth System

✅ Profile System

✅ Follow System

⬜ Post System

⬜ Like System

⬜ Comment System

⬜ Notification System

⬜ Story System

⬜ Chat System

---

# Conclusion

Follow System backend core has been implemented and integrated into the Yumedia backend architecture.

The module is ready to be consumed by the frontend layer and serves as the foundation for future social features such as Feed, Notifications, Recommendations, Stories, and Messaging.

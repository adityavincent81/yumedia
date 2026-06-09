# PROFILE SYSTEM REPORT

## Project

Yumedia Social Media Platform

## Module

Profile System Backend

## Status

COMPLETED (100%)

## Completion Date

09 June 2026

---

# 1. OVERVIEW

Profile System merupakan module kedua setelah Authentication System pada backend Yumedia.

Module ini bertanggung jawab untuk:

* Menyimpan data profil pengguna
* Menampilkan profil pengguna
* Mengubah data profil
* Upload avatar
* Upload cover
* Integrasi Cloudinary
* Menyediakan endpoint profile untuk frontend

Profile System dibangun menggunakan arsitektur:

* Controller Layer
* Service Layer
* Repository Layer
* Validation Layer
* Middleware Layer

---

# 2. FEATURES IMPLEMENTED

## Profile Information

User dapat memiliki data:

* Full Name
* NIM
* Username
* Bio
* Faculty
* Major
* Batch Year
* Website
* Location

---

## Profile Media

User dapat memiliki:

* Avatar
* Cover

Media disimpan menggunakan Cloudinary.

Struktur media:

```json
{
  "url": "...",
  "publicId": "..."
}
```

---

## User Statistics

Profile menyimpan counter:

* Followers Count
* Following Count
* Posts Count

Counter sudah disiapkan untuk module selanjutnya.

---

## Account Status

Profile mendukung:

* Verified Account
* Active Account
* Last Seen

---

# 3. USER MODEL

File:

```text
src/models/User.js
```

Field utama:

* fullName
* nim
* username
* avatar
* cover
* bio
* faculty
* major
* batchYear
* website
* location
* followersCount
* followingCount
* postsCount
* isVerified
* isActive
* lastSeenAt

Schema menggunakan:

* timestamps
* unique index
* validation

---

# 4. REPOSITORY LAYER

File:

```text
src/repositories/user.repository.js
```

Method:

* create()
* findById()
* findByUsername()
* findByNim()
* updateById()
* updateProfile()
* updateAvatar()
* updateCover()
* updateLastSeen()
* existsByUsername()
* existsByNim()

Repository hanya menangani database operation.

Tidak terdapat business logic pada layer ini.

---

# 5. SERVICE LAYER

File:

```text
src/services/user/user.service.js
```

Method:

* getMyProfile()
* getProfileByUsername()
* updateMyProfile()
* updateMyAvatar()
* updateMyCover()

Tanggung jawab:

* Business Logic
* Validation
* Authorization
* Cloudinary Integration
* Error Handling

---

# 6. CONTROLLER LAYER

File:

```text
src/controllers/user.controller.js
```

Method:

* getMyProfile
* getProfileByUsername
* updateMyProfile
* updateMyAvatar
* updateMyCover

Controller hanya menerima request dan mengirim response.

---

# 7. VALIDATION LAYER

File:

```text
src/validators/user.validator.js
```

Menggunakan:

* Zod

Validasi:

* fullName
* bio
* faculty
* major
* batchYear
* website
* location

---

# 8. ROUTES

File:

```text
src/routes/user.routes.js
```

Endpoint:

GET /api/users/me

GET /api/users/:username

PATCH /api/users/me

PATCH /api/users/me/avatar

PATCH /api/users/me/cover

---

# 9. CLOUDINARY INTEGRATION

File:

```text
src/config/cloudinary.js
```

Environment Variables:

* CLOUDINARY_CLOUD_NAME
* CLOUDINARY_API_KEY
* CLOUDINARY_API_SECRET

---

## Cloudinary Service

File:

```text
src/services/cloudinary/cloudinary.service.js
```

Method:

* uploadImage()
* deleteImage()

---

# 10. FILE UPLOAD SYSTEM

File:

```text
src/middleware/upload.middleware.js
```

Menggunakan:

* Multer
* Memory Storage

Supported Formats:

* JPG
* JPEG
* PNG
* WEBP

Avatar Limit:

5 MB

Cover Limit:

10 MB

---

# 11. ERROR HANDLING

File:

```text
src/middleware/error.middleware.js
```

Handled Errors:

* Zod Validation Error
* AppError
* Multer Error
* Invalid File Type
* Cloudinary Error
* Internal Server Error

---

# 12. SECURITY

Implemented:

* JWT Authentication
* Cookie Based Access Token
* Protected Routes
* Input Validation
* File Validation
* Upload Size Limiting
* Helmet
* Compression

---

# 13. API ENDPOINTS

## Get My Profile

GET

```text
/api/users/me
```

Authentication Required

---

## Get User Profile

GET

```text
/api/users/:username
```

Public Endpoint

---

## Update Profile

PATCH

```text
/ api/users/me
```

Authentication Required

---

## Update Avatar

PATCH

```text
/ api/users/me/avatar
```

Authentication Required

Form Data:

avatar

---

## Update Cover

PATCH

```text
/ api/users/me/cover
```

Authentication Required

Form Data:

cover

---

# 14. DEPENDENCIES USED

Core

* express
* mongoose
* dotenv
* cors

Authentication

* jsonwebtoken
* bcryptjs

Upload

* multer
* cloudinary
* streamifier

Validation

* zod

Security

* helmet
* compression

Utilities

* cookie-parser

Realtime

* socket.io

---

# 15. ARCHITECTURE STATUS

Authentication System

Status:

COMPLETED (100%)

Profile System

Status:

COMPLETED (100%)

---

# 16. NEXT MODULE

Recommended next backend module:

1. Follow System
2. Post System
3. Comment System
4. Like System
5. Feed System
6. Notification System
7. Story System
8. Chat System

Reason:

User model already contains:

* followersCount
* followingCount

which are prepared for Follow System implementation.

---

# FINAL STATUS

Authentication Backend: 100%

Profile Backend: 100%

Backend Foundation Status:

COMPLETED

Ready for:

* Follow System Development
* Frontend Profile Module Development

# FOLLOW SYSTEM FRONTEND REPORT

## Project

Yumedia Social Media Platform

## Module

Follow System Frontend

## Status

Completed (V1)

---

# Overview

Follow System Frontend merupakan implementasi antarmuka pengguna untuk fitur follow yang terhubung dengan Follow API backend.

Modul ini memungkinkan pengguna untuk:

* Follow user lain
* Unfollow user lain
* Melihat jumlah followers
* Melihat jumlah following
* Mengakses halaman followers
* Mengakses halaman following
* Menampilkan daftar followers
* Menampilkan daftar following

---

# Architecture

Frontend Follow System mengikuti arsitektur feature-based.

```text
components
↓
hooks
↓
services
↓
api client
↓
backend
```

Menggunakan:

* Next.js App Router
* React Query
* TypeScript
* Feature-Based Structure

---

# Route Structure

```text
src/app/(protected)

├── [username]
│   ├── page.tsx
│   │
│   ├── followers
│   │   └── page.tsx
│   │
│   └── following
│       └── page.tsx
```

URL Pattern:

```text
/tegar
/tegar/followers
/tegar/following
```

---

# Component Structure

```text
src/components/follow

├── FollowButton.tsx
├── FollowStats.tsx
├── FollowUserCard.tsx
├── FollowersList.tsx
└── FollowingList.tsx
```

---

# Feature Structure

```text
src/features/follow

├── hooks
│   ├── useFollowUser.ts
│   ├── useUnfollowUser.ts
│   ├── useFollowStatus.ts
│   ├── useFollowers.ts
│   └── useFollowing.ts
│
├── services
│   └── follow.service.ts
│
├── store
│   └── follow.store.ts
│
├── types
│   └── follow.types.ts
│
└── constants
    └── follow.constants.ts
```

---

# Type System

File:

```text
src/features/follow/types/follow.types.ts
```

Defined Types:

* FollowUser
* FollowRelation
* FollowStatus
* FollowersResponse
* FollowingResponse
* FollowStatusResponse
* FollowActionResponse
* FollowListParams

---

# Service Layer

File:

```text
src/features/follow/services/follow.service.ts
```

Responsibilities:

* Follow User
* Unfollow User
* Get Followers
* Get Following
* Get Follow Status

Backend Integration:

```http
POST   /api/follows/:userId
DELETE /api/follows/:userId

GET    /api/follows/:userId/followers
GET    /api/follows/:userId/following

GET    /api/follows/:userId/status
```

---

# React Query Hooks

## useFollowUser

Responsibilities:

* Follow user
* Mutation handling

---

## useUnfollowUser

Responsibilities:

* Unfollow user
* Mutation handling

---

## useFollowStatus

Responsibilities:

* Get current follow status
* Get followers count
* Get following count

---

## useFollowers

Responsibilities:

* Get followers list
* Pagination support

---

## useFollowing

Responsibilities:

* Get following list
* Pagination support

---

# Follow Button

Component:

```text
FollowButton.tsx
```

States:

## Not Following

```text
Follow
```

---

## Following

```text
Following
```

---

## Loading

```text
Processing...
```

Features:

* React Query Mutation
* Automatic Refetch
* Follow State Sync

---

# Follow Stats

Component:

```text
FollowStats.tsx
```

Displays:

```text
Posts
Followers
Following
```

Navigation:

```text
Followers
↓
/username/followers

Following
↓
/username/following
```

---

# Follow User Card

Component:

```text
FollowUserCard.tsx
```

Displays:

* Avatar
* Full Name
* Username
* Faculty
* Major
* Batch Year
* Follow Button

Reusable In:

* Followers List
* Following List
* Suggested Users
* Search Users
* Explore Users

---

# Followers List

Component:

```text
FollowersList.tsx
```

Responsibilities:

* Render followers
* Empty state handling

---

# Following List

Component:

```text
FollowingList.tsx
```

Responsibilities:

* Render following users
* Empty state handling

---

# Profile Integration

Integrated Into:

```text
ProfileHeader.tsx
```

Features:

## Own Profile

```text
Edit Profile Button
```

---

## Other User Profile

```text
Follow Button
```

---

# Navigation Integration

Integrated Into:

```text
ProfileStats.tsx
```

Followers:

```text
/user/followers
```

Following:

```text
/user/following
```

---

# User Experience

Inspired By:

* Instagram
* X (Twitter)
* Threads

Design Decisions:

* Dedicated followers page
* Dedicated following page
* Reusable follow button
* Reusable user card
* React Query state management
* Feature-based architecture

---

# Files Created

```text
src/features/follow/types/follow.types.ts

src/features/follow/services/follow.service.ts

src/features/follow/hooks/useFollowUser.ts

src/features/follow/hooks/useUnfollowUser.ts

src/features/follow/hooks/useFollowStatus.ts

src/features/follow/hooks/useFollowers.ts

src/features/follow/hooks/useFollowing.ts

src/components/follow/FollowButton.tsx

src/components/follow/FollowStats.tsx

src/components/follow/FollowUserCard.tsx

src/components/follow/FollowersList.tsx

src/components/follow/FollowingList.tsx

src/app/(protected)/[username]/followers/page.tsx

src/app/(protected)/[username]/following/page.tsx
```

---

# Files Updated

```text
src/components/user/ProfileHeader.tsx

src/components/user/ProfileStats.tsx
```

---

# Completion Status

Frontend Follow System V1

✅ Follow Button

✅ Unfollow Button

✅ Follow Status

✅ Followers Count

✅ Following Count

✅ Followers Page

✅ Following Page

✅ Followers List

✅ Following List

✅ React Query Integration

✅ Profile Integration

✅ TypeScript Types

✅ Service Layer

---

# Future Enhancements (V2)

Planned Features:

* Suggested Users
* Mutual Followers
* Follow Notifications
* Infinite Scroll
* Follow Recommendations
* Optimistic Updates
* Real-time Follow Updates

---

# Conclusion

Follow System Frontend V1 telah selesai diimplementasikan dan terintegrasi dengan Profile System.

Modul telah siap digunakan sebagai fondasi untuk Feed System, Notification System, Search System, Explore System, dan Social Graph pada platform Yumedia.

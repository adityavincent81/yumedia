# STORY SYSTEM BACKEND

## Status

**Progress:** Backend Foundation Completed

Story System telah berhasil dirancang dan diimplementasikan sebagai modul terpisah yang mendukung story mirip Instagram / WhatsApp dengan pendekatan mutual-follow visibility dan kontrol privasi yang lebih fleksibel.

---

# Objectives

Menyediakan fitur Story yang:

* Berumur 24 jam
* Mendukung image, video, dan text story
* Mendukung viewer tracking
* Mendukung story comments
* Mendukung story replies
* Mendukung visibility control
* Terintegrasi dengan Cloudinary
* Terintegrasi dengan Follow System

---

# Architecture

```text
src
│
├── constants
│   └── story.constants.js
│
├── models
│   ├── Story.js
│   ├── StoryView.js
│   └── StoryComment.js
│
├── repositories
│   ├── story.repository.js
│   ├── storyView.repository.js
│   └── storyComment.repository.js
│
├── services
│   └── story
│       └── story.service.js
│
├── controllers
│   └── story.controller.js
│
├── validators
│   └── story.validator.js
│
├── routes
│   └── story.routes.js
│
└── utils
    └── storyVisibility.js
```

---

# Models

## Story

Menyimpan data story utama.

### Fields

```js
author
type
media
text
backgroundColor
visibility
audienceUsers
viewsCount
commentsCount
expiresAt
createdAt
updatedAt
```

### Supported Types

```text
image
video
text
```

### Supported Visibility

```text
followers
followers_except
only_share_with
only_me
```

---

## StoryView

Menyimpan data viewer story.

### Fields

```js
story
viewer
createdAt
```

### Features

* Unique viewer per story
* Prevent duplicate views
* Story analytics

---

## StoryComment

Menyimpan comment dan reply story.

### Fields

```js
story
author
content
parentComment
repliesCount
isDeleted
createdAt
updatedAt
```

### Features

* Nested replies
* Soft delete
* Counter support

---

# Story Visibility System

File:

```text
src/utils/storyVisibility.js
```

## followers

Story hanya dapat dilihat apabila:

```text
A follow B
dan
B follow A
```

(mutual follow)

---

## followers_except

Semua mutual followers dapat melihat kecuali user tertentu.

Contoh:

```text
Followers:
A
B
C
D

Excluded:
C
```

Yang dapat melihat:

```text
A
B
D
```

---

## only_share_with

Story hanya dapat dilihat user yang dipilih.

Contoh:

```text
Selected:
A
D
E
```

Maka hanya:

```text
A
D
E
```

yang dapat melihat.

---

## only_me

Story hanya dapat dilihat pembuat story.

---

# Cloudinary Integration

Folder:

```text
yumedia/stories
```

Upload:

```js
cloudinaryService.uploadMedia()
```

Delete:

```js
cloudinaryService.deleteMedia()
```

Supported:

```text
Image
Video
```

---

# Repository Layer

## story.repository.js

Features:

```text
Create Story
Find Story
Delete Story
Update Story
Feed Stories
Author Stories
Counters
```

---

## storyView.repository.js

Features:

```text
Create View
Viewer Exists
Viewers List
Viewed Story IDs
Delete Story Views
```

---

## storyComment.repository.js

Features:

```text
Create Comment
Create Reply
Get Comments
Get Replies
Soft Delete
Delete Story Comments
Reply Counter
```

---

# Service Layer

## Story CRUD

Implemented:

```text
createStory()
updateStory()
deleteStory()
getStoryById()
```

---

## Feed

Implemented:

```text
getStoryFeed()
```

Features:

* Mutual follow filtering
* Visibility filtering
* Seen / unseen detection
* Author grouping

---

## Story Views

Implemented:

```text
markStoryViewed()
getStoryViewers()
```

Features:

* One view per user
* View analytics
* Viewer list

---

## Story Comments

Implemented:

```text
createComment()
createReply()
getComments()
getReplies()
deleteComment()
```

Features:

* Nested replies
* Soft delete
* Counter updates

---

# Controller Layer

Implemented:

```text
createStory
updateStory
deleteStory
getStoryById

getStoryFeed

markStoryViewed
getStoryViewers

createComment
createReply
getComments
getReplies
deleteComment
```

---

# Validation Layer

Technology:

```text
Zod
```

Implemented:

```text
createStorySchema
updateStorySchema

createStoryCommentSchema
createStoryReplySchema

storyParamsSchema
commentParamsSchema

storyQuerySchema
```

---

# Routes

Base Route

```text
/api/stories
```

Endpoints

```text
GET    /feed

POST   /

GET    /:storyId

PATCH  /:storyId

DELETE /:storyId

POST   /:storyId/view

GET    /:storyId/viewers

GET    /:storyId/comments

POST   /:storyId/comments

GET    /comments/:commentId/replies

POST   /comments/:commentId/replies

DELETE /comments/:commentId
```

---

# Business Rules

## Story Lifetime

```text
24 Hours
```

Automatic expiration using:

```js
expiresAt
```

---

## Viewer Rule

User hanya dihitung sekali per story.

---

## Comment Rule

User harus memiliki akses melihat story sebelum dapat memberikan komentar.

---

## Reply Rule

Reply hanya dapat dibuat pada comment yang valid.

---

## Delete Comment Rule

Comment dapat dihapus oleh:

```text
Comment Owner
atau
Story Owner
```

---

# Future Roadmap

## Phase 2

Close Friends Story

```text
close_friends
```

---

## Phase 3

Story Reactions

```text
❤️
🔥
😂
😮
👏
```

---

## Phase 4

Story Mention

```text
@username
```

---

## Phase 5

Story Share To Chat

Integrasi dengan Message System.

---

## Phase 6

Story Archive

Menyimpan story setelah 24 jam berakhir.

---

# Current Status

```text
Story Backend Foundation : COMPLETE

Models           ✅
Repositories     ✅
Services         ✅
Controllers      ✅
Validators       ✅
Routes           ✅
Cloudinary       ✅
Visibility       ✅
Comments         ✅
Replies          ✅
Views            ✅

Frontend Story Ring        ⏳
Frontend Story Viewer      ⏳
Story Archive              ⏳
Story Reactions            ⏳
Story Share To Chat        ⏳
```

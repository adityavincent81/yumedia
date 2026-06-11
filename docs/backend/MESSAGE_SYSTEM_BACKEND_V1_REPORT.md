# MESSAGE_SYSTEM_BACKEND_V1_REPORT.md

## Overview

Message System V1 merupakan fondasi komunikasi realtime untuk Yumedia yang mendukung direct messaging antar user, media sharing, post sharing, story sharing, read status, dan realtime communication menggunakan Socket.IO.

Status:

```text
MESSAGE_SYSTEM_BACKEND_V1_COMPLETE
```

---

# Features

## Conversation System

### Create Conversation

Membuat percakapan baru antara dua user.

Behavior:

* Jika conversation sudah ada → return existing conversation
* Jika belum ada → create conversation baru

### Get My Conversations

Mengambil seluruh daftar conversation user.

Support:

* Pagination
* Last message preview
* Last message sender
* Last activity timestamp

### Get Conversation Detail

Mengambil detail conversation tertentu.

Validation:

* User harus menjadi participant conversation

---

# Message System

## Send Message

Support:

```text
text
image
video
file
audio
story
post
```

### Text Message

Mengirim pesan teks biasa.

### Image Message

Mengirim gambar melalui Cloudinary.

### Video Message

Mengirim video melalui Cloudinary.

### File Message

Mengirim dokumen atau file.

### Audio Message

Mengirim voice message.

### Story Share

Membagikan story ke dalam chat.

### Post Share

Membagikan post ke dalam chat.

---

# Read Status

## Mark Conversation Read

Ketika user membuka conversation:

```text
isRead = true
readAt = current date
```

Akan menandai seluruh pesan yang belum dibaca menjadi terbaca.

---

# Delete Message

## Delete For Me

Menghapus pesan hanya untuk user tertentu.

Behavior:

```text
deletedFor[]
```

Pesan tetap ada untuk participant lain.

---

# Socket.IO Features

## New Message

Realtime event ketika pesan baru dikirim.

Event:

```text
new_message
```

---

## Typing Indicator

Realtime typing status.

Events:

```text
typing_start
typing_stop
typing
```

---

## Read Status

Realtime read receipt.

Event:

```text
message_read
```

---

## Conversation Update

Realtime update sidebar conversation.

Event:

```text
conversation_updated
```

---

# Backend Structure

```text
backend/src

├── constants
│   └── message.constants.js
│
├── models
│   ├── Conversation.js
│   └── Message.js
│
├── repositories
│   ├── conversation.repository.js
│   └── message.repository.js
│
├── services
│   └── message
│       └── message.service.js
│
├── controllers
│   └── message.controller.js
│
├── validators
│   └── message.validator.js
│
├── routes
│   └── message.routes.js
│
├── sockets
│   ├── message.socket.js
│   └── index.js
│
└── utils
```

---

# Models

## Conversation

Fields:

```js
participants
lastMessage
lastMessageSender
lastMessageAt
```

Purpose:

* Personal chat room
* Conversation listing
* Last activity tracking

---

## Message

Fields:

```js
conversation
sender
type
text
media
story
post
replyTo
isRead
readAt
deletedFor
isDeleted
```

Purpose:

* Store all message types
* Read tracking
* Future reply support

---

# API Endpoints

## Conversation

```http
POST /messages/conversations
```

Create conversation.

---

```http
GET /messages/conversations
```

Get user conversations.

---

```http
GET /messages/conversations/:conversationId
```

Get conversation detail.

---

## Messages

```http
GET /messages/conversations/:conversationId/messages
```

Get messages.

---

```http
POST /messages/conversations/:conversationId/messages
```

Send message.

---

```http
PATCH /messages/conversations/:conversationId/read
```

Mark conversation as read.

---

```http
DELETE /messages/:messageId
```

Delete message for current user.

---

# Cloudinary Integration

Used for:

```text
Image Message
Video Message
Audio Message
File Message
```

Service:

```js
cloudinaryService.uploadMedia()
cloudinaryService.deleteMedia()
```

---

# Security

Implemented:

* Authentication required
* Participant validation
* Conversation ownership validation
* Post existence validation
* Story existence validation

---

# Realtime Events

```text
new_message

typing_start
typing_stop
typing

message_read

conversation_updated
```

---

# Future Roadmap

## Message System V2

Planned:

```text
Reply Message
Forward Message
Delete For Everyone
Voice Note Improvements
Message Search
```

---

## Message System V3

Planned:

```text
Group Chat
Message Reactions
Pinned Messages
Mentions
Polls
Shared Files Management
```

---

# Completion Status

```text
Models                ✅
Repositories          ✅
Services              ✅
Controllers           ✅
Validators            ✅
Routes                ✅
Sockets               ✅
Realtime Foundation   ✅

MESSAGE_SYSTEM_BACKEND_V1_COMPLETE
```

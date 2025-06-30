# 📚 Study Tracker

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)

A **full-stack study tracking app** built with Next.js, TypeScript, MongoDB & Tailwind CSS.  
Track your subjects, exams, and get smart reminders.

---

## ✨ Features

-  User authentication & session management
-  add, edit, delete subjects & exams
-  Upcoming vs finished exams with validation
-  Smart reminders for outdated exams
-  Beautiful responsive UI
-  Toast notifications for user feedback
-  Dashboard & progress statistics _(planned)_

---

##  Tech Stack

- Next.js (App Router)
- TypeScript
- MongoDB + Mongoose
- Tailwind CSS
- Axios
- Lucide / React Icons
- React Toastify
- ide-vscode


---

##  Folder Structure

```plaintext
/app
 ├── api                # API routes (auth, exams, subjects)
 ├── components         # Reusable UI components
 ├── (auth)             # Login & signup pages
 ├── lib                # Session & helper utilities
/backend
 ├── controllers        # API controllers
 ├── models             # Mongoose schemas
 ├── services           # Business logic & validation
 ├── lib                #connecting to db
/styles                 # Tailwind & global CSS
/public                 # Static assets

---
```
## Installation

git clone https://github.com/Praneesha18/study-tracker-app.git
cd study-tracker-app
npm install

---

## environment variables

MONGO_URL=your-mongodb-url
NEXTAUTH_SECRET=your-secret-key

---

##  To Run Locally (Development)

npm run dev

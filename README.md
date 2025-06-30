# 📚 Study Tracker

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)

A **full-stack study tracking app** built with Next.js, TypeScript, MongoDB & Tailwind CSS.  
Track your subjects, exams, assignments and get smart reminders.

---

## ✨ Features

- ✅ User authentication & session management
- ✅ Add, edit, delete subjects & exams
- ✅ Upcoming vs finished exams with validation
- ✅ Smart reminders for outdated exams
- ✅ Beautiful responsive UI
- ✅ Toast notifications for user feedback
- 📊 Dashboard & progress statistics _(planned)_

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- MongoDB + Mongoose
- Tailwind CSS
- Axios
- Lucide / React Icons
- React Toastify

---

## 📦 Folder Structure

```plaintext
/app
 ├── api                # API routes (auth, exams, subjects)
 ├── components         # Reusable UI components
 ├── (auth)             # Login & signup pages
 ├── (dashboard)        # Protected pages (subjects, exams)
 ├── lib                # Session & helper utilities
/backend
 ├── controllers        # API controllers
 ├── models             # Mongoose schemas
 ├── services           # Business logic & validation
/styles                 # Tailwind & global CSS
/public                 # Static assets

git clone https://github.com/your-username/study-tracker.git
cd study-tracker
npm install

MONGO_URL=your-mongodb-url
NEXTAUTH_SECRET=your-secret-key

npm run dev

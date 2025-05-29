# 📌 Pinterest Clone

A full-stack Pinterest-inspired application built using **React**, **NestJS**, **PostgreSQL**, and **Prisma**. The project supports user authentication, post management with image uploads, and activity-based post recommendations.

## 🧩 Tech Stack

### 🔧 Monorepo Setup
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Monorepo Structure**:
  ```
  pinterest-clone/
  ├── client/    # React + Typescript + Tailwind + Material UI
  └── server/    # NestJS + Prisma + Supabase
  ```

### 📦 Client (Frontend)
- **Framework**: React
- **Styling**: Tailwind CSS + Material UI
- **State Management**: React Context / Local state
- **Routing**: React Router

### 🚀 Server (Backend)
- **Framework**: NestJS
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: JWT or Supabase Auth
- **Image Upload**: Multer + Cloudinary
- **API Documentation**: Swagger
- **Recommendation Logic**: Custom algorithms based on user activity

---

## ✨ Features

- 🔐 **Authentication**
  - Sign up / Sign in
  - Secure session management
  - Profile editing

- 📌 **Posts**
  - Create, read, update, delete (CRUD) personal posts
  - View other users' posts
  - Like, save, interact with posts
  - Upload images using **Multer** and store them on **Cloudinary**

- 🤖 **Recommendations**
  - Post suggestions based on user activity (likes, views, etc.)

- 📄 **API Documentation**
  - Auto-generated Swagger UI available at `/api/docs` on the server

---

## 🚀 Getting Started

### Prerequisites
- [pnpm](https://pnpm.io/)
- Node.js >= 18
- Supabase project
- Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pinterest-clone.git
cd pinterest-clone
pnpm install
```

### 2. Environment Variables

Create `.env` file for `server/` with the following:

#### server/.env
```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=example@gmail.com
MAIL_PASSWORD=your_mail_password
```

### 3. Database Setup

```bash
cd server
pnpm prisma generate
pnpm prisma migrate dev --name init
```

### 4. Run the App

```bash
# In two separate terminals or use concurrently
pnpm --filter client dev
pnpm --filter server start:dev
```

---

## 📁 Folder Structure

```
pinterest-clone/
├── client/       # React frontend
│   ├── public/
│   ├── src/
│   └── ...
├── server/       # NestJS backend
│   ├── src/
│   │   ├── auth/
│   │   ├── posts/
│   │   ├── uploads/         # Multer config
│   │   └── main.ts
│   ├── prisma/
│   └── ...
├── .gitignore
├── pnpm-workspace.yaml
└── README.md
```

---

## 📌 Todo / Coming Soon

- 💬 Comments on posts
- 🔎 Search functionality for user profile
- 🏷️ Tags and categories
- 📊 Activity analytics dashboard
- 🌐 Deployment via Vercel (frontend) and Railway/Fly.io (backend)

---

## 📜 License

[MIT](LICENSE)


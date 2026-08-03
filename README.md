# 🏕️ GearUp - Sports & Outdoor Gear Rental Platform

**GearUp** is a modern, full-stack web application that connects outdoor enthusiasts with sports and equipment rental providers. Rent camping gear, sports equipment, and outdoor adventure tools with just a few clicks.

![GearUp Site Preview](https://gearup-client-lovat.vercel.app/login)

### - Git Repository Clone

https://github.com/Rayhan-abdullha/gearup-client

- cd gearup
- npm install
- npm run dev

## ✨ Features

### 👤 Customer Experience

- 🔍 **Smart Search & Filters** - Find gear by category, price range, brand, and availability dates
- 📅 **Interactive Booking** - Real-time availability calendar with date picker
- 🛒 **Seamless Checkout** - Stripe/SSLCommerz payment integration
- 📊 **Personal Dashboard** - Track orders, payment history, and leave reviews
- 🔔 **Real-time Updates** - Toast notifications for all actions

### 🏪 Provider Tools

- 📦 **Inventory Management** - Add, edit, and remove gear listings with image upload
- 📋 **Order Management** - View and update order statuses (Confirm → Picked Up → Returned)
- 📈 **Dashboard Analytics** - Overview of total gear, active rentals, and pending orders
- ⚡ **Optimistic Updates** - Instant UI feedback without page reloads

### 🛡️ Admin Controls

- 👥 **User Management** - View all users with suspend/activate actions
- 📊 **Platform Analytics** - Global statistics and platform health metrics
- 🔍 **Content Moderation** - Inspect all gear listings and rental orders
- 🎯 **Role-Based Access** - Secure route protection with Next.js Middleware

## 🛠️ Tech Stack

| Category               | Technologies                           |
| ---------------------- | -------------------------------------- |
| **Frontend**           | Next.js 16, TypeScript                 |
| **Styling**            | Tailwind CSS, Framer Motion, shadcn/ui |
| **Forms & Validation** | React Hook Form, Zod                   |
| **Authentication**     | NextAuth.js (JWT)                      |
| **Payments**           | Stripe / SSLCommerz                    |
| **Date Handling**      | date-fns, react-day-picker             |
| **Icons**              | Lucide React                           |

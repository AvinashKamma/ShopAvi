# ShopAvi 🛒

A full-stack e-commerce web application built with the MERN stack. Users can browse products, add them to cart, place orders and make payments. Admins can manage products, categories and orders from a dedicated dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| File Upload | Cloudinary |
| Payments | Razorpay / Stripe |

---

## Features

**Customer**
- Register and login with JWT authentication
- Browse, search and filter products
- Add to cart and manage quantities
- Guest cart merges on login
- Checkout with address and payment
- View order history and track status
- Leave reviews on purchased products

**Admin**
- Add, edit and delete products with image upload
- Manage product categories
- View and update all order statuses
- Dashboard with sales stats and low stock alerts

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Cloudinary account
- Razorpay or Stripe account

### Installation

1. Clone the repository
```bash
git clone https://github.com/AvinashKamma/ShopAvi.git
cd ShopAvi
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a `.env` file in the `backend` folder
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

4. Run the backend
```bash
npm run dev
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get token |
| GET | /api/auth/me | Get logged-in user |
| GET | /api/products | List all products |
| POST | /api/products | Create product (admin) |
| GET | /api/cart | Get user cart |
| POST | /api/orders | Place an order |

---

## Environment Variables

| Variable | Description |
|---|---|
| PORT | Server port (8000) |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT signing |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| RAZORPAY_KEY_ID | Razorpay key ID |
| RAZORPAY_KEY_SECRET | Razorpay key secret |

---

## Project Status

🚧 Currently in development — Week 3 of 5

---

*Built by Avinash Kamma*
```

---

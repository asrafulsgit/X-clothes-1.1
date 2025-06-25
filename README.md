# 🛍️ Clothing E-commerce Application

## ✅ Project Overview

A full-stack eCommerce application for a clothing store. It allows users to browse products, add to cart, make payments, and track orders. Admins can manage products, orders, and users.

---

## ✨ Features

- User authentication (Email/Password + Google)
- Browse, filter, and search clothing products
- Wishlist (Favorites)
- Add to cart & checkout
- SSLCOMMERZ payment integration
- Order history & tracking
- Admin dashboard
- Mobile responsive UI

---

## 🛠 Tech Stack

### Frontend

- React.js  
- Tailwind CSS  
- Axios  
- React Router  
- Firebase (Google auth)

### Backend

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT  
- express-validator (Validation)  
- cron jobs (Scheduled tasks)

---


## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/clothing-app.git

# Navigate to the folders
cd Backend
npm install

cd ../Frond-End
npm install

# Run the backend
npm start

# Run the frontend
npm run dev
```


## 🔐 Environment Variables

### Backend (.env):
```env
PORT ="8000"
NODE_ENV = " "
JWT_ACCESS_TOEKN = " "
JWT_REFRESH_TOKEN =" "
AUTH_EMAIL =  " "
AUTH_PASSWORD = " "
CLOUD_NAME = " "
CLOUD_API_KEY = " "
CLOUD_API_SECRET =  " "
FIREBASE_PROJECT_ID = " "
FIREBASE_PRIVATE_KEY = " "
FIREBASE_CLIENT_EMAIL = " "
STORE_ID =  "your_sslcommerz_store_id"
STORE_PASSWORD =  "your_sslcommerz_store_password"
SHIPPING_COST='150'
COUPON_CODE='asraful23'
COUPON_DISCOUNT='100'
```

### Frontend (.env):
```env
VITE_BACKEND_URL =" "
VITE_FRONTEND_URL =" "
VITE_FIREBASE_APIKEY = " "
VITE_FIREBASE_AUTHDOMAIN = " "
VITE_FIREBASE_PROJECTID = " "
VITE_FIREBASE_STORAGEBUCKET= " "
VITE_FIREBASE_MESSAGINGSENDERID = " "
VITE_FIREBASE_APPID = " "
VITE_FIREBASE_MEASUREMENTID = " "
VITE_PRODUCT_TEX = '7'
VITE_PRODUCT_DISCOUNT = '3'
```

## 📡 API Documentation

---

### 🔐 User & Admin Credentials APIs

- `POST /api/v1/register`  
  _Registers a new user_

- `POST /api/v1/auth/google`  
  _Google authentication_

- `POST /api/v1/login`  
  _Login a user_

- `GET /api/v1/access/token/refresh`  
  _Access token refresh_

- `GET /api/v1/admin-authentication`  
  _Admin authentication and login_

---

### 👤 User Profile APIs

- `GET /api/v1/user-personal-information`  
  _Get user profile information_

- `PUT /api/v1/user/information/update`  
  _Update user profile information_

- `PUT /api/v1/user-avater`  
  _Update user avatar_

- `POST /api/v1/user-new-address`  
  _Add new user address_

- `GET /api/v1/user-addresses`  
  _Get all user addresses_

- `PUT /api/v1/user-update-address/:addressId`  
  _Update a specific user address_

- `DELETE /api/v1/user-delete-address/:addressId`  
  _Delete a specific user address_

- `PUT /api/v1/user-manage-password`  
  _Update user password_

- `GET /api/v1/user-logout`  
  _Logout user_

---

### 🔑 Forgot Password APIs

- `POST /api/v1/forgot-password-email`  
  _Send password reset email_

- `POST /api/v1/forgot-password-email-verification`  
  _Verify email using code_

- `POST /api/v1/reset-password`  
  _Reset password after verification_

---

### 🛍️ Products APIs

#### Admin Endpoints

- `POST /api/v1/admin/add-product`  
  _Create new product_

- `GET /api/v1/admin/all-product`  
  _Get all products_

- `GET /api/v1/admin/products`  
  _Get paginated products_

- `GET /api/v1/admin/products/filter`  
  _Filter products_

- `GET /api/v1/admin/products/search`  
  _Search products_

- `DELETE /api/v1/admin/delete-product/:productId`  
  _Delete product by ID_

- `PUT /api/v1/admin/update-product`  
  _Update existing product_

#### Public/User Endpoints

- `POST /api/v1/get-product-by-subcategory`  
  _Get products by subcategory_

- `GET /api/v1/get-one-product/:productId`  
  _Get a single product_

- `POST /api/v1/get-product-by-categoris`  
  _Get products by category_

- `GET /api/v1/guest/new-arrivals`  
  _Get new arrivals_

- `GET /api/v1/guest/todays-deals`  
  _Get today's deals_

- `GET /api/v1/guest/flat-discount`  
  _Get flat discount products_

---

### 📦 Orders APIs

- `GET /api/v1/user/orders`  
  _Get user orders_

- `GET /api/v1/admin/orders`  
  _Get all user orders (Admin only)_

- `GET /api/v1/admin/orders/filter`  
  _Filter orders (Admin only)_

- `GET /api/v1/admin/orders/search`  
  _Search orders (Admin only)_

- `GET /api/v1/admin/order/:orderId`  
  _Get a single order (Admin only)_

- `PUT /api/v1/admin/order/:orderId`  
  _Update order status (Admin only)_

- `PUT /api/v1/user/order/cancel/:orderId`  
  _User cancels an order_

---

### 🛒 Cart APIs

- `POST /api/v1/add-to-cart`  
  _Add product to cart_

- `GET /api/v1/get-user-carts`  
  _Get all products in cart_

- `PUT /api/v1/update-cart-quantity/:productId`  
  _Update product quantity in cart_

- `GET /api/v1/cart/count`  
  _Get total number of cart items_

- `DELETE /api/v1/remove-cart-item/:productId`  
  _Remove product from cart_

---

### ❤️ Favourite Products APIs

- `POST /api/v1/add-to-favourite`  
  _Add product to favourite list_

- `GET /api/v1/get-to-favourite`  
  _Get all favourite products_

- `DELETE /api/v1/remove-from-favourite/:productId`  
  _Remove product from favourite_

- `GET /api/v1/favorite/count`  
  _Count total favourite products_

---


## 🔒 Authentication

- JWT used for secure sessions  
- Firebase used for Google OAuth  
- Protected routes for user/admin using middleware

---

## 🚀 Deployment

- **Frontend**: Netlify  
- **Backend**: Vercel  
- **Database**: MongoDB Atlas

---

## 🧩 Product Model (Mongoose Schema)

```js
const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  images: {
    type: [String],
    required: [true, 'At least one image is required'],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: 'Product must have at least one image'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  sizes: {
    type: [String],
    required: [true, 'Sizes are required'],
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      message: 'Invalid size'
    }
  },
  colors: {
    type: [String],
    required: [true, 'Colors are required'],
    validate: {
      validator: function (val) {
        return val.length > 0;
      },
      message: 'At least one color is required'
    }
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount must be 0 or more'],
    max: [100, 'Discount cannot exceed 100']
  },
  taxes: {
    type: Number,
    default: 0,
    min: [0, 'Tax must be 0 or more']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative']
  },
  category: {
    type: Number,
    required: [true, 'Category is required']
  },
  subcategory: {
    type: Number,
    required: [true, 'Subcategory is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description can be at most 1000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

productSchema.index({ createdAt: -1 });

const Product = mongoose.model('Product', productSchema);
```

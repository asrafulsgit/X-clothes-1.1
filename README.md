✅ Project Overview
A full-stack eCommerce application for a clothing store. It allows users to browse products, add to cart, make payments, and track orders. Admins can manage products, orders, and users.

✨ Features
User authentication (Email/Password + Google)

Browse, filter, and search clothing products

Wishlist (Favorites)

Add to cart & checkout

SSLCOMMERZ payment integration

Order history & tracking

Admin dashboard

Mobile responsive UI

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router 

Firebase (Google auth)

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT

express-validator (Validation)

cron job (Scheduled tasks)

📦 Installation & Setup
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


🔐 Environment Variables

Backend (.env):

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

Frontend (.env):

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


📡 API Documentation
api end points

user and admin creadentials apis

🔸 POST /api/v1/register
Registers a new user

🔸 POST /api/v1/auth/google
google authentication

🔸 POST /api/v1/login
login a user

🔸 get /api/v1/access/token/refresh
access token refresh

🔸 get /api/v1/admin-authentication
admin authentication and login

user profile apis

🔸 get /api/v1/user-personal-information
user profile information

🔸 put /api/v1/user/information/update
user profile information update

🔸 put /api/v1/user-avater
user profile avatar update

🔸 post /api/v1/user-new-address
add user address

🔸 get /api/v1/user-addresses
add user address

🔸 put /api/v1/user-update-address/:addressId
read user addresses

🔸 delete /api/v1/user-delete-address/:addressId
delete user address

🔸 put /api/v1/user-manage-password
update user password

🔸 get /api/v1/user-logout
logout user

forget password apis

🔸 post /api/v1/forgot-password-email
find user and send email

🔸 post /api/v1/forgot-password-email-verification
user email verification using verification code

🔸 post /api/v1/reset-password
after all verification change password

products apis 

🔸 post /api/v1/admin/add-product
create product(Admin only)
🔸 get /api/v1/admin/all-product
read  products(Admin only)
🔸 get /api/v1/admin/products
read products with pagination(Admin only)
🔸 get /api/v1/admin/products/filter
read products with filter(Admin only)
🔸 get /api/v1/admin/products/search
read products with search(Admin only)
🔸 delete /api/v1/admin/delete-product/:productId
delete product(Admin only)
🔸 put /api/v1/admin/update-product
update product product(Admin only)

🔸 post /api/v1/get-product-by-subcategory
get products with sub category
🔸 get /api/v1/get-one-product/:productId
get signle product 
🔸 post /api/v1/get-product-by-categoris
get products by category
🔸 get /api/v1/guest/new-arrivals
new arrivals products
🔸 get /api/v1/guest/todays-deals
todays deals products
🔸 get /api/v1/guest/flat-discount
flat discount products


orders apis 
🔸 get /api/v1/user/orders
read user orders
🔸 get /api/v1/admin/orders
read admin total orders from users(Admin Only)
🔸 get /api/v1/admin/orders/filter
read admin filter orders(Admin Only)
🔸 get /api/v1/admin/orders/search
read admin search orders(Admin Only)
🔸 get /api/v1/admin/order/:orderId
read admin single order(Admin Only)
🔸 put /api/v1/admin/order/:orderId
admin update order status(Admin Only)
🔸 put /api/v1/user/order/cancel/:orderId
user cencel order


add to cart apis
🔸 post /api/v1/add-to-cart
add product in cart 
🔸 get /api/v1/get-user-carts
read products in cart
🔸 put /api/v1/update-cart-quantity/:productId
update product quantity in cart
🔸 get /api/v1/cart/count
total products in cart
🔸 delete /api/v1/remove-cart-item/:productId
remove product from cart

favourite products apis
🔸 post /api/v1/add-to-favourite
add product in favourite
🔸 get /api/v1/get-to-favourite
read favourite products
🔸 delete /api/v1/remove-from-favourite/:productId
delete favourite product
🔸 get /api/v1/favorite/count
total favourite products



(If you want, I can generate a full API docs format for you.)

🔒 Authentication
JWT used for secure sessions

Firebase used for Google OAuth

Protected routes for user/admin using middleware

🚀 Deployment
You can include how to deploy to:

Frontend: Vercel / Netlify

Backend: Render / Railway / Heroku

Database: MongoDB Atlas

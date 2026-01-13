# 🍔 Food Delivery System API

A comprehensive Node.js/Express backend API for a food delivery service with robust authentication, role-based authorization, and full CRUD operations for restaurants, menus, and orders.

## ✨ Features

- **🔐 Secure Authentication** - JWT-based user registration, login, and role-based authorization (customer/admin)
- **🏪 Restaurant Management** - Complete CRUD operations for restaurants (admin only)
- **📋 Menu Management** - Add, view, update, and delete menu items (admin only)
- **📦 Order Processing** - Order placement with status tracking (pending → preparing → delivered)
- **👥 User Management** - User profile management and admin user controls
- **⚡ Performance Optimization** - Redis caching for frequently accessed data
- **🧪 Comprehensive Testing** - Unit and integration tests with Jest and Supertest
- **📚 API Documentation** - Complete Postman collection

## 🏗️ Project Structure

```
FOOD Delivery PROJECT/
├── config/                 # Database and environment configurations
│   ├── database.js
│   └── test-database.js
├── controllers/           # Route controllers
├── db/                   # Database migrations and seeders
│   └── migrations/
├── models/               # Sequelize data models
├── routes/               # Express route definitions
├── tests/               # Test suites
│   ├── integration/     # API integration tests
│   └── unit/            # Unit tests for components
├── utils/               # Helper functions and utilities
├── .sequelizerc         # Sequelize configuration
├── app.js               # Main application entry point
├── Food_Delivery_API_Collection.postman_collection.json  # Postman collection
├── jest.config.js       # Jest testing configuration
├── package.json         # Dependencies and scripts
└── package-lock.json
```

## 📦 Dependencies

### Runtime Dependencies
- **argon2**: ^0.44.0 - Password hashing
- **cors**: ^2.8.5 - Cross-origin resource sharing
- **express**: ^5.1.0 - Web framework
- **ioredis**: ^5.7.0 - Redis client
- **jsonwebtoken**: ^9.0.2 - JWT authentication
- **pg**: ^8.16.3 - PostgreSQL driver
- **pg-hstore**: ^2.3.4 - PostgreSQL hstore support
- **redis**: ^5.8.2 - Redis client
- **sequelize**: ^6.37.7 - ORM
- **sequelize-cli**: ^6.6.3 - Sequelize command line
- **sqlite3**: ^5.1.7 - SQLite database (for testing)

### Development Dependencies
- **dotenv**: ^17.2.2 - Environment variables
- **jest**: ^30.1.3 - Testing framework
- **supertest**: ^7.1.4 - HTTP assertion testing

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Redis server (for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Robel-S-Y/FOOD_Delivery_PROJECT
   cd "FOOD_Delivery_PROJECT"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DATABASE_URL=<your-postgresql-connection-string>
   JWT_SECRET=<your-jwt-secret-key>
   JWT_SECRET_REFRESH=<your-refresh-jwt-secret>
   REDIS_URL=<your-redis-connection-url>  # optional
   ```

4. **Database setup**
   ```bash
   # Run migrations
   npx sequelize-cli db:migrate
   

### Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The API will be available at `http://localhost:3000`

## 📋 API Endpoints

### Authentication & Users
- `POST /auth/register` - Register a new user (customer by default)
- `POST /auth/login` - Login and receive a JWT token
- `GET /users` - List all users (admin only)
- `GET /users/:id` - Get user details (admin or the same user)
- `PATCH /users/:id` - Update user info (admin or the same user)
- `DELETE /users/:id` - Delete a user (admin only)

### Restaurants
- `POST /restaurants` - Add a new restaurant (admin only)
- `GET /restaurants` - List all restaurants (cached)
- `GET /restaurants/:id` - Get details of a specific restaurant
- `PATCH /restaurants/:id` - Update restaurant info (admin only)
- `DELETE /restaurants/:id` - Remove a restaurant (admin only)

### Menu Items
- `POST /restaurants/:id/menu` - Add a new menu item to a restaurant (admin only)
- `GET /restaurants/:id/menu` - List all menu items for a restaurant
- `GET /menu/:id` - Get details of a specific menu item
- `PATCH /menu/:id` - Update menu item details (admin only)
- `DELETE /menu/:id` - Remove a menu item (admin only)

### Orders
- `POST /orders` - Place a new order (customer only)
- `GET /orders` - List all orders (admin sees all, customer sees their own)
- `GET /orders/:id` - View order details and status
- `PATCH /orders/:id/status` - Update order status (admin only)
- `DELETE /orders/:id` - Cancel an order (customer before delivery, or admin)

### Order Items
- `GET /orders/:id/items` - View all items in an order
- `PATCH /orders/:id/items/:itemId` - Update item quantity (customer, only if order pending)
- `DELETE /orders/:id/items/:itemId` - Remove an item from order (customer, only if order pending)

## 🧪 Testing

**Run unit tests:**
```bash
npm run test:user        # User-related tests
npm run test:orders      # Order-related tests
```

**Run integration tests:**
```bash
npm run test:updateOrderStatus          # Order status flow tests
npm run test:registeLoginPlaceOrder     # Full user journey tests
```

**Note:** This project uses ECMAScript modules (ESM) as indicated by `"type": "module"` in package.json, which requires the `--experimental-vm-modules` flag for Jest.

## 📚 API Documentation

### Interactive Documentation
- **Postman**: Import the collection from `Food_Delivery_API_Collection.postman_collection.json`

## ⚡ Caching & Performance

- Restaurant listings (`GET /restaurants`) are cached using Redis
- Cache expires after 60 seconds for optimal performance
- Redis connection is optional but recommended for production

## 🔧 Configuration Notes

- Ensure PostgreSQL and Redis (if using caching) are running before starting the application
- The system uses SQLite for testing to simplify the testing environment
- JWT tokens are set to expire after 1 hour (access) and 7 days (refresh) by default
- This project uses ECMAScript modules (ESM) format

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support or questions, please open an issue in the GitHub repository or contact the developer.

---

**Bon Appétit!** 🍕🥗🍣
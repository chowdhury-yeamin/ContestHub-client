# ContestHub - Contest Creation Platform

A modern, production-ready web application for managing creative contests. ContestHub allows users to create, discover, participate in, and manage contests across various categories including design, writing, business ideas, and gaming reviews.

## 🌐 Live Site

[Add your live site URL here after deployment]

## 📋 Features

- **User Authentication**: Secure login and registration with JWT tokens and Google Sign-in support
- **Role-Based Access Control**: Three user roles (Admin, Contest Creator, Normal User) with different permissions
- **Contest Management**: Create, edit, delete, and manage contests with approval workflow
- **Payment Integration**: Secure payment processing for contest registration (marked for backend integration)
- **Contest Participation**: Browse contests, register by paying entry fees, and submit tasks
- **Winner Declaration**: Contest creators can declare winners after deadline
- **Leaderboard**: Dynamic leaderboard showing users ranked by contest wins
- **User Dashboard**: Track participated contests, winning contests, and update profile with win percentage charts
- **Creator Dashboard**: Manage created contests, view submissions, and declare winners
- **Admin Dashboard**: Approve/reject contests, manage users, and change user roles
- **Dark/Light Theme**: Theme toggle with localStorage persistence
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop
- **Animations**: Smooth animations using Framer Motion
- **Form Validation**: All forms use react-hook-form with comprehensive validation
- **Data Fetching**: TanStack Query for efficient data fetching and caching
- **Sweet Alerts**: Beautiful toast notifications for all user actions
- **Pagination**: Pagination implemented on tables (10 items per page)
- **404 Page**: Custom error page for invalid routes
- **About & Contact Pages**: Additional meaningful routes for user engagement

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd ContestHub-client
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google Sign-in)
   - Enable Storage (for image uploads)
   - Copy your Firebase configuration

4. Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
```

**Note:** If you don't set Firebase environment variables, the app will use default values from `firebase.config.js`.

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable components (Navbar, Footer, etc.)
├── contexts/        # React contexts (Auth, Theme)
├── hooks/           # Custom hooks for data fetching
├── Layouts/         # Layout components
├── pages/           # Page components
│   ├── Home/       # Home page
│   ├── AllContests/ # All contests listing
│   ├── ContestDetails/ # Contest details page
│   ├── Dashboard/  # Dashboard pages (User, Creator, Admin)
│   ├── Leaderboard/ # Leaderboard page
│   ├── About/      # About page
│   ├── Contact/    # Contact page
│   ├── Login/      # Login page
│   └── Register/   # Registration page
├── routes/          # Route configuration
├── services/        # API service layer
└── utils/           # Utility functions and components
```

## 🔌 API Integration Notes

This application is built as a frontend-only application with mock data. All API endpoints are clearly marked with `TODO` comments. Here's where you need to integrate your backend:

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/google` - Google OAuth sign-in

### Contest Endpoints

- `GET /api/contests` - Get all approved contests
- `GET /api/contests/search?type=...` - Search contests by type
- `GET /api/contests/:id` - Get contest details
- `POST /api/contests` - Create contest (Creator/Admin, JWT required)
- `PUT /api/contests/:id` - Update contest (Creator/Admin, JWT required)
- `DELETE /api/contests/:id` - Delete contest (Creator/Admin, JWT required)
- `GET /api/contests/creator/my-contests` - Get creator's contests (JWT required)
- `GET /api/contests/:id/submissions` - Get contest submissions (Creator/Admin, JWT required)
- `POST /api/contests/:id/submit` - Submit task (User, JWT required)
- `POST /api/contests/:id/register` - Register for contest (User, JWT required)
- `POST /api/contests/:id/declare-winner` - Declare winner (Creator/Admin, JWT required)

### User Endpoints

- `GET /api/users/profile` - Get user profile (JWT required)
- `PUT /api/users/profile` - Update user profile (JWT required)
- `GET /api/users/participated` - Get user's participated contests (JWT required)
- `GET /api/users/winnings` - Get user's winning contests (JWT required)
- `GET /api/users/leaderboard` - Get leaderboard

### Admin Endpoints

- `GET /api/admin/users` - Get all users (Admin, JWT required)
- `PUT /api/admin/users/:id/role` - Change user role (Admin, JWT required)
- `GET /api/admin/contests` - Get all contests (Admin, JWT required)
- `PUT /api/admin/contests/:id/approve` - Approve contest (Admin, JWT required)
- `PUT /api/admin/contests/:id/reject` - Reject contest (Admin, JWT required)
- `DELETE /api/admin/contests/:id` - Delete contest (Admin, JWT required)

### Payment Endpoints

- `POST /api/payment/create-intent` - Create payment intent (JWT required)
- `POST /api/payment/verify` - Verify payment (JWT required)

### Contact Endpoint

- `POST /api/contact` - Send contact message

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here

# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

**Note:** If you don't set Firebase environment variables, the app will use default values from `firebase.config.js`. For production, update all values to your deployed services.

## 🎨 Styling

The application uses:

- **Tailwind CSS** for utility-first styling
- **DaisyUI** for component library
- **Framer Motion** for animations

## 📦 Key Dependencies

- React 19.2.0
- React Router DOM 7.10.1
- Firebase - Authentication and Storage
- TanStack Query (React Query) - Data fetching
- React Hook Form - Form management
- SweetAlert2 - Toast notifications
- Axios - HTTP client
- React DatePicker - Date selection
- Framer Motion - Animations
- Recharts - Charts and graphs

## 🧪 Testing

To run the linter:

```bash
npm run lint
```

## 🚢 Deployment

### Client Deployment (Firebase/Netlify/Vercel)

1. Build the project:

```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

3. Update environment variables in your hosting platform

### Server Deployment

Deploy your backend server to Vercel or your preferred hosting platform.

## 📝 Git Commits

This project includes meaningful Git commits following best practices:

- Feature additions
- Bug fixes
- UI improvements
- Code refactoring
- Documentation updates

## 👥 User Roles

### Admin

- Approve/reject contests
- Change user roles
- Delete any contest
- Manage all users

### Contest Creator

- Create new contests
- Edit/delete own contests (before approval)
- View submissions for own contests
- Declare winners after deadline
- All normal user features

### Normal User

- Browse and search contests
- Register for contests (after payment)
- Submit tasks
- View participated and winning contests
- Update profile

## 🔒 Security Notes

- Firebase Authentication for secure user authentication
- JWT tokens from Firebase for backend API authentication
- Role-based access control implemented
- API interceptors handle token refresh and error handling
- Environment variables used for sensitive Firebase credentials
- Firebase Storage for secure image uploads

## 📄 License

[Add your license here]

## 👨‍💻 Developer Notes

- All API calls are marked with `TODO` comments indicating where backend integration is needed
- Mock data is used throughout for demonstration purposes
- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Payment integration is simulated - replace with actual payment gateway (Stripe, PayPal, etc.)

## 🎯 Future Enhancements

- Email verification
- Real-time notifications
- Advanced search and filters
- Contest categories and tags
- User reviews and ratings
- Social sharing features
- Package system for creators

---

Built with ❤️ using React and modern web technologies

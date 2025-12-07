# API Integration Guide

This document lists all the places where you need to replace mock data with actual API calls.

## 🔍 How to Find API Integration Points

All API integration points are marked with `TODO` comments in the code. Search for `TODO` in the codebase to find all locations.

## 📍 Key Files to Update

### Authentication (`src/contexts/AuthContext.jsx`)
- **Line ~30**: `login()` function - Replace mock login with `POST /api/auth/login`
- **Line ~60**: `googleSignIn()` function - Replace with `POST /api/auth/google`
- **Line ~90**: `register()` function - Replace with `POST /api/auth/register`
- **Line ~130**: `updateUser()` function - Replace with `PUT /api/users/profile`

### Contests (`src/hooks/useContests.js`)
- **Line ~15**: `useContests()` - Replace with `GET /api/contests`
- **Line ~90**: `useSearchContests()` - Replace with `GET /api/contests/search?type=...`
- **Line ~140**: `useContest()` - Replace with `GET /api/contests/:id`
- **Line ~190**: `useCreateContest()` - Replace with `POST /api/contests`
- **Line ~210**: `useUpdateContest()` - Replace with `PUT /api/contests/:id`
- **Line ~230**: `useDeleteContest()` - Replace with `DELETE /api/contests/:id`
- **Line ~250**: `useRegisterContest()` - Replace with `POST /api/contests/:id/register`
- **Line ~270**: `useSubmitTask()` - Replace with `POST /api/contests/:id/submit`
- **Line ~290**: `useDeclareWinner()` - Replace with `POST /api/contests/:id/declare-winner`

### Users (`src/hooks/useUsers.js`)
- **Line ~10**: `useUserProfile()` - Replace with `GET /api/users/profile`
- **Line ~30**: `useParticipatedContests()` - Replace with `GET /api/users/participated`
- **Line ~50**: `useWinningContests()` - Replace with `GET /api/users/winnings`
- **Line ~70**: `useLeaderboard()` - Replace with `GET /api/users/leaderboard`
- **Line ~90**: `useUpdateProfile()` - Replace with `PUT /api/users/profile`

### Creator (`src/hooks/useCreator.js`)
- **Line ~7**: `useMyContests()` - Replace with `GET /api/contests/creator/my-contests`
- **Line ~41**: `useContestSubmissions()` - Replace with `GET /api/contests/:id/submissions`

### Admin (`src/hooks/useAdmin.js`)
- **Line ~7**: `useAllUsers()` - Replace with `GET /api/admin/users`
- **Line ~30**: `useChangeUserRole()` - Replace with `PUT /api/admin/users/:id/role`
- **Line ~50**: `useAdminContests()` - Replace with `GET /api/admin/contests`
- **Line ~70**: `useApproveContest()` - Replace with `PUT /api/admin/contests/:id/approve`
- **Line ~90**: `useRejectContest()` - Replace with `PUT /api/admin/contests/:id/reject`
- **Line ~110**: `useAdminDeleteContest()` - Replace with `DELETE /api/admin/contests/:id`

### Contact (`src/pages/Contact/Contact.jsx`)
- **Line ~20**: `onSubmit()` function - Replace with `POST /api/contact`

## 🔐 JWT Token Handling

JWT tokens are automatically added to all API requests via the axios interceptor in `src/services/api.js`. Make sure your backend:

1. Expects tokens in the `Authorization` header: `Bearer <token>`
2. Returns 401 status when token is invalid/expired
3. The interceptor will automatically redirect to login on 401

## 💳 Payment Integration

Payment integration is currently simulated in `src/pages/ContestDetails/ContestDetails.jsx` (line ~60). Replace with:

1. Create payment intent: `POST /api/payment/create-intent`
2. Process payment through your payment gateway (Stripe, PayPal, etc.)
3. Verify payment: `POST /api/payment/verify`
4. Register user for contest: `POST /api/contests/:id/register`

## 📝 Request/Response Formats

### Login Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response
```json
{
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "photoURL": "https://...",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### Create Contest Request
```json
{
  "name": "Contest Name",
  "image": "https://...",
  "description": "Contest description",
  "taskInstruction": "Task instructions",
  "price": 5.00,
  "prizeMoney": 500.00,
  "contestType": "Image Design",
  "deadline": "2025-12-31T23:59:59.000Z"
}
```

### Register for Contest Request
```json
{
  "amount": 5.00,
  "method": "card",
  "paymentIntentId": "pi_..."
}
```

### Submit Task Request
```json
{
  "submission": "https://example.com/submission.pdf"
}
```

## 🚨 Error Handling

All API calls should handle errors appropriately. The axios interceptor in `src/services/api.js` handles:
- 401 errors (redirects to login)
- Other errors (passed to component for handling)

Components use SweetAlert2 to show user-friendly error messages.

## 🔄 Data Refetching

TanStack Query automatically refetches data when:
- Component mounts
- Window regains focus (disabled by default)
- Query is invalidated after mutations

Use `queryClient.invalidateQueries()` after mutations to refresh related data.

## 📦 Environment Variables

Set `VITE_API_URL` in your `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

For production, use your deployed backend URL.


# Authentication Flow

## Overview

The app now implements a login-first authentication flow with the following structure:

## File Structure

```
app/
├── index.tsx              # Root redirect (checks auth state)
├── login.tsx              # Login screen
├── _layout.tsx            # Root layout with AuthProvider
└── (tabs)/
    ├── _layout.tsx        # Tab navigation
    └── index.tsx          # Dashboard (protected)

contexts/
└── auth-context.tsx       # Authentication context and provider
```

## Flow

1. App starts at `app/index.tsx`
2. Checks authentication state via `useAuth()`
3. Redirects to `/login` if not authenticated
4. Redirects to `/(tabs)` if authenticated
5. After successful login, navigates to dashboard
6. Dashboard shows logout button in header

## Features

### Login Screen (`app/login.tsx`)
- Email/password input fields with icons
- Password visibility toggle
- Loading state during authentication
- Form validation
- Social login buttons (Google, Apple) - UI only
- Responsive design matching the provided HTML template

### Authentication Context (`contexts/auth-context.tsx`)
- Manages user state
- Provides `login()` and `logout()` methods
- Exposes `isAuthenticated` boolean
- Currently uses mock authentication (TODO: connect to real API)

### Dashboard Updates (`app/(tabs)/index.tsx`)
- Uses `useAuth()` to get user info
- Displays user name from auth context
- Logout button in header with confirmation dialog
- Redirects to login on logout

## TODO

- [ ] Connect to real authentication API
- [ ] Implement token storage (AsyncStorage)
- [ ] Add token refresh logic
- [ ] Implement social login (Google, Apple)
- [ ] Add "Forgot Password" functionality
- [ ] Add "Sign Up" screen
- [ ] Add protected route wrapper
- [ ] Persist authentication state across app restarts

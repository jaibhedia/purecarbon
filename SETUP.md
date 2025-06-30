# PureCarbon Authentication Setup Guide

## Database Setup with Render PostgreSQL

### 1. Create a PostgreSQL Database on Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" and select "PostgreSQL"
3. Configure your database:
   - Name: `purecarbon-db` (or your preferred name)
   - Database: `purecarbon`
   - User: `purecarbon_user` (or your preferred username)
   - Region: Choose the closest to your users
   - PostgreSQL Version: 14 or later
   - Plan: Start with the free plan for development

4. Click "Create Database"

### 2. Get Database Connection Details

Once your database is created, you'll find the connection details in the database dashboard:

- **External Database URL**: This is what you'll use in your application
- **Internal Database URL**: For connecting from other Render services
- **Connection Parameters**: Individual host, port, database name, username, password

### 3. Set Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the `.env.local` file with your database connection string:
   ```
   DATABASE_URL=postgresql://username:password@your-database-hostname:5432/your-database-name
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

   Replace the connection string with the External Database URL from Render.

### 4. Install Dependencies

The required dependencies are already included in the project. If you need to install them manually:

```bash
npm install bcryptjs @types/bcryptjs pg @types/pg
```

### 5. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000`
3. Click "Start Free Trial" to access the sign-up page
4. Create a test account to verify the database connection

### 6. Database Schema

The database table will be created automatically when you first run the application. The schema includes:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Features Included

- **Sign Up**: Create new user accounts with email/password
- **Sign In**: Authenticate existing users
- **Password Security**: Passwords are hashed using bcrypt with 12 salt rounds
- **Form Validation**: Client-side validation for email format and password strength
- **Error Handling**: Proper error messages for various scenarios
- **Responsive Design**: Works on desktop and mobile devices
- **Session Management**: Basic session handling with HTTP-only cookies

### 8. Security Features

- Passwords are hashed with bcrypt (12 salt rounds)
- Email validation with regex
- Password strength requirements:
  - At least 8 characters
  - Contains uppercase letter
  - Contains lowercase letter
  - Contains number
  - Contains special character
- SQL injection protection with parameterized queries
- HTTP-only cookies for session management

### 9. API Endpoints

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Authenticate user
- `POST /api/auth/logout` - Logout user

### 10. Troubleshooting

#### Database Connection Issues
- Verify your DATABASE_URL is correct
- Check that your Render database is running
- Ensure your IP is whitelisted (Render allows all IPs by default)

#### Environment Variables
- Make sure `.env.local` is in your project root
- Restart your development server after changing environment variables
- Check that the file is not committed to git (it should be in .gitignore)

#### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear Next.js cache: `rm -rf .next`
- Check TypeScript errors: `npm run lint`

### 11. Deployment

When deploying to production:

1. Set environment variables in your hosting platform
2. Use the production database URL
3. Set `NODE_ENV=production`
4. Generate a secure JWT secret for production

### 12. Next Steps

- Implement JWT tokens for better session management
- Add email verification
- Implement password reset functionality
- Add OAuth providers (Google, GitHub, etc.)
- Implement role-based access control
- Add audit logging

## Support

If you encounter any issues, check:
1. Database connection string format
2. Environment variables are set correctly
3. Database is running and accessible
4. All dependencies are installed

The authentication system is now ready to use with your PureCarbon application!

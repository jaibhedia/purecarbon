import bcrypt from 'bcryptjs';
import { pool, User } from './db';

export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Create new user
  static async createUser(userData: CreateUserData): Promise<Omit<User, 'password'>> {
    const client = await pool.connect();
    try {
      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM users WHERE email = $1',
        [userData.email]
      );

      if (existingUser.rows.length > 0) {
        throw new Error('User already exists with this email');
      }

      // Hash password
      const hashedPassword = await this.hashPassword(userData.password);

      // Create user
      const result = await client.query(
        'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at, updated_at',
        [userData.email, hashedPassword, userData.name]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Login user
  static async loginUser(loginData: LoginData): Promise<Omit<User, 'password'>> {
    const client = await pool.connect();
    try {
      // Find user by email
      const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [loginData.email]
      );

      if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
      }

      const user = result.rows[0];

      // Verify password
      const isValidPassword = await this.verifyPassword(loginData.password, user.password);
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Get user by ID
  static async getUserById(id: number): Promise<Omit<User, 'password'> | null> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1',
        [id]
      );

      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<Omit<User, 'password'> | null> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, email, name, created_at, updated_at FROM users WHERE email = $1',
        [email]
      );

      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}

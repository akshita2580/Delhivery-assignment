import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LogIn, UserPlus } from 'lucide-react';

/**
 * Login/Signup Page
 * Handles both login and signup functionality
 */
export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, signup } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Trim all fields
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const trimmedConfirmPassword = confirmPassword.trim();

      // Validation for Login
      if (isLogin) {
        if (!trimmedEmail) {
          setError('Email cannot be empty');
          setLoading(false);
          return;
        }
        if (!trimmedPassword) {
          setError('Password cannot be empty');
          setLoading(false);
          return;
        }

        const result = login(trimmedEmail, trimmedPassword);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.error || 'Authentication failed');
        }
      } else {
        // Validation for Signup
        if (!trimmedEmail) {
          setError('Email cannot be empty');
          setLoading(false);
          return;
        }
        if (!trimmedPassword) {
          setError('Password cannot be empty');
          setLoading(false);
          return;
        }
        if (!trimmedConfirmPassword) {
          setError('Confirm password cannot be empty');
          setLoading(false);
          return;
        }
        
        // Check password match before calling signup
        if (trimmedPassword !== trimmedConfirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = signup(trimmedEmail, trimmedPassword, trimmedConfirmPassword);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.error || 'Authentication failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            {isLogin ? (
              <LogIn className="w-8 h-8 text-primary-600" />
            ) : (
              <UserPlus className="w-8 h-8 text-primary-600" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};


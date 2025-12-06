import { create } from 'zustand';

/**
 * Auth Store - Manages authentication state
 * Uses Zustand for global state management
 * NO localStorage/sessionStorage as per requirements
 */
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (email, password) => {
    // Trim inputs
    const trimmedEmail = email?.trim() || '';
    const trimmedPassword = password?.trim() || '';
    
    // Simple validation and mock login
    if (trimmedEmail && trimmedPassword && trimmedPassword.length >= 6) {
      set({
        user: { email: trimmedEmail, name: trimmedEmail.split('@')[0] },
        isAuthenticated: true,
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  },
  
  signup: (email, password, confirmPassword) => {
    // Trim inputs
    const trimmedEmail = email?.trim() || '';
    const trimmedPassword = password?.trim() || '';
    const trimmedConfirmPassword = confirmPassword?.trim() || '';
    
    // Validation
    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      return { success: false, error: 'All fields are required' };
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    if (trimmedPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return { success: false, error: 'Invalid email format' };
    }
    
    set({
      user: { email: trimmedEmail, name: trimmedEmail.split('@')[0] },
      isAuthenticated: true,
    });
    return { success: true };
  },
  
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));


import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, SignInCredentials, SignUpCredentials } from '../types/auth';

// Sample user data for demo purposes
const DEMO_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
};

interface AuthContextType extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signIn = async (credentials: SignInCredentials): Promise<void> => {
    // In a real app, this would be an API call to authenticate the user
    // For demo purposes, we'll just simulate a successful login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          // Store user in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(DEMO_USER));
          
          setAuthState({
            user: DEMO_USER,
            isAuthenticated: true,
            isLoading: false,
          });
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const signUp = async (credentials: SignUpCredentials): Promise<void> => {
    // In a real app, this would be an API call to register a new user
    // For demo purposes, we'll just simulate a successful registration
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.name && 
          credentials.email && 
          credentials.password && 
          credentials.password === credentials.confirmPassword
        ) {
          const newUser: User = {
            id: '1',
            name: credentials.name,
            email: credentials.email,
          };
          
          // Store user in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(newUser));
          
          setAuthState({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
          resolve();
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const signOut = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
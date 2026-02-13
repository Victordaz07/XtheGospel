/**
 * Firebase Authentication Service
 * 
 * Handles user authentication and creates universal xTheGospel profiles.
 * No tracking, no analytics, no telemetry.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from 'firebase/auth';
import { getFirebaseAuth } from './firebaseApp';
import {
  createUniversalProfile,
  getOrCreateProfile,
  updateLastLogin,
} from './userService';
import { UniversalUserProfile, XtgAppKey, MemberStatus } from '../../types/user';

export interface AuthError {
  code: string;
  message: string;
}

export interface SignUpResult {
  user: User;
  profile: UniversalUserProfile;
}

export interface SignUpOptions {
  email: string;
  password: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  initialApp?: XtgAppKey;
  memberStatus?: MemberStatus;
}

/**
 * Sign up a new user and create their xTheGospel profile
 */
export async function signUp(options: SignUpOptions): Promise<SignUpResult>;
export async function signUp(email: string, password: string): Promise<UserCredential>;
export async function signUp(
  emailOrOptions: string | SignUpOptions,
  password?: string
): Promise<SignUpResult | UserCredential> {
  try {
    const auth = getFirebaseAuth();
    
    // Handle legacy signature (email, password)
    if (typeof emailOrOptions === 'string') {
      const credential = await createUserWithEmailAndPassword(auth, emailOrOptions, password!);
      
      // Create profile with defaults
      const profile = await createUniversalProfile(credential.user, {
        email: emailOrOptions,
        initialApp: 'member',
      });
      
      return { user: credential.user, profile };
    }
    
    // Handle new signature with options
    const {
      email,
      password: pwd,
      displayName,
      firstName,
      lastName,
      phone,
      initialApp = 'member',
      memberStatus,
    } = emailOrOptions;
    
    const credential = await createUserWithEmailAndPassword(auth, email, pwd);
    
    // Update Firebase display name if provided
    if (displayName || (firstName && lastName)) {
      const name = displayName || `${firstName} ${lastName}`.trim();
      await firebaseUpdateProfile(credential.user, { displayName: name });
    }
    
    // Create xTheGospel profile
    const profile = await createUniversalProfile(credential.user, {
      email,
      displayName: displayName || (firstName && lastName ? `${firstName} ${lastName}`.trim() : undefined),
      firstName,
      lastName,
      phone,
      initialApp,
      memberStatus,
    });
    
    console.log(`🎉 New user registered: ${profile.xthegospelId}`);
    
    return { user: credential.user, profile };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'Failed to sign up',
    } as AuthError;
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: User; profile: UniversalUserProfile | null }> {
  try {
    const auth = getFirebaseAuth();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get or create profile (for users created before this system)
    const profile = await getOrCreateProfile(credential.user);
    
    console.log(`👋 User signed in: ${profile?.xthegospelId || credential.user.uid}`);
    
    return { user: credential.user, profile };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'Failed to sign in',
    } as AuthError;
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<{ user: User; profile: UniversalUserProfile }> {
  try {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    
    const result = await signInWithPopup(auth, provider);
    
    // Get or create profile
    const profile = await getOrCreateProfile(result.user);
    
    console.log(`🔵 Google sign in: ${profile.xthegospelId}`);
    
    return { user: result.user, profile };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'Failed to sign in with Google',
    } as AuthError;
  }
}

/**
 * Sign in with Apple
 */
export async function signInWithApple(): Promise<{ user: User; profile: UniversalUserProfile }> {
  try {
    const auth = getFirebaseAuth();
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    
    const result = await signInWithPopup(auth, provider);
    
    // Get or create profile
    const profile = await getOrCreateProfile(result.user);
    
    console.log(`🍎 Apple sign in: ${profile.xthegospelId}`);
    
    return { user: result.user, profile };
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'Failed to sign in with Apple',
    } as AuthError;
  }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
    console.log('👋 User signed out');
  } catch (error: any) {
    throw {
      code: error.code || 'auth/unknown-error',
      message: error.message || 'Failed to sign out',
    } as AuthError;
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  try {
    const auth = getFirebaseAuth();
    return auth.currentUser;
  } catch {
    return null;
  }
}

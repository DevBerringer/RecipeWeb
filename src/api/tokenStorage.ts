/**
 * Token Storage Abstraction
 * 
 * Provides a unified interface for token storage that can be easily
 * adapted for different platforms (web, React Native, etc.)
 * 
 * Web: Uses sessionStorage for access tokens (cleared on tab close)
 *      Refresh tokens stored securely (consider HttpOnly cookies in future)
 * 
 * Mobile (Future): Can be swapped with:
 *   - React Native: @react-native-async-storage/async-storage or expo-secure-store
 *   - Native iOS: Keychain Services
 *   - Native Android: Keystore
 */

const ACCESS_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Token storage interface for platform abstraction
 */
interface TokenStorage {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  removeAccessToken(): void;
  
  getRefreshToken(): string | null;
  setRefreshToken(token: string): void;
  removeRefreshToken(): void;
  
  clearAllTokens(): void;
}

/**
 * Web implementation using sessionStorage
 * 
 * sessionStorage is cleared when the tab/window is closed,
 * reducing the window of vulnerability from XSS attacks.
 * For production, consider in-memory storage for maximum security.
 */
class WebTokenStorage implements TokenStorage {
  getAccessToken(): string | null {
    try {
      return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error reading access token:', error);
      return null;
    }
  }

  setAccessToken(token: string): void {
    try {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing access token:', error);
      throw error;
    }
  }

  removeAccessToken(): void {
    try {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  }

  getRefreshToken(): string | null {
    try {
      return sessionStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error reading refresh token:', error);
      return null;
    }
  }

  setRefreshToken(token: string): void {
    try {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing refresh token:', error);
      throw error;
    }
  }

  removeRefreshToken(): void {
    try {
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing refresh token:', error);
    }
  }

  clearAllTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

/**
 * Mobile implementation placeholder (React Native example)
 * 
 * Uncomment and adapt when implementing mobile app:
 * 
 * import * as SecureStore from 'expo-secure-store';
 * 
 * class MobileTokenStorage implements TokenStorage {
 *   async getAccessToken(): Promise<string | null> {
 *     try {
 *       return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
 *     } catch (error) {
 *       console.error('Error reading access token:', error);
 *       return null;
 *     }
 *   }
 * 
 *   async setAccessToken(token: string): Promise<void> {
 *     try {
 *       await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
 *     } catch (error) {
 *       console.error('Error storing access token:', error);
 *       throw error;
 *     }
 *   }
 * 
 *   // ... implement other methods similarly
 * }
 */

/**
 * Factory function to get the appropriate token storage
 * 
 * Can be enhanced to detect platform and return appropriate storage
 */
export const getTokenStorage = (): TokenStorage => {
  // For web, always use WebTokenStorage
  // In mobile app, detect platform and return appropriate storage
  return new WebTokenStorage();
};

/**
 * Singleton instance for consistency
 */
export const tokenStorage = getTokenStorage();

/**
 * Type definitions for auth responses from Spring backend
 */
export interface LoginResponse {
  accessToken?: string;
  token?: string; // Fallback for different API formats
  refreshToken?: string;
  Message?: string;
  [key: string]: any; // Allow additional fields
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string; // Some backends rotate refresh tokens
  [key: string]: any;
}

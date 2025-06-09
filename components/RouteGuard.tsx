import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inUserGroup = segments[0] === '(user)';
    const inHostGroup = segments[0] === '(host)';
    const inAdminGroup = segments[0] === '(admin)';

    if (!user) {
      // User is not authenticated
      if (!inAuthGroup) {
        router.replace('/language');
      }
    } else {
      // User is authenticated, redirect to appropriate dashboard
      if (inAuthGroup) {
        switch (user.role) {
          case 'user':
            router.replace('/(user)/(tabs)');
            break;
          case 'host':
            router.replace('/(host)/(tabs)');
            break;
          case 'admin':
            router.replace('/(admin)/(tabs)');
            break;
        }
      } else {
        // Check if user is in the correct role group
        if (user.role === 'user' && !inUserGroup) {
          router.replace('/(user)/(tabs)');
        } else if (user.role === 'host' && !inHostGroup) {
          router.replace('/(host)/(tabs)');
        } else if (user.role === 'admin' && !inAdminGroup) {
          router.replace('/(admin)/(tabs)');
        }
      }
    }
  }, [user, isLoading, segments]);

  return <>{children}</>;
}
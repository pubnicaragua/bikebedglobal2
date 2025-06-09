import { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function SplashScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (user) {
          // User is logged in, redirect to appropriate dashboard
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
          // No user, go to language selection
          router.replace('/language');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, isLoading]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/image.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
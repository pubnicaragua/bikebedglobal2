import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole } from '../../types';
import { Bike, Home, Settings } from 'lucide-react-native';

export default function RoleScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');

  const handleContinue = () => {
    router.push({
      pathname: '/(auth)/login',
      params: { role: selectedRole }
    });
  };

  const roles = [
    {
      id: 'user' as UserRole,
      title: t('cyclist'),
      description: t('cyclistDescription'),
      icon: Bike,
      color: '#4CAF50'
    },
    {
      id: 'host' as UserRole,
      title: t('host'),
      description: t('hostDescription'),
      icon: Home,
      color: '#2196F3'
    },
    {
      id: 'admin' as UserRole,
      title: t('administrator'),
      description: t('adminDescription'),
      icon: Settings,
      color: '#FF9800'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/image.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>{t('selectRole')}</Text>
        <Text style={styles.subtitle}>{t('roleDescription')}</Text>
        
        <View style={styles.roleOptions}>
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleButton,
                  selectedRole === role.id && styles.selectedButton
                ]}
                onPress={() => setSelectedRole(role.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: role.color }]}>
                  <IconComponent size={32} color="#FFFFFF" />
                </View>
                <View style={styles.roleContent}>
                  <Text style={[
                    styles.roleTitle,
                    selectedRole === role.id && styles.selectedText
                  ]}>
                    {role.title}
                  </Text>
                  <Text style={styles.roleDescription}>
                    {role.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>{t('continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 40,
    textAlign: 'center',
  },
  roleOptions: {
    width: '100%',
    marginBottom: 40,
  },
  roleButton: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedButton: {
    borderColor: '#FFFFFF',
    backgroundColor: '#333333',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
  },
  continueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});
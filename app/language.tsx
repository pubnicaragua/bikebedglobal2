import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageScreen() {
  const router = useRouter();
  const { setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');

  const handleContinue = async () => {
    await setLanguage(selectedLanguage);
    router.push('/(auth)/role');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/image.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>{t('selectLanguage')}</Text>
        
        <View style={styles.languageOptions}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'en' && styles.selectedButton
            ]}
            onPress={() => setSelectedLanguage('en')}
          >
            <Text style={[
              styles.languageText,
              selectedLanguage === 'en' && styles.selectedText
            ]}>
              🇺🇸 English
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.languageButton,
              selectedLanguage === 'es' && styles.selectedButton
            ]}
            onPress={() => setSelectedLanguage('es')}
          >
            <Text style={[
              styles.languageText,
              selectedLanguage === 'es' && styles.selectedText
            ]}>
              🇪🇸 Español
            </Text>
          </TouchableOpacity>
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
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  languageOptions: {
    width: '100%',
    marginBottom: 40,
  },
  languageButton: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#333333',
  },
  selectedButton: {
    borderColor: '#FFFFFF',
    backgroundColor: '#333333',
  },
  languageText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedText: {
    fontWeight: 'bold',
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
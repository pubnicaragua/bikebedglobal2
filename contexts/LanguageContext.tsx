import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { LanguageContextType } from '../types';

const translations = {
  en: {
    // App Name
    appName: 'Bike & Bed Global',
    
    // Language Selection
    selectLanguage: 'Select Language',
    english: 'English',
    spanish: 'Español',
    continue: 'Continue',
    
    // Role Selection
    selectRole: 'Select Your Role',
    roleDescription: 'Choose how you want to use Bike & Bed Global',
    cyclist: 'Cyclist',
    cyclistDescription: 'Find accommodations and routes for your cycling adventures',
    host: 'Host',
    hostDescription: 'List your property for cyclists to stay',
    administrator: 'Administrator',
    adminDescription: 'Manage the platform and users',
    
    // Login
    login: 'Login',
    email: 'Email',
    password: 'Password',
    loginButton: 'Sign In',
    loginError: 'Invalid credentials. Please try again.',
    
    // Navigation
    home: 'Home',
    explore: 'Explore',
    routes: 'Routes',
    bookings: 'Bookings',
    profile: 'Profile',
    dashboard: 'Dashboard',
    accommodations: 'Accommodations',
    users: 'Users',
    analytics: 'Analytics',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    logout: 'Logout',
    welcome: 'Welcome',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    
    // User Dashboard
    findAccommodations: 'Find Accommodations',
    discoverRoutes: 'Discover Routes',
    myBookings: 'My Bookings',
    favoriteRoutes: 'Favorite Routes',
    
    // Host Dashboard
    myProperties: 'My Properties',
    addProperty: 'Add Property',
    reservations: 'Reservations',
    earnings: 'Earnings',
    
    // Admin Dashboard
    totalUsers: 'Total Users',
    totalHosts: 'Total Hosts',
    totalBookings: 'Total Bookings',
    revenue: 'Revenue',
    manageUsers: 'Manage Users',
    manageProperties: 'Manage Properties',
    systemSettings: 'System Settings'
  },
  es: {
    // App Name
    appName: 'Bike & Bed Global',
    
    // Language Selection
    selectLanguage: 'Seleccionar Idioma',
    english: 'English',
    spanish: 'Español',
    continue: 'Continuar',
    
    // Role Selection
    selectRole: 'Selecciona tu Rol',
    roleDescription: 'Elige cómo quieres usar Bike & Bed Global',
    cyclist: 'Ciclista',
    cyclistDescription: 'Encuentra alojamientos y rutas para tus aventuras ciclistas',
    host: 'Anfitrión',
    hostDescription: 'Lista tu propiedad para que se alojen ciclistas',
    administrator: 'Administrador',
    adminDescription: 'Gestiona la plataforma y usuarios',
    
    // Login
    login: 'Iniciar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    loginButton: 'Entrar',
    loginError: 'Credenciales inválidas. Inténtalo de nuevo.',
    
    // Navigation
    home: 'Inicio',
    explore: 'Explorar',
    routes: 'Rutas',
    bookings: 'Reservas',
    profile: 'Perfil',
    dashboard: 'Panel',
    accommodations: 'Alojamientos',
    users: 'Usuarios',
    analytics: 'Analíticas',
    
    // Common
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    
    // User Dashboard
    findAccommodations: 'Buscar Alojamientos',
    discoverRoutes: 'Descubrir Rutas',
    myBookings: 'Mis Reservas',
    favoriteRoutes: 'Rutas Favoritas',
    
    // Host Dashboard
    myProperties: 'Mis Propiedades',
    addProperty: 'Añadir Propiedad',
    reservations: 'Reservas',
    earnings: 'Ganancias',
    
    // Admin Dashboard
    totalUsers: 'Total Usuarios',
    totalHosts: 'Total Anfitriones',
    totalBookings: 'Total Reservas',
    revenue: 'Ingresos',
    manageUsers: 'Gestionar Usuarios',
    manageProperties: 'Gestionar Propiedades',
    systemSettings: 'Configuración del Sistema'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'es'>('en');

  useEffect(() => {
    loadStoredLanguage();
  }, []);

  const loadStoredLanguage = async () => {
    try {
      const storedLanguage = await SecureStore.getItemAsync('language');
      if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'es')) {
        setLanguageState(storedLanguage);
      }
    } catch (error) {
      console.error('Error loading stored language:', error);
    }
  };

  const setLanguage = async (lang: 'en' | 'es') => {
    setLanguageState(lang);
    await SecureStore.setItemAsync('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
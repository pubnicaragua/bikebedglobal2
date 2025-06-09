export type UserRole = 'user' | 'host' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
}

export interface Accommodation {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  amenities: string[];
}

export interface Route {
  id: string;
  name: string;
  distance: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  location: string;
  image: string;
}

export interface Booking {
  id: string;
  accommodationId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}
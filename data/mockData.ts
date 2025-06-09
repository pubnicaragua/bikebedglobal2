import { Accommodation, Route, Booking } from '../types';

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    title: 'Mountain Bike Lodge',
    description: 'Perfect accommodation for mountain bikers with secure bike storage and repair station.',
    price: 85,
    rating: 4.8,
    location: 'Aspen, Colorado',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Bike Storage', 'Repair Station', 'WiFi', 'Breakfast']
  },
  {
    id: '2',
    title: 'Coastal Cycling Inn',
    description: 'Beachfront accommodation with guided coastal cycling tours.',
    price: 120,
    rating: 4.6,
    location: 'Santa Monica, California',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Ocean View', 'Bike Rental', 'Tour Guide', 'Restaurant']
  },
  {
    id: '3',
    title: 'Urban Cyclist Hub',
    description: 'Modern hotel in the city center with bike-friendly amenities.',
    price: 95,
    rating: 4.4,
    location: 'Portland, Oregon',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['City Center', 'Bike Storage', 'Gym', 'Business Center']
  }
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Mountain Trail Adventure',
    distance: 25.5,
    difficulty: 'Hard',
    duration: '3h 30min',
    location: 'Rocky Mountains',
    image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Coastal Scenic Route',
    distance: 18.2,
    difficulty: 'Easy',
    duration: '2h 15min',
    location: 'Pacific Coast',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Forest Loop Trail',
    distance: 32.1,
    difficulty: 'Medium',
    duration: '4h 00min',
    location: 'Redwood Forest',
    image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    accommodationId: '1',
    userId: '1',
    checkIn: '2024-02-15',
    checkOut: '2024-02-18',
    status: 'confirmed',
    totalPrice: 255
  },
  {
    id: '2',
    accommodationId: '2',
    userId: '1',
    checkIn: '2024-03-10',
    checkOut: '2024-03-12',
    status: 'pending',
    totalPrice: 240
  }
];

export const mockStats = {
  totalUsers: 1248,
  totalHosts: 156,
  totalBookings: 892,
  revenue: 78450,
  monthlyGrowth: 12.5,
  occupancyRate: 78
};
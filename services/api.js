// Servicio API simulado para reemplazar temporalmente Supabase

// Datos de usuario simulados
const mockUsers = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123", // En una aplicación real, nunca almacenaríamos contraseñas en texto plano
    user_metadata: {
      full_name: "John Doe",
      avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "user",
    },
  },
  {
    id: "2",
    email: "host@example.com",
    password: "password123",
    user_metadata: {
      full_name: "Jane Smith",
      avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "host",
    },
  },
]

// Función para simular un retraso en la respuesta
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// API de autenticación
export const auth = {
  // Iniciar sesión
  signIn: async (email, password) => {
    await delay(1000) // Simular retraso de red

    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!user) {
      throw new Error("Invalid login credentials")
    }

    return { user }
  },

  // Registrar usuario
  signUp: async (email, password, userData) => {
    await delay(1000)

    // Comprobar si el usuario ya existe
    if (mockUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User already exists")
    }

    // Crear nuevo usuario
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password,
      user_metadata: {
        ...userData,
        role: "user", // Por defecto, los nuevos usuarios son "user"
      },
    }

    mockUsers.push(newUser)

    return { user: newUser }
  },

  // Cerrar sesión
  signOut: async () => {
    await delay(500)
    return { success: true }
  },

  // Recuperar contraseña
  resetPassword: async (email) => {
    await delay(1000)

    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error("User not found")
    }

    return { success: true }
  },
}

// Datos de alojamientos simulados
const mockAccommodations = [
  {
    id: "1",
    title: "Mountain View Cabin",
    description: "Cozy cabin with stunning mountain views, perfect for cyclists looking to explore mountain trails.",
    price: 85,
    rating: 4.8,
    reviews: 124,
    location: "Boulder, Colorado",
    coordinates: { latitude: 40.015, longitude: -105.2705 },
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    ],
    amenities: ["Bike Storage", "Repair Tools", "Laundry", "WiFi", "Kitchen"],
    host_id: "2",
    bike_friendly: true,
  },
  {
    id: "2",
    title: "Coastal Apartment",
    description: "Modern apartment located near coastal cycling routes with beautiful ocean views.",
    price: 110,
    rating: 4.6,
    reviews: 89,
    location: "Santa Monica, California",
    coordinates: { latitude: 34.0195, longitude: -118.4912 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8",
    ],
    amenities: ["Bike Storage", "WiFi", "Pool", "Gym", "Parking"],
    host_id: "2",
    bike_friendly: true,
  },
  {
    id: "3",
    title: "Countryside Cottage",
    description: "Charming cottage in the countryside with easy access to scenic cycling routes.",
    price: 95,
    rating: 4.9,
    reviews: 156,
    location: "Woodstock, Vermont",
    coordinates: { latitude: 43.6106, longitude: -72.519 },
    images: [
      "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    ],
    amenities: ["Bike Storage", "Repair Station", "Garden", "WiFi", "Fireplace"],
    host_id: "2",
    bike_friendly: true,
  },
]

// Datos de rutas simulados
const mockRoutes = [
  {
    id: "1",
    title: "Mountain Explorer",
    description: "Challenging mountain route with breathtaking views and technical descents.",
    distance: 45.2, // km
    elevation: 1250, // m
    duration: 240, // minutes
    difficulty: "Hard",
    type: "Mountain",
    location: "Boulder, Colorado",
    coordinates: {
      start: { latitude: 40.015, longitude: -105.2705 },
      end: { latitude: 40.0577, longitude: -105.2839 },
    },
    images: [
      "https://images.unsplash.com/photo-1519583272095-6433daf26b6e",
      "https://images.unsplash.com/photo-1544191696-102152d8e4e8",
    ],
    rating: 4.7,
    reviews: 86,
  },
  {
    id: "2",
    title: "Coastal Cruise",
    description: "Scenic coastal route with flat terrain and beautiful ocean views.",
    distance: 32.5, // km
    elevation: 150, // m
    duration: 120, // minutes
    difficulty: "Easy",
    type: "Road",
    location: "Santa Monica, California",
    coordinates: {
      start: { latitude: 34.0195, longitude: -118.4912 },
      end: { latitude: 34.0373, longitude: -118.5018 },
    },
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
      "https://images.unsplash.com/photo-1506710507565-203b9f24669b",
    ],
    rating: 4.5,
    reviews: 124,
  },
  {
    id: "3",
    title: "Countryside Tour",
    description: "Relaxing ride through picturesque countryside with rolling hills.",
    distance: 28.7, // km
    elevation: 350, // m
    duration: 150, // minutes
    difficulty: "Moderate",
    type: "Gravel",
    location: "Woodstock, Vermont",
    coordinates: {
      start: { latitude: 43.6106, longitude: -72.519 },
      end: { latitude: 43.6417, longitude: -72.5602 },
    },
    images: [
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
      "https://images.unsplash.com/photo-1542856391-010fb87dcfed",
    ],
    rating: 4.8,
    reviews: 92,
  },
]

// Datos de reservas simulados
const mockBookings = [
  {
    id: "1",
    user_id: "1",
    accommodation_id: "1",
    check_in: "2023-07-15",
    check_out: "2023-07-20",
    guests: 2,
    total_price: 425,
    status: "confirmed",
    created_at: "2023-06-01T10:30:00Z",
  },
  {
    id: "2",
    user_id: "1",
    accommodation_id: "3",
    check_in: "2023-08-10",
    check_out: "2023-08-15",
    guests: 1,
    total_price: 475,
    status: "upcoming",
    created_at: "2023-07-05T14:45:00Z",
  },
]

// API de datos
export const api = {
  // Alojamientos
  getAccommodations: async (filters = {}) => {
    await delay(800)
    let results = [...mockAccommodations]

    // Aplicar filtros si existen
    if (filters.location) {
      results = results.filter((acc) => acc.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.minPrice) {
      results = results.filter((acc) => acc.price >= filters.minPrice)
    }

    if (filters.maxPrice) {
      results = results.filter((acc) => acc.price <= filters.maxPrice)
    }

    return results
  },

  getAccommodationById: async (id) => {
    await delay(500)
    const accommodation = mockAccommodations.find((acc) => acc.id === id)

    if (!accommodation) {
      throw new Error("Accommodation not found")
    }

    return accommodation
  },

  // Rutas
  getRoutes: async (filters = {}) => {
    await delay(800)
    let results = [...mockRoutes]

    // Aplicar filtros si existen
    if (filters.difficulty) {
      results = results.filter((route) => route.difficulty === filters.difficulty)
    }

    if (filters.type) {
      results = results.filter((route) => route.type === filters.type)
    }

    if (filters.minDistance) {
      results = results.filter((route) => route.distance >= filters.minDistance)
    }

    if (filters.maxDistance) {
      results = results.filter((route) => route.distance <= filters.maxDistance)
    }

    return results
  },

  getRouteById: async (id) => {
    await delay(500)
    const route = mockRoutes.find((route) => route.id === id)

    if (!route) {
      throw new Error("Route not found")
    }

    return route
  },

  // Reservas
  getBookings: async (userId) => {
    await delay(800)
    return mockBookings.filter((booking) => booking.user_id === userId)
  },

  getBookingById: async (id) => {
    await delay(500)
    const booking = mockBookings.find((booking) => booking.id === id)

    if (!booking) {
      throw new Error("Booking not found")
    }

    return booking
  },

  createBooking: async (bookingData) => {
    await delay(1000)

    const newBooking = {
      id: String(mockBookings.length + 1),
      ...bookingData,
      status: "confirmed",
      created_at: new Date().toISOString(),
    }

    mockBookings.push(newBooking)

    return newBooking
  },
}

// Exportar todo como un objeto
export default {
  auth,
  api,
}

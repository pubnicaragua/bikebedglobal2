// Mock data service to simulate backend responses
// This will be replaced with actual Supabase calls later

// Accommodations data
export const accommodations = [
  {
    id: "1",
    name: "Casa Rural El Ciclista",
    location: "Sierra de Gredos, Ávila",
    images: [
      "https://picsum.photos/id/10/800/600",
      "https://picsum.photos/id/11/800/600",
      "https://picsum.photos/id/12/800/600",
    ],
    rating: 4.8,
    reviews: 124,
    pricePerNight: 85,
    description:
      "Alojamiento especialmente diseñado para ciclistas, con todas las comodidades necesarias para disfrutar de tu estancia. Ubicado en un entorno natural privilegiado, perfecto para rutas en bicicleta de montaña y carretera.",
    amenities: [
      { icon: "bicycle", name: "Guardabicis seguro" },
      { icon: "construct", name: "Taller de reparación" },
      { icon: "restaurant", name: "Desayuno incluido" },
      { icon: "wifi", name: "WiFi gratuito" },
      { icon: "car", name: "Aparcamiento gratuito" },
      { icon: "water", name: "Lavado de bicicletas" },
    ],
    host: {
      id: "101",
      name: "Carlos",
      image: "https://picsum.photos/id/1/100/100",
      isSuperhost: true,
    },
    coordinates: {
      latitude: 40.2337,
      longitude: -5.1665,
    },
    featured: true,
  },
  {
    id: "2",
    name: "Albergue Montaña Verde",
    location: "Picos de Europa, Asturias",
    images: [
      "https://picsum.photos/id/13/800/600",
      "https://picsum.photos/id/14/800/600",
      "https://picsum.photos/id/15/800/600",
    ],
    rating: 4.6,
    reviews: 89,
    pricePerNight: 65,
    description:
      "Albergue acogedor situado en el corazón de los Picos de Europa. Ideal para ciclistas que buscan explorar las rutas de montaña más espectaculares de Asturias. Ofrecemos guías locales y mapas detallados de la zona.",
    amenities: [
      { icon: "bicycle", name: "Guardabicis seguro" },
      { icon: "restaurant", name: "Desayuno incluido" },
      { icon: "wifi", name: "WiFi gratuito" },
      { icon: "map", name: "Mapas de rutas" },
    ],
    host: {
      id: "102",
      name: "Elena",
      image: "https://picsum.photos/id/2/100/100",
      isSuperhost: false,
    },
    coordinates: {
      latitude: 43.1969,
      longitude: -4.9852,
    },
    featured: true,
  },
  {
    id: "3",
    name: "Hotel Ciclista Premium",
    location: "Sierra Nevada, Granada",
    images: [
      "https://picsum.photos/id/16/800/600",
      "https://picsum.photos/id/17/800/600",
      "https://picsum.photos/id/18/800/600",
    ],
    rating: 4.9,
    reviews: 156,
    pricePerNight: 120,
    description:
      "Hotel de lujo diseñado específicamente para ciclistas profesionales y aficionados. Contamos con todas las instalaciones necesarias para el mantenimiento de bicicletas y recuperación de los deportistas. Ubicación perfecta para entrenar en altura.",
    amenities: [
      { icon: "bicycle", name: "Guardabicis seguro" },
      { icon: "construct", name: "Taller de reparación" },
      { icon: "restaurant", name: "Restaurante gourmet" },
      { icon: "wifi", name: "WiFi de alta velocidad" },
      { icon: "fitness", name: "Gimnasio" },
      { icon: "water", name: "Spa y recuperación" },
    ],
    host: {
      id: "103",
      name: "Miguel",
      image: "https://picsum.photos/id/3/100/100",
      isSuperhost: true,
    },
    coordinates: {
      latitude: 37.0961,
      longitude: -3.3965,
    },
    featured: true,
  },
  {
    id: "4",
    name: "Hostal Ruta del Norte",
    location: "Cantabria",
    images: [
      "https://picsum.photos/id/19/800/600",
      "https://picsum.photos/id/20/800/600",
      "https://picsum.photos/id/21/800/600",
    ],
    rating: 4.3,
    reviews: 67,
    pricePerNight: 55,
    description:
      "Hostal económico y acogedor, perfecto para ciclistas que recorren la costa norte. Ofrecemos desayunos energéticos y consejos sobre las mejores rutas costeras de Cantabria.",
    amenities: [
      { icon: "bicycle", name: "Guardabicis" },
      { icon: "restaurant", name: "Desayuno" },
      { icon: "wifi", name: "WiFi gratuito" },
    ],
    host: {
      id: "104",
      name: "Laura",
      image: "https://picsum.photos/id/4/100/100",
      isSuperhost: false,
    },
    coordinates: {
      latitude: 43.3614,
      longitude: -3.8442,
    },
    featured: false,
  },
  {
    id: "5",
    name: "Apartamentos Vía Verde",
    location: "Girona",
    images: [
      "https://picsum.photos/id/22/800/600",
      "https://picsum.photos/id/23/800/600",
      "https://picsum.photos/id/24/800/600",
    ],
    rating: 4.7,
    reviews: 112,
    pricePerNight: 95,
    description:
      "Apartamentos modernos situados junto a la famosa Vía Verde de Girona. Cada apartamento cuenta con espacio seguro para bicicletas y herramientas básicas de mantenimiento. Ideal para familias y grupos de ciclistas.",
    amenities: [
      { icon: "bicycle", name: "Guardabicis seguro" },
      { icon: "construct", name: "Herramientas básicas" },
      { icon: "wifi", name: "WiFi gratuito" },
      { icon: "car", name: "Aparcamiento gratuito" },
      { icon: "home", name: "Cocina equipada" },
    ],
    host: {
      id: "105",
      name: "Jordi",
      image: "https://picsum.photos/id/5/100/100",
      isSuperhost: true,
    },
    coordinates: {
      latitude: 41.9794,
      longitude: 2.8214,
    },
    featured: false,
  },
]

// Routes data
export const routes = [
  {
    id: "1",
    name: "Ruta de los Lagos",
    location: "Covadonga, Asturias",
    images: [
      "https://picsum.photos/id/25/800/600",
      "https://picsum.photos/id/26/800/600",
      "https://picsum.photos/id/27/800/600",
    ],
    description:
      "Una de las rutas más emblemáticas de Asturias. Recorre los lagos de Covadonga y disfruta de paisajes espectaculares en el corazón de los Picos de Europa. Ideal para ciclistas con experiencia debido a sus fuertes pendientes.",
    distance: 25.4,
    elevation: 850,
    duration: "2h 30min",
    difficulty: "Medio",
    terrain: "Asfalto",
    startPoint: {
      latitude: 43.2707,
      longitude: -5.0634,
      name: "Cangas de Onís",
    },
    endPoint: {
      latitude: 43.2361,
      longitude: -4.9906,
      name: "Lagos de Covadonga",
    },
    waypoints: [
      { latitude: 43.2707, longitude: -5.0634 },
      { latitude: 43.2651, longitude: -5.0401 },
      { latitude: 43.2598, longitude: -5.0201 },
      { latitude: 43.2512, longitude: -5.0102 },
      { latitude: 43.2423, longitude: -4.9998 },
      { latitude: 43.2361, longitude: -4.9906 },
    ],
    nearbyAccommodations: ["1", "2"],
    featured: true,
  },
  {
    id: "2",
    name: "Vía Verde del Tajuña",
    location: "Madrid",
    images: [
      "https://picsum.photos/id/28/800/600",
      "https://picsum.photos/id/29/800/600",
      "https://picsum.photos/id/30/800/600",
    ],
    description:
      "Ruta familiar que sigue el antiguo trazado ferroviario del Tajuña. Perfecta para ciclistas de todos los niveles, con un recorrido prácticamente llano y bien acondicionado. Atraviesa bonitos paisajes y pequeños pueblos con encanto.",
    distance: 18.2,
    elevation: 120,
    duration: "1h 45min",
    difficulty: "Fácil",
    terrain: "Tierra compactada",
    startPoint: {
      latitude: 40.2337,
      longitude: -3.4665,
      name: "Arganda del Rey",
    },
    endPoint: {
      latitude: 40.1736,
      longitude: -3.3965,
      name: "Morata de Tajuña",
    },
    waypoints: [
      { latitude: 40.2337, longitude: -3.4665 },
      { latitude: 40.2151, longitude: -3.4401 },
      { latitude: 40.1998, longitude: -3.4201 },
      { latitude: 40.1912, longitude: -3.4102 },
      { latitude: 40.1823, longitude: -3.3998 },
      { latitude: 40.1736, longitude: -3.3965 },
    ],
    nearbyAccommodations: ["4"],
    featured: true,
  },
  {
    id: "3",
    name: "Subida a Sierra Nevada",
    location: "Granada",
    images: [
      "https://picsum.photos/id/31/800/600",
      "https://picsum.photos/id/32/800/600",
      "https://picsum.photos/id/33/800/600",
    ],
    description:
      "Exigente ascensión a la estación de esquí de Sierra Nevada. Una ruta clásica para los amantes del ciclismo de montaña con impresionantes vistas de Granada y Sierra Nevada. Recomendada para ciclistas experimentados.",
    distance: 32.7,
    elevation: 1200,
    duration: "3h 15min",
    difficulty: "Difícil",
    terrain: "Asfalto",
    startPoint: {
      latitude: 37.1734,
      longitude: -3.5965,
      name: "Granada",
    },
    endPoint: {
      latitude: 37.0961,
      longitude: -3.3965,
      name: "Estación de Sierra Nevada",
    },
    waypoints: [
      { latitude: 37.1734, longitude: -3.5965 },
      { latitude: 37.1551, longitude: -3.5401 },
      { latitude: 37.1398, longitude: -3.5201 },
      { latitude: 37.1212, longitude: -3.4802 },
      { latitude: 37.1123, longitude: -3.4398 },
      { latitude: 37.0961, longitude: -3.3965 },
    ],
    nearbyAccommodations: ["3"],
    featured: true,
  },
]

// Bookings data
export const bookings = [
  {
    id: "1",
    userId: "user1",
    accommodationId: "1",
    accommodationName: "Casa Rural El Ciclista",
    location: "Sierra de Gredos, Ávila",
    image: "https://picsum.photos/id/10/500/300",
    checkIn: "2023-06-15",
    checkOut: "2023-06-18",
    guests: 2,
    status: "confirmed",
    totalPrice: 255,
    createdAt: "2023-05-20T14:30:00Z",
  },
  {
    id: "2",
    userId: "user1",
    accommodationId: "2",
    accommodationName: "Albergue Montaña Verde",
    location: "Picos de Europa, Asturias",
    image: "https://picsum.photos/id/13/500/300",
    checkIn: "2023-07-22",
    checkOut: "2023-07-25",
    guests: 1,
    status: "pending",
    totalPrice: 195,
    createdAt: "2023-06-10T09:15:00Z",
  },
  {
    id: "3",
    userId: "user1",
    accommodationId: "3",
    accommodationName: "Hotel Ciclista Premium",
    location: "Sierra Nevada, Granada",
    image: "https://picsum.photos/id/16/500/300",
    checkIn: "2023-08-10",
    checkOut: "2023-08-15",
    guests: 2,
    status: "completed",
    totalPrice: 600,
    createdAt: "2023-07-01T16:45:00Z",
  },
]

// User profile data
export const userProfile = {
  id: "user1",
  name: "Carlos Rodríguez",
  email: "carlos@example.com",
  phone: "+34 612 345 678",
  image: "https://picsum.photos/id/1/200/200",
  joinDate: "Junio 2022",
  completedRoutes: 24,
  totalReservations: 8,
  level: "Ciclista Avanzado",
  totalDistance: 1248,
  preferences: {
    routeTypes: ["mountain", "road"],
    accommodationTypes: ["rural", "hotel"],
    notifications: true,
    language: "es",
  },
  achievements: [
    { id: "1", name: "Montañero", icon: "trending-up", color: "#4CAF50", description: "Completó 5 rutas de montaña" },
    { id: "2", name: "Madrugador", icon: "sunny", color: "#FF9800", description: "Realizó 10 rutas al amanecer" },
    { id: "3", name: "Explorador", icon: "compass", color: "#2196F3", description: "Visitó 8 regiones diferentes" },
  ],
  nextAchievements: [
    {
      id: "4",
      name: "Maratonista",
      icon: "trophy",
      color: "#9C27B0",
      description: "Completa una ruta de más de 100km",
      progress: 75,
    },
    {
      id: "5",
      name: "Social",
      icon: "people",
      color: "#FF5722",
      description: "Participa en 5 eventos grupales",
      progress: 40,
    },
  ],
}

// Host profile data
export const hostProfile = {
  id: "host1",
  name: "María López",
  email: "maria@example.com",
  phone: "+34 623 456 789",
  image: "https://picsum.photos/id/2/200/200",
  joinDate: "Marzo 2021",
  isSuperhost: true,
  rating: 4.9,
  reviews: 87,
  properties: [
    {
      id: "1",
      name: "Casa Rural El Ciclista",
      location: "Sierra de Gredos, Ávila",
      image: "https://picsum.photos/id/10/500/300",
      rating: 4.8,
      bookings: 124,
    },
    {
      id: "5",
      name: "Apartamentos Vía Verde",
      location: "Girona",
      image: "https://picsum.photos/id/22/500/300",
      rating: 4.7,
      bookings: 112,
    },
  ],
  earnings: {
    total: 12450,
    thisMonth: 1850,
    pending: 450,
  },
  accountDetails: {
    bankName: "Banco Santander",
    accountNumber: "****4567",
    taxId: "B12345678",
  },
}

// Mock API functions
export const mockAPI = {
  // Auth functions
  login: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation
    if (email === "user@example.com" && password === "password") {
      return { success: true, user: { ...userProfile, role: "user" } }
    } else if (email === "host@example.com" && password === "password") {
      return { success: true, user: { ...hostProfile, role: "host" } }
    }

    return { success: false, error: "Invalid credentials" }
  },

  register: async (userData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple validation
    if (!userData.email || !userData.password || !userData.name) {
      return { success: false, error: "Missing required fields" }
    }

    return {
      success: true,
      user: {
        id: "new_user_" + Math.floor(Math.random() * 1000),
        ...userData,
        joinDate: new Date().toISOString(),
        image: "https://picsum.photos/id/1/200/200",
      },
    }
  },

  // Accommodation functions
  getAccommodations: async (filters = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    let filtered = [...accommodations]

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (acc) => acc.name.toLowerCase().includes(search) || acc.location.toLowerCase().includes(search),
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter((acc) => acc.pricePerNight >= filters.minPrice)
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((acc) => acc.pricePerNight <= filters.maxPrice)
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((acc) =>
        filters.amenities.every((amenity) =>
          acc.amenities.some((a) => a.name.toLowerCase().includes(amenity.toLowerCase())),
        ),
      )
    }

    return { success: true, data: filtered }
  },

  getAccommodationById: async (id) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const accommodation = accommodations.find((acc) => acc.id === id)

    if (!accommodation) {
      return { success: false, error: "Accommodation not found" }
    }

    return { success: true, data: accommodation }
  },

  // Routes functions
  getRoutes: async (filters = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    let filtered = [...routes]

    // Apply filters
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(
        (route) => route.name.toLowerCase().includes(search) || route.location.toLowerCase().includes(search),
      )
    }

    if (filters.difficulty) {
      filtered = filtered.filter((route) => route.difficulty === filters.difficulty)
    }

    if (filters.minDistance) {
      filtered = filtered.filter((route) => route.distance >= filters.minDistance)
    }

    if (filters.maxDistance) {
      filtered = filtered.filter((route) => route.distance <= filters.maxDistance)
    }

    return { success: true, data: filtered }
  },

  getRouteById: async (id) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const route = routes.find((r) => r.id === id)

    if (!route) {
      return { success: false, error: "Route not found" }
    }

    // Get nearby accommodations
    const nearbyAccommodations = accommodations.filter((acc) => route.nearbyAccommodations.includes(acc.id))

    return {
      success: true,
      data: {
        ...route,
        nearbyAccommodations,
      },
    }
  },

  // Bookings functions
  getBookings: async (userId, status) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    let filtered = bookings.filter((booking) => booking.userId === userId)

    if (status) {
      filtered = filtered.filter((booking) => booking.status === status)
    }

    return { success: true, data: filtered }
  },

  createBooking: async (bookingData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Simple validation
    if (!bookingData.accommodationId || !bookingData.checkIn || !bookingData.checkOut) {
      return { success: false, error: "Missing required fields" }
    }

    const accommodation = accommodations.find((acc) => acc.id === bookingData.accommodationId)

    if (!accommodation) {
      return { success: false, error: "Accommodation not found" }
    }

    const newBooking = {
      id: "booking_" + Math.floor(Math.random() * 1000),
      userId: bookingData.userId || "user1",
      accommodationId: bookingData.accommodationId,
      accommodationName: accommodation.name,
      location: accommodation.location,
      image: accommodation.images[0],
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests || 1,
      status: "pending",
      totalPrice: accommodation.pricePerNight * calculateNights(bookingData.checkIn, bookingData.checkOut),
      createdAt: new Date().toISOString(),
    }

    return { success: true, data: newBooking }
  },

  // Profile functions
  getUserProfile: async (userId) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    return { success: true, data: userProfile }
  },

  getHostProfile: async (hostId) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    return { success: true, data: hostProfile }
  },

  updateUserProfile: async (userId, profileData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      data: {
        ...userProfile,
        ...profileData,
      },
    }
  },
}

// Helper function to calculate nights between dates
function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default mockAPI

import { createClient } from "@supabase/supabase-js"
import AsyncStorage from "@react-native-async-storage/async-storage"
// Reemplazar esta línea:
// import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env"

// Con estas constantes:
const SUPABASE_URL = "https://iowbqxfrfmaszfcsdlqa.supabase.co"
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvd2JxeGZyZm1hc3pmY3NkbHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MDExNDAsImV4cCI6MjA2MzM3NzE0MH0.l7zz4nxg-lOf9s2Vf0iZkELuhnFthW3m961k1k63eMc"

// Initialize Supabase client
const supabase = createClient(
  SUPABASE_URL || "https://your-supabase-url.supabase.co",
  SUPABASE_ANON_KEY || "your-anon-key",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)

// Authentication functions
export const signUp = async (email, password, userData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...userData,
          role: userData.role || "user", // Default role is 'user'
        },
      },
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw error
    return { user, error: null }
  } catch (error) {
    return { user: null, error }
  }
}

// Database functions
export const fetchAccommodations = async (filters = {}) => {
  try {
    let query = supabase.from("accommodations").select("*")

    // Apply filters if provided
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`)
    }

    if (filters.priceMin) {
      query = query.gte("price_per_night", filters.priceMin)
    }

    if (filters.priceMax) {
      query = query.lte("price_per_night", filters.priceMax)
    }

    if (filters.hasBikeStorage) {
      query = query.eq("has_bike_storage", true)
    }

    const { data, error } = await query
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const fetchUserBookings = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        accommodation:accommodations(*)
      `)
      .eq("user_id", userId)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const fetchHostAccommodations = async (hostId) => {
  try {
    const { data, error } = await supabase.from("accommodations").select("*").eq("host_id", hostId)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const createAccommodation = async (accommodationData) => {
  try {
    const { data, error } = await supabase.from("accommodations").insert([accommodationData]).select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const updateAccommodation = async (id, updates) => {
  try {
    const { data, error } = await supabase.from("accommodations").update(updates).eq("id", id).select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const createBooking = async (bookingData) => {
  try {
    const { data, error } = await supabase.from("bookings").insert([bookingData]).select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// File storage functions
export const uploadImage = async (filePath, file) => {
  try {
    const fileExt = filePath.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const fullPath = `${filePath}/${fileName}`

    const { data, error } = await supabase.storage.from("images").upload(fullPath, file)

    if (error) throw error

    const { data: publicURL } = supabase.storage.from("images").getPublicUrl(fullPath)

    return { url: publicURL.publicUrl, error: null }
  } catch (error) {
    return { url: null, error }
  }
}

export default supabase

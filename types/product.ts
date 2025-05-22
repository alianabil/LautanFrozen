export interface Product {
  id: string
  name: string
  description: string
  price: number
  weight: string
  stock: number
  rating: number
  reviewCount: number
  images: string[]
  nutritionFacts: {
    calories: string
    protein: string
    fat: string
    carbs: string
    omega3: string
  }
  temperatureData: {
    time: string
    temp: number
  }[]
  storageInfo: string
  cookingInfo: string
  origin: string
  harvestDate: string
  expiryDate: string
  certifications: string[]
  relatedProducts: {
    id: string
    name: string
    price: number
    image: string
  }[]
}

export interface Review {
  id: string
  user: string
  rating: number
  date: string
  comment: string
  avatar: string
}

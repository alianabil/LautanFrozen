"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/hooks/use-toast"

// Tipe data untuk notifikasi
export type NotificationType = "order" | "promo" | "system" | "delivery"

export type Notification = {
  id: string
  title: string
  message: string
  date: Date
  read: boolean
  type: NotificationType
}

// Tipe data untuk context
type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
}

// Membuat context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Provider component
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()
  const unreadCount = notifications.filter((n) => !n.read).length

  // Load notifications from localStorage on initial render
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications).map((notification) => ({
          ...notification,
          date: new Date(notification.date),
        }))
        setNotifications(parsedNotifications)
      } catch (error) {
        console.error("Error parsing notifications data:", error)
        setNotifications([])
      }
    } else {
      // Add some demo notifications if none exist
      const demoNotifications: Notification[] = [
        {
          id: "1",
          title: "Selamat Datang di LautanFrozen!",
          message: "Terima kasih telah bergabung dengan kami. Nikmati pengalaman belanja seafood terbaik!",
          date: new Date(Date.now() - 86400000), // 1 day ago
          read: false,
          type: "system",
        },
        {
          id: "2",
          title: "Promo Spesial Bulan Ini",
          message: "Dapatkan diskon 15% untuk semua produk udang hingga akhir bulan!",
          date: new Date(Date.now() - 172800000), // 2 days ago
          read: false,
          type: "promo",
        },
      ]
      setNotifications(demoNotifications)
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: uuidv4(),
      date: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    toast({
      title: "Notifikasi Baru",
      description: notification.title,
      variant: "default",
    })
  }

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Remove a notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// Hook untuk menggunakan notification context
export function useNotification() {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }

  return context
}

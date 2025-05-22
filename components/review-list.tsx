import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Review {
  id: string
  user: string
  rating: number
  date: string
  comment: string
  avatar: string
}

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border border-gray-200">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                <AvatarFallback>{review.user.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{review.user}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

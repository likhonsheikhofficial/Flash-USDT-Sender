/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        <Quote className="h-8 w-8 text-purple-200 mb-4" />
        <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

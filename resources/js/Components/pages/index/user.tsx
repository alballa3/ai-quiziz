"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Alice Johnson",
    role: "High School Teacher",
    content:
      "Smart Quiz has revolutionized how I create assessments for my students. The AI-generated questions are spot-on and save me hours of work!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Bob Smith",
    role: "Corporate Trainer",
    content:
      "The analytics provided by Smart Quiz have helped me identify knowledge gaps in our training programs. It's an invaluable tool for any educator.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Carol Davis",
    role: "Online Course Creator",
    content:
      "I've seen a significant increase in student engagement since incorporating Smart Quiz into my online courses. The AI adapts perfectly to different subjects.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Discover how Smart Quiz is transforming education and training for professionals worldwide.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <CardTitle className="text-lg font-medium">{testimonial.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


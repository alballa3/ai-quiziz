"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, PenTool, Cpu, ClipboardCheck, Play, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    title: "Choose Your Topic",
    description: "Select a subject area or input your own content for the quiz.",
    icon: PenTool,
    color: "text-blue-500",
  },
  {
    title: "AI Generates Questions",
    description: "Our advanced AI creates relevant and challenging questions based on your input.",
    icon: Cpu,
    color: "text-green-500",
  },
  {
    title: "Review and Customize",
    description: "Fine-tune the generated questions or add your own to perfect your quiz.",
    icon: ClipboardCheck,
    color: "text-yellow-500",
  },
  {
    title: "Deploy and Analyze",
    description: "Share your quiz with participants and gain insights from the results.",
    icon: Play,
    color: "text-purple-500",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">How Smart Quiz Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Creating an AI-powered quiz is easy with our simple 4-step process.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div
                      className={`flex items-center justify-center w-16 h-16 mx-auto ${step.color} bg-opacity-10 rounded-full`}
                    >
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <CardTitle className="mt-4 text-xl font-bold text-center">
                      {index + 1}. {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center mt-4">
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => document.getElementById("ai-integration")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More About Our AI <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/Components/ui/button"
import { Brain, Zap, BarChart, Shuffle, ArrowRight } from "lucide-react"

const features = [
  {
    title: "AI-Powered Generation",
    description: "Our advanced AI creates tailored questions based on your chosen topics and difficulty levels.",
    icon: Brain,
  },
  {
    title: "Instant Results",
    description: "Get immediate feedback and detailed analytics on quiz performance.",
    icon: Zap,
  },
  {
    title: "Comprehensive Analytics",
    description: "Track progress over time with in-depth statistics and performance metrics.",
    icon: BarChart,
  },
  {
    title: "Dynamic Question Banks",
    description: "Questions are continuously updated and refined based on the latest information and user feedback.",
    icon: Shuffle,
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white dark:bg-gray-800 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Smart Quiz Features</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Discover how our AI-powered platform revolutionizes quiz creation and learning.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button>
            Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}


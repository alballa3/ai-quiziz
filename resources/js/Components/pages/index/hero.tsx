import { Button } from "@/Components/ui/button"
import { ArrowRight, Brain, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Icon header */}
          <div className="flex justify-center space-x-2 animate-fade-in">
            <Brain className="w-8 h-8 text-primary" />
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Create AI-Powered Quizzes with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 animate-gradient">
                Smart Quiz
              </span>
            </h1>
            <p className="mx-auto max-w-md text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Harness the power of AI to generate engaging, personalized quizzes for education, training, or fun. Smart
              Quiz makes quiz creation effortless and intelligent.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <Button size="lg" className="w-full sm:w-auto animate-fade-in-up group">
              Create Your First Quiz
              <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto animate-fade-in-up delay-100">
              Learn how it works
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-16 animate-fade-in-up delay-200">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Quizzes Created', value: '50K+' },
              { label: 'Questions Generated', value: '1M+' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 opacity-20 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-pattern"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-pattern)" />
        </svg>
      </div>
    </section>
  )
}

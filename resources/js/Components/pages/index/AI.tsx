"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Brain, Database, TrendingUp, Shield, Zap, Target, RefreshCwIcon as Refresh, BarChart } from "lucide-react"

const aiFeatures = [
  {
    title: "Natural Language Processing",
    description: "Our AI understands context and generates human-like questions across various subjects.",
    icon: Brain,
    color: "text-blue-500",
  },
  {
    title: "Adaptive Learning",
    description: "The AI learns from user interactions to improve question quality over time.",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Vast Knowledge Base",
    description: "Access a wide range of topics and difficulty levels for diverse quiz creation.",
    icon: Database,
    color: "text-yellow-500",
  },
  {
    title: "Content Moderation",
    description: "AI ensures generated content is appropriate and aligned with educational standards.",
    icon: Shield,
    color: "text-purple-500",
  },
]

const aiProcess = [
  {
    title: "Topic Analysis",
    description: "AI analyzes your chosen topic or content to understand the key concepts and learning objectives.",
    icon: Target,
  },
  {
    title: "Question Generation",
    description:
      "Based on the analysis, AI creates a diverse set of questions, including multiple-choice, true/false, and open-ended formats.",
    icon: Zap,
  },
  {
    title: "Difficulty Calibration",
    description:
      "AI adjusts the difficulty of questions to match your desired level, ensuring an appropriate challenge for participants.",
    icon: Target,
  },
  {
    title: "Answer Validation",
    description:
      "For each question, AI generates correct answers and plausible distractors to create engaging multiple-choice options.",
    icon: Shield,
  },
  {
    title: "Content Refinement",
    description: "AI reviews and refines the generated content to ensure clarity, relevance, and educational value.",
    icon: Refresh,
  },
  {
    title: "Continuous Learning",
    description:
      "As quizzes are used, AI learns from user interactions and feedback to improve future question generation.",
    icon: BarChart,
  },
]

export default function AIIntegration() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <section id="ai-integration" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">How AI Powers Smart Quiz</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Our advanced AI technology enhances every aspect of quiz creation and analysis.
          </p>
        </div>
        <div className="mt-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">AI Features</TabsTrigger>
              <TabsTrigger value="process">AI-Powered Process</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 mt-8">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div
                          className={`flex items-center justify-center w-16 h-16 mx-auto ${feature.color} bg-opacity-10 rounded-full`}
                        >
                          <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        </div>
                        <CardTitle className="mt-4 text-center">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="process">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                {aiProcess.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary bg-opacity-10 rounded-full">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-center text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center">{step.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}


"use client"

import { useState, useEffect } from "react"

import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Progress } from "@/Components/ui/progress"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Quiz } from "@/types/quiz"
import { router, usePage } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast"
import Guest from "@/Layouts/GuestLayout"
export default function TakeQuiz() {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({})
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
const {exam}=usePage().props
console.log(exam)
  useEffect(() => {
    setQuiz(exam)

    setIsLoading(false)
  }, [])

  const handleAnswer = (questionId: string, answer: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    if (!quiz) return 0
    let correctAnswers = 0
    quiz.questions.forEach((question) => {
      if (question.type === "multiple-choice" || question.type === "true-false") {
        if (answers[question.id] === question.correctAnswer) {
          correctAnswers++
        }
      }
    })
    return (correctAnswers / quiz.questions.length) * 100
  }

  const isQuestionAnswered = (questionId: string) => {
    return answers[questionId] !== undefined
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (!quiz) {
    return <div>Quiz not found.</div>
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    //className="min-h-screen bg-gray-50"
    <Guest >

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">{quiz.title}</h1>
        {!showResults ? (
          <div className="flex gap-6">
            <div className="w-1/4">
              <Card className="bg-white shadow-lg sticky top-4">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {quiz.questions.map((question, index) => (
                      <li key={question.id}>
                        <Button
                          variant={currentQuestionIndex === index ? "default" : "outline"}
                          className={`w-full justify-start ${isQuestionAnswered(question.id) ? "text-green-600" : ""}`}
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          {index + 1}. {question.text.substring(0, 20)}...
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="w-3/4">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl text-gray-900">
                      Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </CardTitle>
                  </div>
                  <Progress value={progress} className="mt-2" />
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-lg mb-4">{currentQuestion.text}</p>
                      {currentQuestion.type === "multiple-choice" && (
                        <RadioGroup
                          value={answers[currentQuestion.id]?.toString() || ""}
                        //   onValueChange={(value) => handleAnswer(currentQuestion.id, Number.parseInt(value))}
                        >
                          {currentQuestion.answers.map((answer, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition-colors"
                            >
                              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                              <Label htmlFor={`answer-${index}`} className="flex-grow cursor-pointer">
                                {answer}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      {currentQuestion.type === "true-false" && (
                        <RadioGroup
                          value={answers[currentQuestion.id]?.toString() || ""}
                          onValueChange={(value) => handleAnswer(currentQuestion.id, value === "true")}
                        >
                          <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition-colors">
                            <RadioGroupItem value="true" id="answer-true" />
                            <Label htmlFor="answer-true" className="flex-grow cursor-pointer">
                              True
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition-colors">
                            <RadioGroupItem value="false" id="answer-false" />
                            <Label htmlFor="answer-false" className="flex-grow cursor-pointer">
                              False
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                      {currentQuestion.type === "short-answer" && (
                        <Input
                          value={answers[currentQuestion.id]?.toString() || ""}
                          onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                          placeholder="Enter your answer"
                          className="mt-2"
                        />
                      )}
                      {currentQuestion.type === "essay" && (
                        <div className="mt-2">
                          <Textarea
                            value={answers[currentQuestion.id]?.toString() || ""}
                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                            placeholder="Enter your essay"
                            rows={6}
                            className="mb-2"
                          />
                          <p className="text-sm text-gray-500">
                            Word count:{" "}
                            {(answers[currentQuestion.id]?.toString() || "").split(/\s+/).filter(Boolean).length}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {currentQuestionIndex === quiz.questions.length - 1 ? "Finish" : "Next"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overall Performance</h3>
                <Progress value={calculateScore()} className="mb-2" />
                <p className="text-lg">
                  Your score: {calculateScore().toFixed(2)}% (
                  {Math.round((calculateScore() * quiz.questions.length) / 100)} / {quiz.questions.length})
                </p>
              </div>
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border-t pt-4">
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <span className="mr-2">Question {index + 1}:</span>
                      {(question.type === "multiple-choice" || question.type === "true-false") &&
                        (answers[question.id] === question.correctAnswer ? (
                          <CheckCircle2 className="text-green-500 h-5 w-5" />
                        ) : (
                          <XCircle className="text-red-500 h-5 w-5" />
                        ))}
                    </h3>
                    <p className="mb-2">{question.text}</p>
                    <p className="mb-1">
                      <strong>Your answer:</strong> {answers[question.id]?.toString() || "Not answered"}
                    </p>
                    {(question.type === "multiple-choice" || question.type === "true-false") && (
                      <p className="mb-1">
                        <strong>Correct answer:</strong>{" "}
                        {question.type === "multiple-choice"
                          ? question.answers[question.correctAnswer as number]
                          : question.correctAnswer
                            ? "True"
                            : "False"}
                      </p>
                    )}
                    {question.type === "short-answer" && (
                      <p className="mb-1">
                        <strong>Correct answer:</strong> {question.correctAnswer}
                      </p>
                    )}
                    {question.type === "essay" && question.sampleAnswer && (
                      <div>
                        <p className="font-medium mb-1">Sample answer:</p>
                        <p className="bg-gray-100 p-2 rounded">{question.sampleAnswer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/")} className="w-full">
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </Guest>
  )
}

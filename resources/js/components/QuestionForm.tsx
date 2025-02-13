"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PlusCircle, Save } from "lucide-react"
import type { Question } from "../types/quiz"

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void
  initialQuestion?: Question
}

export default function QuestionForm({ onAddQuestion, initialQuestion }: QuestionFormProps) {
  const [question, setQuestion] = useState<Question>({
    id: "",
    text: "",
    answers: ["", "", "", ""],
    correctAnswer: 0,
  })

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion)
    }
  }, [initialQuestion])

  const handleAddQuestion = () => {
    if (question.text && question.answers.every((answer) => answer !== "")) {
      onAddQuestion({ ...question, id: question.id || Date.now().toString() })
      if (!initialQuestion) {
        setQuestion({ id: "", text: "", answers: ["", "", "", ""], correctAnswer: 0 })
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
          placeholder="Enter your question here"
        />
      </div>
      <RadioGroup
        value={question.correctAnswer.toString()}
        onValueChange={(value) => setQuestion({ ...question, correctAnswer: Number.parseInt(value) })}
      >
        {question.answers.map((answer, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
            <Input
              value={answer}
              onChange={(e) => {
                const newAnswers = [...question.answers]
                newAnswers[index] = e.target.value
                setQuestion({ ...question, answers: newAnswers })
              }}
              placeholder={`Answer ${index + 1}`}
            />
            <Label htmlFor={`answer-${index}`}>Correct</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleAddQuestion}>
        {initialQuestion ? (
          <>
            <Save className="mr-2 h-4 w-4" /> Update Question
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
          </>
        )}
      </Button>
    </div>
  )
}


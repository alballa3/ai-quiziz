

import { useState, useEffect } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { PlusCircle, X } from "lucide-react"
import { Question, QuestionType } from "@/types/quiz"

interface QuestionFormProps {
  onAddQuestion: (question: Question) => void
  onCancel?: () => void
  initialQuestion?: Question
}

export default function QuestionForm({ onAddQuestion, onCancel, initialQuestion }: QuestionFormProps) {
  const [questionType, setQuestionType] = useState<QuestionType>(initialQuestion?.type || "multiple-choice")
  const [questionText, setQuestionText] = useState(initialQuestion?.text || "")
  const [answers, setAnswers] = useState<string[]>(
    initialQuestion?.type === "multiple-choice" ? initialQuestion.answers : ["", "", "", ""],
  )
  const [correctAnswer, setCorrectAnswer] = useState(
    initialQuestion?.type === "multiple-choice" ? initialQuestion.correctAnswer : 0,
  )
  const [essaySampleAnswer, setEssaySampleAnswer] = useState(
    initialQuestion?.type === "essay" ? initialQuestion.sampleAnswer || "" : "",
  )
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<boolean | null>(
    initialQuestion?.type === "true-false" ? initialQuestion.correctAnswer : null,
  )
  const [shortAnswer, setShortAnswer] = useState(
    initialQuestion?.type === "short-answer" ? initialQuestion.correctAnswer : "",
  )

  useEffect(() => {
    if (initialQuestion) {
      setQuestionType(initialQuestion.type)
      setQuestionText(initialQuestion.text)
      if (initialQuestion.type === "multiple-choice") {
        setAnswers(initialQuestion.answers)
        setCorrectAnswer(initialQuestion.correctAnswer)
      } else if (initialQuestion.type === "essay") {
        setEssaySampleAnswer(initialQuestion.sampleAnswer || "")
      } else if (initialQuestion.type === "true-false") {
        setTrueFalseAnswer(initialQuestion.correctAnswer)
      } else if (initialQuestion.type === "short-answer") {
        setShortAnswer(initialQuestion.correctAnswer)
      }
    }
  }, [initialQuestion])

  const handleAddQuestion = () => {
    if (!questionText) return

    let newQuestion: Question

    switch (questionType) {
      case "multiple-choice":
        if (answers.every((answer) => answer !== "")) {
          newQuestion = {
            id: initialQuestion?.id || Date.now().toString(),
            type: "multiple-choice",
            text: questionText,
            answers,
            correctAnswer,
          }
        } else {
          return // Don't add if not all answers are filled
        }
        break
      case "essay":
        newQuestion = {
          id: initialQuestion?.id || Date.now().toString(),
          type: "essay",
          text: questionText,
          sampleAnswer: essaySampleAnswer,
        }
        break
      case "true-false":
        if (trueFalseAnswer !== null) {
          newQuestion = {
            id: initialQuestion?.id || Date.now().toString(),
            type: "true-false",
            text: questionText,
            correctAnswer: trueFalseAnswer,
          }
        } else {
          return // Don't add if no answer is selected
        }
        break
      case "short-answer":
        if (shortAnswer) {
          newQuestion = {
            id: initialQuestion?.id || Date.now().toString(),
            type: "short-answer",
            text: questionText,
            correctAnswer: shortAnswer,
          }
        } else {
          return // Don't add if no correct answer is provided
        }
        break
      default:
        return // Unknown question type
    }

    onAddQuestion(newQuestion)
    resetForm()
  }

  const resetForm = () => {
    setQuestionText("")
    setAnswers(["", "", "", ""])
    setCorrectAnswer(0)
    setEssaySampleAnswer("")
    setTrueFalseAnswer(null)
    setShortAnswer("")
  }

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <Label htmlFor="questionType" className="text-gray-900">
          Question Type
        </Label>
        <Select onValueChange={(value: QuestionType) => setQuestionType(value)} value={questionType}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
            <SelectItem value="essay">Essay</SelectItem>
            <SelectItem value="true-false">True/False</SelectItem>
            <SelectItem value="short-answer">Short Answer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="questionText" className="text-gray-900">
          Question
        </Label>
        <Input
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question here"
          className="mt-1"
        />
      </div>

      {questionType === "multiple-choice" && (
        <RadioGroup
          value={correctAnswer.toString()}
          onValueChange={(value) => setCorrectAnswer(Number.parseInt(value))}
        >
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <Input
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...answers]
                  newAnswers[index] = e.target.value
                  setAnswers(newAnswers)
                }}
                placeholder={`Answer ${index + 1}`}
                className="flex-grow"
              />
              <Label htmlFor={`answer-${index}`} className="text-gray-900">
                Correct
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {questionType === "essay" && (
        <div>
          <Label htmlFor="sampleAnswer" className="text-gray-900">
            Sample Answer (Optional)
          </Label>
          <Textarea
            id="sampleAnswer"
            value={essaySampleAnswer}
            onChange={(e) => setEssaySampleAnswer(e.target.value)}
            placeholder="Enter a sample answer or grading rubric"
            className="mt-1"
          />
        </div>
      )}

      {questionType === "true-false" && (
        <RadioGroup
          value={trueFalseAnswer === null ? "" : trueFalseAnswer.toString()}
          onValueChange={(value) => setTrueFalseAnswer(value === "true")}
        >
          <div className="flex items-center space-x-2 mt-2">
            <RadioGroupItem value="true" id="answer-true" />
            <Label htmlFor="answer-true" className="text-gray-900">
              True
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <RadioGroupItem value="false" id="answer-false" />
            <Label htmlFor="answer-false" className="text-gray-900">
              False
            </Label>
          </div>
        </RadioGroup>
      )}

      {questionType === "short-answer" && (
        <div>
          <Label htmlFor="shortAnswer" className="text-gray-900">
            Correct Answer
          </Label>
          <Input
            id="shortAnswer"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            placeholder="Enter the correct answer"
            className="mt-1"
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        )}
        <Button onClick={handleAddQuestion}>
          <PlusCircle className="mr-2 h-4 w-4" /> {initialQuestion ? "Update" : "Add"} Question
        </Button>
      </div>
    </div>
  )
}


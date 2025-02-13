import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit, Trash2, Play, Plus } from "lucide-react"
import type { Quiz, Question } from "../types/quiz"
import QuestionForm from "./QuestionForm"

interface QuizListProps {
  quizzes: Quiz[]
  onEdit: (quiz: Quiz) => void
  onDelete: (quizId: string) => void
  onUpdate: (updatedQuiz: Quiz) => void
}

export default function QuizList({ quizzes, onEdit, onDelete, onUpdate }: QuizListProps) {
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const handleEditQuestion = (quiz: Quiz, question: Question) => {
    setEditingQuiz(quiz)
    setEditingQuestion(question)
  }

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    if (editingQuiz) {
      const updatedQuestions = editingQuiz.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
      const updatedQuiz = { ...editingQuiz, questions: updatedQuestions }
      onUpdate(updatedQuiz)
      setEditingQuiz(null)
      setEditingQuestion(null)
    }
  }

  const handleAddQuestion = (quiz: Quiz) => {
    setEditingQuiz(quiz)
    setEditingQuestion(null)
  }

  const handleNewQuestion = (newQuestion: Question) => {
    if (editingQuiz) {
      const updatedQuiz = {
        ...editingQuiz,
        questions: [...editingQuiz.questions, newQuestion],
      }
      onUpdate(updatedQuiz)
      setEditingQuiz(null)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>You haven't created any quizzes yet. Start by creating a new quiz!</p>
      ) : (
        quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{quiz.title}</span>
                <div>
                  <Button variant="ghost" onClick={() => onEdit(quiz)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => onDelete(quiz.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{quiz.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="questions">
                  <AccordionTrigger>View Questions</AccordionTrigger>
                  <AccordionContent>
                    {quiz.questions.map((question, index) => (
                      <Dialog key={question.id}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start mb-2">
                            Question {index + 1}: {question.text}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Question</DialogTitle>
                          </DialogHeader>
                          <QuestionForm
                            initialQuestion={question}
                            onAddQuestion={(updatedQuestion) => handleUpdateQuestion(updatedQuestion)}
                          />
                        </DialogContent>
                      </Dialog>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mb-2">
                          <Plus className="mr-2 h-4 w-4" /> Add New Question
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Question</DialogTitle>
                        </DialogHeader>
                        <QuestionForm onAddQuestion={(newQuestion) => handleNewQuestion(newQuestion)} />
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Loader2, Save, Trash2, GripVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Question, Quiz } from "@/types/quiz"
import { toast, ToastContainer } from "react-toastify"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import QuestionForm from "@/Components/pages/quiz/QuestionForm"
import { router, usePage } from "@inertiajs/react"

export default function EditQuiz( ) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null)
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("edit")
    const { exam } = usePage().props

    useEffect(() => {
        setQuiz(exam as Quiz)
        setIsLoading(false)
      }, [])



      const handleQuizUpdate = (field: keyof Quiz, value: string) => {
        if (quiz) {
          setQuiz({ ...quiz, [field]: value })
        }
      }

      const addQuestion = (newQuestion: Question) => {
        if (quiz) {
          setQuiz({
            ...quiz,
            questions: [...quiz.questions, newQuestion],
          })
          toast.success("Your new question has been added to the quiz.")
        }
      }

      const updateQuestion = (updatedQuestion: Question, index: number) => {
        if (quiz) {
          const updatedQuestions = [...quiz.questions]
          updatedQuestions[index] = updatedQuestion
          setQuiz({
            ...quiz,
            questions: updatedQuestions,
          })
          setEditingQuestionIndex(null)
          toast.success("Your question has been updated successfully.")
        }
      }

      const removeQuestion = (index: number) => {
        if (quiz) {
          const updatedQuestions = quiz.questions.filter((_, i) => i !== index)
          setQuiz({
            ...quiz,
            questions: updatedQuestions,
          })
          toast.info("The question has been removed from the quiz.")
        }
        setDeleteConfirmIndex(null)
      }

      const saveQuiz = () => {
        if (!quiz) return

        if (!quiz.title.trim()) {
          toast.error("Quiz title cannot be empty.")
          return
        }

        router.put(`/exam/${exam?.id}`,{
            title: quiz.title,
            description: quiz.description,
            questions: quiz.questions ,
        },{
            preserveScroll: true,
            onSuccess: () => {
              toast.success("Your quiz has been updated successfully.")
            },
            onError: () => {
              toast.error("An error occurred while updating the quiz.")
            }
        })
        console.log(quiz)
        toast.success("Your quiz has been updated successfully.")
      }

      const onDragEnd = (result: any) => {
        if (!result.destination || !quiz) return

        const newQuestions = Array.from(quiz.questions)
        const [reorderedQuestion] = newQuestions.splice(result.source.index, 1)
        newQuestions.splice(result.destination.index, 0, reorderedQuestion)

        setQuiz({
          ...quiz,
          questions: newQuestions,
        })
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

  return (
    <Authenticated >
      <ToastContainer />
      <main className="container mx-auto p-4 lg:p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Edit Quiz</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="edit" className="text-lg">
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-lg">
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3">
                <Card className="bg-white shadow-lg sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">Quiz Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="quizTitle" className="text-gray-900 text-lg">
                        Quiz Title
                      </Label>
                      <Input
                        id="quizTitle"
                        value={quiz.title}
                        onChange={(e) => handleQuizUpdate("title", e.target.value)}
                        placeholder="Enter quiz title"
                        className="mt-1 text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quizDescription" className="text-gray-900 text-lg">
                        Quiz Description
                      </Label>
                      <Textarea
                        id="quizDescription"
                        value={quiz.description}
                        onChange={(e) => handleQuizUpdate("description", e.target.value)}
                        placeholder="Enter quiz description"
                        className="mt-1 text-lg"
                        rows={4}
                      />
                    </div>
                    <Button onClick={saveQuiz} className="w-full text-lg" size="lg">
                      <Save className="mr-2 h-5 w-5" /> Save Quiz
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="w-full lg:w-2/3">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="questions">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        <AnimatePresence>
                          {quiz.questions.map((question, index) => (
                            <Draggable key={question.id} draggableId={question.id} index={index}>
                              {(provided, snapshot) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Card
                                    className={`bg-white shadow-lg transition-all duration-200 ${snapshot.isDragging ? "shadow-2xl ring-2 ring-primary" : ""}`}
                                  >
                                    <CardHeader className="flex flex-row items-center">
                                      <div {...provided.dragHandleProps} className="mr-4 cursor-move">
                                        <GripVertical className="h-6 w-6 text-gray-400" />
                                      </div>
                                      <CardTitle className="text-xl text-gray-900 flex-grow">
                                        Question {index + 1}
                                      </CardTitle>
                                      <div className="flex items-center space-x-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setEditingQuestionIndex(index)}
                                        >
                                          Edit
                                        </Button>
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => setDeleteConfirmIndex(index)}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Are you sure you want to delete this question?</DialogTitle>
                                              <DialogDescription>
                                                This action cannot be undone. This will permanently delete the question
                                                from the quiz.
                                              </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                              <Button variant="outline" onClick={() => setDeleteConfirmIndex(null)}>
                                                Cancel
                                              </Button>
                                              <Button variant="destructive" onClick={() => removeQuestion(index)}>
                                                Delete
                                              </Button>
                                            </DialogFooter>
                                          </DialogContent>
                                        </Dialog>
                                      </div>
                                    </CardHeader>
                                    <CardContent>
                                      {editingQuestionIndex === index ? (
                                        <QuestionForm
                                          onAddQuestion={(updatedQuestion) => updateQuestion(updatedQuestion, index)}
                                          onCancel={() => setEditingQuestionIndex(null)}
                                          initialQuestion={question}
                                        />
                                      ) : (
                                        <div className="space-y-2">
                                          <p className="font-medium text-lg">{question.text}</p>
                                          <p className="text-sm text-gray-600">Type: {question.type}</p>
                                          {question.type === "multiple-choice" && (
                                            <ul className="list-disc list-inside mt-2 space-y-1">
                                              {question.answers.map((answer, i) => (
                                                <li
                                                  key={i}
                                                  className={`${i === question.correctAnswer ? "font-semibold text-green-600" : ""}`}
                                                >
                                                  {answer} {i === question.correctAnswer && "(Correct)"}
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                          {question.type === "true-false" && (
                                            <p className="mt-2">
                                              Correct answer:{" "}
                                              <span className="font-semibold">
                                                {question.correctAnswer ? "True" : "False"}
                                              </span>
                                            </p>
                                          )}
                                          {question.type === "short-answer" && (
                                            <p className="mt-2">
                                              Correct answer:{" "}
                                              <span className="font-semibold">{question.correctAnswer}</span>
                                            </p>
                                          )}
                                          {question.type === "essay" && question.sampleAnswer && (
                                            <div className="mt-2">
                                              <p className="font-medium">Sample answer:</p>
                                              <p className="italic text-gray-600">{question.sampleAnswer}</p>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              )}
                            </Draggable>
                          ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <Card className="bg-white shadow-lg mt-8">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">Add New Question</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QuestionForm onAddQuestion={addQuestion} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <Card className="bg-white shadow-lg max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl text-gray-900">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-8 text-lg">{quiz.description}</p>
                <ScrollArea className="h-[60vh] pr-4">
                  {quiz.questions.map((question, index) => (
                    <Card key={question.id} className="mb-6 bg-gray-50 border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900">Question {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="font-medium text-lg">{question.text}</p>
                        {question.type === "multiple-choice" && (
                          <div className="space-y-2">
                            {question.answers.map((answer, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={`q${index}-a${i}`}
                                  name={`question-${index}`}
                                  className="w-4 h-4 text-primary"
                                />
                                <label htmlFor={`q${index}-a${i}`} className="text-lg">
                                  {answer}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === "true-false" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`q${index}-true`}
                                name={`question-${index}`}
                                className="w-4 h-4 text-primary"
                              />
                              <label htmlFor={`q${index}-true`} className="text-lg">
                                True
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`q${index}-false`}
                                name={`question-${index}`}
                                className="w-4 h-4 text-primary"
                              />
                              <label htmlFor={`q${index}-false`} className="text-lg">
                                False
                              </label>
                            </div>
                          </div>
                        )}
                        {question.type === "short-answer" && (
                          <Input placeholder="Enter your answer" className="mt-2 text-lg" />
                        )}
                        {question.type === "essay" && (
                          <Textarea placeholder="Enter your essay" className="mt-2 text-lg" rows={6} />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </Authenticated>
  )
}


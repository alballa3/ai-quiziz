"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Save, Wand2 } from "lucide-react"
import QuizList from "./QuizList"
import QuestionForm from "./QuestionForm"

import { generateAIQuestion } from "@/lib/aiUtils"
import { toast } from "@/hooks/use-toast"
import { Question, Quiz } from "@/types/quiz"

export default function QuizMaker() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [activeTab, setActiveTab] = useState("create")
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)

  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes")
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes))
  }, [quizzes])
  console.log(quizzes)
  const addQuestion = (newQuestion: Question) => {
    if (currentQuiz) {
      const updatedQuiz = {
        ...currentQuiz,
        questions: [...currentQuiz.questions, newQuestion],
      }
      setCurrentQuiz(updatedQuiz)
      setQuizzes(quizzes.map((q) => (q.id === currentQuiz.id ? updatedQuiz : q)))
    } else {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: quizTitle || "Untitled Quiz",
        description: quizDescription,
        questions: [newQuestion],
      }
      setQuizzes([...quizzes, newQuiz])
      setCurrentQuiz(newQuiz)
    }
    toast({
      title: "Question added",
      description: "Your new question has been added to the quiz.",
    })
  }

  const saveQuiz = () => {
    // console.log(quizzes)
    // Vaildtion if It Emplty or not
    if (!quizTitle.trim()) {
      toast({
        title: "Error",
        description: "Quiz title cannot be empty.",
        variant: "destructive",
      })
      return
    }

    if (currentQuiz) {
      const updatedQuiz = { ...currentQuiz, title: quizTitle, description: quizDescription }
      setQuizzes(quizzes.map((q) => (q.id === currentQuiz.id ? updatedQuiz : q)))
      setCurrentQuiz(updatedQuiz)
    } else {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: quizTitle,
        description: quizDescription,
        questions: [],
      }
      setQuizzes([...quizzes, newQuiz])
      setCurrentQuiz(newQuiz)
    }
    toast({
      title: "Quiz saved",
      description: "Your quiz has been saved successfully.",
    })
    setActiveTab("list")
  }

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter((q) => q.id !== quizId))
    if (currentQuiz?.id === quizId) {
      setCurrentQuiz(null)
      setQuizTitle("")
      setQuizDescription("")
    }
    toast({
      title: "Quiz deleted",
      description: "The quiz has been deleted.",
    })
  }

  const editQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setQuizTitle(quiz.title)
    setQuizDescription(quiz.description)
    setActiveTab("create")
  }

  const updateQuiz = (updatedQuiz: Quiz) => {
    setQuizzes(quizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q)))
    if (currentQuiz?.id === updatedQuiz.id) {
      setCurrentQuiz(updatedQuiz)
    }
    toast({
      title: "Quiz updated",
      description: "Your quiz has been updated successfully.",
    })
  }

  const generateQuestion = async () => {
    setIsGeneratingQuestion(true)
    try {
      const aiQuestion = await generateAIQuestion()
      addQuestion(aiQuestion)
      toast({
        title: "Question generated",
        description: "A new AI-generated question has been added to the quiz.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingQuestion(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="create">Create/Edit Quiz</TabsTrigger>
        <TabsTrigger value="list">Quiz List</TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>{currentQuiz ? `Edit Quiz: ${currentQuiz.title}` : "Create a New Quiz"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="quizTitle">Quiz Title</Label>
              <Input
                id="quizTitle"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <Label htmlFor="quizDescription">Quiz Description</Label>
              <Textarea
                id="quizDescription"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                placeholder="Enter quiz description"
              />
            </div>
            <QuestionForm onAddQuestion={addQuestion} />
            <Button onClick={generateQuestion} disabled={isGeneratingQuestion}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isGeneratingQuestion ? "Generating..." : "Generate AI Question"}
            </Button>
          </CardContent>
          <CardFooter>
            <Button onClick={saveQuiz}>
              <Save className="mr-2 h-4 w-4" /> Save Quiz
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="list">
        <QuizList quizzes={quizzes} onEdit={editQuiz} onDelete={deleteQuiz} onUpdate={updateQuiz} />
      </TabsContent>
    </Tabs>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Edit, Trash2, Play } from "lucide-react"
import { Link } from "@inertiajs/react"
import { Quiz } from "@/types/quiz"
export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes")
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes))
    }
  }, [])

  const deleteQuiz = (quizId: string) => {
    const updatedQuizzes = quizzes.filter((q) => q.id !== quizId)
    setQuizzes(updatedQuizzes)
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes))
  }

  return (
    <div className="space-y-4">
      {quizzes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-lg text-gray-600">You haven't created any quizzes yet.</p>
            <Button asChild className="mt-4">
              <Link href="/create-quiz">Create Your First Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl text-black">{quiz.title}</span>
                <div>
                  <Button variant="ghost" asChild>
                    <Link href={`/edit-quiz/${quiz.id}`}>
                      <Edit className="h-4 w-4 text-gray-600" />
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={() => deleteQuiz(quiz.id)}>
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href={`/play-quiz/${quiz.id}`}>
                      <Play className="h-4 w-4 text-gray-600" />
                    </Link>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
              <p className="text-sm text-gray-600">
                {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}


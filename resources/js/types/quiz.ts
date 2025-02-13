export interface Question {
  id: string
  text: string
  answers: string[]
  correctAnswer: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
}


export type QuestionType = "multiple-choice" | "essay" | "true-false" | "short-answer"

export interface BaseQuestion {
  id: string
  text: string
  type: QuestionType
  options?: string[]
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multiple-choice"
    answers: string[] 
  correctAnswer: number
}

export interface EssayQuestion extends BaseQuestion {
  type: "essay"
  sampleAnswer?: string
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false"
  correctAnswer: boolean
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: "short-answer"
  correctAnswer: string
}

export type Question = MultipleChoiceQuestion | EssayQuestion | TrueFalseQuestion | ShortAnswerQuestion

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
}


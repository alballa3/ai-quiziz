import type { Question } from "../types/quiz"

export async function generateAIQuestion(): Promise<Question> {
  // This is a mock implementation. In a real application, you would call an AI service here.
  const topics = ["History", "Science", "Literature", "Geography"]
  const randomTopic = topics[Math.floor(Math.random() * topics.length)]

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        text: `What is a famous ${randomTopic.toLowerCase()} fact?`,
        answers: [`${randomTopic} fact 1`, `${randomTopic} fact 2`, `${randomTopic} fact 3`, `${randomTopic} fact 4`],
        correctAnswer: Math.floor(Math.random() * 4),
      })
    }, 1000) // Simulate network delay
  })
}


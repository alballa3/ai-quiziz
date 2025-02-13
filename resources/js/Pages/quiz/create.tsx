import QuizMaker from "@/Components/pages/quiz/QuizMaker";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Home() {
  return (
    <Authenticated>

    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Advanced Quiz Maker</h1>
      <QuizMaker />
    </main>
    </Authenticated>
  )
}


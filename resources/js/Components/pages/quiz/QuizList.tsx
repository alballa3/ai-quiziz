import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Quiz } from '@/types/quiz';
import { Link, router } from '@inertiajs/react';
import { Edit, Eye, Play, Trash2 } from 'lucide-react';
interface QuizListProps {
    quizzes: Quiz[];
}

export default function QuizList({ quizzes }: QuizListProps) {
    const deleteQuiz = (quizId: string) => {
        if (!window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS QUIZ?')) {
            return;
        }

        router.delete(`/exam/${quizId}`, {
            onSuccess: () => {
                toast({
                    title: 'Quiz Deleted',
                    description: 'The quiz was successfully deleted.',
                    variant: 'default',
                });
            },
            onError: () => {
                toast({
                    title: 'Error deleting quiz',
                    description: 'Failed to delete quiz. Please try again.',
                    variant: 'destructive',
                });
            },
            onFinish: () => {
                router.reload()
            }
        });
    };


    return (
        <div className="space-y-4">
            {quizzes.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-lg text-gray-600">
                            You haven't created any quizzes yet.
                        </p>
                        <Button asChild className="mt-4">
                            <Link href="/create-quiz">
                                Create Your First Quiz
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                quizzes.map((quiz) => (
                    <Card
                        key={quiz.id}
                        className="transition-shadow hover:shadow-md"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="text-xl text-gray-900">
                                    {quiz.title}
                                </span>
                                <div className="space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/preview-quiz/${quiz.id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Preview
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/edit-quiz/${quiz.id}`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/exam/${quiz.id}`}>
                                            <Play className="mr-2 h-4 w-4" />
                                            Play
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => deleteQuiz(quiz.id)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-2 text-sm text-gray-600">
                                {quiz.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                {quiz.questions.length} question
                                {quiz.questions.length !== 1 ? 's' : ''}
                            </p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}

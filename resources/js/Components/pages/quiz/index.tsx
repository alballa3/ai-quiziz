

import QuizList from '@/Components/pages/quiz/QuizList';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/Components/ui/input';
import { Quiz } from '@/types/quiz';
import { Link } from '@inertiajs/react';
import { BarChart2, Clock, Search, Users, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function Dashboard({ quiz = [] }: { quiz: Quiz[] | undefined }) {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setQuizzes(quiz);
    }, []);

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalQuestions = quizzes.reduce(
        (sum, quiz) => sum + quiz.questions.length,
        0,
    );
    const averageQuestionsPerQuiz =
        quizzes.length > 0 ? totalQuestions / quizzes.length : 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Quizzes
                        </CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {quizzes.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Questions
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {totalQuestions}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Avg. Questions per Quiz
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {averageQuestionsPerQuiz.toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button asChild className="w-full">
                            <Link href="/dashboard/create">Create New Quiz</Link>
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/ai/generate">
                                <Wand2 className="mr-2 h-4 w-4" />
                                Generate Questions
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-500" />
                <Input
                    type="search"
                    placeholder="Search quizzes..."
                    className="max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <QuizList quizzes={filteredQuizzes} />
        </div>
    );
}

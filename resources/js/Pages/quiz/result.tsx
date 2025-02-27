import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { ScrollArea } from '@/Components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import type { Question, Quiz } from '@/types/quiz';
import { usePage } from '@inertiajs/react';
import {
    ClipboardList,
    Eye,
    Loader2,
    Play,
    Search,
    Share2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuizResult {
    quizId: string;
    name: string;
    score: number;
    totalQuestions: number;
    answers: Record<string, string | boolean | number>;
    created_at: string;
}

export default function QuizResults({ params }: { params: { id: string } }) {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [results, setResults] = useState<QuizResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'name' | 'score' | 'date'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [searchTerm, setSearchTerm] = useState('');

    const { exam, result } = usePage().props as unknown as {
        exam: Quiz;
        result: QuizResult[];
    };

    // useEffect(() => {
    //     const fetchQuizAndResults = () => {
    //         setQuiz(exam);
    //         setResults(result);
    //         console.log(results)

    //         // Issue Come From Here

    //         // const foundQuiz = quiz?.find((q:any) => q.id === params.id);
    //         // const quizResults = result?.filter(
    //         //     (r:any) => r.quizId === params.id,
    //         // );

    //         // if (savedQuizzes && savedResults) {
    //         //     const quizzes: Quiz[] = JSON.parse(savedQuizzes);
    //         //     const allResults: QuizResult[] = JSON.parse(savedResults);

    //         //     if (foundQuiz) {
    //         //     } else {
    //         //         // toast({
    //         //         //     title: 'Error',
    //         //         //     description: 'Quiz not found.',
    //         //         //     variant: 'destructive',
    //         //         // });
    //         //     }
    //         // }
    //         setIsLoading(false);
    //     };

    //     fetchQuizAndResults();
    // }, []);
   
    console.log()
    useEffect(() => {
        console.log('Exam data from props:', exam); // Debugging
        console.log('Result data from props:', result); // Debugging

        if (result.length > 0) {
            setQuiz(exam);
            setResults(result);
        } else {
            // Handle empty result array case
            console.log('Result is empty:', result);
        }
        setIsLoading(false);
    }, [exam, result]); // Make sure these are dependencies for re-fetching when props change

    const sortedAndFilteredResults = results
        .filter((result) =>
            result.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            } else if (sortBy === 'score') {
                return sortOrder === 'asc'
                    ? a.score - b.score
                    : b.score - a.score;
            } else {
                return sortOrder === 'asc'
                    ? new Date(a.created_at).getTime() -
                          new Date(b.created_at).getTime()
                    : new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime();
            }
        });

    const averageScore =
        results.length > 0
            ? results.reduce((sum, result) => sum + result.score, 0) /
              results.length
            : 0;
    const highestScore =
        results.length > 0
            ? Math.max(...results.map((result) => result.score))
            : 0;
    const lowestScore =
        results.length > 0
            ? Math.min(...results.map((result) => result.score))
            : 0;

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!quiz) {
        return <div>Quiz not found.</div>;
    }

    return (
        <Authenticated>
            <main className="container mx-auto p-4 lg:p-8">
                <div className="mb-8 flex items-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        {quiz.title} - Results
                    </h1>
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Participants
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {results.length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Average Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {averageScore.toFixed(2)}%
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Highest Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {highestScore}%
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Lowest Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {lowestScore}%
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {results.length === 0 ? (
                    <Card className="bg-white shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <ClipboardList className="mb-4 h-16 w-16 text-gray-400" />
                            <h2 className="mb-2 text-2xl font-semibold text-gray-700">
                                No Results Yet
                            </h2>
                            <p className="mb-6 text-center text-gray-500">
                                It looks like no one has taken this quiz yet.
                                Share it with your students to get started!
                            </p>
                            <div className="flex space-x-4">
                                {/* onClick={() => router.push(`/take-quiz/${quiz.id}`)} */}
                                <Button variant="outline">
                                    <Play className="mr-2 h-4 w-4" />
                                    Take Quiz
                                </Button>
                                <Button>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="bg-white shadow-lg">
                        <CardContent className="pt-6">
                            <div className="mb-4 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                                <div className="flex w-full items-center space-x-2 md:w-auto">
                                    <Label htmlFor="search">Search:</Label>
                                    <div className="relative flex-grow md:flex-grow-0">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="search"
                                            placeholder="Search by student name"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="w-full pl-8"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full items-center space-x-4 md:w-auto">
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor="sort">Sort by:</Label>
                                        <Select
                                            value={sortBy}
                                            onValueChange={(
                                                value:
                                                    | 'name'
                                                    | 'score'
                                                    | 'date',
                                            ) => setSortBy(value)}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name">
                                                    Name
                                                </SelectItem>
                                                <SelectItem value="score">
                                                    Score
                                                </SelectItem>
                                                <SelectItem value="date">
                                                    Date
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor="order">Order:</Label>
                                        <Select
                                            value={sortOrder}
                                            onValueChange={(
                                                value: 'asc' | 'desc',
                                            ) => setSortOrder(value)}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Order" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="asc">
                                                    Ascending
                                                </SelectItem>
                                                <SelectItem value="desc">
                                                    Descending
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                #
                                            </TableHead>
                                            <TableHead>Student Name</TableHead>
                                            <TableHead>Score</TableHead>
                                            <TableHead>Completed At</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedAndFilteredResults.map(
                                            (result, index) => (
                                                <TableRow
                                                    key={`${result.quizId}-${result.name}-${result.created_at}`}
                                                >
                                                    <TableCell className="font-medium">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {result.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {result.score}%
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            result.created_at,
                                                        ).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Dialog>
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Answers
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-4xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        {
                                                                            result.name
                                                                        }
                                                                        's
                                                                        Answers
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        Completed
                                                                        on{' '}
                                                                        {new Date(
                                                                            result.created_at,
                                                                        ).toLocaleString()}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <ScrollArea className="mt-4 max-h-[60vh]">
                                                                    {quiz.questions.map(
                                                                        (
                                                                            question: Question,
                                                                            qIndex: number,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    question.id
                                                                                }
                                                                                className="mb-4 rounded border p-4"
                                                                            >
                                                                                <h3 className="mb-2 font-semibold">
                                                                                    Question{' '}
                                                                                    {qIndex +
                                                                                        1}

                                                                                    :{' '}
                                                                                    {
                                                                                        question.text
                                                                                    }
                                                                                </h3>
                                                                                <p className="mb-1">
                                                                                    <strong>
                                                                                        Student's
                                                                                        Answer:
                                                                                    </strong>{' '}
                                                                                    {result.answers[
                                                                                        question
                                                                                            .id
                                                                                    ]?.toString()}
                                                                                </p>
                                                                                <p className="mb-1">
                                                                                    <strong>
                                                                                        Correct
                                                                                        Answer:
                                                                                    </strong>{' '}
                                                                                    {question.type ===
                                                                                    'multiple-choice'
                                                                                        ? question
                                                                                              .answers[
                                                                                              question.correctAnswer as number
                                                                                          ]
                                                                                        : question.type ===
                                                                                            'true-false'
                                                                                          ? question.correctAnswer
                                                                                              ? 'True'
                                                                                              : 'False'
                                                                                          : question.correctAnswer}
                                                                                </p>
                                                                                {question.type ===
                                                                                    'essay' && (
                                                                                    <p className="mt-2">
                                                                                        <strong>
                                                                                            Sample
                                                                                            Answer:
                                                                                        </strong>{' '}
                                                                                        {
                                                                                            question.sampleAnswer
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </ScrollArea>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </Authenticated>
    );
}

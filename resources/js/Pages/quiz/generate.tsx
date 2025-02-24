'use client';

import type React from 'react';

import QuestionForm from '@/Components/pages/quiz/QuestionForm';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Slider } from '@/Components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Textarea } from '@/Components/ui/textarea';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import type { Question, QuestionType } from '@/types/quiz';
import { Edit2, Loader2, Save, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

const questionTypes: {
    value: QuestionType;
    label: string;
    icon: React.ReactNode;
}[] = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: '☑️' },
    { value: 'true-false', label: 'True/False', icon: '✅' },
];

const difficultyLevels = ['Easy', 'Medium', 'Hard'];
export async function generateAIQuestion(
    selectedTypes: QuestionType[],
    difficulty: string,
): Promise<Question> {
    // This is a mock implementation. In a real application, you would call an AI service here.
    const topics = [
        'History',
        'Science',
        'Literature',
        'Geography',
        'Mathematics',
        'Art',
        'Music',
        'Sports',
    ];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomType =
        selectedTypes[Math.floor(Math.random() * selectedTypes.length)];

    return new Promise((resolve) => {
        setTimeout(() => {
            const questionText = `[${difficulty}] What is a famous ${randomTopic.toLowerCase()} fact?`;

            switch (randomType) {
                case 'multiple-choice':
                    resolve({
                        id: Date.now().toString(),
                        type: 'multiple-choice',
                        text: questionText,
                        answers: [
                            `${randomTopic} fact 1`,
                            `${randomTopic} fact 2`,
                            `${randomTopic} fact 3`,
                            `${randomTopic} fact 4`,
                        ],
                        correctAnswer: Math.floor(Math.random() * 4),
                    });
                    break;
                case 'essay':
                    resolve({
                        id: Date.now().toString(),
                        type: 'essay',
                        text: `[${difficulty}] Write an essay about a significant event or development in ${randomTopic}.`,
                        sampleAnswer: `A sample essay about a significant event or development in ${randomTopic}...`,
                    });
                    break;
                case 'true-false':
                    resolve({
                        id: Date.now().toString(),
                        type: 'true-false',
                        text: `[${difficulty}] True or False: ${randomTopic} has always been considered a core academic subject.`,
                        correctAnswer: Math.random() < 0.5,
                    });
                    break;
                case 'short-answer':
                    resolve({
                        id: Date.now().toString(),
                        type: 'short-answer',
                        text: `[${difficulty}] Name an important figure in the field of ${randomTopic} and briefly explain their contribution.`,
                        correctAnswer: `An important figure in ${randomTopic} and their contribution`,
                    });
                    break;
            }
        }, 1000); // Simulate network delay
    });
}
export default function GenerateQuestions() {
    const [numQuestions, setNumQuestions] = useState(1);

    const [quizTitle, setQuizTitle] = useState('General Math Exam');
    const [quizDescription, setQuizDescription] = useState(
        'A general math exam for students.',
    );
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>(
        [],
    );
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<
        number | null
    >(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleGenerate = async () => {

        setIsGenerating(true);
        const csrfToken = document
            ?.querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        const response = await fetch('/ai/generate', {
            method: 'POST',
            body: JSON.stringify({
                title: quizTitle,
                description: quizDescription,
                number_of_questions: numQuestions,
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            console.error('Error generating question:', data);
            // toast.error('Failed to generate question.');
            return;
        }
        setGeneratedQuestions(data)
        setIsGenerating(false);
        // try {
        //     const questions: Question[] = [];
        //     for (let i = 0; i < numQuestions; i++) {
        //         const question = await generateAIQuestion(
        //             selectedTypes,
        //             difficultyLevels[difficulty],
        //         );
        //         questions.push(question);
        //     }
        //     setGeneratedQuestions(questions);
        //     setShowPreview(true);
        //     toast({
        //         title: 'Questions generated',
        //         description: `Successfully generated ${numQuestions} question${numQuestions > 1 ? 's' : ''}.`,
        //     });
        // } catch (error) {
        //     toast({
        //         title: 'Error',
        //         description: 'Failed to generate questions. Please try again.',
        //         variant: 'destructive',
        //     });
        // } finally {
        //     setIsGenerating(false);
        // }
    };

    const handleSave = () => {
        if (!quizTitle.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter a quiz title.',
                variant: 'destructive',
            });
            return;
        }

        const savedQuizzes = localStorage.getItem('quizzes');
        const quizzes = savedQuizzes ? JSON.parse(savedQuizzes) : [];
        const newQuiz = {
            id: Date.now().toString(),
            title: quizTitle,
            description: quizDescription,
            questions: generatedQuestions,
        };
        quizzes.push(newQuiz);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        toast({
            title: 'Quiz saved',
            description: 'Your generated quiz has been saved successfully.',
        });
    };

    const updateQuestion = (updatedQuestion: Question, index: number) => {
        setGeneratedQuestions((prev) =>
            prev.map((q, i) => (i === index ? updatedQuestion : q)),
        );
        setEditingQuestionIndex(null);
    };

    return (
        <Authenticated>
            <main className="container mx-auto p-4">
                <ToastContainer />
                <h1 className="mb-8 text-3xl font-bold text-gray-900">
                    Generate Custom Questions
                </h1>
                <Tabs defaultValue="generate" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="generate">Generate</TabsTrigger>
                        <TabsTrigger
                            value="preview"
                            disabled={generatedQuestions.length === 0}
                        >
                            Preview
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="generate">
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-900">
                                    AI Question Generator
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label
                                        htmlFor="quizTitle"
                                        className="text-gray-900"
                                    >
                                        Quiz Title
                                    </Label>
                                    <Input
                                        id="quizTitle"
                                        value={quizTitle}
                                        onChange={(e) =>
                                            setQuizTitle(e.target.value)
                                        }
                                        placeholder="Enter quiz title"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="quizDescription"
                                        className="text-gray-900"
                                    >
                                        Quiz Description
                                    </Label>
                                    <Textarea
                                        id="quizDescription"
                                        value={quizDescription}
                                        onChange={(e) =>
                                            setQuizDescription(e.target.value)
                                        }
                                        placeholder="Enter quiz description"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="numQuestions"
                                        className="text-gray-900"
                                    >
                                        Number of Questions: {numQuestions}
                                    </Label>
                                    <Slider
                                        id="numQuestions"
                                        min={1}
                                        max={20}
                                        step={1}
                                        value={[numQuestions]}
                                        onValueChange={(value) =>
                                            setNumQuestions(value[0])
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="w-full"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="mr-2 h-4 w-4" />
                                            Generate Questions
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="preview">
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-900">
                                    Generated Questions Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {generatedQuestions.map((question, index) => (
                                    <Card
                                        key={question.id}
                                        className="bg-gray-50"
                                    >
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle className="text-lg text-gray-900">
                                                Question {index + 1}
                                            </CardTitle>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setEditingQuestionIndex(
                                                        index,
                                                    )
                                                }
                                            >
                                                <Edit2 className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            {editingQuestionIndex === index ? (
                                                <QuestionForm
                                                    onAddQuestion={(
                                                        updatedQuestion,
                                                    ) =>
                                                        updateQuestion(
                                                            updatedQuestion,
                                                            index,
                                                        )
                                                    }
                                                    onCancel={() =>
                                                        setEditingQuestionIndex(
                                                            null,
                                                        )
                                                    }
                                                    initialQuestion={question}
                                                />
                                            ) : (
                                                <div>
                                                    <p className="mb-2 font-medium">
                                                        {question.text}
                                                    </p>
                                                    <p className="mb-2 text-sm text-gray-600">
                                                        Type: {question.type}
                                                    </p>
                                                    {question.type ===
                                                        'multiple-choice' && (
                                                        <ul className="list-inside list-disc">
                                                            {question.answers.map(
                                                                (answer, i) => (
                                                                    <li
                                                                        key={i}
                                                                        className={
                                                                            i ===
                                                                            question.correctAnswer
                                                                                ? 'font-semibold'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        {answer}{' '}
                                                                        {i ===
                                                                            question.correctAnswer &&
                                                                            '(Correct)'}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                    {question.type ===
                                                        'true-false' && (
                                                        <p>
                                                            Correct answer:{' '}
                                                            {question.correctAnswer
                                                                ? 'True'
                                                                : 'False'}
                                                        </p>
                                                    )}
                                                    {question.type ===
                                                        'short-answer' && (
                                                        <p>
                                                            Correct answer:{' '}
                                                            {
                                                                question.correctAnswer
                                                            }
                                                        </p>
                                                    )}
                                                    {question.type ===
                                                        'essay' &&
                                                        question.sampleAnswer && (
                                                            <p>
                                                                Sample answer:{' '}
                                                                {
                                                                    question.sampleAnswer
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSave} className="w-full">
                                    <Save className="mr-2 h-4 w-4" />
                                    Save as New Quiz
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </Authenticated>
    );
}

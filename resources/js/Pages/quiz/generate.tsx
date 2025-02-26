'use client';

import QuestionForm from '@/Components/pages/quiz/QuestionForm';
import { Button } from '@/Components/ui/button';
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
import type {
    MultipleChoiceQuestion,
    Question,
    TrueFalseQuestion,
} from '@/types/quiz';
import { router } from '@inertiajs/react';
import { Edit2, Loader2, Save, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function GenerateQuestions() {
    const [numQuestions, setNumQuestions] = useState(1);

    const [quizTitle, setQuizTitle] = useState('general math');
    const [quizDescription, setQuizDescription] = useState(
        'math exam for grade 7',
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
        try {
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
            const data: MultipleChoiceQuestion[] | TrueFalseQuestion[] =
                await response.json();
            console.log(data);

            setIsGenerating(false);
            setGeneratedQuestions(
                data.map((question) => {
                    if (question?.type == 'multiple-choice') {
                        question.answers = question?.options ?? [];
                        delete question?.options;
                    }
                    return question;
                }),
            );
            if (!response.ok) {
                console.error('Error generating question:', data);
                throw new Error('Failed to generate questions');
            }
        } catch (error) {
            toast.error(
                'An error occurred while generating questions, Please Try again Later',
            ); // Handle general errors
        }
    };

    const handleSave = () => {
        if (!quizTitle.trim()) {
            toast.error('Please enter a quiz title.'); // Error toast for empty title
            return;
        }
        console.log(generatedQuestions);
        router.post(
            '/dashboard/create',
            {
                title: quizTitle,
                description: quizDescription,
                questions: generatedQuestions,
            },
            {
                onError: (error) => {
                    console.error('Error creating quiz:', error);
                    toast.error('Failed to save quiz. Please try again.');
                },
                onSuccess: () => {
                    toast.success('Your quiz has been saved successfully.');
                },
            },
        );
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
                                        max={5}
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

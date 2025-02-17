'use client';

import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { generateAIQuestion } from '@/lib/aiUtils';
import { Question, Quiz } from '@/types/quiz';
import { router } from '@inertiajs/react';
import { Plus, Save, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
export default function QuizMaker() {
    const [quiz, setQuiz] = useState<Quiz>({
        id: Date.now().toString(),
        title: '',
        description: '',
        questions: [],
    });
    const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<
        number | null
    >(null);

    useEffect(() => {
        const savedQuizzes = localStorage.getItem('quizzes');
        if (savedQuizzes) {
            const quizzes = JSON.parse(savedQuizzes);
            const existingQuiz = quizzes.find((q: Quiz) => q.id === quiz.id);
            if (existingQuiz) {
                setQuiz(existingQuiz);
            }
        }
    }, [quiz.id]);

    const addQuestion = (newQuestion: Question) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: [...prevQuiz.questions, newQuestion],
        }));
        toast({
            title: 'Question added',
            description: 'Your new question has been added to the quiz.',
        });
    };

    const updateQuestion = (updatedQuestion: Question, index: number) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: prevQuiz.questions.map((q, i) =>
                i === index ? updatedQuestion : q,
            ),
        }));
        setEditingQuestionIndex(null);
        toast({
            title: 'Question updated',
            description: 'Your question has been updated successfully.',
        });
    };

    const removeQuestion = (index: number) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: prevQuiz.questions.filter((_, i) => i !== index),
        }));
        toast({
            title: 'Question removed',
            description: 'The question has been removed from the quiz.',
        });
    };

    const saveQuiz = () => {
        if (!quiz.title.trim()) {
            toast({
                title: 'Error',
                description: 'Quiz title cannot be empty.',
                variant: 'destructive',
            });
            return;
        }
        router.post(
            '/dashboard/create',
            {
                title: quiz.title,
                description: quiz.description,
                questions: quiz.questions,
            },
            {
                onError: (error) => {
                    console.error('Error creating quiz:', error);
                    toast({
                        title: 'Error',
                        description: 'Failed to save quiz. Please try again.',
                        variant: 'destructive',
                    });
                },
                onSuccess: () => {
                    toast({
                        title: 'Quiz saved',
                        description: 'Your quiz has been saved successfully.',
                    });
                },
            },
        );

    };

    const generateQuestion = async () => {
        setIsGeneratingQuestion(true);
        try {
            const aiQuestion = await generateAIQuestion();
            addQuestion(aiQuestion);
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    'Failed to generate AI question. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsGeneratingQuestion(false);
        }
    };

    return (
        <Card className="bg-white shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                    Create a New Quiz
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="quizTitle" className="text-gray-900">
                        Quiz Title
                    </Label>
                    <Input
                        id="quizTitle"
                        value={quiz.title}
                        onChange={(e) =>
                            setQuiz({ ...quiz, title: e.target.value })
                        }
                        placeholder="Enter quiz title"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="quizDescription" className="text-gray-900">
                        Quiz Description
                    </Label>
                    <Textarea
                        id="quizDescription"
                        value={quiz.description}
                        onChange={(e) =>
                            setQuiz({ ...quiz, description: e.target.value })
                        }
                        placeholder="Enter quiz description"
                        className="mt-1"
                    />
                </div>
                {quiz.questions.map((question, index) => (
                    <Card key={question.id} className="bg-gray-50">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-900">
                                Question {index + 1}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {editingQuestionIndex === index ? (
                                <QuestionForm
                                    initialQuestion={question}
                                    onAddQuestion={(updatedQuestion) =>
                                        updateQuestion(updatedQuestion, index)
                                    }
                                    onCancel={() =>
                                        setEditingQuestionIndex(null)
                                    }
                                />
                            ) : (
                                <div>
                                    <p className="text-3xl font-medium">
                                        {question.text}
                                    </p>
                                    <div className="mt-2 space-y-1">
                                        {question.type === 'multiple-choice' &&
                                            question.answers.map(
                                                (answer, i) => (
                                                    <div
                                                        key={i}
                                                        className={
                                                            i ===
                                                            question.correctAnswer
                                                                ? 'font-bold'
                                                                : ''
                                                        }
                                                    >
                                                        {i ===
                                                        question.correctAnswer
                                                            ? '✓ '
                                                            : ''}
                                                        {answer}
                                                    </div>
                                                ),
                                            )}
                                        {question.type === 'true-false' && (
                                            <p>
                                                Correct answer:{' '}
                                                {question.correctAnswer
                                                    ? 'True'
                                                    : 'False'}
                                            </p>
                                        )}
                                        {question.type === 'short-answer' && (
                                            <p>
                                                Correct answer:{' '}
                                                {question.correctAnswer}
                                            </p>
                                        )}
                                        {question.type === 'essay' &&
                                            question.sampleAnswer && (
                                                <p>
                                                    Sample answer:{' '}
                                                    {question.sampleAnswer}
                                                </p>
                                            )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="justify-end space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingQuestionIndex(index)}
                                disabled={editingQuestionIndex !== null}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeQuestion(index)}
                            >
                                Remove
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                <QuestionForm onAddQuestion={addQuestion} />
                <div className="flex justify-between">
                    <Button
                        onClick={() =>
                            setEditingQuestionIndex(quiz.questions.length)
                        }
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Question Manually
                    </Button>
                    <Button
                        onClick={generateQuestion}
                        disabled={isGeneratingQuestion}
                    >
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isGeneratingQuestion
                            ? 'Generating...'
                            : 'Generate AI Question'}
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={saveQuiz} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Save Quiz
                </Button>
            </CardFooter>
        </Card>
    );
}

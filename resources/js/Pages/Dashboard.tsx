import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';



import QuizList from '@/Components/pages/quiz/QuizList';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

export default function Home() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-white">
                <main className="container mx-auto p-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-black">
                            Your Quizzes
                        </h1>
                        <Button asChild>
                            <Link href={route('make')}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Create
                                New Quiz
                            </Link>
                        </Button>
                    </div>
                    <QuizList />
                </main>
            </div>
        </AuthenticatedLayout>
    );
}

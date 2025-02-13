import QuizMaker from '@/Components/pages/quiz/QuizMaker';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <main className="container mx-auto p-4">
                <h1 className="mb-8 text-center text-3xl font-bold">
                    Smart Quiz
                </h1>
                <QuizMaker />
            </main>
        </AuthenticatedLayout>
    );
}

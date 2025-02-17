import Dashboard from '@/Components/pages/quiz';
import { Button } from '@/Components/ui/button';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { Quiz } from '../types/quiz';

export default function Home() {
    const { exams } = usePage().props as { exams?: Quiz[] };
    return (
        <Authenticated>
            <main className="container mx-auto p-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <Button asChild>
                        <Link href={route('make')}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Create New
                            Quiz
                        </Link>
                    </Button>
                </div>
                <Dashboard quiz={exams} />
            </main>
        </Authenticated>
    );
}

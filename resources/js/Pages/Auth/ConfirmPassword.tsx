import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

import InputError from '@/Components/auth/InputError';
import InputLabel from '@/Components/auth/InputLabel';
import PrimaryButton from '@/Components/auth/PrimaryButton';
import TextInput from '@/Components/auth/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Alert, AlertDescription } from '@/Components/ui/alert';


export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const [showError, setShowError] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const MAX_ATTEMPTS = 5;

    // Reset error state when password changes
    useEffect(() => {
        setShowError(false);
    }, [data.password]);

    const validatePassword = (password: string): boolean => {
        return password.length >= 8;
    };

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!validatePassword(data.password)) {
            setShowError(true);
            return;
        }

        if (attemptCount >= MAX_ATTEMPTS) {
            setShowError(true);
            return;
        }

        setAttemptCount(prev => prev + 1);

        post(route('password.confirm'), {
            onSuccess: () => {
                reset('password');
                setAttemptCount(0);
            },
            onError: () => {
                setShowError(true);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Secure Area Access
                </h1>

                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </AlertDescription>
                </Alert>

                {showError && attemptCount >= MAX_ATTEMPTS && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>
                            Too many failed attempts. Please try again later or contact support.
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-gray-700 dark:text-gray-300"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            aria-describedby="password-requirements"
                            autoComplete="current-password"
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />

                        {showError && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                Invalid password. Please try again.
                            </p>
                        )}

                        <p id="password-requirements" className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Password must be at least 8 characters long
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Attempts remaining: {MAX_ATTEMPTS - attemptCount}
                        </span>
                        <PrimaryButton
                            disabled={processing || attemptCount >= MAX_ATTEMPTS}
                            className="ms-4"
                        >
                            {processing ? 'Confirming...' : 'Confirm'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

import InputError from '@/Components/auth/InputError';
import PrimaryButton from '@/Components/auth/PrimaryButton';
import TextInput from '@/Components/auth/TextInput';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            await post(route('password.email'));
            // Clear form on successful submission
            reset('email');
        } catch (error) {
            console.error('Password reset request failed:', error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Head title="Forgot Password" />
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                        Reset Password
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <Alert variant="default" className="mb-4">
                        <AlertDescription>{status}</AlertDescription>
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email Address
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your email address"
                            aria-describedby={
                                errors.email ? 'email-error' : undefined
                            }
                            required
                        />
                        {errors.email && (
                            <InputError
                                message={errors.email}
                                className="mt-2"
                                id="email-error"
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end">
                        <PrimaryButton
                            className="w-full sm:w-auto"
                            disabled={processing}
                            type="submit"
                        >
                            {processing ? (
                                <>
                                    <svg
                                        className="mr-2 h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending Link...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

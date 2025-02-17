'use client';

import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LogOut, Menu, Settings, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
];

// Mock authentication state
const isAuthenticated = false;
// const user = {
//   name: "Jane Doe",
//   email: "jane@example.com",

// }

export default function Header() {
    const [user, setUser] = useState<Record<any, any>>({});
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const auth = usePage().props.auth;

    useEffect(() => {
        if (!auth.user) {
            setUser({});
            return;
        }
        setisAuthenticated(true);
        setUser(auth.user);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-800/90'
                    : 'bg-white dark:bg-gray-800'
            } `}
        >
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link
                        href="/"
                        className="-m-1.5 flex items-center gap-2 p-1.5 transition-transform hover:scale-105"
                    >
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Smart Quiz
                        </span>
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open main menu"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="group relative text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-10 w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background transition-all hover:ring-4"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary/10">
                                            {user?.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    My Quizzes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <Link href="/profile">
                                        Account Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-4">
                            <Button variant="ghost" asChild>
                                <Link href="/register">Sign up</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div
                        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-800 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <img
                                    className="h-8 w-auto rounded-lg"
                                    src="/placeholder.svg?height=32&width=32"
                                    alt=""
                                />
                                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    Smart Quiz
                                </span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {isAuthenticated ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-x-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-primary/10">
                                                        {user.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                                    {user.name}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start"
                                                >
                                                    <BookOpen className="mr-2 h-4 w-4" />
                                                    My Quizzes
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start"
                                                >
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Account Settings
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    className="w-full justify-start"
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Log out
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                asChild
                                                variant="outline"
                                                className="w-full"
                                            >
                                                <Link href="/register">
                                                    Sign up
                                                </Link>
                                            </Button>
                                            <Button asChild className="w-full">
                                                <Link href="/login">
                                                    Log in
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

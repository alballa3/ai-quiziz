import ApplicationLogo from '@/Components/auth/ApplicationLogo';
import Header from '@/Components/pages/layout/header';
import Footer from '@/Components/pages/layout/navbar';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div >
            <Header/>

            <div >
                {children}
            </div>
            <Footer/>
        </div>
    );
}

import Aside from '@/components/dashboard/layout/aside';
import Header from '@/components/dashboard/layout/header';
import {ReactNode} from 'react';
import {Toaster} from 'sonner';

export default function AuthLayout(
    {
        children,
    }: {
        children: ReactNode;
    },
) {

    return (
        <>
            <Header/>
            <div className="flex flex-1">
                <Aside/>
                <main className="flex-1">{children}</main>
                <Toaster
                    closeButton
                    richColors
                />
            </div>
        </>
    );
}

import {stackServerApp} from '@/modules/stack/server';
import {StackProvider, StackTheme} from '@stackframe/stack';
import type {Metadata} from 'next';
import '@/styles/scss/dashboard/globals.scss';
import {ReactNode} from 'react';

export const metadata: Metadata = {
    title: {
        default: 'MoldStud Dashboard',
        template: '%s | MoldStud Dashboard',
    },
    description: 'Manage all resources related with MoldStud website.',
};

// TODO: Fix the HTML structure, and move the TailwindCSS classes to a separate style file.
export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>,
) {
    return (
        <StackProvider app={stackServerApp}>
            <StackTheme>
                {children}
            </StackTheme>
        </StackProvider>
    );
}

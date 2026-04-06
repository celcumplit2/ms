import {stackServerApp} from '@/modules/stack/server';
import {StackProvider, StackTheme} from '@stackframe/stack';
import {Inter} from 'next/font/google';
import {ReactNode} from 'react';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    display: 'swap',
    variable: '--font-inter',
});

export default function AuthLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={inter.variable}>
        <body>
        <StackProvider app={stackServerApp}>
            <StackTheme>
                {children}
            </StackTheme>
        </StackProvider>
        </body>
        </html>
    );
}

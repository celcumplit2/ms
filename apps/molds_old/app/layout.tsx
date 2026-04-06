import {ReactNode} from 'react';
import {Inter} from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    display: 'swap',
    variable: '--font-inter',
});

// RootLayout is necessary to handle the `not-found`, `error`, and `global-error` files at the root level.
// To enable optimized fonts, we use a hack: adding a CSS variable by applying a class to the <html> tag.
export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en" className={inter.variable}>
        <body>
        {children}
        </body>
        </html>
    );
}

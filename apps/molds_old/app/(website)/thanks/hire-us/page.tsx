import styles from '@/styles/scss/thanks/thanks-page.module.scss';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Your inquiry has been received - We’ll be in touch soon',
    description: 'Our team is reviewing your request and will contact you within 1-3 business days to discuss your project and next steps.',
    alternates: {
        canonical: '/thanks/hire-us',
    },
};

export default function ThanksHireUsPage() {
    return (
        <section className={styles['content']}>
            <Image src="/images/thanks/icon-check.svg" height="84" width="84" alt="Check Mark Icon" loading="lazy"/>
            <h1>Thank you!</h1>
            <p>Your request has been received, and our team will review it promptly. We’ll reach out within 1-3 business days to discuss your project and the next steps.</p>
            <p>We look forward to working with you!</p>
            <Link href="/">Go home</Link>

            <ul>
                <li>
                    <Link href="/services">
                        <Image src="/images/404/icon-cube.svg" height="48" width="48" alt="Cube Icon" loading="lazy"/>
                        <span><strong>Services</strong>Dive in to learn all about our services.</span>
                    </Link>
                </li>
                <li>
                    <Link href="/articles">
                        <Image src="/images/404/icon-book-open.svg" height="48" width="48" alt="Open Book Icon" loading="lazy"/>
                        <span><strong>Our articles</strong>Read the latest articles on our blog.</span>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

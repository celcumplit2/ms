import styles from '@/styles/scss/thanks/thanks-page.module.scss';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Your inquiry has been received - We’ll be in touch soon',
    description: 'Thank you for contacting us! Your inquiry has been received, and our team will respond within 1-3 business days to schedule your consultation. We look forward to assisting you.',
    alternates: {
        canonical: '/thanks/schedule-consultation',
    },
};

export default function ThanksScheduleConsultationPage() {
    return (
        <section className={styles['content']}>
            <Image src="/images/thanks/icon-check.svg" height="84" width="84" alt="Check Mark Icon" loading="lazy"/>
            <h1>Thank you!</h1>
            <p>Your inquiry has been received, and our team will get back to you within 1-3 business days to schedule your consultation.</p>
            <p>We look forward to connecting with you!</p>
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

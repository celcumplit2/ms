import styles from '@/styles/scss/thanks/thanks-page.module.scss';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Application received - Thank you for applying',
    description: 'Thank you for submitting your application. Our team will review your profile within 3 business days and contact you if it matches the role.',
    alternates: {
        canonical: '/thanks/apply-for-job',
    },
};

export default function ThanksApplyForJobPage() {
    return (
        <section className={styles['content']}>
            <Image src="/images/thanks/icon-check.svg" height="84" width="84" alt="Check Mark Icon" loading="lazy"/>
            <h1>Application Received!</h1>
            <p>Thank you for applying! We’ve successfully received your application.</p>
            <p>Our team will carefully review your submission, which may
                take up to 3 business days. If we find that your profile aligns with the role, we’ll reach out to you directly.</p>
            <p>We appreciate your interest in joining our team. Best of luck in your job search!</p>
            <Link href="/">Go home</Link>

            <ul>
                <li>
                    <Link href="/careers">
                        <Image src="/images/404/icon-cube.svg" height="48" width="48" alt="Cube Icon" loading="lazy"/>
                        <span><strong>Careers</strong>Dive in to learn all about our open positions.</span>
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

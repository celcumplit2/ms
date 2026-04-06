import ForOhForRedirect from '@/components/layout/for-oh-for-redirect';
import styles from '@/styles/scss/not-found.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <section className={styles['not-found']}>
            <span>404 Error</span>
            <h1>We can&#39;t find this page</h1>
            <p>The page you are looking for doesn&#39;t exist or has been moved.</p>
            <p>
                <Link href="/">Go home</Link>
            </p>
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
            <ForOhForRedirect/>
        </section>
    );
}

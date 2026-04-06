import Breadcrumbs from '@/components/common/breadcrumbs';
import {Metadata} from 'next';
import styles from '@/styles/scss/hire-us-page.module.scss';
import HireUsForm from '@/components/common/hire-us-form';

export const metadata: Metadata = {
    title: 'Hire Us',
    description: 'Hire MoldStud software development company and get your professional partner for your business ideas and ongoing projects.',
    alternates: {
        canonical: '/hire-us',
    },
};

export default function HireUsPage() {
    return (
        <>
            <Breadcrumbs links={[{label: 'Hire Us', href: '/hire-us'}]}/>
            <hgroup className={styles['heading']}>
                <p>Hire Us</p>
                <h1>Got a project for us?</h1>
                <p>We help brands and platforms turn big ideas into beautiful digital products and experiences.</p>
            </hgroup>
            <HireUsForm/>
        </>
    );
};

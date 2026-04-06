import Benefits from '@/components/common/benefits';
import Clients from '@/components/common/clients';
import ScheduleConsultationForm from '@/components/common/schedule-consultation-form';
import WCAG from '@/components/common/wcag';
import AccessibilityServices from '@/components/home/accessibility-services';
import Expertise from '@/components/home/expertise';
import Hero from '@/components/home/hero';
import Latest4Articles from '@/components/home/latest-4-articles';
import Services from '@/components/home/services';
import Values from '@/components/home/values';
import styles from '@/styles/scss/home/home-page.module.scss';
import {Metadata} from 'next';

export const dynamic = 'force-static';

export const revalidate = 14400; // 4 hours.

export const metadata: Metadata = {
    title: 'Custom software development company',
    description: 'As a custom software development company, we offer comprehensive solutions for proper software development adapted to the needs of customers. Our team is able to perfectly connect with our clients and use our skills and experience in order to fit their vision and their specific goals of a custom software development service.',
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    const benefits = [
        {
            icon: '/images/home/icon-status-up.svg',
            title: 'Expanded Reach and Inclusivity',
            subTitle: 'Unlocking New Horizons',
            description: 'Making your services accessible expands your audience significantly, welcoming users of all abilities and ensuring no one is left behind in the digital landscape.',
        },
        {
            icon: '/images/home/icon-security.svg',
            title: 'Compliance and Confidence',
            subTitle: 'Meeting Standards with Assurance',
            description: 'Adhering to WCAG 2.0 or 2.1 standards not only meets legal requirements for public entities but also instills confidence in your stakeholders, showcasing your commitment to accessibility and inclusivity.',
        },
        {
            icon: '/images/home/icon-story.svg',
            title: 'Brand Integrity and Social Responsibility',
            subTitle: 'Building a Legacy of Inclusiveness',
            description: 'Embracing accessibility reflects your organization\'s dedication to social responsibility, elevating your brand\'s reputation and aligning with the values of a diverse and modern audience.',
        },
        {
            icon: '/images/home/icon-path.svg',
            title: 'Enhanced User Experience (UX)',
            subTitle: 'Creating Seamless Interactions',
            description: 'Accessible design leads to a more intuitive and user-friendly experience for everyone, enhancing customer satisfaction and engagement across all platforms.',
        },
    ];

    return (
        <>
            <Hero/>
            <Clients className={styles['clients']}/>
            <AccessibilityServices className={styles['accessibility-services']}/>
            <Services className={styles['services']}/>
            <WCAG className={styles['wcag']}/>
            <Expertise className={styles['expertise']}/>
            <Benefits
                className={styles['benefits']}
                icon="/images/home/icon-benefits.svg"
                subHeading="Benefits"
                title="To Make Life Better for Everyone"
                description="Discover how embracing accessibility in your digital services not only broadens your reach and ensures compliance but also enhances user experience and reinforces your brand's commitment to inclusivity and social responsibility."
                benefits={benefits}
            />
            <Values className={styles['values']}/>
            <Latest4Articles className={styles['latest-4-articles']}/>
            <ScheduleConsultationForm className={styles['schedule-consultation-form']}/>
        </>
    );
}

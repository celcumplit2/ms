import Benefits from '@/components/common/benefits';
import Breadcrumbs, {BreadcrumbsLink} from '@/components/common/breadcrumbs';
import CaseStudies from '@/components/common/case-studies';
import FAQ from '@/components/common/faq';
import ScheduleConsultationForm from '@/components/common/schedule-consultation-form';
import WCAG from '@/components/common/wcag';
import {Metadata} from 'next';
import styles from '@/styles/scss/services/services-page.module.scss';
import Services from '@/components/services/services';
import ServiceHeading from '@/components/common/service-heading';

export const metadata: Metadata = {
    title: 'Software development services',
    description: 'Unlock top-tier software development services with our expert solutions. From custom applications to system integrations, our team delivers innovative and reliable technology to meet your business needs.',
    alternates: {
        canonical: '/services',
    },
};

export default function ServicesPage() {
    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Services', href: '/services'},
    ];
    const tags = [
        {
            name: 'Accessibility Auditing',
            url: '/services',
        },
        {
            name: 'Accessibility Consulting',
            url: '/services',
        },
        {
            name: 'Application Development',
            url: '/services',
        },
        {
            name: 'Artificial Intelligence Integration',
            url: '/services',
        },
        {
            name: 'Backend Development',
            url: '/services',
        },
        {
            name: 'Blockchain Development',
            url: '/services',
        },
        {
            name: 'Cloud Computing Services',
            url: '/services',
        },
        {
            name: 'Code Review and Optimization',
            url: '/services',
        },
        {
            name: 'Custom API Development',
            url: '/services',
        },
        {
            name: 'Cybersecurity Services',
            url: '/services',
        },
        {
            name: 'Data Analysis and Reporting',
            url: '/services',
        },
        {
            name: 'Database Design and Management',
            url: '/services',
        },
        {
            name: 'DevOps Services',
            url: '/services',
        },
        {
            name: 'E-commerce Development',
            url: '/services',
        },
        {
            name: 'Enterprise Software Solutions',
            url: '/services',
        },
        {
            name: 'Frontend Development',
            url: '/services',
        },
        {
            name: 'IT Infrastructure Management',
            url: '/services',
        },
        {
            name: 'IT Staff Augmentation',
            url: '/services',
        },
        {
            name: 'Machine Learning Development',
            url: '/services',
        },
        {
            name: 'Mobile App Development',
            url: '/services',
        },
        {
            name: 'Network Architecture Design',
            url: '/services',
        },
        {
            name: 'Performance Testing',
            url: '/services',
        },
        {
            name: 'Product Design and Development',
            url: '/services',
        },
        {
            name: 'Quality Assurance Testing',
            url: '/services',
        },
        {
            name: 'Responsive Web Design',
            url: '/services',
        },
        {
            name: 'Search Engine Optimization (SEO)',
            url: '/services',
        },
        {
            name: 'Server Management and Monitoring',
            url: '/services',
        },
        {
            name: 'Software Architecture Design',
            url: '/services',
        },
        {
            name: 'Software Maintenance and Support',
            url: '/services',
        },
        {
            name: 'Systems Integration',
            url: '/services',
        },
        {
            name: 'Tech Stack Consulting',
            url: '/services',
        },
        {
            name: 'Virtual Reality Development',
            url: '/services',
        },
        {
            name: 'Web Application Development',
            url: '/services',
        },
        {
            name: 'Web Hosting and Management',
            url: '/services',
        },
        {
            name: 'Wireless Networking Consulting',
            url: '/services',
        },
    ];
    const caseStudies = [
        {
            title: 'Custom Software Development',
            category: 'Inventory Management System',
            challenge: 'A logistics company needing a custom inventory management system.',
            solution: 'Develop a tailored software solution to streamline inventory tracking and management.',
            outcome: 'Enhanced efficiency, reduced errors, and improved inventory control.',
        },
        {
            title: 'Accessibility Consulting',
            category: 'Website',
            challenge: 'An educational institution requiring website compliance with accessibility standards.',
            solution: 'Provide comprehensive accessibility auditing and consulting to ensure the website meets all accessibility guidelines.',
            outcome: 'Increased website usability for all users, including those with disabilities, and compliance with legal standards.',
        },
        {
            title: 'IT Staff Augmentation',
            category: 'VR Wardrobe Selection Tool',
            challenge: 'A startup needing additional IT expertise for a short-term project.',
            solution: 'Supply skilled IT professionals to augment the startup\'s team.',
            outcome: 'The project is completed on time with expert input, enhancing the startup\'s capabilities.',
        },
        {
            title: 'Cloud Computing Services',
            category: 'Cloud Computing Solution',
            challenge: 'A media company needing scalable storage and computing resources for video processing.',
            solution: 'Implement a cloud computing solution providing scalable resources and improved data management.',
            outcome: 'Enhanced processing capabilities, cost-effective scalability, and streamlined media management.',
        },
    ];
    const benefits = [
        {
            icon: '/images/services/icon-forward-item.svg',
            title: 'Enhanced Digital Accessibility Across All Platforms',
            description: 'MoldStud ensures your digital platforms are accessible to all users, including those with disabilities. This commitment not only meets legal compliance but also expands your audience reach.',
        },
        {
            icon: '/images/services/icon-3d-cube.svg',
            title: 'Customized Software Development for Unique Needs',
            description: 'Every industry has unique challenges. MoldStud specializes in creating bespoke software solutions tailored to meet these specific industry requirements, enhancing operational efficiency and user experience.',
        },
        {
            icon: '/images/services/icon-keyboard.svg',
            title: 'Comprehensive IT Support for Continuous Excellence',
            description: 'With MoldStud, you receive continuous IT support ensuring your systems are always running smoothly. Our proactive approach minimizes downtime and maximizes productivity.',
        },
        {
            icon: '/images/services/icon-medal.svg',
            title: 'Adherence to Industry Standards and Best Practices',
            description: 'MoldStud stays abreast of the latest industry standards and best practices, ensuring that your solutions are not only innovative but also compliant and reliable.',
        },
    ];
    const faq = [
        {
            question: 'What types of custom software development does MoldStud offer?',
            answer: 'MoldStud specializes in creating tailored software solutions, including web applications, mobile apps, enterprise software, and specialized tools for various industries, ensuring each product is aligned with the client\'s specific needs.',
        },
        {
            question: 'How does MoldStud approach digital accessibility in its projects?',
            answer: 'Our approach is holistic, ensuring compliance with international accessibility standards. We conduct thorough audits, offer comprehensive consulting, and implement accessible design in all our projects, making digital products usable for everyone.',
        },
        {
            question: 'What is involved in MoldStud\'s IT staff augmentation service?',
            answer: 'Our staff augmentation service provides skilled IT professionals who integrate with your team, offering the expertise needed for specific projects or roles, whether short-term or long-term, enhancing your team\'s capabilities effectively.',
        },
        {
            question: 'Can MoldStud help migrate my business to the cloud?',
            answer: 'Yes, MoldStud offers comprehensive cloud migration services. We assess your current infrastructure, plan the migration process, and ensure a smooth transition to the cloud, enhancing your business\'s scalability and efficiency.',
        },
        {
            question: 'Does MoldStud offer ongoing support and maintenance for its services?',
            answer: 'Absolutely. We provide continuous support and maintenance for all our services, ensuring your software and systems remain up-to-date, secure, and efficient, adapting to evolving business needs.',
        },
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <ServiceHeading
                title="Accessible Design and Development Services are the Future of IT"
                subHeading="Together, We Can Redefine Technology"
                quote="At MoldStud, we&apos;re not just about offering services; we&apos;re about crafting a future where technology and innovation converge to create smarter solutions. Our commitment is to make your IT products more accessible, tailored to your unique needs."
            />
            <Services
                tags={tags}
                title="MoldStud Offers a Complete List of Professional IT Services"
                subHeading="Services"
                description={
                    <>
                        Core services include <strong>Business Analysis, UX/UI Design, Front-End Development, Back-End Development, Cloud
                        Infrastructure, and QA Testing.</strong> Get everything you need for full-cycle software development for your web or mobile
                        application.
                    </>
                }
                note={
                    <>
                        Don’t see the service you need? Reach out to us at <a href="mailto:info@moldstud.com">info@moldstud.com</a>, and let us know
                        more about your industry and what you need help with.
                    </>
                }
            />
            <CaseStudies
                className={styles['case-studies']}
                subHeading="Services That Empower and Promote Accessibility in Design and Functionality"
                caseStudies={caseStudies}
            />
            <Benefits
                className={styles['benefits']}
                icon="/images/services/icon-benefits.svg"
                subHeading="Benefits"
                title="Why you Should Choose MoldStud"
                benefits={benefits}
            />
            <WCAG className={styles['wcag']}/>
            <FAQ className={styles['faq']} faq={faq}/>
            <ScheduleConsultationForm className={styles['schedule-consultation-form']}/>
        </>
    );
}

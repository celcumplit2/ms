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
    title: 'Software development technologies',
    description: 'Explore the latest in software development technologies with our comprehensive guide. Discover cutting-edge tools, programming languages, and frameworks to elevate your coding skills and drive innovation.',
    alternates: {
        canonical: '/technologies',
    },
};

export default function TechnologiesPage() {
    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Technologies', href: '/technologies'},
    ];
    const tags = [
        {
            name: 'JavaScript',
            url: '/technologies',
        },
        {
            name: 'React.js',
            url: '/technologies',
        },
        {
            name: 'Angular',
            url: '/technologies',
        },
        {
            name: 'Node.js',
            url: '/technologies',
        },
        {
            name: 'Svelte',
            url: '/technologies',
        },
        {
            name: 'NextJS',
            url: '/technologies',
        },
        {
            name: 'NuxtJS',
            url: '/technologies',
        },
        {
            name: 'SvelteKit',
            url: '/technologies',
        },
        {
            name: 'Remix',
            url: '/technologies',
        },
        {
            name: 'Python',
            url: '/technologies',
        },
        {
            name: 'Ruby on Rails',
            url: '/technologies',
        },
        {
            name: 'Java',
            url: '/technologies',
        },
        {
            name: '.NET',
            url: '/technologies',
        },
        {
            name: 'PHP',
            url: '/technologies',
        },
        {
            name: 'C#',
            url: '/technologies',
        },
        {
            name: 'C++',
            url: '/technologies',
        },
        {
            name: 'Erlang',
            url: '/technologies',
        },
        {
            name: 'Scala',
            url: '/technologies',
        },
        {
            name: 'MySQL',
            url: '/technologies',
        },
        {
            name: 'MongoDB',
            url: '/technologies',
        },
        {
            name: 'PostgreSQL',
            url: '/technologies',
        },
        {
            name: 'Oracle',
            url: '/technologies',
        },
        {
            name: 'Microsoft SQL Server',
            url: '/technologies',
        },
        {
            name: 'AWS (Amazon Web Services)',
            url: '/technologies',
        },
        {
            name: 'Microsoft Azure',
            url: '/technologies',
        },
        {
            name: 'Google Cloud Platform',
            url: '/technologies',
        },
        {
            name: 'IBM Cloud',
            url: '/technologies',
        },
        {
            name: 'Salesforce',
            url: '/technologies',
        },
        {
            name: 'Swift',
            url: '/technologies',
        },
        {
            name: 'Kotlin',
            url: '/technologies',
        },
        {
            name: 'React Native',
            url: '/technologies',
        },
        {
            name: 'Xamarin',
            url: '/technologies',
        },
        {
            name: 'Flutter',
            url: '/technologies',
        },
        {
            name: 'GoLang',
            url: '/technologies',
        },
        {
            name: 'Laravel',
            url: '/technologies',
        },
        {
            name: 'Django',
            url: '/technologies',
        },
        {
            name: 'Spring',
            url: '/technologies',
        },
    ];
    const caseStudies = [
        {
            title: 'React.js, Node.js, MongoDB',
            category: 'Web Application',
            challenge: 'A startup needed a scalable, real-time collaboration platform.',
            solution: 'Developed using React.js, Node.js, and MongoDB for a seamless user interface, fast backend processing, and efficient data handling.',
            outcome: 'A robust, scalable web application enhancing real-time collaboration and user engagement.',
        },
        {
            title: 'AWS, Terraform, Docker',
            category: 'Cloud Infrastructure',
            challenge: 'An e-commerce company required a more efficient deployment process.',
            solution: 'Integrated AWS for cloud services, Docker for containerization, and Github Actions for automated deployment.',
            outcome: 'Streamlined deployment process, enhanced scalability, and reduced downtime.',
        },
        {
            title: 'Flutter, Firebase, Google Cloud Platform',
            category: 'Mobile Application',
            challenge: 'A healthcare provider needed a cross-platform mobile app for patient management.',
            solution: 'Used Flutter for cross-platform app development, Firebase for backend services, and Google Cloud Platform for additional cloud resources.',
            outcome: 'Efficient, scalable mobile app accessible on multiple devices, improving patient management.',
        },
        {
            title: 'Kotlin, PostgreSQL, Azure',
            category: 'Mobile Application (Android)',
            challenge: 'A financial institution sought a secure and robust mobile banking app.',
            solution: 'Developed with Kotlin for native Android performance, PostgreSQL for database management, and Azure for cloud computing needs.',
            outcome: 'A secure, high-performance banking app enhancing user experience and financial security.',
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
            question: 'How does MoldStud stay updated with emerging technologies?',
            answer: 'We continuously explore and adopt emerging technologies through ongoing training, partnerships, and industry research, ensuring we offer the most advanced and effective solutions.',
        },
        {
            question: 'Can MoldStud integrate new technologies into my existing systems?',
            answer: 'Yes, we specialize in seamlessly integrating new technologies with existing systems, ensuring compatibility and enhancing functionality without disrupting your current operations.',
        },
        {
            question: 'What measures does MoldStud take to ensure technology scalability?',
            answer: 'The solutions we build are designed with scalability in mind, using modular architectures and cloud technologies to ensure they can grow and adapt with your business needs.',
        },
        {
            question: 'How does MoldStud approach cybersecurity in its technological solutions?',
            answer: 'Cybersecurity is a top priority. We implement robust security protocols, conduct regular vulnerability assessments, and stay updated with the latest security practices.',
        },
        {
            question: 'Does MoldStud provide training or support for the technologies implemented?',
            answer: 'Absolutely. We offer comprehensive training and support to ensure your team is confident and capable of using the new technologies effectively.',
        },
        {
            question: 'How does MoldStud choose the right technology stack for a project?',
            answer: 'We consider factors like project requirements, scalability, security, and client preferences to choose the most suitable technology stack, ensuring optimal performance and efficiency.',
        },
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <ServiceHeading
                title="Work with a Vendor that has Extensive Experience in Legacy and Modern Technologies"
                subHeading="Together, We Can Redefine Technology"
                quote="At MoldStud, we believe in the harmony of legacy and modern technologies. Our extensive experience across various technological realms enables us to blend tried-and-true methods with cutting-edge innovations, ensuring our clients receive solutions that are not only advanced but also rooted in proven reliability."
            />
            <Services
                tags={tags}
                title="MoldStud Operates with a Powerful Tech Stack; a Blend of Legacy and Modern Technologies"
                subHeading="Technologies"
                note={
                    <>
                        Don’t see your technology? Reach out to us at <a href="mailto:info@moldstud.com">info@moldstud.com</a>, and let us know more
                        about your industry and what you need help with.
                    </>
                }
            />
            <CaseStudies
                className={styles['case-studies']}
                subHeading="Technologies that are Empowering Accessible Digital Solutions"
                caseStudies={caseStudies}
            />
            <Benefits
                icon="/images/services/icon-benefits.svg"
                subHeading="Benefits"
                title="Why you Should Choose MoldStud"
                benefits={benefits}
            />
            <WCAG className={styles['wcag']}/>
            <FAQ
                className={styles['faq']}
                faq={faq}
                description="Dive deeper into how MoldStud leverages a diverse range of technologies to deliver cutting-edge solutions. These FAQs provide insights into our technological capabilities, processes, and how we can bring your digital vision to life."
            />
            <ScheduleConsultationForm className={styles['schedule-consultation-form']}/>
        </>
    );
}

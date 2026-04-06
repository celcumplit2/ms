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
    title: 'Software development solutions',
    description: 'Find the perfect software development solutions tailored to your business needs. Our guide covers innovative technologies, custom applications, and scalable systems designed to enhance performance and drive success.',
    alternates: {
        canonical: '/solutions',
    },
};

export default function SolutionsPage() {
    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Solutions', href: '/solutions'},
    ];
    const tags = [
        {
            name: 'AI-Powered Chatbots',
            url: '/solutions',
        },
        {
            name: 'Augmented Reality Applications',
            url: '/solutions',
        },
        {
            name: 'Automated Reporting Systems',
            url: '/solutions',
        },
        {
            name: 'Telehealth Services',
            url: '/solutions',
        },
        {
            name: 'Cloud Storage Platforms',
            url: '/solutions',
        },
        {
            name: 'Content Management Systems',
            url: '/solutions',
        },
        {
            name: 'Customer Relationship Management (CRM) Tools',
            url: '/solutions',
        },
        {
            name: 'Enterprise Resource Planning (ERP) Systems',
            url: '/solutions',
        },
        {
            name: 'Financial Management Software',
            url: '/solutions',
        },
        {
            name: 'Fitness and Health Apps',
            url: '/solutions',
        },
        {
            name: 'Fleet Management Systems',
            url: '/solutions',
        },
        {
            name: 'Gaming and Entertainment Apps',
            url: '/solutions',
        },
        {
            name: 'Geolocation Services',
            url: '/solutions',
        },
        {
            name: 'HR Management Systems',
            url: '/solutions',
        },
        {
            name: 'Internet of Things (IoT) Applications',
            url: '/solutions',
        },
        {
            name: 'Inventory Management Systems',
            url: '/solutions',
        },
        {
            name: 'Machine Learning Models',
            url: '/solutions',
        },
        {
            name: 'Online Booking Systems',
            url: '/solutions',
        },
        {
            name: 'Personal Finance Apps',
            url: '/solutions',
        },
        {
            name: 'Project Management Tools',
            url: '/solutions',
        },
        {
            name: 'Remote Work Solutions',
            url: '/solutions',
        },
        {
            name: 'Blockchain-Based Solutions',
            url: '/solutions',
        },
        {
            name: 'Social Media Management Platforms',
            url: '/solutions',
        },
        {
            name: 'Supply Chain Management Software',
            url: '/solutions',
        },
        {
            name: 'Sales Automation Tools',
            url: '/solutions',
        },
        {
            name: 'Virtual Reality Experiences',
            url: '/solutions',
        },
        {
            name: 'Voice Recognition Systems',
            url: '/solutions',
        },
        {
            name: 'Wearable Technology Apps',
            url: '/solutions',
        },
        {
            name: 'Web Development Platforms',
            url: '/solutions',
        },
        {
            name: 'Wireless Sensor Networks',
            url: '/solutions',
        },
        {
            name: 'Mobile Payment Systems',
            url: '/solutions',
        },
    ];
    const caseStudies = [
        {
            title: 'Customer Service Management System',
            category: 'AI',
            challenge: 'A retail company struggled with high customer inquiry volumes and slow response times.',
            solution: 'Developed an AI-powered chatbot to handle customer inquiries efficiently, providing quick and accurate responses.',
            outcome: 'Improved customer satisfaction rates and reduced workload for customer service staff.',
        },
        {
            title: 'Supply Chain Management System',
            category: 'Blockchain',
            challenge: 'A manufacturing company faced issues with supply chain transparency and tracking.',
            solution: 'Implemented a blockchain-based solution for real-time tracking and verification of supply chain activities.',
            outcome: 'Enhanced transparency, reduced fraud, and improved supply chain efficiency.',
        },
        {
            title: 'Telehealth Service Platform',
            category: 'Platform',
            challenge: 'A healthcare provider needed to expand its services remotely due to increasing demand for telehealth.',
            solution: 'Developed a secure, user-friendly telehealth platform, facilitating remote consultations and patient management.',
            outcome: 'Increased patient access to healthcare services and improved healthcare delivery efficiency.',
        },
        {
            title: 'Learning Management System',
            category: 'Augmented Reality (AR)',
            challenge: 'An educational institution sought innovative ways to enhance learning experiences.',
            solution: 'Created an AR application to provide interactive, immersive learning experiences for students.',
            outcome: 'Improved student engagement and understanding of complex concepts through interactive AR experiences.',
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
            question: 'What range of digital products does MoldStud offer?',
            answer: 'MoldStud specializes in a wide array of digital solutions including AI-powered tools, blockchain applications, telehealth services, and augmented reality experiences, each designed to meet specific business needs.',
        },
        {
            question: 'How does MoldStud ensure the quality of the digital products it designs and develops?',
            answer: 'Quality assurance is integral to our process. We conduct rigorous testing, including user acceptance testing, to ensure each product is reliable, user-friendly, and meets the highest standards. But the true value starts with business analysis, before anything is designed or developed.',
        },
        {
            question: 'Can MoldStud tailor a digital product to my specific business needs?',
            answer: 'Absolutely. Customization is at the core of our services. We work closely with clients to understand their specific requirements and tailor our digital products to align perfectly with their business objectives.',
        },
        {
            question: 'How does MoldStud approach user experience in its digital products?',
            answer: 'User experience is paramount. We focus on creating intuitive, accessible, and engaging interfaces, ensuring our digital products are not only functional but also enjoyable to use.',
        },
        {
            question: 'What support does MoldStud provide post-launch of a digital product?',
            answer: 'Post-launch, we offer comprehensive support including maintenance, updates, and troubleshooting to ensure the ongoing effectiveness and smooth operation of the product.',
        },
        {
            question: 'How does MoldStud integrate emerging technologies into its product development?',
            answer: 'We stay at the forefront of technological advancements, incorporating cutting-edge technologies like AI, blockchain, and AR to create innovative and future-ready digital solutions.',
        },
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <ServiceHeading
                title="Turn your Idea Into a Digital Solution Designed and Developed with an Accessibility-First Approach"
                subHeading="Together, We Can Redefine Technology"
                quote="In the realm of digital innovation, MoldStud stands at the forefront, crafting products that aren&apos;t just solutions but gateways to an accessible future. We believe in creating digital products that not only solve today&apos;s challenges but also pave the way for new possibilities."
            />
            <Services
                tags={tags}
                title="MoldStud Designs and Develops Digital Solutions that Matter"
                subHeading="Solutions"
                note={
                    <>
                        Don’t see the solution you need? Reach out to us at <a href="mailto:info@moldstud.com">info@moldstud.com</a>, and let us know
                        more about your industry and what you need help with.
                    </>
                }
            />
            <CaseStudies
                className={styles['case-studies']}
                subHeading="Impactful Solutions That Were Built with Accessibility in Mind"
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
            <FAQ
                className={styles['faq']}
                faq={faq}
                description="Discover more about what kind of solutions MoldStud can design and develop to propel your business forward. Here are answers to some of the most frequently asked questions, providing deeper insights into our approach and capabilities."
            />
            <ScheduleConsultationForm className={styles['schedule-consultation-form']}/>
        </>
    );
};

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
    title: 'Software development industries',
    description: 'Discover how software development transforms various industries with our in-depth analysis. Explore industry-specific solutions and technologies that drive efficiency, innovation, and growth across different sectors.',
    alternates: {
        canonical: '/industries',
    },
};

export default function IndustriesPage() {
    const breadcrumbs: BreadcrumbsLink[] = [
        {label: 'Industries', href: '/industries'},
    ];
    const tags = [
        {
            name: 'Automotive',
            url: '/industries',
        },
        {
            name: 'Aerospace',
            url: '/industries',
        },
        {
            name: 'Banking',
            url: '/industries',
        },
        {
            name: 'Biotechnology',
            url: '/industries',
        },
        {
            name: 'Chemicals',
            url: '/industries',
        },
        {
            name: 'Construction',
            url: '/industries',
        },
        {
            name: 'Consumer Good',
            url: '/industries',
        },
        {
            name: 'Defense',
            url: '/industries',
        },
        {
            name: 'Food and Beverage',
            url: '/industries',
        },
        {
            name: 'Energy',
            url: '/industries',
        },
        {
            name: 'Information Technology',
            url: '/industries',
        },
        {
            name: 'Environmental Services',
            url: '/industries',
        },
        {
            name: 'Fashion',
            url: '/industries',
        },
        {
            name: 'Finance',
            url: '/industries',
        },
        {
            name: 'Education',
            url: '/industries',
        },
        {
            name: 'Healthcare',
            url: '/industries',
        },
        {
            name: 'Hospitality',
            url: '/industries',
        },
        {
            name: 'Pharmaceuticals',
            url: '/industries',
        },
        {
            name: 'Insurance',
            url: '/industries',
        },
        {
            name: 'Legal Services',
            url: '/industries',
        },
        {
            name: 'Manufacturing',
            url: '/industries',
        },
        {
            name: 'Media',
            url: '/industries',
        },
        {
            name: 'Mining',
            url: '/industries',
        },
        {
            name: 'Entertainment',
            url: '/industries',
        },
        {
            name: 'Real Estate',
            url: '/industries',
        },
        {
            name: 'Retail',
            url: '/industries',
        },
        {
            name: 'Software Development',
            url: '/industries',
        },
        {
            name: 'Telecommunication',
            url: '/industries',
        },
        {
            name: 'Logistic',
            url: '/industries',
        },
        {
            name: 'Textiles',
            url: '/industries',
        },
        {
            name: 'Tourism',
            url: '/industries',
        },
        {
            name: 'Transportation',
            url: '/industries',
        },
        {
            name: 'Utilities',
            url: '/industries',
        },
        {
            name: 'Waste-Management',
            url: '/industries',
        },
        {
            name: 'Water-Supply',
            url: '/industries',
        },
        {
            name: 'Wholesale Trade',
            url: '/industries',
        },
        {
            name: 'Wine and Spirits',
            url: '/industries',
        },
    ];
    const caseStudies = [
        {
            title: 'Healthcare Industry',
            category: 'Digital Patient Records System',
            challenge: 'Managing sensitive patient data efficiently and securely.',
            solution: 'Development of a bespoke digital records system with enhanced security and accessibility features.',
            outcome: 'Improved patient data management, enhanced privacy, and streamlined hospital workflows.',
        },
        {
            title: 'Retail Industry',
            category: 'Custom E-Commerce Platform',
            challenge: 'Creating a unique online shopping experience to stand out in a competitive market.',
            solution: 'Developing a user-friendly, customized e-commerce platform with advanced analytics.',
            outcome: 'Increased sales, better customer engagement, and insightful data analytics for strategic planning.',
        },
        {
            title: 'Education Industry',
            category: 'Interactive Learning Management System',
            challenge: 'Enhancing remote learning capabilities with engaging and accessible tools.',
            solution: 'Crafting an interactive and accessible learning management system tailored to educational institutions.',
            outcome: 'Improved student engagement, accessibility for all learners, and efficient educational content management.',
        },
        {
            title: 'Finance Industry',
            category: 'Secure Transaction Processing System',
            challenge: 'Ensuring secure and fast financial transactions for a banking institution.',
            solution: 'Implementing a robust transaction processing system with advanced security protocols.',
            outcome: 'Enhanced transaction security, improved customer trust, and streamlined banking operations.',
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
                title="Your Industry is Evolving, Don’t Get Left Behind. Design and Develop with an Inclusive-First Approach"
                subHeading="Together, We Can Redefine Technology"
                quote="At MoldStud, we redefine technological solutions across diverse sectors. Our commitment is to provide custom IT services that cater specifically to the unique demands of each industry we serve. Our expertise is geared towards innovation that speaks to your specific challenges."
            />
            <Services
                tags={tags}
                title="MoldStud Services Industries in Both the Private and Public Sectors"
                subHeading="Industries"
                note={
                    <>
                        Don’t see your industry? Reach out to us at <a href="mailto:info@moldstud.com">info@moldstud.com</a>, and let us know more
                        about your industry and what you need help with.
                    </>
                }
            />
            <CaseStudies
                className={styles['case-studies']}
                subHeading="Industries Empowered by Accessibility in Design and Functionality"
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
                description="Dive into our Faq section to gain deeper insights into how MoldStud can revolutionize your industry with cutting-edge IT solutions. Discover answers to common queries and understand our approach to solving your technological challenges in an accessible and inclusive way."
            />
            <ScheduleConsultationForm className={styles['schedule-consultation-form']}/>
        </>
    );
}

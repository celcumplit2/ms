import Breadcrumbs from '@/components/common/breadcrumbs';
import Clients from '@/components/common/clients';
import WCAG from '@/components/common/wcag';
import {Metadata} from 'next';
import Image from 'next/image';
import styles from '@/styles/scss/about-us-page.module.scss';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn more about us and our commitment to delivering exceptional software development services. Discover our mission, values, and the talented team dedicated to providing innovative solutions and outstanding client support.',
    alternates: {
        canonical: '/about-us',
    },
};

export default async function AboutUs() {
    const workflow = [
        {
            title: 'Initial Consultation and Requirements Gathering',
            description: 'The project kicks off with an in-depth consultation to understand the client\'s needs, objectives, and the problem they aim to solve with technology. This stage is crucial for gathering all necessary information to define the project scope.',
        },
        {
            title: 'Product Backlog Creation',
            description: 'Based on the initial consultation, a product backlog is created, listing all features, functions, and requirements of the final product. This backlog is a living document that evolves as the project progresses.',
        },
        {
            title: 'Sprint Planning',
            description: 'The team selects items from the product backlog to include in the upcoming sprint, a fixed period during which specific work has to be completed and made ready for review.',
        },
        {
            title: 'Sprint Execution',
            description: 'The development team works on the tasks defined in the sprint planning phase. Daily stand-up meetings help monitor progress and address any issues that arise.',
        },
        {
            title: 'Testing and Quality Assurance',
            description: 'Concurrently with development, rigorous testing ensures the product or features meet the required standards and function as intended. This includes both automated and manual testing methods.',
        },
        {
            title: 'Sprint Review and Retrospective',
            description: 'At the end of each sprint, the team reviews the work completed and presents it to stakeholders for feedback. A retrospective meeting is held to reflect on the sprint and identify areas for improvement.',
        },
        {
            title: 'Product Increment and Iteration',
            description: 'The completed sprint results in a potentially shippable product increment. Based on feedback, the product backlog is updated, and the process repeats from sprint planning for the next set of features until the product meets the final objectives.',
        },
        {
            title: 'Final Delivery and Deployment',
            description: 'Once all sprints are completed and the product fulfills all requirements and stakeholder expectations, it is finalized for deployment. The team ensures a smooth launch and transition.',
        },
        {
            title: 'Post-Launch Support and Maintenance',
            description: 'After the product is live, MoldStud provides ongoing support and maintenance to address any issues, updates, or further enhancements needed to ensure the product continues to perform optimally.',
        },
    ];

    return (
        <>
            <Breadcrumbs links={[{label: 'About Us', href: '/about-us'}]}/>
            <hgroup className={styles['heading']}>
                <p>Who We Are</p>
                <h1>MoldStud Is An Innovative IT Consulting And Development Company</h1>
                <p>We specialize in creating accessible and efficient technology solutions that bring a new meaning to human design.</p>
            </hgroup>
            <section className={styles['intro']}>
                <Image
                    src="/images/about-us/about-us.png"
                    alt="MoldStud Team"
                    width="1216"
                    height="560"
                    loading="lazy"
                    sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 735w, (min-wdith: 768px and width < 992px) 959w, (min-width: 992px) 1216w"
                />
                <p>Founded on the principles of innovation, accessibility, and efficiency, MoldStud has quickly established itself as a leader in IT
                    consulting and development. Under the visionary leadership of Vasile Crudu, who brings over 15 years of IT management experience
                    and a Master&apos;s Degree in International Transactions and Economic Diplomacy, MoldStud has committed to bridging the digital
                    divide with accessible and innovative technology solutions.</p>
                <p>Since its inception, MoldStud has been at the forefront of creating digital products and services that not only meet but exceed the
                    evolving needs of businesses and individuals alike. Our mission is to empower our clients by leveraging the latest technologies to
                    deliver solutions that are not just effective but truly transformative.</p>
            </section>
            <section className={styles['plan']}>
                <h2>Imagine A World Where The Technology We Used Were Truly Accessible For Everyone</h2>
                <p>We’re redefining technology. No matter how long it takes, we’ll ensure that everyone has an equal opportunity to innovation; one
                    website, one application at a time.</p>
                <div>
                    <div>
                        <dl>
                            <dt>
                                <Image src="/images/about-us/icon-note-favorite.svg" alt="Note Favorite Icon" width="48" height="48" loading="lazy"/>
                                Define
                            </dt>
                            <dd>
                                We start by understanding your unique challenges and goals, ensuring our solutions are perfectly tailored to meet your
                                needs.
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <Image src="/images/about-us/icon-presentation-chart.svg" alt="Presentation Chart Icon" width="48" height="48"
                                       loading="lazy"/>
                                Strategize
                            </dt>
                            <dd>
                                Crafting a bespoke strategy that aligns with your vision, we lay the groundwork for technology that transforms and
                                connects.
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <Image src="/images/about-us/icon-flag.svg" alt="Presentation Chart Icon" width="48" height="48" loading="lazy"/>
                                Execute
                            </dt>
                            <dd>
                                With precision and passion, we turn strategy into action, delivering accessible and impactful digital solutions that
                                make a difference.
                            </dd>
                        </dl>
                    </div>
                    <Image
                        src="/images/about-us/plan.png"
                        alt="Three people giving five"
                        width="576"
                        height="402"
                        loading="lazy"
                        sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 576w, (min-wdith: 768px and width < 992px) 576w, (min-width: 992px) 576w"
                    />
                </div>
            </section>
            <section className={styles['workflow']}>
                {workflow.map((item, index) => (
                    <article key={`workflow-${index}`}>
                        <span>{index + 1}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </article>
                ))}
            </section>
            <WCAG className={styles['wcag']}/>
            <Clients className={styles['clients']}/>
        </>
    );
}

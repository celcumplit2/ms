import styles from '@/styles/scss/home/services.module.scss';
import {clsx} from 'clsx';
import Image from 'next/image';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

type ServicesProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export default function Services({className, ...restProps}: ServicesProps) {
    const services = [
        {
            icon: 'icon-accessibility.svg',
            name: 'Accessibility Compliance Consulting',
            description: 'Expert guidance to ensure your digital products meet legal and ethical accessibility standards.',
            url: '',
        },
        {
            icon: 'icon-pen-tool.svg',
            name: 'Accessible UX/UI Design Services',
            description: 'Designing user interfaces and experiences that are intuitive and accessible for all users, including those with disabilities.',
            url: '',
        },
        {
            icon: 'icon-code.svg',
            name: 'Digital Accessibility Implementation',
            description: 'Implementing accessibility features into digital products to enhance usability for a diverse user base.',
            url: '',
        },
        {
            icon: 'icon-document-code.svg',
            name: 'Accessibility Compliance Documentation',
            description: 'Creating comprehensive documentation to demonstrate and maintain compliance with accessibility standards.',
            url: '',
        },
        {
            icon: 'icon-forward-item.svg',
            name: 'Cross-Platform Accessibility Integration',
            description: 'Ensuring consistent accessibility across various platforms and devices for a seamless user experience.',
            url: '',
        },
        {
            icon: 'icon-smileys.svg',
            name: 'Staff Augmentation',
            description: 'Providing skilled professionals to supplement your team in creating accessible digital products.',
            url: '',
        },
        {
            icon: 'icon-scroll.svg',
            name: 'Accessible Web Development',
            description: 'Specializing in creating websites that are fully accessible, following WCAG guidelines to ensure usability for all users, including those with disabilities.',
            url: '',
        },
        {
            icon: 'icon-mobile.svg',
            name: 'Mobile Accessibility Development',
            description: 'Developing mobile applications with accessibility in mind, ensuring they are usable by people with various disabilities and comply with accessibility standards.',
            url: '',
        },
        {
            icon: 'icon-shop.svg',
            name: 'Accessible E-commerce Solutions',
            description: 'Crafting online shopping platforms that are accessible to all users, incorporating features that enhance usability for people with disabilities.',
            url: '',
        },
        {
            icon: 'icon-check.svg',
            name: 'Accessibility Auditing and Remediation',
            description: 'Conducting thorough audits of existing digital products for accessibility compliance and providing solutions to address and remediate any issues found.',
            url: '',
        },
        {
            icon: 'icon-element.svg',
            name: 'Accessible Content Management Systems (CMS)',
            description: 'Implementing CMS platforms that are accessible, allowing content creators to easily produce and manage accessible content.',
            url: '',
        },
        {
            icon: 'icon-weight.svg',
            name: 'Training and Workshops on Accessible Development',
            description: 'Offering educational sessions and workshops to train development teams on best practices in accessible web and application development.',
            url: '',
        },
    ];

    return (
        <section className={clsx(styles['services'], className)} {...restProps}>
            <hgroup>
                <p>Services</p>
                <h2>Accessible Design and Development Services</h2>
            </hgroup>
            {services.map((service) => (
                <article key={service.name}>
                    <Image src={`/images/home/${service.icon}`} alt={`${service.name} Abstract Icon`} width="62" height="62" loading="lazy"/>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                </article>
            ))}
        </section>
    );
}

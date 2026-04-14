import CookieConsentWrapper from '@/components/common/cookie-consent-wrapper';
import {Footer} from '@/components/layout/footer';
import {Header} from '@/components/layout/header';
import {BASE_URL} from '@/config';
import {GTM_ID} from '@/config/google.config';
import {GoogleTagManager} from '@next/third-parties/google';
import type {Metadata} from 'next';
import '@/styles/scss/main.scss';
import {ReactNode} from 'react';
import {Graph, Offer} from 'schema-dts';

export const metadata: Metadata = {
    title: {
        template: '%s | MoldStud',
        default: 'Custom software development company',
    },
    applicationName: 'MoldStud - Custom Software Development Company',
    metadataBase: BASE_URL,
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicons/favicon-16x16.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicons/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            url: '/favicons/android-chrome-192x192.png',
        },
        {
            rel: 'mask-icon',
            color: '#1570ef',
            url: '/favicons/safari-pinned-tab.svg',
        },
    ],
    other: {
        'msapplication-TileColor': '#FFFFFF',
        'msapplication-TileImage': '/favicons/mstile-144x144.png',
        'msapplication-config': '/favicons/browserconfig.xml',
        'theme-color': '#FFFFFF',
    },
    creator: 'MoldStud',
    openGraph: {
        title: 'MoldStud',
        description: 'We are a software development company with a great culture and skilled professionals that are focused on modern custom software development using the cutting-edge technologies and innovative tools. We aim to work with companies of any sizes from startups and family business to big corporations which tend to bring a clear and great values in their field and opt to become better than their competitors. We always align with our clients needs and develop the high quality custom software to provide the best result for them and increase their business value by making them more viable and valuable for their own customers. We tend to be part of 20% custom software development companies that bring the 80% of total value around the world.',
        url: '/',
        siteName: 'MoldStud',
        images: [new URL('/images/home/main.png', BASE_URL)],
        videos: [new URL('/videos/home-page-main.mp4', BASE_URL)],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    const organizationId = new URL('#organization', BASE_URL).toString();
    const services = [
        {
            name: 'Dedicated software development teams',
            description: 'We provide a fully independent and dedicated custom software development team that is completely engaged in development and maintenance of your own projects and services.',
            condition: 'Minimum term - 6 months',
        },
        {
            name: 'IT staff augmentation',
            description: 'We provide professional and skilled custom software developers or any other IT specialists that match your requirements and expectation, and become a part of your existent team with your own vision and rules.',
            condition: 'Minimum term - 3 months',
        },
        {
            name: 'Custom software development',
            description: 'We provide a fully customizable and progressive custom software development that strive to align well with your mission and goals and provide the best solutions, results and benefits for your business.',
        },
        {
            name: 'Web development',
            description: 'Get a high-quality and modern web application development with robust web experience for your customers, clients or employers based on cutting-edge technologies, tools and best approaches.',
        },
        {
            name: 'Mobile development',
            description: 'get a high-quality and modern mobile application development from scratch that solve exactly your problems and fit your needs with an impeccable final user experience.',
        },
        {
            name: 'Web design (UI/UX)',
            description: 'Get a memorable and effective web design that will make your brand recognizable around the world and will provides the best user experience for your customers, clients or employees.',
        },
        {
            name: 'Quality assurance & testing',
            description: 'Get a professional quality assurance & testing for your software to make it secure and bug-free and increase the customer satisfaction and your general services usability.',
        },
        {
            name: 'DevOps',
            description: 'Get your own DevOps engineers that will manage or develop your infrastructure using the cutting-edge tools and best-practices for an impeccable stability, scalability and performance.',
        },
        {
            name: 'Software integration',
            description: 'Get an extendable, maintainable, powerful and simple software integration between yours or your partner\'s software with maximum efficiency for your business and partnerships.',
        },
        {
            name: 'Application modernization',
            description: 'Get a modernization and transform your software into a flexible, scalable and secure one by using the latest innovative approaches and technologies with better performance.',
        },
        {
            name: 'Application maintenance & support',
            description: 'Get a software maintenance & support and provide a better experience for your customers or clients delivering always a stable and competitive services.',
        },
        {
            name: 'Consulting',
            description: 'Get a consultation and find the new software development trends, effective management strategies, optimized workflow process approaches that could help you to get ahead of your competitors.',
        },
    ];
    const jsonLd: Graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': new URL('#website', BASE_URL).toString(),
                url: new URL(BASE_URL).toString(),
                author: {'@id': organizationId},
                creator: {'@id': organizationId},
                copyrightHolder: {'@id': organizationId},
                maintainer: {'@id': organizationId},
                sourceOrganization: {'@id': organizationId},
            },
            {
                '@type': 'Organization',
                '@id': organizationId,
                name: 'MoldStud',
                url: new URL(BASE_URL).toString(),
                logo: new URL('/images/logo.svg', BASE_URL).toString(),
                image: new URL('/images/software-development-company.png', BASE_URL).toString(),
                email: 'info@moldstud.com',
                telephone: '+37368034879',
                description: 'We are a software development company with a great culture and skilled professionals that are focused on modern custom software development using the cutting-edge technologies and innovative tools. We aim to work with companies of any sizes from startups and family business to big corporations which tend to bring a clear and great values in their field and opt to become better than their competitors. We always align with our clients needs and develop the high quality custom software to provide the best result for them and increase their business value by making them more viable and valuable for their own customers. We tend to be part of 20% custom software development companies that bring the 80% of total value around the world.',
                address: {
                    '@type': 'PostalAddress',
                    '@id': new URL('#address', BASE_URL).toString(),
                    addressCountry: 'MD',
                    addressLocality: 'Chișinău',
                    postalCode: '2060',
                    streetAddress: 'blvd. Cuza-Vodă 1/1',
                },
                foundingLocation: {
                    '@type': 'Place',
                    'address': {
                        '@id': new URL('#address', BASE_URL).toString(),
                    },
                },
                sameAs: ['https://www.facebook.com/moldstud', 'https://www.linkedin.com/company/moldstud', 'https://twitter.com/moldstud'],
                brand: {
                    '@type': 'Brand',
                    '@id': new URL('#brand', BASE_URL).toString(),
                    name: 'MoldStud',
                    url: new URL(BASE_URL).toString(),
                    logo: new URL('/images/logo.svg', BASE_URL).toString(),
                    description: 'We are a software development company with a great culture and skilled professionals that are focused on modern custom software development using the cutting-edge technologies and innovative tools. We aim to work with companies of any sizes from startups and family business to big corporations which tend to bring a clear and great values in their field and opt to become better than their competitors. We always align with our clients needs and develop the high quality custom software to provide the best result for them and increase their business value by making them more viable and valuable for their own customers. We tend to be part of 20% custom software development companies that bring the 80% of total value around the world.',
                    sameAs: ['https://www.facebook.com/moldstud', 'https://www.linkedin.com/company/moldstud', 'https://twitter.com/moldstud'],
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    '@id': new URL('#offerCatalog', BASE_URL).toString(),
                    name: 'Software development services',
                    itemListElement: services.map((service) => {
                        const offer: Offer = {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                url: new URL(BASE_URL).toString(),
                                name: service.name,
                                description: service.description,
                                potentialAction: {
                                    '@type': 'OrderAction',
                                    name: 'Hire us',
                                    url: new URL('/hire-us', BASE_URL).toString(),
                                },
                            },
                        };

                        if (service.condition) {
                            offer.itemCondition = {
                                '@type': 'OfferItemCondition',
                                name: service.condition,
                            };
                        }

                        return offer;
                    }),
                },
            },
        ],
    };

    return (
        <>
            {process.env.NODE_ENV === 'production' && (<GoogleTagManager gtmId={GTM_ID}/>)}
            <Header/>
            <main id="main" className="site-main">{children}</main>
            <Footer/>
            <CookieConsentWrapper/>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </>
    );
}

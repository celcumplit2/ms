import Image from 'next/image';
import styles from '@/styles/scss/home/values.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface IValueItem {
    icon: string;
    name: string;
    description: string;
}

type ValuesProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

function ValueItem({value, index}: { value: IValueItem, index: number, key?: string }) {
    return (
        <>
            <h3>
                <Image src={`/images/home/${value.icon}`} alt={`${value.name} Abstract Icon`} width="48" height="48" loading="lazy"/>
                {value.name}
            </h3>
            <input type="checkbox" id={`value-${index}`}/>
            <p>{value.description}</p>
            <label htmlFor={`value-${index}`}>
                Read More
                <Image src="/images/home/chevron-down.svg" alt="Chevron Down" width="20" height="20" loading="lazy"/>
            </label>
        </>
    );
}

export default function Values({className, ...restProps}: ValuesProps) {
    const values: IValueItem[] = [
        {
            icon: 'icon-cd.svg',
            name: 'Empowering Every Individual',
            description: 'We\'re driven by the conviction that technology should be a bridge, not a barrier. Our mission is to create digital spaces where everyone, regardless of ability, can connect, learn, and thrive. By championing accessibility, we\'re not just complying with standards; we\'re opening doors to new possibilities for individuals and communities alike.',
        },
        {
            icon: 'icon-heart.svg',
            name: 'Innovation with a Heart',
            description: 'Our work goes beyond technical expertise; it\'s about infusing empathy into every line of code, every design element. We understand that at the core of every technological advancement lies the human experience. Our approach is to ensure that this experience is inclusive, enriching, and empowering for all.',
        },
        {
            icon: 'icon-blend.svg',
            name: 'Collaboration for Change',
            description: 'At MoldStud, we don\'t just work for our clients; we work with them. We believe in forging partnerships that are built on mutual respect and a shared vision for a more accessible future. Together, we\'re not just transforming technology; we\'re reshaping the way the world interacts.',
        },
        {
            icon: 'icon-like-shapes.svg',
            name: 'A Commitment to Excellence',
            description: 'Quality and accessibility are the heartbeats of our service. We dedicate ourselves to the meticulous craft of accessible design, ensuring that every project we undertake meets the highest standards of excellence and inclusivity. This is our promise to you, to the industry, and to the diverse communities we serve.',
        },
    ];

    return (
        <section className={clsx(styles['values'], className)} {...restProps}>
            <hgroup>
                <p>Values</p>
                <h2>At MoldStud, We Believe in a World Where Technology Unites Us All</h2>
                <p>Explore our core values that drive our commitment to creating inclusive, innovative technology solutions, fostering collaboration
                    for change, and upholding excellence in every aspect of our work.</p>
            </hgroup>
            <div>
                {values.map((value, index) => (
                    <ValueItem key={`${index}-${value.name}`} value={value} index={index}/>
                ))}
            </div>
            <Image
                src="/images/home/values.png"
                alt="Values - Abstract Image"
                width="576"
                height="624"
                loading="lazy"
                sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 576w, (min-wdith: 768px and width < 992px) 576w, (min-width: 992px) 576w"
            />
        </section>
    );
}

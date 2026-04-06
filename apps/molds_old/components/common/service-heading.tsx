import styles from '@/styles/scss/common/service-heading.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface ServiceHeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    title: string;
    subHeading: string;
    cta?: string;
    quote: string;
    author?: string;
}

export default function ServiceHeading(
    {
        title,
        subHeading,
        cta = 'Schedule a Consultation',
        quote,
        author = '–– Vasile Crudu, Founder and CEO at MoldStud',
        className,
        ...restProps
    }: ServiceHeadingProps,
) {
    return (
        <section className={clsx(styles['heading'], className)} {...restProps}>
            <hgroup>
                <p>{subHeading}</p>
                <h1>{title}</h1>
                <p><a href="#schedule-a-consultation">{cta}</a></p>
            </hgroup>
            <blockquote>
                <p>{quote}</p>
                <i>{author}</i>
            </blockquote>
        </section>
    );
}

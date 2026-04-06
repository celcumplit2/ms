import styles from '@/styles/scss/common/wcag.module.scss';
import {clsx} from 'clsx';
import Image from 'next/image';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

export default function WCAG({className, ...restProps}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <section className={clsx(styles['wcag'], className)} {...restProps}>
            <hgroup>
                <h2>Is Your Organization Expected to Meet the Requirements of WCAG 2.0 or WCAG 2.1?</h2>
                <p><a href="#schedule-a-consultation" className="cta">Schedule a Consultation</a></p>
            </hgroup>
            <div>
                <Image
                    src="/images/wcag.png"
                    alt="WCAG3 - Icon"
                    width="497"
                    height="338"
                    loading="lazy"
                    sizes="(width < 576px) 497w, (min-width: 576px and width < 768px) 497w, (min-wdith: 768px and width < 992px) 416w, (min-width: 992px) 497w"
                />
            </div>
        </section>
    );
}

import styles from '@/styles/scss/common/fag.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

interface FAQProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    faq: Array<{ question: string; answer: string; }>;
    title?: string;
    description?: string;
}

export default function FAQ({faq, title, description, className, ...restProps}: FAQProps) {
    return (
        <section className={clsx(styles['faq'], className)} {...restProps}>
            <hgroup>
                <p>FAQ</p>
                <h2>{title ?? 'Have questions about accessible design and development?'}</h2>
                <p>
                    {description ?? 'Discover more about how MoldStud\'s services can elevate your business through accessible design and development. Here are answers to some of the most frequently asked questions, providing deeper insights into our approach and capabilities.'}
                </p>
            </hgroup>
            <div>
                {faq.map((item) => (
                    <details key={item.question}>
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}

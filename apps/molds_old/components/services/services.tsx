import styles from '@/styles/scss/services/services.module.scss';
import TagCloud, {Tag} from '@/components/common/tag-cloud';
import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';
import {clsx} from 'clsx';

interface ServicesProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    tags: Tag[];
    title: string;
    subHeading: string;
    description?: ReactNode;
    note?: ReactNode;
}

export default function Services({title, tags, subHeading, description, note, className, ...restProps}: ServicesProps) {
    return (
        <section className={clsx(styles['services'], className)} {...restProps}>
            <hgroup>
                <p>{subHeading}</p>
                <h2>{title}</h2>
                {description && (<p>{description}</p>)}
            </hgroup>
            <TagCloud tags={tags}/>
            {note && (<p>{note}</p>)}
        </section>
    );
}

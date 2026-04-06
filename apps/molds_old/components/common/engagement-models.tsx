import styles from '@/styles/scss/common/engagement-models.module.scss';
import {clsx} from 'clsx';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

export default function EngagementModels({className, ...restProps}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <section className={clsx(styles['engagement-models'], className)} {...restProps}>
            <hgroup>
                <p>Engagement Models</p>
                <h2>Work on the engagement model would you prefer.</h2>
                <ul>
                    <li>Fixed Price</li>
                    <li>Times and Materials</li>
                    <li>Dedicated Team</li>
                    <li>Staff Augmentation</li>
                </ul>
            </hgroup>
        </section>
    );
}

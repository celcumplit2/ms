import Image from 'next/image';
import styles from '@/styles/scss/home/expertise.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

type ExpertiseProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export default function Expertise({className, ...restProps}: ExpertiseProps) {
    return (
        <section className={clsx(styles['expertise'], className)} {...restProps}>
            <hgroup>
                <p>Expertise</p>
                <h2>By Taking a Value-added Approach Focused on Human Experience</h2>
                <p>We humanize what was previously un-accessible to the masses: </p>
                <p>With our unique blend of analysis, approach, and execution expertise, we bring together the right people and resources to
                    tailor
                    solutions to your specific needs and goals.</p>
            </hgroup>
            <div>
                <dl>
                    <dt>
                        <Image src="/images/home/icon-search-status.svg" alt="Search Status Icon" width="48" height="48" loading="lazy"/>
                        Analysis
                    </dt>
                    <dd>Our team excels in conducting thorough analyses, leveraging data-driven insights to understand client needs and market
                        trends, forming
                        the foundation for tailored strategies.
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <Image src="/images/home/icon-ranking.svg" alt="Ranking Icon" width="48" height="48" loading="lazy"/>
                        Approach
                    </dt>
                    <dd>We adopt a client-centric approach, combining innovative thinking with proven methodologies to develop solutions that are
                        both
                        effective and sustainable in addressing specific challenges.
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <Image src="/images/home/icon-star.svg" alt="Star Icon" width="48" height="48" loading="lazy"/>
                        Execution
                    </dt>
                    <dd>Our execution is marked by precision and efficiency, ensuring that every project is implemented seamlessly, on time, and
                        with the
                        highest standards of quality, translating plans into tangible results.
                    </dd>
                </dl>
            </div>
            <Image
                src="/images/home/expertise.png"
                alt="A female on a whiteboard background with a pen and paper in her hand is looking into the camera."
                width="1216"
                height="516"
                loading="lazy"
                sizes="(width < 576px) 543w, (min-width: 576px and width < 768px) 735w, (min-wdith: 768px and width < 992px) 959w, (min-width: 992px) 1216w"
            />
        </section>
    );
}

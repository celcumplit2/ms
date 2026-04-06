import Image from 'next/image';
import styles from '@/styles/scss/common/clients.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

export default function Clients({className, ...restProps}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <section className={clsx(styles['clients'], className)} {...restProps}>
            <hgroup>
                <p>Clients</p>
                <h2>Together</h2>
                <p><strong>Our clients don’t just follow new regulations, they care about people.</strong> They care about making technology
                    accessible to
                    everyone so that their products and services can continue to have maximum impact.</p>
            </hgroup>
            <dl>
                <dt>
                    <Image src="/images/home/icon-sector-public.svg" alt="Courhouse Icon" width="48" height="48" loading="lazy"/>
                    Are You in Public Sector?
                </dt>
                <dd>Startup</dd>
                <dd>Scaleup</dd>
                <dd>Small Business</dd>
                <dd>Enterprise</dd>
            </dl>
            <dl>
                <dt>
                    <Image src="/images/home/icon-sector-private.svg" alt="House Icon" width="48" height="48" loading="lazy"/>
                    Are You in Private Sector?
                </dt>
                <dd>Startup</dd>
                <dd>Scaleup</dd>
                <dd>Small Business</dd>
                <dd>Enterprise</dd>
            </dl>
            <div>
                <video controls preload="none" width="343" height="172" poster="/images/home/main-video-cover.webp">
                    <source src="/videos/home-page-main.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
}

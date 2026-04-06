import Image from 'next/image';
import styles from '@/styles/scss/home/accessibility-services.module.scss';
import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {clsx} from 'clsx';

type AccessibilityServicesProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export default function AccessibilityServices({className, ...restProps}: AccessibilityServicesProps) {
    return (
        <section className={clsx(styles['accessibility-services'], className)} {...restProps}>
            <div>
                <hgroup>
                    <p>Services</p>
                    <h2>We Are Redefining Accessible Design and Development for Public and Private Organizations</h2>
                </hgroup>
                <p>At the intersection of Social Justice and Equality, Legal Recognition of Disability Rights, Business Considerations, Legal
                    Compliance and Public Service Accessibility, Human Rights and Ethical Obligations is where we live.</p>
                <p><strong>Our clients</strong> are striving to meet accessibility compliance regulations and work diligently to ensure their
                    digital and physical environments are inclusive and usable for all <span>individuals</span>, including those with disabilities.
                </p>
                <p><strong>They focus on removing barriers and enhancing user experiences, aligning their services and products with legal
                    standards and ethical considerations to cater to a diverse and broader audience.</strong> This commitment reflects a dedication to
                    social responsibility, legal compliance, and a drive to create equitable access for everyone.</p>
            </div>
            <div>
                <Image
                    src="/images/home/services.png"
                    alt="Smiling person looks into the camera."
                    width="576"
                    height="746"
                    loading="lazy"
                    sizes="(width < 576px) 544w, (min-width: 576px and width < 768px) 736w, (min-wdith: 768px and width < 992px) 959w, (min-width: 992px) 336w"
                />
            </div>
        </section>
    );
}

import styles from '@/styles/scss/home/hero.module.scss';
import Image from 'next/image';

export default function Hero() {
    return (
        <>
            <h1 className={styles['title']}>Together, We Can <span>Redefine Technology</span> Through Accessible Design and Development</h1>
            <p>No matter how long it takes, we’ll ensure that everyone has an equal opportunity to innovation; one website, one application at a
                time.</p>
            <a className={styles['cta']} href="#schedule-a-consultation">Schedule a Consultation</a>
            <Image
                className={styles['image']}
                src="/images/home/main.png"
                alt="Four people in a workplace are looking at the upper camera."
                width="1216"
                height="516"
                // loading="lazy"
                priority={true}
                sizes="(width < 576px) 544w, (min-width: 576px and width < 768px) 736w, (min-wdith: 768px and width < 992px) 960w, (min-width: 992px) 1216w"
            />
        </>
    );
}

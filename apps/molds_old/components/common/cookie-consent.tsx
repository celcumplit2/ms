'use client';

import Button from '@/components/forms/button';
import Checkbox from '@/components/forms/checkbox';
import Label from '@/components/forms/label';
import {LOCALSTORAGE_COOKIE_CONSENT_NAME} from '@/config/google.config';
import styles from '@/styles/scss/common/consent.module.scss';
import Link from 'next/link';
import {ChangeEvent, MouseEvent, useMemo, useState} from 'react';

type ConsentTab = 'consent' | 'details' | 'about';

interface ConsentPreferences {
    id?: string;
    statistic: boolean;
    marketing: boolean;
    date?: Date;
}

function getInitialIsOpen(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return localStorage.getItem(LOCALSTORAGE_COOKIE_CONSENT_NAME) === null;
}

function getInitialConsent(): ConsentPreferences {
    const defaultConsentPreferences = {
        statistic: true,
        marketing: true,
    };

    if (typeof window === 'undefined') {
        return defaultConsentPreferences;
    }

    const localStorageConsent = localStorage.getItem(LOCALSTORAGE_COOKIE_CONSENT_NAME);

    if (localStorageConsent === null) {
        return defaultConsentPreferences;
    }

    const jsonConsent = JSON.parse(localStorageConsent) as ConsentPreferences;

    if (jsonConsent.date) {
        jsonConsent.date = new Date(jsonConsent.date);
    }

    return jsonConsent;
}

function saveLocalStorageConsent(consent: ConsentPreferences): void {
    localStorage.setItem(LOCALSTORAGE_COOKIE_CONSENT_NAME, JSON.stringify({
        ...consent,
        id: consent.id ?? crypto.randomUUID(),
        date: consent.date ?? new Date(),
    }));
}

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState<boolean>(getInitialIsOpen());
    const [tab, setTab] = useState<ConsentTab>('consent');
    const [consent, setConsent] = useState<ConsentPreferences>(getInitialConsent());

    function handleConsentAllowance(consent: ConsentPreferences): void {
        saveLocalStorageConsent(consent);
        setIsOpen(false);
    }

    const onTabClick = (id: ConsentTab) => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        setTab(id);
    };

    const onCustomizeClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setTab('details');
    };

    const onAllowSelectionClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        handleConsentAllowance(consent);
    };

    const onAllowAllClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const newConsent = {
            ...consent,
            statistic: true,
            marketing: true,
        };

        setConsent(newConsent);
        handleConsentAllowance(newConsent);
    };

    const onChangeConsent = (event: ChangeEvent<HTMLInputElement>) => {
        const newConsent = {
            ...consent,
            [event.target.name]: event.target.checked,
        };

        setConsent(newConsent);
    };

    const isConsentTabActive = useMemo(() => tab === 'consent', [tab]);
    const isDetailsTabActive = useMemo(() => tab === 'details', [tab]);
    const isAboutTabActive = useMemo(() => tab === 'about', [tab]);

    return (
        <dialog className={styles['consent']} open={isOpen}>
            <div>
                {isConsentTabActive && (
                    <section>
                        <h6>This website uses cookies</h6>
                        <p>We use cookies to personalise content and ads, to provide social media features and to analyse our traffic.</p>
                    </section>
                )}

                {isDetailsTabActive && (
                    <section>
                        <ul>
                            <li>
                                <Label>
                                    <Checkbox name="necessary" checked disabled/> Necessary
                                </Label>
                                <p>Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure
                                    areas of the website. The website cannot function properly without these cookies.</p>
                                <details>
                                    <summary>Google reCaptcha</summary>
                                    <p>Google reCaptcha enables web hosts to distinguish between human and automated access to websites.</p>
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>
                                    <p><span>_GRECAPTCHA</span><span>_grecaptcha</span></p>
                                </details>
                            </li>
                            <li>
                                <Label>
                                    <Checkbox name="statistic" checked={consent.statistic} onChange={onChangeConsent}/> Statistics
                                </Label>
                                <p>Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting
                                    information anonymously.</p>
                                <details>
                                    <summary>Google Analytics</summary>
                                    <p>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.</p>
                                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>
                                    <p><span>_ga</span><span>_gid</span><span>_ga_*</span><span>_gat_*</span></p>
                                </details>
                            </li>
                            <li>
                                <Label>
                                    <Checkbox name="marketing" checked={consent.marketing} onChange={onChangeConsent}/> Marketing
                                </Label>
                                <p>Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and
                                    engaging for the individual user and thereby more valuable for publishers and third party advertisers.</p>
                                <details>
                                    <summary>Google Ads</summary>
                                    <p>Google Ads is an advertising service by Google for businesses that want to display ads on Google search results
                                        and its advertising network.</p>
                                    <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener">Privacy Policy</a>
                                    <p><span>_gcl_au</span><span>IDE</span><span>_gcl_ls</span></p>
                                </details>
                            </li>
                        </ul>
                    </section>
                )}

                {isAboutTabActive && (
                    <section>
                        <p>Cookies are small text files that can be used by websites to make a user&apos;s experience more efficient.</p>
                        <p>The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For
                            all other types of cookies we need your permission. This means that cookies which are categorized as necessary, are
                            processed based on GDPR Art. 6 (1) (f). All other cookies, meaning those from the categories preferences and marketing,
                            are processed based on GDPR Art. 6 (1) (a) GDPR.</p>
                        <p>This site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.</p>
                        <p>Learn more about who we are, how you can contact us and how we process personal data in our <Link href="/privacy-policy">Privacy
                            Policy</Link>.</p>
                    </section>
                )}

                <footer>
                    {!isDetailsTabActive && (
                        <Button onClick={onCustomizeClick} variant="secondary" full={false}>Customize</Button>
                    )}
                    {isDetailsTabActive && (
                        <Button onClick={onAllowSelectionClick} variant="secondary" full={false}>Allow selection</Button>
                    )}
                    <Button onClick={onAllowAllClick} full={false}>Allow all</Button>
                    <a href="#" onClick={onTabClick('about')}>What to know more about cookies?</a>
                </footer>
            </div>
        </dialog>
    );
}

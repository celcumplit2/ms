import Breadcrumbs from '@/components/common/breadcrumbs';
import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'This cookie policy describes the cookies and other technologies that MoldStud uses on its website and the choices that you have. This Cookie Policy forms part of our Privacy Policy.',
    alternates: {
        canonical: '/cookie-policy',
    },
};

export default function CookiePolicyPage() {
    return (
        <>
            <Breadcrumbs links={[{label: 'Cookie Policy', href: '/cookie-policy'}]}/>
            <h1>Cookie Policy</h1>

            <h2>1) Introduction</h2>
            <p>This cookie policy (“<strong>Cookie Policy</strong>”) describes the cookies and other technologies that MODSTUD-IT, SRL
                (“<strong>MoldStud</strong>”) uses on its websites and mobile application (the “<strong>Site</strong>”) and the choices that you have
                related to such tracking. This Cookie Policy forms part of our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
            <p>Depending on your location, you may be asked to consent to the use of cookies and other technologies on the Site in accordance with
                this Cookie Policy when you first visit the Site, and we will store such cookies on your computer if you accept.</p>
            <p>This Cookie Policy includes an overview of cookies and other technologies that we use on the Site. The Cookie Policy also provides a
                list of the specific technologies that we use, a description of why we use the technology, for example, to improve our analytics and
                provide better services, and an explanation of how to opt-out of the cookie if possible. Please reach out to MoldStud at <a
                    href="mailto:info@moldstud.com">info@moldstud.com</a> if you have any questions about our practices, or you may use the additional
                form of contact in the Contacting MoldStud section of this Policy.
            </p>

            <h2 id="cookies-and-other-technologies">Cookies and Other Technologies</h2>
            <p>A cookie is a piece of information sent to your browser from a website and stored on your computer that the website can use to gather
                information. Cookies can help a website recognize repeat users and allow a website to see web usage behavior. If you are interested in
                cookies and similar technologies, you can learn more on websites like <a href="https://www.allaboutcookies.org/verify" rel="nofollow"
                                                                                         target="_blank">All About Cookies</a>.</p>
            <p>Cookies can be stored on your computer for different periods of time. “Session cookies” are deleted automatically once you close your
                browser. “Persistent cookies” cookies survive until a pre-defined expiration date set in the cookie, which is determined by the third
                party that placed the cookie. Persistent cookies help recognize your computer when you open your browser and browse the internet
                again. “First party cookies” are placed by a website directly and “third-party cookies” are placed by a third-party with a website’s
                permission to do so.</p>
            <p>Our Site uses first party cookies and third-party cookies, as described below. We also use pixel tags from the third parties described
                below to see information about your usage of the Site and the Services and your interaction with email or other communications. Pixel
                tags are a technology like cookies that can be embedded in online content or within the body of an email for the purpose of seeing
                activity on websites, for example, to know when you have viewed particular content or a particular email message.</p>

            <h2 id="technologies-we-use">Technologies We Use</h2>
            <h3 id="cookies">Cookies</h3>
            <p>Below are the purposes and opt-out methods of each type of cookie.</p>

            <h4 id="strictly-necessary">1. Strictly Necessary</h4>
            <h5>Purpose</h5>
            <p>To provide users with the services available through our Site and to use some of its features, such as the ability to log-in and access
                secure areas. MoldStud places these cookies, and they are essential for using the Site. Basic functions of our Site would not work
                without these cookies.</p>
            <h5>Opt-out</h5>
            <p>Because these cookies are strictly necessary to deliver the Site and our services, you cannot opt-out of them if you choose to use the
                Site.</p>

            <h4 id="analyticsperformance">2. Analytics/Performance</h4>
            <h5>Purpose</h5>
            <p>To better understand the behavior of the users on our Site, tracks bots, and improve our services accordingly:</p>
            <ul>
                <li>
                    <strong>Google Analytics 360 and GA4</strong>. Learn how Google uses data collected on our Site <a
                    href="https://policies.google.com/technologies/partner-sites?hl=en" rel="nofollow" target="_blank">here</a>. Learn more about how
                    these cookies expire <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                                            rel="nofollow" target="_blank">here</a>.
                </li>
            </ul>
            <h5>Opt-out</h5>
            <p>You can block or delete cookies by changing the browser settings as explained under the “Your Choices” section below.</p>
            <p>The providers listed below also offer direct opt-out functionalities:</p>
            <ul>
                <li>
                    <strong>Google Analytics</strong>. You can download and install the Google Analytics Opt-Out Browser Add-on for your current web
                    browser at <a href="https://tools.google.com/dlpage/gaoptout?hl=en" rel="nofollow" target="_blank">Google Analytics Opt-Out
                    Browser Add-on</a>.
                </li>
            </ul>

            <h4 id="advertisingtargeting">3. Advertising/Targeting</h4>
            <h5>Purpose</h5>
            <p>To collect information about browsing habits to make advertising more relevant:</p>
            <ul>
                <li>
                    <strong>Google AdServices</strong>. Learn more about Google’s privacy practices <a
                    href="https://policies.google.com/privacy?hl=en" rel="nofollow" target="_blank">here</a>.
                </li>
                <li>
                    <strong>LinkedIn Insights</strong>. Learn more about LinkedIn’s privacy practices <a
                    href="https://www.linkedin.com/legal/privacy-policy" rel="nofollow" target="_blank">here</a>.
                </li>
                <li>
                    <strong>Meta</strong>. Learn more about Meta’s privacy practices <a
                    href="https://www.meta.com/help/accounts/meta-privacy-policies/" rel="nofollow" target="_blank">here</a> or <a
                    href="https://www.facebook.com/policies/cookies/" rel="nofollow" target="_blank">here</a>.
                </li>
                <li>
                    <strong>Microsoft</strong>. Learn more about Microsoft’s privacy practices <a
                    href="https://privacy.microsoft.com/en-us/privacystatement" rel="nofollow" target="_blank">here</a>.
                </li>
                <li>
                    <strong>Twitter</strong>. Learn more about Twitter’s privacy practices <a href="https://twitter.com/en/privacy" rel="nofollow"
                                                                                              target="_blank">here</a>.
                </li>
            </ul>

            <h5>Opt-out</h5>
            <p>You can block or delete cookies by changing the browser settings as explained under the “Your Choices” section below.</p>
            <p>The providers listed below also offer direct opt-out functionalities:</p>
            <ul>
                <li>
                    <strong>Meta</strong>. To opt out, please visit <a href="https://www.facebook.com/help/769828729705201" rel="nofollow"
                                                                       target="_blank">About Facebook Ads</a>.
                </li>
                <li>
                    <strong>Google AdServices</strong>. To opt out, please visit <a href="https://adssettings.google.com/authenticated" rel="nofollow"
                                                                                    target="_blank">Ads Settings</a>.
                </li>
                <li>
                    <strong>LinkedIn Insights</strong>. To opt out, please visit <a
                    href="https://www.linkedin.com/help/linkedin/answer/62931/manage-advertising-preferences?lang=en" rel="nofollow" target="_blank">Manage
                    Advertising Preferences</a>.
                </li>
            </ul>

            <h2 id="your-choices">Your Choices</h2>
            <p>Please note that if you limit the ability of websites to set cookies, you may be unable to access certain parts of the Site and you may
                not be able to benefit from the full functionality of the Site.</p>
            <p>On most web browsers, you will find a “help” section on the toolbar. Please refer to that section for information on how to receive a
                notification when you are receiving a new cookie and how to turn cookies off. Please see the links below for guidance on how to modify
                your web browser’s settings on the most popular browsers:</p>
            <ul>
                <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" rel="nofollow" target="_blank">Apple Safari</a></li>
                <li><a href="https://support.google.com/accounts/answer/61416?hl=en" rel="nofollow" target="_blank">Google Chrome</a></li>
                <li>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/view-cookies-in-microsoft-edge-a7d95376-f2cd-8e4a-25dc-1de753474879"
                       rel="nofollow" target="_blank">Microsoft Edge</a> and <a
                    href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11">Internet
                    Explorer</a>
                </li>
                <li>
                    <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences?esab=a&amp;s=cookies&amp;r=6&amp;as=s"
                       rel="nofollow" target="_blank">Mozilla Firefox</a></li>
            </ul>
            <p>If you access the Site on your mobile device, you may not be able to control tracking technologies through the settings.</p>

            <h2 id="changes">Changes</h2>
            <p>We may change the type of third-party service providers that place cookies on the Site and amend this Cookie Policy at any time by
                posting the amended version on the Site. Unless additional notice or consent is required by applicable laws, this will serve as your
                notification of these changes.</p>

            <h2 id="contact-us">Contact Us</h2>
            <p>If you have any questions or concerns, you may contact us as follows:</p>
            <ul>
                <li>By email: <a href="mailto:info@tmoldstud.com">info@moldstud.com</a></li>
                <li><Link href="/contacts">By contact Form</Link></li>
            </ul>
        </>
    );
};

import Breadcrumbs from '@/components/common/breadcrumbs';
import {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn how MoldStud collects, uses, and protects your personal data. Our privacy policy ensures compliance with GDPR, CCPA, and CPRA, safeguarding your privacy and rights. Contact us for more information.',
    alternates: {
        canonical: '/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Breadcrumbs links={[{label: 'Privacy Policy', href: '/privacy-policy'}]}/>
            <h1>Privacy Policy</h1>

            <h2>1) Introduction</h2>
            <p>Thank you for using MoldStud’s websites and services that link to this Privacy Policy, including moldstud.com
                (the <strong>“Sites”</strong>).
                MODSTUD-IT, SRL (<strong>“MoldStud”</strong>, <strong>“we”</strong>, <strong>“us”</strong> and/or <strong>“our”</strong>) operates
                these Sites
                to provide our users (<strong>“you”</strong> and <strong>“your”</strong>) with tools and information about MoldStud and our services.
            </p>
            <p>MoldStud values your privacy rights, and we take our responsibilities and obligations about your privacy rights seriously. We want you
                to
                know that MoldStud is not in the business of selling your information. This privacy policy (<strong>“Privacy Policy”</strong>)
                explains our
                data practices in depth, so that you know how and why we collect and use your information in compliance with applicable data
                regulations.</p>

            <h2>2) Scope</h2>
            <p>This Privacy Policy explains how we collect, retain, and use information, including personal data (<strong>“Personal Data”</strong>),
                about
                Talents, Clients, potential Clients, Site visitors, vendors, blog readers, and job applicants, and others in accordance with
                applicable data
                protection laws and regulations as described below.</p>

            <h2>3) Collection and Use of Personal Data</h2>
            <p>The information we receive and how we use it varies based on our relationship with you. The sections below explain our data practices
                based
                on our different relationships with users. Use these links to quickly navigate to the section relevant to you:</p>
            <ul>
                <li><a href="#clients-and-prospective-clients">Clients and Prospective Clients;</a></li>
                <li><a href="#job-applicants">Job Applicants;</a></li>
                <li><a href="#site-visitors">Site Visitors.</a></li>
            </ul>

            <h3 id="clients-and-prospective-clients">3.1) Clients and Prospective Clients</h3>
            <h4>I) Information We Collect</h4>
            <h5>a) Information That You Provide to Us</h5>
            <p>We collect Personal Data from Clients and Prospective Clients (collectively “Clients”) when a Client visits our Sites and begins to use
                our
                Services as well as through requests from a Client to engage our Talent. This information may include, among other kinds of data:</p>
            <ul>
                <li>Names;</li>
                <li>Contact information;</li>
                <li>Job titles;</li>
                <li>Budget information;</li>
                <li>Address;</li>
                <li>Location; and</li>
                <li>Company information, including the type of services the Client is looking to engage and other information related to the Client’s
                    needs.
                </li>
            </ul>
            <p>MoldStud provides Talent and our internal team members the use of a moldstud.com email address. MoldStud stores and processes
                information
                sent to and from all moldstud.com email addresses.</p>

            <h5>b) Information Obtained from Third Parties</h5>
            <p>We may collect additional information about you and your company from publicly available or from third-party databases or services that
                provide information about business contacts and companies (including individuals’ names, job titles, business contact information, and
                company
                information).</p>

            <h5>c) Automatically Collected Data</h5>
            <p>When you interact with MoldStud through the Site or Services, we automatically collect certain information. Please read the “<a
                href="#site-visitors">Site Visitors</a>” section below for more information.</p>

            <h4>II) How We Use the Information</h4>
            <h5>a) To Provide the Services and Respond to Requests</h5>
            <p>MoldStud uses the Personal Data you provide consistent with this Privacy Policy. If you provide Personal Data for a certain reason, if
                we use
                the Personal Data, we will do so in connection with the reason for which you provided it. If you provide Personal Data in order to
                obtain
                access to the Services, we will use your Personal Data through our performance of our contract with you to provide you with access to
                such
                Services, maintain your account, contact you regarding your use of the Services and/or the Sites or to notify you of important changes
                to the
                Services and/or the Sites, and to monitor your use of such Services.</p>

            <h5>b) For Marketing Purposes</h5>
            <p>We may use your contact details to tell you about Services, upcoming events, and other promotions that we believe you will be
                interested in.
                If we do so, each marketing communication we send you will contain instructions permitting you to “opt out” of receiving future
                marketing
                communications. You cannot opt out of some administrative communications that are reasonably necessary to the Services, such as
                billing or
                Service notifications, as those are not considered marketing communications. In addition, if at any time you wish not to receive any
                future
                marketing communications or you wish for us to delete your contact information from our mailing lists, please contact us at
                info@moldstud.com
                or at our mailing address in the Contacting MoldStud section below.</p>
            <p>Where required by applicable law, we will only send you marketing information by email if you consented to our use of your Personal
                Data for
                such communications.</p>

            <h5>c) For Certain Legitimate Interests</h5>
            <p>We may use your Personal Data for the certain business interests deemed legitimate under applicable law, including:</p>
            <ul>
                <li>To send you administrative information, for example, information regarding the Site and changes to our terms, conditions, and
                    policies.
                </li>
                <li>To respond to your inquiries and fulfill your requests, such as to send you requested materials, newsletters and information and
                    materials
                    regarding our products and Services.
                </li>
                <li>To conduct analytics on how you use the Site and our Services for our internal purposes, for example, for maintaining,
                    benchmarking, and
                    improving our offerings, identifying usage trends, and determining the effectiveness of our promotional campaigns, and to inform
                    our
                    marketing strategy and personalize our communications with you.
                </li>
                <li>To supplement the information that we collected from you with information obtained from third parties (described above) to update,
                    expand,
                    and analyze our records, identify new Clients, and provide products and services that may be of interest to you.
                </li>
                <li>To prevent fraud, criminal activity, and misuses of our products or services and to ensure the security of our IT systems,
                    architecture,
                    and networks.
                </li>
                <li>For legal reasons, including to comply with legal obligations and legal process, respond to requests from public and government
                    authorities including public and government authorities outside your country of residence, enforce our agreements with you,
                    protect our
                    operations, protect our rights, privacy, safety or property, and/or that of you or others, and allow us to pursue available
                    remedies or
                    limit the damages that we may sustain.
                </li>
                <li>If you ask us to delete your data and we are required to fulfill your request, to keep basic data to identify you and to prevent
                    future
                    fraud or further unwanted processing.
                </li>
            </ul>

            <h5>d) With Your Consent</h5>
            <p>We may also ask for your consent to use your Personal Data for a purpose that is not listed on this Privacy Policy, and we will use
                your
                Personal Data for that purpose to the extent that you freely provide your informed consent.</p>
            <p>We may monitor, record, and transcribe audio or video calls with you during your time as a Client. Consenting is voluntary, and you may
                withdraw it at any time. These actions allow multiple MoldStud team members to review your requirements for sourcing or matching
                Talent,
                specifics about a particular engagement, or for internal quality assurance and training purposes. Additionally, your interviews with
                Talent
                for specific engagements may be recorded for internal purposes and, upon request, provided to you to review the call.</p>
            <p>For individuals in the EU and the UK, please see the “<a href="#eu-and-uk-individuals">EU and UK Individuals</a>” section below for
                information on our legitimate interests and your rights. For individuals that reside in California, please see the California section
                below
                for information on your rights.</p>

            <h3 id="job-applicants">3.2) Job Applicants</h3>
            <h4>I) Information We Collect</h4>
            <h5>a) Application and Assessment Process</h5>
            <p>When you apply for a position with MoldStud, you will provide Personal Data in your application, resume, cover letter, or in other
                formats.
                While you may decide what information to include, for instance most applications include your:</p>
            <ul>
                <li>Name;</li>
                <li>Contact information;</li>
                <li>Address;</li>
                <li>Location;</li>
                <li>Qualifications;</li>
                <li>Recommendation information;</li>
                <li>Employment history;</li>
                <li>Work experience;</li>
                <li>Education;</li>
                <li>Photo;</li>
                <li>Social network information;</li>
                <li>Salary history; and</li>
                <li>Salary expectations.</li>
            </ul>
            <p>If we invite you to undertake further assessments in connection with your application and you participate in such assessments, we will
                collect the additional Personal Data that you provide to us as part of that process. If you do not provide us with certain information
                when
                requested, it may impact our ability to assess your suitability for a role with us or we may not be able to offer you a position with
                MoldStud. With your prior consent, we may record your audio or video interview(s) to better evaluate your candidacy and for training
                purposes.
                Your consent is voluntary, and you may withdraw your consent at any time, including during the interview. If you withdraw your consent
                or do
                not consent, it will not impact your candidacy.</p>
            <p>Throughout the recruitment process, we may create Personal Data in connection with the assessment of your application, such as through
                your
                interviewer’s evaluation of your suitability for the role(s) that you applied for.</p>

            <h5>b) If Your Application is Successful</h5>
            <p>If your application is successful, we may collect further Personal Data about you in connection with conducting reference and
                background
                checks where required and permitted by applicable law, including, if applicable to you, special categories of Personal Data, which we
                will
                solicit your consent to collect at the time. We may also collect copies of relevant identification documents from you, such as your
                passport
                or driving license, proof of address, a copy of your work permit, a photograph, and a copy of your signature through your executed
                acceptance.</p>
            <p>Please see the “<a href="#region-specific-information">Region Specific Information</a>” section below for information on your rights in
                relation to the Personal Data we hold about you.</p>

            <h5>c) Automatically Collected Data</h5>
            <p>When you interact with MoldStud through our Site in relation to your application, we automatically collect certain information. Please
                read
                the “<a href="#site-visitors">Site Visitors</a>” section below for more information.</p>

            <h4>II) How We Use Your Information</h4>
            <p>We have a legitimate interest in:</p>
            <ul>
                <li>Facilitating the interview process with you;</li>
                <li>Offering you roles to work for us;</li>
                <li>Making informed recruitment decisions;</li>
                <li>Selecting suitable candidates for roles with us;</li>
                <li>Improving our recruiting and hiring processes;</li>
                <li>Informing you of current and future career opportunities;</li>
                <li>Complying with immigration requirements;</li>
                <li>Verifying your identity for our own internal security purposes; and</li>
                <li>Complying with our legal obligations and for the performance of your contract with us.</li>
            </ul>
            <p>If you are engaged to work for MoldStud, your Personal Data will be used as part of your team member record under our team member
                privacy
                policies and may be shared with third-party service providers assisting us in completing our obligations to you, such as payroll
                providers.</p>

            <h3 id="site-visitors">3.3) Site Visitors</h3>
            <p>When you interact with MoldStud through the Site or the Services, we and service providers acting on our behalf will automatically
                collect
                information about you through cookies and other technologies. Please review the moldstud.com <Link href="/cookie-policy">Cookie
                    Policy</Link> to learn more about how we use cookies and other technologies
                on the
                Site you are using.</p>
            <p>As a Site Visitor, our servers record information (“log data”), including information that your browser automatically sends whenever
                you
                visit the Site. This log data includes your Internet Protocol (“IP”) address from which we understand the country you are connecting
                from at
                the time you visit the Site, browser type and settings, and the date and time of your request.</p>
            <p>We use this automatically collected data for our legitimate interests in maintaining the safe operation of our Site, maintaining our
                legal
                obligations and our legitimate interest in learning how Site visitors interact with our Site to improve your use of the Site.</p>

            <h2>4) Disclosing Your Personal Data</h2>
            <p>MoldStud is not in the business of selling your information. We consider information about you and our interactions to be a vital part
                of our
                relationship with you. There are, however, certain circumstances in which we may share your Personal Data with certain third parties,
                as
                explained below:</p>
            <h3>4.1) Business Transfers</h3>
            <p>As we develop our business, we might acquire businesses or assets. In the event of a corporate sale, merger, reorganization,
                dissolution or
                similar event, Personal Data may be part of the transferred assets.</p>
            <h3>4.2) Agents, Consultants and Other Service Providers</h3>
            <p>MoldStud, like many businesses, hires third parties to perform certain business-related functions. These third parties include website
                analytics companies, providers of digital advertising services, our hosting and cloud computing service providers, providers of
                customer
                relationship management software, marketing and sales software solutions, providers of billing and processing payments functions and
                providers
                of background check services. When we engage another company to perform a function of this nature, we only provide them with the
                information
                that they need to perform their specific function. Pursuant to our instructions, these parties may access, process, or store Personal
                Data in
                the course of performing their duties to us and solely in order to perform the services we hired them to provide.</p>
            <h3>4.3) Legal Requirements</h3>
            <p>MoldStud may disclose your Personal Data if required to do so by law, for example, as part of our compliance with sanctions about
                specific
                regions and specifically designated individuals, or in the good faith belief that such action is necessary to (i) comply with a legal
                obligation, (ii) protect and defend the rights or property of MoldStud, (iii) act in urgent circumstances to protect the personal
                safety of
                users of the Site or the public, or (iv) protect against legal liability.</p>

            <h2>5) Data Retention</h2>
            <p>Our policy is to keep your Personal Data only for as long as is reasonably necessary to fulfill the purposes for which it was collected
                and
                processed, including for the purposes of satisfying any legal, regulatory, accounting or reporting requirements. If you elected to
                receive
                marketing communications from us, we retain information about your marketing preferences until you opt out of receiving these
                communications
                and in accordance with our policies.</p>
            <p>To determine the appropriate retention period for your Personal Data, we will consider the amount, nature, and sensitivity of the
                Personal
                Data, the potential risk of harm from unauthorized use or disclosure of your Personal Data, the purposes for which we use your
                Personal Data
                and whether we can achieve those purposes through other means, and the applicable legal requirements. In some circumstances we may
                anonymize
                your Personal Data so that it can no longer be associated with you, in which case it is no longer Personal Data.</p>

            <h2 id="region-specific-information">6) Region Specific Information</h2>
            <p>You may be able to exercise certain rights and access certain information depending on your location. Please review the following
                sections
                for more details. You can reach out to info@moldstud.com with questions about your information.</p>
            <h3 id="eu-and-uk-individuals">6.1) EU and UK Individuals</h3>
            <h4>I) Scope</h4>
            <p>This section applies solely to individuals in the United Kingdom and European Union, provided however that reference to the EU also
                includes
                certain non-EU countries including, where applicable, Switzerland and the European Economic Area countries of Iceland, Liechtenstein,
                and
                Norway. Our Privacy Policy describes why and how MoldStud collects, uses, and stores your Personal Data, the lawful basis on which
                your
                Personal Data is processed, and what your rights and our obligations are in relation to such processing (please see “Your Rights”
                section
                below).</p>
            <h4>II) Data Controller</h4>
            <p>MoldStud is the data controller for processing your Personal Data. The data controller is responsible for deciding how Personal Data
                about
                you is used. Please contact us with any questions at info@moldstud.com or at the address provided in the Contacting MoldStud section
                below,
                which also provides the contact details of our representative in the EU and the UK for purposes of the General Data Protection
                Regulation and
                the United Kingdom’s Data Protection Act 2018.</p>
            <h4 id="your-rights">III) Your Rights</h4>
            <p>Subject to applicable EU and UK law and where possible, you have the following rights in relation to your Personal Data:</p>
            <ul>
                <li>
                    <strong>Right of access.</strong>&nbsp;You may ask us to confirm whether we are processing your Personal Data and, if so, provide
                    you with a
                    copy of that Personal Data along with certain other details. This may include the purposes of the processing, the categories of
                    Personal
                    Data, the recipients of the Personal Data, the right to lodge a complaint, and available information on the source of the Personal
                    Data. If
                    you require additional copies, we may charge a reasonable fee.
                </li>
                <li>
                    <strong>Right to rectification.</strong>&nbsp;If your Personal Data is inaccurate or incomplete, you may ask that we erase, amend,
                    or
                    rectify it. If we shared your Personal Data with others, we will tell them about the correction where possible. If you ask us, we
                    will also
                    tell you with whom we shared your Personal Data so you can contact them directly.
                </li>
                <li>
                    <strong>Right to erasure.</strong>&nbsp;You may ask us to delete or remove your Personal Data in certain circumstances, such as
                    where our
                    processing is based on your consent. We may retain certain information consistent with applicable law, such as to prevent fraud,
                    or where we
                    have a compelling legitimate ground to do so. If we shared your data with others, we will tell them about the erasure where
                    possible. If you
                    ask us, we will also tell you with whom we shared your Personal Data with so you can contact them directly.
                </li>
                <li>
                    <strong>Right to restrict processing.</strong>&nbsp;You may ask us to restrict or ‘block’ the processing of your Personal Data in
                    certain
                    circumstances. We will tell you before we lift any restriction on processing. If we shared your Personal Data with others, we will
                    tell them
                    about the restriction where possible. If you ask us, we will also tell you with whom we shared your Personal Data so you can
                    contact them
                    directly.
                </li>
                <li>
                    <strong>Right to data portability.</strong>&nbsp;You may ask to obtain the Personal Data that you consented to give us or that was
                    provided
                    to us as necessary in connection with our contract with you. We will give you your Personal Data in a structured, commonly used,
                    and
                    machine-readable format.
                </li>
                <li>
                    <strong>Right to object.</strong>&nbsp;You may ask us at any time to stop processing your Personal Data, and we will do so unless
                    we have a
                    compelling legitimate ground for the processing. We will comply with requests to stop processing your Personal Data as your
                    requests apply
                    to direct marketing.
                </li>
                <li>
                    <strong>Rights in relation to automated decision-making and profiling.</strong>&nbsp;You have the right to be free from decisions
                    based
                    solely on automated processing of your Personal Data, including profiling, which produce a significant legal effect on you, unless
                    such
                    profiling is necessary for entering into, or the performance of, a contract between you and us, or with your explicit consent. We
                    use
                    automated decision-making to ensure that we comply with various laws and regulations restricting what regions, individuals, and
                    entities we
                    are able to work with. We also use automated decision-making to ensure applications from Freelancers and Job Applicants meet our
                    minimum
                    necessary requirements. You may contact us at <a href="mailto:info@moldstud.com">info@moldstud.com</a> to obtain an explanation of
                    the
                    decision or for a personal review, if possible.
                </li>
                <li>
                    <strong>Right to withdraw consent.</strong>&nbsp;If we rely on your consent to process your Personal Data, you have the right to
                    withdraw
                    that consent at any time, but this will not affect any data that we already processed.
                </li>
                <li>
                    <strong>Right to lodge a complaint with the data protection authority.</strong>&nbsp;If you have a concern about our privacy
                    practices,
                    including the way we handled your Personal Data, you can report it to the data protection authority that is authorized to hear
                    those
                    concerns.
                </li>
            </ul>
            <p>You may exercise your rights by contacting us as indicated under the “<a href="#contacting">Contacting MoldStud</a>” section below.</p>
            <h4>IV) Legitimate Interest</h4>
            <p>“Legitimate interests” means our interests in conducting and managing our organization and delivering the best Services to you. This
                Privacy
                Policy describes when we process your Personal Data for our legitimate interests, what these interests are and your rights. We will
                not use
                your Personal Data for activities where the impact on you outweighs our interests unless we have your consent or those activities are
                otherwise required or permitted by law. You have the right to object to processing that is based on our legitimate interests. For more
                information on your rights, please see the “<a href="#your-rights">Your Rights</a>” section above.</p>
            <h4>V) Data Transfers</h4>
            <p>MoldStud is based in the Republic of Moldova. When you apply as a Talent, use our Services as a Client, or otherwise use our Sites,
                your
                Personal Data will be transmitted to servers in the Republic of Moldova as necessary to provide you with the Services that you
                requested,
                administer our contract with you or to respond to your requests as described in this Privacy Policy, and your Personal Data may be
                transmitted
                to our service providers supporting our business operations (described above). The Republic of Moldova may have data protection laws
                less
                stringent than or otherwise different from the laws in effect in the country in which you are located. Where we transfer your Personal
                Data
                across the border of the European Economic Area or United Kingdom, we will take steps to ensure that your Personal Data receives an
                adequate
                level of protection where it is processed and your rights continue to be protected.</p>

            <h3>6.2) California</h3>
            <p>Our Privacy Policy describes above why and how MoldStud collects, uses, and stores your Personal Data, the lawful basis on which your
                Personal Data is processed, and what your rights and our obligations are in relation to such processing.</p>
            <p>If you are a California resident, you, or a person verifiably authorized to act on your behalf, have certain rights under the
                California
                Consumer Privacy Act and its successor legislation, the California Privacy Rights Act, collectively the “CCPA.” For the purpose of
                this
                section, certain words, including “sale,” “share,” “business purpose,” and “personal information” have the meanings defined in the
                CCPA. For
                the purpose of this Privacy Policy, we use “Personal Data” to cover “personal information” as defined in the CCPA.</p>
            <p>We update our Privacy Policy based on our current practices. As required by the CCPA, the information in this section is relevant for
                the
                last twelve-month time period. During that time, we collected the categories of Personal Data listed in the relevant section above
                (i.e.,
                Clients, Job Applicants, or Site Visitors) from the sources listed in those sections (i.e., from you, third parties, or
                automatically). During
                the last twelve-month period, we have not sold Personal Data.</p>
            <p>During the last twelve-month period, we disclosed for business purposes the following categories of Personal Data:</p>
            <ul>
                <li>Identifiers (i.e., names, email addresses, or online identifiers and IP addresses).</li>
                <li>Biometric information (i.e., video and voice recordings).</li>
                <li>Internet activity (i.e., information regarding your interaction with our websites or advertisements).</li>
                <li>Geolocation data (i.e., information regarding where you access our site from).</li>
                <li>Professional or employment information (i.e., job title, employer, or prior titles and employers).</li>
            </ul>
            <p>For information about who we may share or disclose your Personal Data to, please review the relevant information in the above Clients,
                Job
                Applicants, or Site Visitors sections.</p>
            <p>Your rights under the CCPA include the following, which you may execute by contacting us at info@moldstud.com where possible and
                allowed by
                law:</p>
            <ul>
                <li>
                    <strong>Right to request deletion of your Personal Data.</strong> You may ask us to delete or remove your Personal Data. If we
                    shared your
                    Personal Data with others, we will tell them about the deletion where possible. If you ask us, we will also tell you with whom we
                    shared
                    your Personal Data with so you can contact them directly.
                </li>
                <li>
                    <strong>Right to request MoldStud correct inaccurate Personal Data.</strong> If your Personal Data is inaccurate or incomplete,
                    you are
                    entitled to ask that we correct or complete it. If we shared your Personal Data with others, we will tell them about the
                    correction where
                    possible. If you ask us, we will also tell you with whom we shared your Personal Data so you can contact them directly.
                </li>
                <li>
                    <strong>Right to know what Personal Data is sold or shared and with whom</strong>. MoldStud is not in the business of selling your
                    Personal
                    Data. You may ask us to clarify what Personal Data, if any, is shared and with whom we share it, along with certain additional
                    details.
                </li>
                <li>
                    <strong>Right to opt out of sale or sharing of Personal Data for behavioral advertising and right to not be retaliated against for
                        opting
                        out</strong>. If you would like to opt out of MoldStud sharing your Personal Data with third parties for cross-context
                    behavioral
                    advertising, you have the right to do so. To opt out:
                    <ul>
                        <li>Email your request to <a href="mailto:info@moldstud.com">info@moldstud.com</a>; and</li>
                        <li>Disable the use of analytics/advertising cookies as we describe in our Cookie Policy. You must complete this step on each
                            of our
                            websites from each browser and on each device that you use.
                        </li>
                        <li>If you block cookies, we may be unable to comply with your opt out request with respect to device data that we
                            automatically collect
                            and disclose to third parties online using cookies, pixels, and other tracking technologies. If you clear your cookies,
                            you may need to
                            disable the use of all advertising cookies again.
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Right to access your Personal Data</strong>. If you ask us, we will confirm whether we are processing your Personal Data
                    and, if so,
                    provide you with a copy of that Personal Data along with certain other details. If you require additional copies, we may charge a
                    reasonable
                    fee.
                </li>
                <li>
                    <strong>Shine the Light Requests</strong>. You may also request that we provide you with a list of the categories of Personal
                    Data, if any,
                    that we disclosed to third parties for their direct marketing purposes during the immediately preceding calendar year and the
                    identity of
                    those third parties.
                </li>
                <li>
                    <strong>Right to Non-Discrimination</strong>. MoldStud will not discriminate against you if you exercise any of your rights under
                    the CCPA.
                </li>
            </ul>
            <p>If you would like to exercise your rights or have questions about your rights or information, please contact us at info@moldstud.com or
                at
                the post addresses included in the Contacting MoldStud section below.</p>

            <h2 id="your-choices">7) Your Choices</h2>
            <p>You can use the Sites without providing any Personal Data. If you choose not to provide any Personal Data, you may not be able to use
                certain
                Services.</p>

            <h2 id="exclusions">8) Exclusions</h2>
            <p>This Privacy Policy does not apply to any Personal Data collected by MoldStud other than Personal Data collected through the Sites,
                Services,
                events, third parties or as otherwise stated in this Privacy Policy. This Privacy Policy shall not apply to any unsolicited
                information you
                provide to MoldStud through this Site or through any other means (without prejudice to your rights under the applicable law). This
                includes,
                but is not limited to, information posted to any public areas of the Sites, such as forums (collectively, “Public Areas”), any ideas
                for new
                products or modifications to existing products, and other unsolicited submissions (collectively, “Unsolicited Information”). All
                Unsolicited
                Information shall be deemed to be non-confidential and MoldStud shall be free to reproduce, use, disclose, distribute, and exploit
                such
                Unsolicited Information without limitation or attribution.</p>

            <h2 id="children">9) Children</h2>
            <p>MoldStud does not knowingly collect Personal Data from children under the age of 16. If you are under the age of 16, please do not
                submit any
                Personal Data through the Sites. We encourage parents and legal guardians to monitor their children’s Internet usage and to help
                enforce our
                Privacy Policy by instructing their children never to provide Personal Data on these Sites without their permission. If you have
                reason to
                believe that a child under the age of 16 provided Personal Data to MoldStud through this Sites, please contact us, and we will
                endeavor to
                delete that information from our databases.</p>

            <h2 id="links-to-other-websites">10) Links to Other Websites</h2>
            <p>The Sites may contain links to other websites not operated or controlled by MoldStud (“<strong>Third Party Sites</strong>”). The
                information
                that you share with Third Party Sites will be governed by the specific privacy policies and terms of service of the Third-Party Sites
                and not
                by this Privacy Policy. By providing these links we do not imply that we endorse or review the Third-Party Sites. We suggest
                contacting those
                sites directly for information on their privacy practices and policies.</p>

            <h2 id="security">11) Security</h2>
            <p>MoldStud takes reasonable and appropriate steps to protect the Personal Data provided via the Sites or the services from loss, misuse,
                and
                unauthorized access, disclosure, alteration, or destruction. However, no Internet, email or other electronic transmission is ever
                fully secure
                or error free, so you should take special care in deciding what information you send to us in this way.</p>

            <h2 id="other-terms-and-conditions">12) Other Terms and Conditions</h2>
            <p>Your access to and use of moldstud.com is subject to our <Link href="/terms-and-conditions">Website Terms &amp;
                Conditions</Link>. Your access to and use of other
                Sites may be subject to different terms and conditions. Please review those Sites for more information.</p>

            <h2 id="changes-to-privacy-policy">13) Changes to MoldStud’s Privacy Policy</h2>
            <p>The Sites and our business may change from time to time. As a result, at times it may be necessary for MoldStud to make changes to this
                Privacy Policy. MoldStud reserves the right to update or modify this Privacy Policy at any time and from time to time without prior
                notice,
                unless otherwise required by the applicable law. Please review this policy periodically, and especially before you provide any
                Personal Data.
                Your continued use of the Site after any changes or revisions to this Privacy Policy shall indicate your agreement with the terms of
                such
                revised Privacy Policy, without prejudice to your rights under the applicable law.</p>

            <h2 id="contacting">14) Contacting MoldStud</h2>
            <p>Please contact us if you have any questions about MoldStud’s Privacy Policy, the information practices of the Sites, or if you have
                questions
                about your rights.</p>
            <ul>
                <li>Email: <a href="mailto:info@tmoldstud.com">info@moldstud.com</a></li>
                <li><Link href="/contacts">Contact Form</Link></li>
            </ul>
        </>
    );
};

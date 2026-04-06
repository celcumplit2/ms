import Breadcrumbs from '@/components/common/breadcrumbs';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Moldstud website Terms & Conditions apply to your access and use of our website. Content includes all such elements as a whole.',
    alternates: {
        canonical: '/terms-and-conditions',
    },
};

export default function TermsAndConditionsPage() {
    return (
        <>
            <Breadcrumbs links={[{label: 'Terms & Conditions', href: '/terms-and-conditions'}]}/>
            <h1>Terms & Conditions</h1>
            <p>
                <time dateTime="2024-06-09">Date fo Last Revision: 9 June 2024</time>
            </p>

            <h2 id="application-of-terms">Application of Terms.</h2>
            <p>These Website Terms &amp; Conditions (“T&amp;Cs”) apply to your access and use of moldstud.com (the “Site”), including all software,
                data, reports, text, images, sounds, video, and content made available through any portion of the Site (collectively, the “Content”).
                Content includes all such elements as a whole, as well as individual elements and portions thereof.</p>

            <h2 id="acceptance-of-terms">Acceptance of Terms.</h2>
            <p>MODSTUD-IT, SRL and any of its affiliates (collectively, “MoldStud”) permit you (“User” or “you” or “your”) to access and use the Site
                and Content, subject to these T&amp;Cs. By accessing or using any portion of the Site, you acknowledge that you have read, understood,
                and agree to be bound by these T&amp;Cs. If you are entering into these T&amp;Cs on behalf of a company or other legal entity (“User
                Entity”), you must have the legal authority to contractually bind such User Entity to these T&amp;Cs, in which case the terms “you” or
                “your” or “User” will refer to such User Entity. If you lack such legal authority to contractually bind or you do not agree with these
                T&amp;Cs, you must not accept these T&amp;Cs or access or use the site or content.</p>

            <h2 id="tcs-updates">T&amp;Cs Updates.</h2>
            <p>MoldStud reserves the right, at its sole discretion, to change or modify portions of these T&amp;Cs at any time. MoldStud will post the
                changes to these T&amp;Cs on the Site and will indicate at the top of this page the date these terms were last revised. It is your
                responsibility to check the T&amp;Cs periodically for changes. Your continued use of the Site and Content after the date any such
                changes become effective constitutes your acceptance of the new or revised T&amp;Cs.</p>

            <h2 id="general-conditions-access-and-use">General Conditions/Access and Use.</h2>
            <p><u>Authorization to Access and Use Site and Content.</u> Subject to your compliance with these T&amp;Cs and the provisions hereof, you
                may access or use the Site and Content solely for the purpose of your evaluation of MoldStud and MoldStud’s products and services. You
                may only link to the Site or Content, or any portion thereof, as expressly permitted by MoldStud.</p>
            <p><u>Ownership and Restrictions.</u> All rights, title, and interest in and to the Site and Content will remain with and belong
                exclusively to MoldStud. You will not (a) sublicense, resell, rent, lease, transfer, assign, time share, or otherwise commercially
                exploit or make the Site and any Content available to any third party, (b) use the Site and Content in any unlawful manner (including
                without limitation in violation of any data privacy or export control laws) or in any manner that interferes with or disrupts the
                integrity or performance of the Site and Content or their related components, or (c) modify, adapt, or hack the Site and Content to,
                or try to, gain unauthorized access to the restricted portions of the Site and Content or related systems or networks (i.e.,
                circumvent any encryption or other security measures, gain access to any source code or any other underlying form of technology or
                information, and gain access to any part of the Site and Content, or any other products or services of MoldStud that are not readily
                made available to the general public).</p>
            <p>You are not permitted to copy, modify, frame, repost, publicly perform or display, sell, reproduce, distribute, or create derivative
                works of the Site and Content, except that you may download, display, and print one copy of the publicly available materials (i.e.,
                the Content that does not require an Account name or password to access) on any single computer solely for your personal,
                non-commercial use, provided that you do not modify the material in any way and you keep intact all copyright, trademark, and other
                proprietary notices. You agree not to access the Site or Content by any means other than through the interface that is provided by
                MoldStud to access the same. You may not use any “page-scraper,” “deep-link,” “spider,” or “robot or other automatic program, device,
                algorithm or methodology, or any similar manual process, to access, copy, acquire, or monitor any portion of the Site or any Content,
                or in any way reproduce or circumvent the presentation or navigational structure of the Site or any Content, to obtain or attempt to
                obtain any Content or other information through any means not made generally available through the Site by MoldStud. MoldStud reserves
                the right to take any lawful measures to prevent any such activity. You may not forge headers or otherwise manipulate identifiers in
                order to disguise the origin of any message or transmittal you send to MoldStud on or through the Site or any service offered on or
                through the Site. You may not pretend that you are, or that you represent, someone else, or impersonate any other individual or
                entity.</p>
            <p><u>Responsibility for Your Data.</u> You are solely responsible for all data, information and other content, that you upload, post, or
                otherwise provide or store (hereafter “post(ing)”) in connection with or relating to the Site.</p>
            <p><u>Reservation of Rights.</u> MoldStud and its licensors each own and retain their respective rights in and to all logos, company
                names, marks, trademarks, copyrights, trade secrets, know-how, patents and patent applications that are used or embodied in or
                otherwise related to the Site and Content. MoldStud grants no rights or licenses (implied, by estoppel, or otherwise) whatsoever to
                you under these T&amp;Cs.</p>

            <h2 id="use-of-intellectual-property">Use of Intellectual Property.</h2>
            <p><u>Rights in User Content.</u> By posting your information and other content (“User Content”) on or through the Site and Content, you
                grant MoldStud a worldwide, non-exclusive, perpetual, irrevocable, royalty-free, fully paid, sublicensable and transferable license to
                use, modify, reproduce, distribute, display, publish and perform User Content in connection with the Site and Content. MoldStud has
                the right, but not the obligation, to monitor the Site and Content and User Content. MoldStud may remove or disable any User Content
                at any time for any reason, or for no reason at all.</p>
            <p><u>Unsecured Transmission of User Content.</u> You understand that the operation of the Site and Platform, including User Content, may
                be unencrypted and involve transmission to MoldStud’s third party vendors and hosting partners to operate and maintain the Site and
                Content. Accordingly, you acknowledge that you bear sole responsibility for adequate security, protection, and backup of User Content.
                MoldStud will have no liability to you for any unauthorized access or use of any of User Content or any corruption, deletion,
                destruction or loss of any of User Content.</p>
            <p><u>Feedback.</u> You may submit ideas, suggestions, or comments (“Feedback”) regarding the Site and Content or MoldStud’s business,
                products or services. By submitting any Feedback, you acknowledge and agree that (a) your Feedback is provided by you voluntarily and
                MoldStud may, without any obligations or limitation, use and exploit such Feedback in any manner and for any purpose, (b) you will not
                seek and are not entitled to any money or other form of compensation, consideration, or attribution with respect to your Feedback
                regardless of whether MoldStud considered or used your Feedback in any manner, and (c) your Feedback is not the confidential or
                proprietary information of you or any third party.</p>
            <p><strong>Your Representations and Warranties.</strong> You represent and warrant to MoldStud that your activity on the Site and
                MoldStud’s possession and use of User Content as contemplated in these T&amp;Cs do not and will not violate, infringe, or
                misappropriate any third party’s copyright, trademark, right of privacy or publicity, or other personal or proprietary right, nor does
                User Content contain any matter that is defamatory, obscene, unlawful, threatening, abusive, tortious, offensive or harassing.</p>
            <p><strong>Termination of Access Due to Violations.</strong> MoldStud may, in its sole discretion and without prior notice, terminate your
                access to the Site and/or block your future access to the Site if we determine that you have violated these T&amp;Cs or other
                agreements or guidelines which may be associated with your use of the Site. You also agree that any violation by you of these T&amp;Cs
                will cause irreparable harm to MoldStud, for which monetary damages would be inadequate, and you consent to MoldStud obtaining any
                injunctive or equitable relief that MoldStud deems necessary or appropriate in such circumstances, without limiting MoldStud’s other
                available remedies. Further, MoldStud may, in its sole discretion and without prior notice, terminate your access to the Site, for
                cause, which includes (but is not limited to) (1) requests by law enforcement or other government agencies, (2) discontinuance or
                material modification of the Site or any service offered on or through the Site, or (3) unexpected technical issues or problems.</p>

            <h2 id="no-warranties-and-disclaimer-by-moldstud">NO WARRANTIES AND DISCLAIMER BY MOLDSTUD.</h2>
            <p>THE SITE AND CONTENT AND ALL SERVER AND NETWORK COMPONENTS, ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITH ALL ERRORS AND
                DEFECTS AND WITHOUT ANY WARRANTIES OF ANY KIND, AND MOLDSTUD EXPRESSLY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
                IMPLIED WARRANTIES OF ACCURACY, COMPLETENESS, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, AND ANY
                REPRESENTATIONS OR WARRANTIES ARISING FROM COURSE OF DEALING, COURSE OF PERFORMANCE OR USAGE OF TRADE. YOU ACKNOWLEDGE THAT MOLDSTUD
                DOES NOT WARRANT THAT YOUR ACCESS OR USE OR BOTH OF THE SITE AND CONTENT WILL BE UNINTERRUPTED, TIMELY, SECURE, ERROR-FREE, OR
                VIRUS-FREE, AND MOLDSTUD DOES NOT MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SITE AND CONTENT. NO
                INFORMATION, ADVICE OR SERVICES OBTAINED BY YOU FROM MOLDSTUD OR THROUGH THE SITE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN
                THESE T&amp;Cs AND YOU SHOULD NOT RELY ON THE SITE AND THE GENERAL CONTENT ALONE AS THE BASIS FOR YOUR BUSINESS DECISIONS.</p>
            <p>MoldStud reserves the right to do any of the following, at any time, without notice: (1) to modify, suspend or terminate operation of
                or access to the Site, or any portion of the Site, for any reason; (2) to modify or change the Site, or any portion of the Site, for
                any reason; and (3) to interrupt the operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine
                maintenance, error correction, or other changes.</p>
        </>
    );
};

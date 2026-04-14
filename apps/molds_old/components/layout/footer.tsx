import {
    companyContact,
    footerMenus,
    footerPolicies,
    footerSocials,
    logoSrc,
} from '@/config/menu.config';

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="shell-container site-footer__main">
                <div className="site-footer__contact">
                    <img src={logoSrc} width="102" height="32" alt="MoldStud"/>
                    <span className="site-footer__eyebrow">Get in touch</span>
                    <a href={`tel:${companyContact.phone.replaceAll(' ', '')}`}>{companyContact.phone}</a>
                    <a href={`tel:${companyContact.alternatePhone.replaceAll(' ', '')}`}>{companyContact.alternatePhone}</a>
                    <a href={`mailto:${companyContact.email}`}>{companyContact.email}</a>
                </div>

                {footerMenus.map((group) => (
                    <div key={group.title} className="site-footer__group">
                        <h2>{group.title}</h2>
                        <ul>
                            {group.menu.map((item) => (
                                <li key={`${group.title}-${item.label}`}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="site-footer__legal">
                <div className="shell-container site-footer__legal-inner">
                    <p>&#169; 2018 - {(new Date()).getFullYear()} MoldStud. All rights reserved.</p>

                    <div className="site-footer__policies">
                        {footerPolicies.map((item) => (
                            <a key={item.label} href={item.href}>{item.label}</a>
                        ))}
                    </div>

                    <div className="site-footer__socials" aria-label="Social links">
                        {footerSocials.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={item.label}
                            >
                                <img src={item.iconSrc} width="18" height="18" alt="" aria-hidden="true"/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

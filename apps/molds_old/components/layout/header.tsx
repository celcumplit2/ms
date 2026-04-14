import {headerActions, headerMenu, logoSrc} from '@/config/menu.config';

export function Header() {
    return (
        <header className="site-header site-header--light">
            <div className="shell-container site-header__inner">
                <a className="site-header__brand" href="/">
                    <img src={logoSrc} width="102" height="32" alt="MoldStud"/>
                </a>

                <nav aria-label="Primary" className="site-header__nav">
                    {headerMenu.map((item) => (
                        <a key={item.label} href={item.href} data-caret={item.showCaret ? 'true' : undefined}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="site-header__actions">
                    <a className="site-shell-button site-shell-button--green site-shell-button--sm" href={headerActions.primary.href}>
                        {headerActions.primary.label}
                    </a>
                    <a className="site-shell-button site-shell-button--blue site-shell-button--sm" href={headerActions.secondary.href}>
                        {headerActions.secondary.label}
                    </a>
                    <a className="site-header__join" href={headerActions.tertiary.href}>
                        {headerActions.tertiary.label} -&gt;
                    </a>
                </div>
            </div>
        </header>
    );
}

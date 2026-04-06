import {FooterMenu, FooterMenuProps} from '@/components/layout/footer-menu';
import {Logo} from '@/components/layout/logo';

export type Menu = FooterMenuProps;

interface Props {
    menus: Menu[];
    logoSrc: string;
}

export function Footer({menus, logoSrc}: Props) {
    return (
        <footer id="footer">
            <div>
                <Logo src={logoSrc}/>
                {menus.map((menu, index) => (<FooterMenu key={`footer-menu-${index}`} menu={menu.menu}/>))}
            </div>
            <div>
                <p>Together, we can redefine technology through accessible design and development</p>
                <small>&#169; 2018 - {(new Date()).getFullYear()} MoldStud . All rights reserved.</small>
            </div>
        </footer>
    );
}

import {Menu as HeaderMenu} from '@/components/layout/header';
import {Menu as FooterMenu} from '@/components/layout/footer';

export const logoSrc = '/images/logo.svg';
export const headerMenu: HeaderMenu = [
  {label: 'Services', href: '/services'},
  {label: 'Careers', href: '/careers'},
  {label: 'About Us', href: '/about-us'},
  {label: 'Contact Us', href: '/contacts'},
  {label: 'Hire Us', href: '/hire-us'},
];
export const footerMenus: FooterMenu[] = [
  {
    menu: [
      ...headerMenu,
      {label: 'Industries', href: '/industries'},
      {label: 'Solutions', href: '/solutions'},
      {label: 'Technologies', href: '/technologies'},
      {label: 'Our Articles', href: '/articles', asNativeLink: true},
      {label: 'Privacy Policy', href: '/privacy-policy'},
    ],
  },
];

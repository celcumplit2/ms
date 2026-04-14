export const logoSrc = '/images/logo.svg';

export type HeaderMenu = Array<{
  href: string;
  label: string;
  showCaret?: boolean;
}>;

export type FooterMenu = Array<{
  href: string;
  label: string;
}>;

export type FooterMenuGroup = {
  title: string;
  menu: FooterMenu;
};

export const headerMenu: HeaderMenu = [
  {label: 'Roles', href: '/services', showCaret: true},
  {label: 'Industries', href: '/industries', showCaret: true},
  {label: 'Build', href: '/solutions', showCaret: true},
  {label: 'Case studies', href: '/case-studies'},
  {label: 'Insights', href: '/articles'},
  {label: 'Careers', href: '/careers'},
];

export const headerActions = {
  primary: {label: 'Build a product', href: '/hire-us'},
  secondary: {label: 'Hire talents', href: '/request-profiles'},
  tertiary: {label: 'Join us', href: '/careers'},
};

export const companyContact = {
  phone: '+373 2255 5010',
  alternatePhone: '+44 2048 570009',
  email: 'hello@moldstud.com',
};

export const footerMenus: FooterMenuGroup[] = [
  {
    title: 'Services',
    menu: [
      {label: 'Database Design and Management', href: '/services'},
      {label: 'Artificial Intelligence Integration', href: '/services'},
      {label: 'Blockchain Development', href: '/services'},
      {label: 'Machine Learning Development', href: '/services'},
      {label: 'Responsive Web Design', href: '/services'},
      {label: 'Cybersecurity Services', href: '/services'},
    ],
  },
  {
    title: 'Industries',
    menu: [
      {label: 'Automotive', href: '/industries'},
      {label: 'Aerospace', href: '/industries'},
      {label: 'Banking', href: '/industries'},
      {label: 'Biotechnology', href: '/industries'},
      {label: 'Information Technology', href: '/industries'},
      {label: 'Telecommunication', href: '/industries'},
    ],
  },
  {
    title: 'Solutions',
    menu: [
      {label: 'Security Operations Platform (SOC)', href: '/solutions'},
      {label: 'Threat Detection & Response Platform', href: '/solutions'},
      {label: 'Managed Detection & Response (MDR)', href: '/solutions'},
      {label: 'Security Information & Event Management', href: '/solutions'},
    ],
  },
  {
    title: 'Other',
    menu: [
      {label: 'Apply as a talent', href: '/request-profiles'},
      {label: 'Articles', href: '/articles'},
      {label: 'Technologies', href: '/technologies'},
      {label: 'Case studies', href: '/case-studies'},
      {label: 'Careers', href: '/careers'},
      {label: 'About us', href: '/about-us'},
      {label: 'Contact', href: '/contacts'},
    ],
  },
];

export const footerPolicies: FooterMenu = [
  {label: 'Terms and conditions', href: '/terms-and-conditions'},
  {label: 'Privacy policy', href: '/privacy-policy'},
  {label: 'Cookie policy', href: '/cookie-policy'},
];

export const footerSocials = [
  {label: 'Facebook', href: 'https://www.facebook.com/moldstud', iconSrc: '/images/socials/facebook.svg'},
  {label: 'Instagram', href: 'https://www.instagram.com/moldstud', iconSrc: '/images/socials/instagram.svg'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/company/moldstud', iconSrc: '/images/socials/linkedin.svg'},
  {label: 'X', href: 'https://twitter.com/moldstud', iconSrc: '/images/socials/x.svg'},
  {label: 'GitHub', href: 'https://github.com/celcumplit2/ms', iconSrc: '/images/socials/github.svg'},
];

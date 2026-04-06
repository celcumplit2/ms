import Breadcrumbs from '@/components/common/breadcrumbs';
import ContactsForm from '@/components/common/contacts-form';
import {Metadata} from 'next';
import styles from '@/styles/scss/contacts-page.module.scss';

export const metadata: Metadata = {
    title: 'Contacts',
    description: 'Contact MoldStud software development company and get a professional consultation for your business.',
    alternates: {
        canonical: '/contacts',
    },
};

export default function ContactsPage() {
    return (
        <>
            <Breadcrumbs links={[{label: 'Contacts', href: '/contacts'}]}/>
            <hgroup className={styles['heading']}>
                <p>Contacts</p>
                <h1>Got a question?</h1>
                <p>We’d love to talk about how we can help you.</p>
            </hgroup>
            <ContactsForm/>
        </>
    );
};

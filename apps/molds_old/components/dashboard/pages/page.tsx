import PageBody from '@/components/dashboard/pages/page-body';
import PageTitle from '@/components/dashboard/pages/page-title';
import {PropsWithChildren, ReactNode} from 'react';

interface PageProps extends PropsWithChildren {
    title?: string;
    buttons?: ReactNode;
}

export default function Page({title, buttons, children}: PageProps) {
    return (
        <>
            {(title === undefined && buttons === undefined) ? null : (
                <PageTitle title={title ?? ''} buttons={buttons}/>
            )}
            <PageBody>
                {children}
            </PageBody>
        </>
    );
}

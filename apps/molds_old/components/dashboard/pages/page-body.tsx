import {PropsWithChildren} from 'react';

export default function PageBody({children}: PropsWithChildren) {
    return (
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}

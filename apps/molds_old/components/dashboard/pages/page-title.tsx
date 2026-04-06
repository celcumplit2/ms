import {ReactNode} from 'react';

interface PageTitleProps {
    title: string;
    buttons?: ReactNode;
}

export default function PageTitle({title, buttons}: PageTitleProps) {
    return (
        <div className="flex flex-row items-center bg-white shadow">
            <div className="w-9/12 py-6 px-4 sm:px-6 lg:px-8 box-border">
                {title !== undefined && (
                    <h1 className="text-2xl font-bold text-gray-900">
                        {title}
                    </h1>
                )}
            </div>
            {buttons !== undefined && (
                <div className="w-3/12 py-6 pr-4 sm:pr-6 lg:pr-8 box-border flex justify-end items-center">
                    {buttons}
                </div>
            )}
        </div>
    );
}

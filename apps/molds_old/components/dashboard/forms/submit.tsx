import {clsx} from 'clsx';
import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

export default function Submit({className, ...restProps}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <input
            className={clsx(
                className,
                // 'block bg-blue-600 hover:bg-blue-800 text-white uppercase text-lg mx-auto py-2 px-4 cursor-pointer',
                'px-6 py-3 text-white bg-blue-600 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer',
            )}
            value="Save"
            {...restProps}
            type="submit"
        />
    );
}

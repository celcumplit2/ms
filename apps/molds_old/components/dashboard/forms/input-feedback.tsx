import {PropsWithChildren} from 'react';

export default function InputFeedback({children}: PropsWithChildren) {
    return !children
        ? null
        : (
            <p className="text-sm text-red-700">{children}</p>
        );
}

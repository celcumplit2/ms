'use client';

import {IconTrash} from '@tabler/icons-react';
import {PropsWithChildren} from 'react';
import {toast} from 'sonner';

interface DeleteButtonProps extends PropsWithChildren {
    id: number;
    action: (id: number) => Promise<void | string>;
}

export default function DeleteButton({id, action, children}: DeleteButtonProps) {
    const onClickHandle = async () => {
        if (confirm('Are you sure you wanna delete this record?')) {
            const response = await action(id);

            if (response && response.length > 0) {
                toast.error(response);
            } else {
                toast.success('The record was deleted!');
            }
        }
    };

    return (
        <button
            className="text-red-600 hover:text-red-900 cursor-pointer"
            onClick={onClickHandle}
        >
            {children ?? (<IconTrash size="20"/>)}
        </button>
    );
}

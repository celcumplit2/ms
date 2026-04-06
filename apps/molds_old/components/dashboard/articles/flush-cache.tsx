'use client';

import Button from '@/components/dashboard/common/button';
import {MouseEvent, useState} from 'react';
import {toast} from 'sonner';

export default function FlushCache() {
    const [sending, setSending] = useState(false);

    const onFlushCacheClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            setSending(true);

            const response = await fetch('/dashboard/api/cron/latest-articles', {
                method: 'POST',
            });

            if (response.ok) {
                toast.success('Cache was refreshed!');
            } else {
                console.log(`${response.status}: ${response.statusText}`);
                toast.error('Something went wrong on the server side.');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong on the server side.');
        } finally {
            setSending(false);
        }
    };

    return (
        <Button onClick={onFlushCacheClick} disabled={sending}>{sending ? 'Sending...' : 'Refresh articles cache'}</Button>
    );
}

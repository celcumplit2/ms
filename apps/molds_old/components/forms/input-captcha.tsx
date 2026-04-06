'use client';

import Alert from '@/components/forms/alert';
import Input from '@/components/forms/input';
import Script from 'next/script';
import {useCallback, useEffect, useMemo, useState} from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        grecaptcha: any;
    }
}

interface InputCaptchaProps {
    name: string;
    reCaptchaAction: string;
    error?: string;
    onTokenChange?: (token: string) => void | Promise<void>;
    generateWhenReady?: boolean;
    requestGeneration?: boolean;
}

export default function InputCaptcha(
    {
        name,
        error,
        reCaptchaAction,
        onTokenChange,
        generateWhenReady = true,
        requestGeneration = false,
    }: InputCaptchaProps,
) {
    const hasError = useMemo(() => error !== undefined && error.length > 0, [error]);
    const [token, setToken] = useState<string>('');

    const changeToken = useCallback((reCaptchaToken: string): void => {
        setToken(reCaptchaToken);

        if (onTokenChange !== undefined) {
            onTokenChange(reCaptchaToken);
        }
    }, [onTokenChange]);

    const onReady = useCallback(() => {
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {action: reCaptchaAction})
                .then((reCaptchaToken: string) => {
                    changeToken(reCaptchaToken);
                });
        });
    }, [reCaptchaAction, changeToken]);

    // const refreshToken = useCallback(() => {
    //     const intervalId = setInterval(() => {
    //         onReady();
    //     }, 110000);
    //
    //     return () => clearInterval(intervalId);
    // }, [onReady]);

    // useEffect(() => {
    //     if (!generateWhenReady) {
    //         return;
    //     }
    //
    //     return refreshToken();
    // }, [onReady, generateWhenReady, refreshToken]);

    useEffect(() => {
        if (requestGeneration) {
            onReady();

            // return refreshToken();
        }
    }, [onReady, requestGeneration]);

    return (
        <>
            <Input
                readOnly
                type="hidden"
                name={name}
                value={token}
            />
            {hasError && (
                <Alert variant="failure">{error}</Alert>
            )}
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                onReady={generateWhenReady ? onReady : undefined}
            />
        </>
    );
}

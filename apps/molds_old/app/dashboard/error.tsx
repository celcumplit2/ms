'use client';

import React from 'react';

export default function Error(
    {}: {
        error: Error;
        reset: () => void;
    },
) {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <h1>Something went wrong!</h1>
            <p>Please try again!</p>
        </div>
    );
}

'use client';

import React from 'react';

export default function Error({}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="error-page">
            <h1>Something went wrong!</h1>
            <p>Please try again!</p>
        </div>
    );
}

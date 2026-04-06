'use client';

import Input from '@/components/dashboard/forms/input';
import useImport from '@/hooks/use-import';
import {ImportArticle} from '@/types/import';
import {useReducer} from 'react';

interface ImportError {
    title: string;
    message: string;
}

interface ImportState {
    errors: ImportError[];
}

type ImportAction = { type: 'ADD_ERROR', error: ImportError };

function importReducer(state: ImportState, action: ImportAction): ImportState {
    switch (action.type) {
        case 'ADD_ERROR':
            return {
                ...state,
                errors: [...state.errors, action.error],
            };
        default:
            return state;
    }
}

interface ImportFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (params: { payload: any }) => Promise<{ title: string, message: string } | void>;
    entityImportSchema?: string;
}

export default function ImportForm({action, entityImportSchema}: ImportFormProps) {
    const [importState, importDispatch] = useReducer(importReducer, {errors: []});

    async function importRecords(record: ImportArticle): Promise<void> {
        const response = await action({payload: record});

        if (response !== undefined) {
            importDispatch({type: 'ADD_ERROR', error: response});
        }
    }

    const {
        file,
        errors,
        json,
        total,
        imported,
        progress,
        onFileChange,
        onParseFile,
        onImportRecords,
        loading,
    } = useImport({action: importRecords});

    return (
        <>
            {entityImportSchema && (
                <div className="w-full overflow-hidden">
                    <h3 className="font-medium mb-2 text-lg">The file should have the next schema.</h3>
                    <code className="max-w-full overflow-hidden mb-4 block">
                        {entityImportSchema}
                    </code>
                </div>
            )}

            {file !== null && (
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 inline-flex items-center mb-4 mr-4 disabled:bg-blue-400"
                    onClick={onParseFile}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Parse & Validate File'}
                </button>
            )}
            {json.length > 0 && (
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 inline-flex items-center mb-4 disabled:bg-green-400"
                    onClick={onImportRecords}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Import records'}
                </button>
            )}

            {total > 0 && (
                <div className="flex flex-col gap-1 mb-4">
                    <p className="text-sm text-end">Imported {imported} from {total}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            )}

            <form>
                <Input
                    name="file"
                    label="CSV file"
                    type="file"
                    accept=".csv"
                    onChange={onFileChange}
                />
                {errors.length > 0 && (
                    <h3 className="mt-4 text-red-500 text-xl font-medium">
                        Some errors occurred during the CSV parsing.
                    </h3>
                )}
                {errors.map((error) => (
                    <p key={error.row + error.code} className="mt-3 text-red-500 flex flex-col gap-2 pb-2 border-b-2 border-red-500">
                        <span>Type: {error.type}</span>
                        <span>Code: {error.code}</span>
                        <span>Message: {error.message}</span>
                        <span>Row: {error.row}</span>
                        <span>Index: {error.index}</span>
                    </p>
                ))}
                {importState.errors.length > 0 && (
                    <>
                        <h3 className="mt-4 text-red-500 text-xl font-medium">
                            Some records fail the validation and wasn&apos;t imported.
                        </h3>
                        <p className="font-medium text-lg">You&apos;ll find the title and the reason bellow:</p>
                        <ul className="mt-2 flex flex-col gap-4">
                            {importState.errors.map((error) => (
                                <li key={error.title}>
                                    <h4 className="font-medium">{error.title}</h4>
                                    <p>{error.message}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <button
                    type="reset"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 inline-flex items-center mb-4 mr-4 mt-4 disabled:bg-blue-400"
                    onClick={() => {
                        window.location.reload();
                    }}
                    disabled={!file || loading}
                >
                    Reset
                </button>
            </form>
        </>
    );
}

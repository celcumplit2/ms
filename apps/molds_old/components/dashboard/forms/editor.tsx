'use client';

import InputFeedback from '@/components/dashboard/forms/input-feedback';
import Label from '@/components/dashboard/forms/label';
import clsx from 'clsx';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import SunEditor from 'suneditor-react';
import {SunEditorReactProps} from 'suneditor-react/dist/types/SunEditorReactProps';
import 'suneditor/dist/css/suneditor.min.css';

export interface EditorProps extends SunEditorReactProps {
    name?: string;
    label?: ReactNode;
    className?: string;
    error?: string;
}

export default function Editor(
    {
        name,
        label,
        error,
        className,
        defaultValue,
        onChange,
        ...editorProps
    }: EditorProps,
) {
    const [editorValue, setEditorValue] = useState(defaultValue ?? '');
    const editorValueRef = useRef(editorValue);
    const hasError = error !== undefined;

    function onTextareaChange() {
        // Do nothing. Just use this to stop the ReactJS error about missing an onChange prop for a textarea with value prop.
    }

    useEffect(() => {
        if (editorValueRef.current !== editorValue) {
            if (onChange) {
                onChange(editorValue);
            }

            editorValueRef.current = editorValue;
        }
    }, [editorValue, onChange]);

    return (
        <div className="flex flex-col flex-1">
            <Label hasError={hasError}>{label}</Label>
            <div className={clsx(className, {'is-invalid': hasError})}>
                <SunEditor
                    height="300"
                    setOptions={{
                        buttonList: [
                            ['undo', 'redo', 'codeView'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                            ['fontColor', 'hiliteColor', 'blockquote'],
                            ['removeFormat'],
                            ['outdent', 'indent'],
                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                            ['table', 'link', 'image', 'video'],
                            ['font', 'fontSize', 'formatBlock'],
                        ],
                    }}
                    {...editorProps}
                    onChange={(content: string) => {
                        setEditorValue(content === '<p><br></p>' ? '' : content);
                    }}
                />
                <textarea name={name} value={editorValue} onChange={onTextareaChange} className="hidden"/>
            </div>
            <InputFeedback>{error}</InputFeedback>
        </div>
    );
};

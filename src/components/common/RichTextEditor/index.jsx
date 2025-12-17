"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichTextEditor = ({ value, onChange }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            // data="<p>Hello world!</p>"
            config={{
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|',
                    'bold', 'italic', '|',
                    'blockQuote', '|',
                    'numberedList', 'bulletedList', '|',
                    'outdent', 'indent',
                    ' | ', 'link'
                ]
                // No image, media, or table buttons
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                if (onChange) {
                    onChange(data);
                }
                console.log({ data });
            }}
        />
    );
};

export default RichTextEditor;

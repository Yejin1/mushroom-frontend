import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';


function MainEditor({ initialContent, onContentChange }) {
    const editorRef = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = () => {
        const markdown = editorRef.current.getInstance().getMarkdown();
        onContentChange(markdown);
    };

    return (
        mounted && (
            <Editor
                ref={editorRef}
                initialValue={initialContent || ''}
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                onChange={handleChange}
                plugins={[colorSyntax]}
            />
        )
    );
}

export default MainEditor;

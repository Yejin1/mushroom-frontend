import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import styles from './MainEditor.module.css';

function MainEditor({ value, onChange }) {
    const editorRef = useRef();
    const [mounted, setMounted] = useState(false);
    const [content, setContent] = useState(value || '');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setContent(value || '');
    }, [value]);

    const handleEditorInput = (newValue) => {
        setContent(newValue);
        onChange && onChange(newValue);
    };

    return (
        mounted && (
            <div className={styles.editorRoot}>
                <Editor
                    ref={editorRef}
                    initialValue={content}
                    previewStyle="vertical"
                    height="500px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    onChange={() => {
                        if (editorRef.current) {
                            const data = editorRef.current.getInstance().getMarkdown(); // 또는 getHTML()
                            handleEditorInput(data);
                        }
                    }}
                    plugins={[colorSyntax]}
                />
            </div>
        )
    );
}

export default MainEditor;

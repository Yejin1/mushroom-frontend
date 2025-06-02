import React from 'react';
import { Viewer } from '@toast-ui/react-editor';

function MainViewer({ markdownContent }) {
    return (
        <div>
            <Viewer
                key={markdownContent}
                initialValue={markdownContent}
                height="auto"
            />
        </div>
    );
}

export default MainViewer;

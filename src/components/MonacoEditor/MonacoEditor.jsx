import React, { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoEditorComponent = ({ language, code, setCode }) => {
  const editorRef = useRef(null);

  const beforeMount = (monaco) => {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1c2130',
      }
    });
  };

  const editorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const onChange = (newValue) => {
    setCode(newValue);
  };

  return (
    <MonacoEditor
      language={language}
      theme="customTheme"
      value={code}
      options={{
        selectOnLineNumbers: true,
        minimap: {
          enabled: false
        }
      }}
      onChange={onChange}
      editorDidMount={editorDidMount}
      editorWillMount={beforeMount}
    />
  );
};

export default MonacoEditorComponent;
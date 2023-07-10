import React, { useEffect, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import Button from '@mui/material/Button';

interface HandlebarsEditorProps {
  editorCode?: string;
  onSave: (code: string) => void;
  onCancel: () => void;
}

const HandlebarsEditor: React.FC<HandlebarsEditorProps> = ({
  editorCode = '',
  onSave,
  onCancel
}) => {
  const [code, setCode] = useState(editorCode);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  const handleSave = () => {
    // console.log({ code });
    onSave(code);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div>
        <Editor height="90vh" defaultLanguage="handlebars" defaultValue={code} />

        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </>
  );
};

export default HandlebarsEditor;

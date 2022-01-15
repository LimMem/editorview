import React, { FC, useRef, useState } from 'react';
import './index.less';
import { EditorView, EditorImperativeHandleHandle } from '../../';

interface HomePageProps {}

const defaultEditorText = [
  'const doAction = (data, state, callback1, callback2) => {',
  '\t',
  '};',
].join('\n');

const HomePage: FC<HomePageProps> = () => {
  const editRef = useRef<EditorImperativeHandleHandle>();
  const [text, setText] = useState('');
  const [color, setColor] = useState('#fff');

  const onSave = () => {
    setText(editRef.current?.getValue() || '');
  };

  return (
    <div className="wrapper">
      <EditorView
        forwardRef={editRef}
        onError={(err) => {
          // console.log('asdfasd', err);
        }}
        defaultValue={defaultEditorText}
        className="editor"
      />
      <div>
        <div className="saveButon" onClick={onSave}>
          转化
        </div>
        <div
          className="saveButon"
          style={{
            marginTop: '20px',
            backgroundColor: 'transparent',
            border: '1px solid #f6f6f6',
            color: '#333',
          }}
          onClick={() => {
            setText('');
          }}
        >
          清空
        </div>
      </div>
      <textarea
        style={{ color }}
        disabled
        placeholder="待转化内容"
        value={text}
        className="output"
      />
    </div>
  );
};

export default HomePage;

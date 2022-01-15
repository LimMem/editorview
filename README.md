# editorview

js 编辑器，可以对代码进行提示、babel 编译

## Getting Started

> npm i editorview

```javascript
import EditorView, { EditorImperativeHandleHandle } from 'editorview/es/EditorView';

  const editRef = useRef<EditorImperativeHandleHandle>();

  // 获取值 默认获取es6 -> es5代码
  editRef.current?.getValue();

  return (
    <EditorView
      forwardRef={editRef}
      onError={(err) => {
        console.log(err); // 代码转化失败时回调
      }}
      defaultValue={defaultEditorText}
      className={styles.editor}
    />
  );

```

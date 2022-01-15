import React, { FC, useImperativeHandle, useState } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
const { transformSync } = require('@babel/core/lib/transform');
import classnames from 'classnames';
import './index.less';

const prefixCls = 'editor-view-default';

interface EditorViewProps extends EditorProps {
  /**
   * useBabel为true时生效
   */
  babelOptions?: any;
  /**
   * 是否使用babel转化
   */
  useBabel?: boolean;

  /**
   * @description 错误时触发
   */
  onError?: (err: Error) => void;
}

export interface EditorImperativeHandleHandle {
  getValue: () => string;
}

const EditorView: FC<
  EditorViewProps & {
    forwardRef?: React.MutableRefObject<EditorImperativeHandleHandle | undefined>;
  }
> = (props) => {
  const {
    onChange,
    useBabel = true,
    babelOptions = {},
    defaultValue,
    className,
    forwardRef,
    onError,
    ...restProps
  } = props;
  const [val, setVal] = useState(defaultValue);

  const esBabelTransform = () => {
    try {
      const result = transformSync(val, {
        presets: [require('@babel/preset-env')],
        babelrc: false,
        configFile: false,
      });
      return result.code;
    } catch (error: any) {
      if (onError) {
        onError(error);
      }
    }
  };

  const getValue = () => {
    if (useBabel) {
      return esBabelTransform();
    }
    return val;
  };

  useImperativeHandle(forwardRef, () => ({
    getValue,
  }));

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{
        fontSize: 20,
      }}
      className={classnames(prefixCls, { [`${className || ''}`]: !!className })}
      {...restProps}
      defaultValue={val}
      onChange={(val, e) => {
        setVal(val);
        if (onChange) {
          onChange(val, e);
        }
      }}
    />
  );
};

export default EditorView;

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
  onError?: (err: unknown) => void;

  /**
   * @description 提交成功时触发
   */
  onSuccess?: ({ code, origin }: { code?: string, origin?: string }) => void;
}

export interface EditorImperativeHandleHandle {
  getValue: () => { error?: Error | unknown; code?: string | null };
  getBabelValue: () => { error?: Error | unknown; code?: string | null };
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
    onSuccess,
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
      return {
        code: result.code,
      };
    } catch (error: unknown) {
      return {
        error,
      };
    }
  };

  const getValue = () => {
    if (useBabel) {
      return esBabelTransform();
    }
    return {
      code: val,
    };
  };

  const submit = () => {
    try {
      const result = transformSync(val, {
        presets: [require('@babel/preset-env')],
        babelrc: false,
        configFile: false,
      });

      if (onSuccess) {
        onSuccess({
          code: result.code,
          origin: val
        });
      }

    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  useImperativeHandle(forwardRef, () => ({
    getValue,
    getBabelValue: esBabelTransform,
    submit
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

import { Input } from "antd";
import React from "react";
const { TextArea } = Input;
type Props = {
  title: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  wrapperStyle?: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  rows?: number;
  iconRender?: (visible: boolean) => React.ReactNode;
  readOnly?: boolean;
  showCount?: boolean;
  maxLength?: number;
};

const TextAreaField = (props: Props) => {
  return (
    <div className={props.wrapperStyle}>
      <span className="input-title">{props.title}</span>
      <sup className="text-red-500">{props.required ? "*" : ""}</sup>
      <TextArea
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
        className={props.className}
        onChange={props.onChange}
        onBlur={props.onBlur}
        rows={props.rows}
        readOnly={props.readOnly}
        maxLength={props.maxLength}
        showCount={props.showCount}
        disabled={props.disabled}
      />
      <span className="error-message">
        {props.error ? props.errorMessage : ""}
      </span>
    </div>
  );
};

export default TextAreaField;

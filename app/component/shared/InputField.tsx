import { Input } from "antd";
import error from "next/error";
import React from "react";

type Props = {
  title: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
  readOnly?: boolean;
};

const InputField = (props: Props) => {
  return (
    <div>
      <span className="input-title">{props.title}</span>
      {props.type === "password" ? (
        <Input.Password
          type={props.type}
          value={props.value}
          required={props.required}
          placeholder={props.placeholder}
          className={props.className}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly}
          disabled={props.disabled}
          iconRender={props.iconRender}
        />
      ) : (
        <Input
          type={props.type}
          required={props.required}
          placeholder={props.placeholder}
          className={props.className}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly}
          disabled={props.disabled}
        />
      )}
      <span className="error-message">{error ? props.errorMessage : ""}</span>
    </div>
  );
};

export default InputField;

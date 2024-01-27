import { Input } from "antd";
import React from "react";

type Props = {
  title: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
  readOnly?: boolean;
  showCount?: boolean;
  maxLength?: number;
};

const InputField = (props: Props) => {
  return (
    <div>
      <span className="input-title">{props.title}</span>
      <sup className="text-red-500">{props.required ? "*" : ""}</sup>
      {props.type === "password" ? (
        <Input.Password
          type={props.type}
          value={props.value || ""} // Ensure that the value is not undefined
          required={props.required}
          placeholder={props.placeholder}
          className={props.className}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly}
          maxLength={props.maxLength}
          showCount={props.showCount}
          disabled={props.disabled}
          iconRender={props.iconRender}
        />
      ) : (
        <Input
          type={props.type}
          value={props.value || ""} // Ensure that the value is not undefined
          required={props.required}
          placeholder={props.placeholder}
          className={props.className}
          onChange={props.onChange}
          onBlur={props.onBlur}
          readOnly={props.readOnly}
          disabled={props.disabled}
        />
      )}
      <span className="error-message">
        {props.error ? props.errorMessage : ""}
      </span>
    </div>
  );
};

export default InputField;

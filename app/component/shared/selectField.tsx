import { Select } from "antd";
import React from "react";

type SelectOption = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type Props = {
  title: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value: any;
  defaultValue?: React.ChangeEvent<HTMLInputElement>;
  options: SelectOption[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const SelectField = (props: Props) => {
  return (
    <div className={"flex flex-col items-start"}>
      <div>
        <span className="input-title">{props.title}</span>
        {props.required ? <sup className="text-red-500">*</sup> : <></>}
      </div>
      <Select
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        value={props.value}
        className={props.className}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur}
        options={props.options}
      />
      <span className="error-message">
        {props.error ? props.errorMessage : ""}
      </span>
    </div>
  );
};

export default SelectField;

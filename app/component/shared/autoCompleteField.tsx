import { AutoComplete, Input } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React from "react";
type SelectOption = {
  value: string | number;
  label: string | React.ReactNode;
  disabled?: boolean;
};
type Props = {
  title: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  popupClassName?: string;
  value?: string;
  popupMatchSelectWidth?: number;
  options: SelectOption[];
  onChange: (value: string | undefined) => void;
  onSelect: any;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  size?: SizeType;
  disabled?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
  readOnly?: boolean;
};

const AutoCompleteField = (props: Props) => {
  return (
    <div>
      <p className="input-title">{props.title}</p>
      <AutoComplete
        popupClassName={props.popupClassName}
        popupMatchSelectWidth={props.popupMatchSelectWidth}
        className={props.className}
        options={props.options}
        onChange={props.onChange}
        onSelect={props.onSelect}
        size={props.size}
        value={props.value}
      >
        <Input.Search size={props.size} placeholder={props.placeholder} />
      </AutoComplete>
      <span className="error-message">
        {props.error ? props.errorMessage : ""}
      </span>
    </div>
  );
};

export default AutoCompleteField;

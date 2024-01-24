import { DatePicker } from "antd";
import React from "react";
import type { DatePickerProps } from "antd";
type DatePickerFieldProps = DatePickerProps & {
  title: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
};
const DatePickerField = (props: DatePickerFieldProps) => {
  return (
    <div>
      <div>
        <span className="input-title">{props.title}</span>
        {props.required ? <sup className="text-red-500">*</sup> : <></>}
      </div>
      <DatePicker
        onChange={props.onChange}
        value={props.value}
        format={props.format}
        allowClear={props.allowClear}
        className={props.className}
        disabledDate={props.disabledDate}
      />
      <span className="error-message">
        {props.error ? props.errorMessage : ""}
      </span>
    </div>
  );
};

export default DatePickerField;

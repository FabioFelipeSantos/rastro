import { type FC, type TextareaHTMLAttributes } from "react";

import { TextAreaStyles } from "./styles";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  $isError?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({ $isError = false, ...props }) => {
  return (
    <TextAreaStyles
      $isError={$isError}
      {...props}
    />
  );
};

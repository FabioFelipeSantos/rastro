import { type FC, type TextareaHTMLAttributes } from "react";

import { TextAreaStyles } from "./styles";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  $isError?: boolean;
  isFromParent?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({ $isError = false, isFromParent = false, ...props }) => {
  return (
    <TextAreaStyles
      $isError={$isError}
      $isFromParent={isFromParent}
      {...props}
    />
  );
};

import { type FC, type TextareaHTMLAttributes } from "react";

import { TextAreaStyles } from "./styles";

export const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ ...props }) => {
  return <TextAreaStyles {...props} />;
};

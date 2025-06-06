import { type FC, type ReactNode } from "react";

import { ErrorMessageStyles } from "./styles";

type ErrorMessageProps = {
  text: string | string[];
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  let content: ReactNode;

  if (!Array.isArray(text)) {
    content = text;
  } else {
    content = (
      <ul>
        {text.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    );
  }

  return <ErrorMessageStyles>{content}</ErrorMessageStyles>;
};

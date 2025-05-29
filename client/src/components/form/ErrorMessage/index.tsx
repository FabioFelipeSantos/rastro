import { type FC } from "react";

import { ErrorMessageStyles } from "./styles";

type ErrorMessageProps = {
  text: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return <ErrorMessageStyles>{text}</ErrorMessageStyles>;
};

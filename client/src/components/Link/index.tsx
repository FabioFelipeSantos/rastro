import { type FC } from "react";

type LinkProps = {
  url: string;
  text: string;
};

export const Link: FC<LinkProps> = ({ url, text }) => {
  return (
    <a
      href={url}
      target="_blank"
    >
      {text}
    </a>
  );
};

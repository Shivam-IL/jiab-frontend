import React from "react";

import { SVG_ICON_URL } from "@/constants";
import { ISvgIcons } from "@/interfaces";

const SvgIcons: React.FC<ISvgIcons> = ({
  name,
  width,
  height,
  fontSize,
  className,
}) => {
  return (
    <svg
      className={className ?? ""}
      {...(fontSize || width ? { width: fontSize ?? width } : {})}
      {...(fontSize || height ? { height: fontSize ?? height } : {})}
    >
      <use href={`${SVG_ICON_URL}public--static--sprite--icons--${name}`}></use>
    </svg>
  );
};

export default SvgIcons;

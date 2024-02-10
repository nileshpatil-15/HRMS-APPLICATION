import React, { ReactNode } from "react";
interface props {
  children: ReactNode;
  textAlign?: string;
}
export const Title: React.FC<props> = ({ children, textAlign }) => {


  const titleClassName = `font-montserrat font-bold text-[#222222]   text-[16px] ${
    textAlign ? `text-${textAlign}` : ""
  }`;
  return (
    <p style={{ fontWeight: "600" }} className={titleClassName}>
      {children}
    </p>
  );
};

export default Title;

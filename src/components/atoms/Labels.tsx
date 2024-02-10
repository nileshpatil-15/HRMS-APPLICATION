import  { FC, ReactNode } from "react";
import { Typography } from "@mui/material";

interface CustomLabelProps {
  textAlign?: string;
  children: ReactNode;
}

const CustomLabel: FC<CustomLabelProps> = ({ children }) => {
  return (
    <Typography
      fontFamily={"montserrat"}
      component="span"
      variant="subtitle1"
      sx={{
        fontSize: "17px",
        fontWeight: 700,
        color: "#8E8E8E",
         // Default to 'left' if not provided
        // Add any other styles you want to apply globally
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomLabel;
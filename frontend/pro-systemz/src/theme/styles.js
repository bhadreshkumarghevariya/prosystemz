import { background, foreground, accent1, accent2, accent3 } from "./colors";

export const buttonStyle = {
  backgroundColor: accent1,
  color: foreground,
  borderColor: accent1,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
  transform: "translateY(0)",
  ":hover": {
    transform: "translateY(-20px)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    color: background,
    backgroundColor: accent2,
  },
  ":focus": {
    transform: "translateY(-20px)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    color: background,
    backgroundColor: accent2,
  },
};

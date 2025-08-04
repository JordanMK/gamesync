import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type MaterialIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

interface IconProps {
  name: MaterialIconName;
  size?: number;
  color?: string;
  style?: React.ComponentProps<typeof MaterialCommunityIcons>["style"];
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "black",
  style = "",
  ...props
}) => (
  <MaterialCommunityIcons
    name={name}
    size={size}
    color={color}
    style={style}
    {...props}
  />
);

export default Icon;

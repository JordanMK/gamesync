// components/Icon.tsx
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface IconProps {
  name: MaterialIconName;
  size?: number;
  color?: string;
  style?: React.ComponentProps<typeof MaterialIcons>["style"];
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "black",
  style,
  ...props
}) => (
  <MaterialIcons
    name={name}
    size={size}
    color={color}
    style={style}
    {...props}
  />
);

export default Icon;

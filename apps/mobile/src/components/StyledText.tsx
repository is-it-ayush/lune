import { clsx } from "clsx";
import { Text } from "react-native"

interface StyledTextProps extends React.ComponentProps<typeof Text> { }

export const StyledText = (props: StyledTextProps) => {
  return (
    <Text {...props} className={clsx("font-poppins", props.className)}>
      {props.children}
    </Text>
  );
}

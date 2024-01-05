import { Stack } from "expo-router";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}

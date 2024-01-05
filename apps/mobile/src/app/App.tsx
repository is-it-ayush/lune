import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center">
      <Image width={300} height={400} source={{ uri: "https://media.tenor.com/i829SwWp6pAAAAAM/cat-angry.gif" }} />
      <Text className="text-amber-500">blyat. :3</Text>
      <StatusBar style="auto" />
    </View>
  );
}

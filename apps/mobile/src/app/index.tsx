/**
Lune
Copyright (C) 2024 ayush.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import { StyledText } from "~/components/StyledText";

export default function App() {
  const helloQuery = useQuery({
    queryKey: ['lune.hello'],
    queryFn: () => fetch("http://192.168.0.140:3000/health").then((res) => res.json()),
  });
  console.log(JSON.stringify(helloQuery));

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        width={300}
        height={400}
        source={{
          uri: "https://media.tenor.com/i829SwWp6pAAAAAM/cat-angry.gif",
        }}
      />
      <StyledText className="text-amber-500">blyat :3</StyledText>
      <StatusBar style="auto" />
    </View>
  );
}

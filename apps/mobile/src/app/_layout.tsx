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

import "~/styles/globals.css";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontLoaded, fontError] = useFonts({
    'PoppinsThin': require("../../assets/fonts/poppins/Poppins-Thin.ttf"),
    'PoppinsExtraLight': require("../../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
    'PoppinsLight': require("../../assets/fonts/poppins/Poppins-Light.ttf"),
    'PoppinsRegular': require("../../assets/fonts/poppins/Poppins-Regular.ttf"),
    'PoppinsMedium': require("../../assets/fonts/poppins/Poppins-Medium.ttf"),
    'PoppinsSemiBold': require("../../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    'PoppinsBold': require("../../assets/fonts/poppins/Poppins-Bold.ttf"),
    'PoppinsExtraBold': require("../../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    'PoppinsBlack': require("../../assets/fonts/poppins/Poppins-Black.ttf"),
  });

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default Layout;

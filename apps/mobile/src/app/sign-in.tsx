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

import { useState } from "react"
import { View } from "react-native"
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { Text } from "~/components/Text"
import type { Credentials } from "~/hooks/useSession";

const SignInPage = () => {
  const [userForm, setUserForm] = useState<Credentials>({
    email: "",
    password: ""
  });

  return (
    <View className="flex flex-1 flex-col justify-center p-10 gap-4">
      <Text className="font-poppins-200 flex text-4xl">sign in.</Text>
      <View className="flex flex-col w-full gap-2">
        <Input
          placeholder="email..."
          value={userForm.email}
          onChangeText={(updatedEmail) => {
            setUserForm((prev) => ({ ...prev, email: updatedEmail }));
          }}
        />
        <Input
          placeholder="password..."
          value={userForm.password}
          onChangeText={(updatedPassword) => {
            setUserForm((prev) => ({ ...prev, password: updatedPassword }));
          }}
        />
        <Button className="w-full" onPress={() => {
          // todo: aaaugh
        }}>Sign In</Button>
      </View>
    </View>
  )
}

export default SignInPage;

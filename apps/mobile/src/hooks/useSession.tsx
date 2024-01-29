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

import { createContext, useContext, type ReactNode, useState } from "react";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  method: SessionMethod;
};
export type Credentials = {
  email: string;
  password: string;
};
type SessionMethod = "Email" | "Google";
type SessionState = {
  signIn: (credentials: Credentials, method: SessionMethod) => Promise<void>;
  signOut: () => Promise<void>;
  sessionUser: SessionUser | null;
};

const SessionContext = createContext<SessionState | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  async function signIn(
    credentials: Credentials,
    method: SessionMethod,
  ): Promise<void> {
    switch (method) {
      case "Google":
        break;
      case "Email":
        break;
      default:
        break;
    }
  }
  async function signOut(): Promise<void> {
    setSessionUser(null);
  }

  return (
    <SessionContext.Provider
      value={{
        signIn,
        signOut,
        sessionUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionState => {
  const authState = useContext(SessionContext);
  if (!authState) {
    throw new Error(
      "SessionContext was null. Are you sure you've wrapped your application with <SessionProvider />?",
    );
  }
  return authState;
};

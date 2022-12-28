import { createContext } from "react";
import type { User } from "@firebase/auth";

export const UserContext = createContext<{
  user: User | null | undefined;
  username: string | null;
}>({ user: null, username: null });

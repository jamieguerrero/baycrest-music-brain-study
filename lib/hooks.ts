import { auth, firestore } from "../lib/firebase";
import type { Auth, User } from "@firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read  auth record and user profile doc
export function useUserData(): {
  user: User | null | undefined;
  username: string | null;
} {
  const [user] = useAuthState(auth as unknown as Auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

export function useFields(initialState: { [key: string]: string }) {
  const [fields, setFields] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  return {
    fields,
    handleChange,
  };
}

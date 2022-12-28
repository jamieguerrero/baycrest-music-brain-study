import { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

export default function Login() {
  const { user } = useContext(UserContext);

  return <main>{user ? <SignOutButton /> : <SignInButton />}</main>;
}

// Sign in with Google button
function SignInButton() {
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const signInWithEmailAndPassword = async () => {
    await auth.signInWithEmailAndPassword(fields.username, fields.password);
  };

  // TODO: error handling

  return (
    <>
      <input
        value={fields.username}
        name="username"
        onChange={(event) => handleChange(event)}
      />
      <input
        value={fields.password}
        name="password"
        onChange={(event) => handleChange(event)}
      />
      <button className="btn-google" onClick={signInWithEmailAndPassword}>
        Sign In
      </button>
    </>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

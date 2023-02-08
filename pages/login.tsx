import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { Header } from "../components/Header";
import styles from "../styles/Login.module.css";
import { useFields } from "../lib/hooks";

export default function Login() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const pushToRoot = useCallback(
    () => router.push("/", undefined, { shallow: true }),
    [router]
  );

  useEffect(() => {
    if (user) pushToRoot();
  }, [user, pushToRoot]);

  return (
    <main className={styles.main}>
      <Header />
      <SignInForm />
    </main>
  );
}

function SignInForm() {
  const { fields, handleChange } = useFields({
    username: "",
    password: "",
  });

  const signInWithEmailAndPassword = async () => {
    await auth.signInWithEmailAndPassword(fields.username, fields.password);
  };

  // TODO: error handling

  return (
    <div className={styles.form}>
      <form onSubmit={signInWithEmailAndPassword}>
        <label>username</label>
        <input
          className={styles.input}
          value={fields.username}
          name="username"
          onChange={(event) => handleChange(event)}
        />
        <label>password</label>
        <input
          className={styles.input}
          value={fields.password}
          name="password"
          onChange={(event) => handleChange(event)}
          type="password"
        />
        <button
          className={styles.button}
          onClick={signInWithEmailAndPassword}
          type="submit"
        >
          Sign In
        </button>
      </form>
      <button
        className={styles.button}
        onClick={() => console.log("resetting password")}
      >
        Reset Password
      </button>
    </div>
  );
}

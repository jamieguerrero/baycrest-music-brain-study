import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { AuthCheck } from "../components/AuthCheck";

export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <AuthCheck>
        <Component {...pageProps} />
      </AuthCheck>
    </UserContext.Provider>
  );
}

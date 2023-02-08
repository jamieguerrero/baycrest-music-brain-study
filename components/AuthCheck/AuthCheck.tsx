import React, { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";

export function AuthCheck({ children }: { children: React.ReactElement }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const pushToLogin = useCallback(
    () => router.push("/login", undefined, { shallow: true }),
    [router]
  );

  useEffect(() => {
    if (!user) pushToLogin();
  }, [user, pushToLogin]);

  return <>{children}</>;
}

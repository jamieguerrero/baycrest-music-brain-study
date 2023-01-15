import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../lib/context";

export function AuthCheck({ children }: { children: React.ReactElement }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  return <>{children}</>;
}

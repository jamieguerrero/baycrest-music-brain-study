import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import { auth } from "../../lib/firebase";

import styles from "./Navbar.module.css";

export function Navbar() {
  const { user, username } = useContext(UserContext);

  const isAdmin = username?.includes("admin");

  return (
    <nav className={styles.navbar}>
      <div className={styles.adminNavItems}>
        {isAdmin && (
          <>
            <Link href="/">
              <button className="button">Study</button>
            </Link>
            <Link href="/admin">
              <button className="button">Admin</button>
            </Link>
          </>
        )}
      </div>

      {!user ? (
        <Link href="/login">
          <button className="button">Log in</button>
        </Link>
      ) : (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </nav>
  );
}

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import { auth } from "../../lib/firebase";

export function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      <Link href="/">
        <button>Study</button>
      </Link>

      {user && (
        <Link href="/admin">
          <button>Admin</button>
        </Link>
      )}

      {!user ? (
        <Link href="/login">
          <button>Log in</button>
        </Link>
      ) : (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </nav>
  );
}

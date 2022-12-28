import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

export function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <Link href="/">
        <button>Study</button>
      </Link>

      {user && (
        <Link href="/admin">
          <button>Write Posts</button>
        </Link>
      )}

      {!username && (
        <Link href="/login">
          <button>Log in</button>
        </Link>
      )}
    </nav>
  );
}

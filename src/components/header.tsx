import Link from "next/link";
import { useLogout } from "../hooks/auth/useLogout";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Header() {
  const { logout } = useLogout();
  const currentUser = Cookies.get("currentUser");

  return (
    <div className="header">
        <p className="site-name">
            <Link href="/">Habitant</Link>
        </p>
        <ul className="links">
            <li><Link href="/register">Register</Link></li>
            { currentUser == undefined && <li><Link href="/login">Login</Link></li>}
            { currentUser != undefined && <li><a href="#" onClick={logout}>Logout</a></li>}
        </ul>
    </div>
  );
}
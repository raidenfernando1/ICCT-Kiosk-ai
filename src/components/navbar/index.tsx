import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const NavItems = [
    { name: "RAID3N.NET | ARACHNID", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "ADMIN", path: "/admin" },
  ];

  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarContainer}>
        {NavItems.map((item) => (
          <li key={item.name}>
            <Link className={styles.NavLinks} to={item.path}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

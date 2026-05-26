type NavLinks = {
  href: string;
  label: string;
};

export const navLinks: NavLinks[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "admin", href: "/admin" },
  { label: "cart", href: "/cart" },
  { label: "orders", href: "/orders" },
  { label: "products", href: "/products" },
  { label: "favorites", href: "/favorites" },
  { label: "reviews", href: "/reviews" },
  { label: "dashboard", href: "/admin/products" },
];

export const adminLinks: NavLinks[] = [
  { label: "my products", href: "/admin/products" },
  { label: "add product", href: "/admin/products/create" },
  { label: "sales", href: "/admin/sales" },
];

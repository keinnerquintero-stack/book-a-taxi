// Single source of truth for navigation: the Navbar and Footer both render from this list,
// so every page links to every other page.
export const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/book', label: 'Book a Ride' },
  { to: '/contact', label: 'Contact' },
]

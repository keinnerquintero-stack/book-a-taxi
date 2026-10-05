import { Link } from 'react-router-dom'
import { navLinks } from '../data/navLinks.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">🚖 Book_A_Taxi</p>
          <p>Reliable rides, upfront prices, 24/7.</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p>Call us: <a href="tel:+15550100">+1 (555) 010-0100</a></p>
          <p>Email: <a href="mailto:hello@bookataxi.example">hello@bookataxi.example</a></p>
        </div>
      </div>
      <p className="copyright">© {year} Book_A_Taxi. Starter project.</p>
    </footer>
  )
}

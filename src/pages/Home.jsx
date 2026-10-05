import { Link } from 'react-router-dom'
import { services } from '../data/services.js'

const steps = [
  { title: 'Tell us where', text: 'Enter your pickup and drop-off locations.' },
  { title: 'Pick a service', text: 'City ride, airport transfer, hourly rental and more.' },
  { title: 'Ride', text: 'Your driver arrives at the time you chose.' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Your ride, on your schedule.</h1>
          <p>Book a reliable taxi in under a minute. Upfront prices, professional drivers, available 24/7.</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary">Book a Ride</Link>
            <Link to="/services" className="btn btn-outline">Explore Services</Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>How it works</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="card">
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section">
        <h2>Popular services</h2>
        <div className="grid">
          {services.slice(0, 3).map((s) => (
            <article key={s.id} className="card">
              <p className="icon" aria-hidden="true">{s.icon}</p>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <Link to={`/book?service=${s.id}`} className="link">Book {s.name} →</Link>
            </article>
          ))}
        </div>
        <p className="center"><Link to="/services" className="link">See all services →</Link></p>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to go?</h2>
          <p>Questions first? <Link to="/contact">Contact us</Link> or <Link to="/about">learn about Book_A_Taxi</Link>.</p>
          <Link to="/book" className="btn btn-primary">Book a Ride</Link>
        </div>
      </section>
    </>
  )
}

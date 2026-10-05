import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" subtitle="A ride for every occasion. Pick one and book in seconds." />
      <section className="container section">
        <div className="grid">
          {services.map((s) => (
            <article key={s.id} className="card">
              <p className="icon" aria-hidden="true">{s.icon}</p>
              <h2 className="card-title">{s.name}</h2>
              <p>{s.description}</p>
              <p className="price">{s.price}</p>
              {/* Pre-selects this service on the booking page via ?service=<id> */}
              <Link to={`/book?service=${s.id}`} className="btn btn-primary">Book this service</Link>
            </article>
          ))}
        </div>
        <p className="center">
          Not sure which fits? <Link to="/contact" className="link">Contact us</Link> and we will help.
        </p>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const values = [
  { title: 'Safety first', text: 'Vetted drivers, well-maintained vehicles and trip sharing for peace of mind.' },
  { title: 'Upfront pricing', text: 'You see the fare before you confirm. No surprises at the end of the ride.' },
  { title: 'Always on time', text: 'Reliable pickups, whether it is 7 am or 2 am.' },
]

const stats = [
  { value: '24/7', label: 'Availability' },
  { value: '500+', label: 'Drivers' },
  { value: '100k+', label: 'Rides completed' },
]

export default function About() {
  return (
    <>
      <PageHeader title="About Us" subtitle="Making everyday travel simple, safe and dependable." />
      <section className="container section">
        <p className="lead">
          Book_A_Taxi started with a simple idea: booking a taxi should take seconds, not phone calls.
          We connect riders with professional local drivers through one clean, easy booking experience.
        </p>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="card stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="container section">
        <h2>What we stand for</h2>
        <div className="grid">
          {values.map((v) => (
            <article key={v.title} className="card">
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
        <p className="center">
          <Link to="/services" className="btn btn-outline">View our services</Link>{' '}
          <Link to="/book" className="btn btn-primary">Book a Ride</Link>
        </p>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" subtitle="That route does not exist." />
      <section className="container section center">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </section>
    </>
  )
}

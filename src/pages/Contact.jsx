import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import FormField from '../components/FormField.jsx'
import { validateContact } from '../utils/validation.js'

const initial = { name: '', email: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      // Front-end starter: no backend yet, so we only show a confirmation.
      setSent(true)
      setValues(initial)
    } else {
      setSent(false)
    }
  }

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We usually reply within a few hours." />
      <section className="container section two-col">
        <div>
          <h2>Get in touch</h2>
          <ul className="contact-list">
            <li><strong>Phone:</strong> <a href="tel:+15550100">+1 (555) 010-0100</a></li>
            <li><strong>Email:</strong> <a href="mailto:hello@bookataxi.example">hello@bookataxi.example</a></li>
            <li><strong>Address:</strong> 100 Main Street, Springfield</li>
            <li><strong>Hours:</strong> Open 24 hours, 7 days a week</li>
          </ul>
        </div>

        <form className="card form" onSubmit={onSubmit} noValidate>
          <h2 className="card-title">Send a message</h2>
          {sent && <p className="success" role="status">Thanks! Your message has been sent.</p>}
          <FormField id="c-name" label="Name" error={errors.name}>
            {(p) => <input {...p} name="name" value={values.name} onChange={onChange} autoComplete="name" />}
          </FormField>
          <FormField id="c-email" label="Email" error={errors.email}>
            {(p) => <input {...p} name="email" type="email" value={values.email} onChange={onChange} autoComplete="email" />}
          </FormField>
          <FormField id="c-message" label="Message" error={errors.message}>
            {(p) => <textarea {...p} name="message" rows="5" value={values.message} onChange={onChange} />}
          </FormField>
          <button type="submit" className="btn btn-primary">Send message</button>
        </form>
      </section>
    </>
  )
}

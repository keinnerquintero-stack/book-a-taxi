import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import FormField from '../components/FormField.jsx'
import { services } from '../data/services.js'
import { todayISO, validateBooking } from '../utils/validation.js'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  passengers: '1',
  notes: '',
}

export default function Booking() {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('service')
  const initialService = services.some((s) => s.id === preselected) ? preselected : ''

  const [values, setValues] = useState({ ...emptyForm, service: initialService })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [confirmation, setConfirmation] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    // Once a field has been visited (or a submit was attempted), re-validate live.
    if (touched[name]) setErrors(validateBooking(next))
  }

  const onBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateBooking(values))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validateBooking(values)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`b-${firstInvalid}`)?.focus()
      return
    }
    setConfirmation({
      ...values,
      serviceName: services.find((s) => s.id === values.service)?.name,
      reference: `BAT-${Date.now().toString(36).toUpperCase()}`,
    })
  }

  const reset = () => {
    setValues({ ...emptyForm })
    setErrors({})
    setTouched({})
    setConfirmation(null)
  }

  // Show an error only after the field was touched / submit attempted.
  const err = (name) => (touched[name] ? errors[name] : '')

  if (confirmation) {
    return (
      <>
        <PageHeader title="Booking confirmed" subtitle={`Reference ${confirmation.reference}`} />
        <section className="container section">
          <div className="card confirmation" role="status">
            <h2 className="card-title">Thanks, {confirmation.name}!</h2>
            <dl>
              <dt>Service</dt><dd>{confirmation.serviceName}</dd>
              <dt>Pickup</dt><dd>{confirmation.pickup}</dd>
              <dt>Drop-off</dt><dd>{confirmation.dropoff}</dd>
              <dt>When</dt><dd>{confirmation.date} at {confirmation.time}</dd>
              <dt>Passengers</dt><dd>{confirmation.passengers}</dd>
              <dt>Contact</dt><dd>{confirmation.email} / {confirmation.phone}</dd>
              {confirmation.notes && (<><dt>Notes</dt><dd>{confirmation.notes}</dd></>)}
            </dl>
            <p>A confirmation will be sent to your email. This starter app does not store bookings yet.</p>
            <button type="button" className="btn btn-primary" onClick={reset}>Book another ride</button>{' '}
            <Link to="/" className="btn btn-outline">Back to Home</Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Book a Ride" subtitle="Fill in your trip details and we will take care of the rest." />
      <section className="container section">
        <form className="card form form-wide" onSubmit={onSubmit} noValidate aria-label="Taxi booking form">
          <fieldset>
            <legend>Your details</legend>
            <FormField id="b-name" label="Full name" error={err('name')}>
              {(p) => <input {...p} name="name" value={values.name} onChange={onChange} onBlur={onBlur} autoComplete="name" />}
            </FormField>
            <div className="row">
              <FormField id="b-email" label="Email" error={err('email')}>
                {(p) => <input {...p} name="email" type="email" value={values.email} onChange={onChange} onBlur={onBlur} autoComplete="email" />}
              </FormField>
              <FormField id="b-phone" label="Phone" error={err('phone')}>
                {(p) => <input {...p} name="phone" type="tel" value={values.phone} onChange={onChange} onBlur={onBlur} autoComplete="tel" />}
              </FormField>
            </div>
          </fieldset>

          <fieldset>
            <legend>Trip details</legend>
            <FormField id="b-service" label="Service" error={err('service')}>
              {(p) => (
                <select {...p} name="service" value={values.service} onChange={onChange} onBlur={onBlur}>
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.price})</option>
                  ))}
                </select>
              )}
            </FormField>
            <div className="row">
              <FormField id="b-pickup" label="Pickup location" error={err('pickup')}>
                {(p) => <input {...p} name="pickup" value={values.pickup} onChange={onChange} onBlur={onBlur} placeholder="Street, landmark or airport" />}
              </FormField>
              <FormField id="b-dropoff" label="Drop-off location" error={err('dropoff')}>
                {(p) => <input {...p} name="dropoff" value={values.dropoff} onChange={onChange} onBlur={onBlur} placeholder="Where to?" />}
              </FormField>
            </div>
            <div className="row three">
              <FormField id="b-date" label="Pickup date" error={err('date')}>
                {(p) => <input {...p} name="date" type="date" min={todayISO()} value={values.date} onChange={onChange} onBlur={onBlur} />}
              </FormField>
              <FormField id="b-time" label="Pickup time" error={err('time')}>
                {(p) => <input {...p} name="time" type="time" value={values.time} onChange={onChange} onBlur={onBlur} />}
              </FormField>
              <FormField id="b-passengers" label="Passengers" error={err('passengers')}>
                {(p) => <input {...p} name="passengers" type="number" min="1" max="8" value={values.passengers} onChange={onChange} onBlur={onBlur} />}
              </FormField>
            </div>
            <FormField id="b-notes" label="Notes for the driver (optional)" error={err('notes')} hint={`${values.notes.length}/300`}>
              {(p) => <textarea {...p} name="notes" rows="3" value={values.notes} onChange={onChange} onBlur={onBlur} />}
            </FormField>
          </fieldset>

          <button type="submit" className="btn btn-primary">Confirm booking</button>
        </form>
      </section>
    </>
  )
}

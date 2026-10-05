const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

const isBlank = (v) => !v || !String(v).trim()
const pad = (n) => String(n).padStart(2, '0')

// Local YYYY-MM-DD for "today" (toISOString would use UTC and can be off by a day).
export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function validateEmail(value) {
  if (isBlank(value)) return 'Email is required.'
  if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address (e.g. name@example.com).'
  return ''
}

export function validatePhone(value) {
  if (isBlank(value)) return 'Phone number is required.'
  const digits = value.replace(/\D/g, '')
  if (!PHONE_RE.test(value.trim()) || digits.length < 7 || digits.length > 15) {
    return 'Enter a valid phone number (7-15 digits).'
  }
  return ''
}

export function validateBooking(values) {
  const errors = {}

  if (isBlank(values.name)) errors.name = 'Full name is required.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  const email = validateEmail(values.email)
  if (email) errors.email = email
  const phone = validatePhone(values.phone)
  if (phone) errors.phone = phone

  if (isBlank(values.service)) errors.service = 'Please choose a service.'

  if (isBlank(values.pickup)) errors.pickup = 'Pickup location is required.'
  if (isBlank(values.dropoff)) errors.dropoff = 'Drop-off location is required.'
  else if (!isBlank(values.pickup) && values.pickup.trim().toLowerCase() === values.dropoff.trim().toLowerCase()) {
    errors.dropoff = 'Drop-off must be different from pickup.'
  }

  if (isBlank(values.date)) errors.date = 'Pickup date is required.'
  else if (values.date < todayISO()) errors.date = 'Pickup date cannot be in the past.'

  if (isBlank(values.time)) errors.time = 'Pickup time is required.'
  else if (values.date === todayISO()) {
    const now = new Date()
    if (values.time < `${pad(now.getHours())}:${pad(now.getMinutes())}`) {
      errors.time = 'Pickup time cannot be in the past.'
    }
  }

  const passengers = Number(values.passengers)
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 8) {
    errors.passengers = 'Passengers must be a whole number from 1 to 8.'
  }

  if (values.notes && values.notes.length > 300) errors.notes = 'Notes must be 300 characters or fewer.'

  return errors
}

export function validateContact(values) {
  const errors = {}
  if (isBlank(values.name)) errors.name = 'Name is required.'
  const email = validateEmail(values.email)
  if (email) errors.email = email
  if (isBlank(values.message)) errors.message = 'Message is required.'
  else if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

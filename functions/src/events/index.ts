import dedent from 'dedent-js'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import { EventSuggested } from '@phits-tech/common/dist/dao-firestore'

import { config } from '../_services/firebase-functions-initialized'
import { DocumentCreatedHandler } from '../types'

export const onEventSuggested: DocumentCreatedHandler = async (snapshot, _context) => {
  const suggestion = snapshot.data() as EventSuggested
  const { host, port, username: user, password: pass, monitorAddress } = config.smtp

  const mailOptions = {
    from: '"Phits.Tech" <blackhole@phits.tech>',
    to: monitorAddress,
    subject: `[PT] New Event: ${suggestion.name}`,
    html: getEmailBody(suggestion)
  }

  const transporter: Mail = nodemailer.createTransport({ host, port, auth: { type: 'LOGIN', user, pass } })
  await transporter.sendMail(mailOptions)
}

const getEmailBody = (suggestion: EventSuggested): string => {
  const intro = `
      Contact: <strong>${suggestion.contactName} -- ${suggestion.contactId}</strong><br />
      Type: <strong>${suggestion.eventType.toUpperCase()}</strong><br /><br />
    `
  const body = suggestion.eventType === 'share'
    ? `
      Name: <strong>${suggestion.name}</strong><br />
      Website: <strong>${suggestion.website}</strong><br />
      Topics: <strong>${suggestion.topics}</strong><br />
      Date/time: <strong>${suggestion.date} @ ${suggestion.timeStart} - ${suggestion.timeEnd}</strong><br />
      Location: <strong>${suggestion.location} @ ${suggestion.locationVenue}</strong>
      `
    : `
      Name: <strong>${suggestion.name}</strong><br />
      Description / requests:<br />
      <strong>${suggestion.description}</strong>
      `

  return dedent(intro + body)
}

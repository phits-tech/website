import { TranslatedString } from '@phits-tech/common/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  title: {
    en: 'Add Event',
    th: ''
  },
  intro: {
    en: 'All fields are optional, but the more your fill-in the easier it is for us to publish your event.',
    th: ''
  },
  modeShareTitle: {
    en: 'Share an existing event',
    th: ''
  },
  modeShareDescription: {
    en: 'publicize an event on Phits-Tech',
    th: ''
  },
  modeProposeTitle: {
    en: 'Propose a new event',
    th: ''
  },
  modeProposeDescription: {
    en: 'organize an event with Phits-Tech',
    th: ''
  },
  eventNameLabel: {
    en: 'Event Name',
    th: ''
  },
  eventWebsiteLabel: {
    en: 'Website',
    th: ''
  },
  eventTopicsLabel: {
    en: 'Topics',
    th: ''
  },
  eventDateLabel: {
    en: 'Date',
    th: ''
  },
  eventTimeStartLabel: {
    en: 'Time Start',
    th: ''
  },
  eventTimeEndLabel: {
    en: 'Time End',
    th: ''
  },
  eventLocationLabel: {
    en: 'Location',
    th: ''
  },
  eventLocationVenueLabel: {
    en: 'Venue or Map URL',
    th: ''
  },
  eventContactNameLabel: {
    en: 'Your Name',
    th: ''
  },
  eventContactIdLabel: {
    en: 'Contact',
    th: ''
  },
  eventDescriptionRequestsLabel: {
    en: 'Description and Requests',
    th: ''
  },
  submitLabel: {
    en: 'Submit',
    th: ''
  }
}

export default translations

export const moreTranslations: { [key: string]: TranslatedString } = {
  eventNamePlaceholder: {
    en: 'TypeScript Together',
    th: 'TypeScript Together'
  },
  eventWebsitePlaceholder: {
    en: 'https://awesomewebsite.com',
    th: 'https://awesomewebsite.com'
  },
  eventTopicsPlaceholder: {
    en: 'typescript, javascript, web dev, meetup',
    th: 'typescript, javascript, web dev, meetup'
  },
  eventLocationPlaceholder: {
    en: '-- Pick --',
    th: ''
  },
  eventLocationOnline: {
    en: 'Online',
    th: ''
  },
  eventLocationPhitsanulok: {
    en: 'Phitsanulok',
    th: ''
  },
  eventLocationBangkok: {
    en: 'Bangkok',
    th: ''
  },
  eventLocationOther: {
    en: 'Other...',
    th: ''
  },
  eventLocationVenuePlaceholder: {
    en: 'SET IC, NU',
    th: ''
  },
  eventContactNamePlaceholder: {
    en: 'Charles Allen',
    th: 'Charles Allen'
  },
  eventContactIdPlaceholder: {
    en: 'LINE: @yourlineid',
    th: 'LINE: @yourlineid'
  },
  eventDescriptionRequestsPlaceholder: {
    en: 'Describe your idea&#10;What help do you need from Phits Tech?',
    th: ''
  }
}

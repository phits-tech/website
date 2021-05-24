import { TranslatedString } from '@phits-tech/common/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  title: {
    en: 'Add Event',
    th: 'เพิ่มเหตุการณ์'
  },
  intro: {
    en: 'All fields are optional, but the more your fill-in the easier it is for us to publish your event.',
    th: 'ฟิลด์ทั้งหมดเป็นทางเลือก แต่ยิ่งคุณกรอกข้อมูลมากเท่าไหร่ เราก็ยิ่งเผยแพร่กิจกรรมของคุณได้ง่ายขึ้น'
  },
  modeShareTitle: {
    en: 'Share an existing event',
    th: 'แบ่งปันเหตุการณ์ที่มีอยู่'
  },
  modeShareDescription: {
    en: 'publicize an event on Phits-Tech',
    th: 'เผยแพร่เหตุการณ์บน Phits-Tech'
  },
  modeProposeTitle: {
    en: 'Propose a new event',
    th: 'เสนอเหตุการณ์ใหม่'
  },
  modeProposeDescription: {
    en: 'organize an event with Phits-Tech',
    th: 'จัดงานร่วมกับ Phits-Tech'
  },
  eventNameLabel: {
    en: 'Event Name',
    th: 'ชื่อเหตุการณ์'
  },
  eventWebsiteLabel: {
    en: 'Website',
    th: 'เว็บไซต์'
  },
  eventTopicsLabel: {
    en: 'Topics',
    th: 'หัวข้อ'
  },
  eventDateLabel: {
    en: 'Date',
    th: 'วันที่'
  },
  eventTimeStartLabel: {
    en: 'Time Start',
    th: 'เวลาเริ่มต้น'
  },
  eventTimeEndLabel: {
    en: 'Time End',
    th: 'หมดเวลา'
  },
  eventLocationLabel: {
    en: 'Location',
    th: 'สถานที่'
  },
  eventLocationVenueLabel: {
    en: 'Venue or Map URL',
    th: 'สถานที่หรือแผนที่ URL'
  },
  eventContactNameLabel: {
    en: 'Your Name',
    th: 'ชื่อของคุณ'
  },
  eventContactIdLabel: {
    en: 'Contact',
    th: 'ติดต่อ'
  },
  eventDescriptionRequestsLabel: {
    en: 'Description and Requests',
    th: 'คำอธิบายและคำขอ'
  },
  submitLabel: {
    en: 'Submit',
    th: 'ส่ง'
  },
  submitLabelSubmitting: {
    en: 'Sending...',
    th: 'กำลังส่ง...'
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
    th: '-- เลือก --'
  },
  eventLocationOnline: {
    en: 'Online',
    th: 'ออนไลน์'
  },
  eventLocationPhitsanulok: {
    en: 'Phitsanulok',
    th: 'พิษณุโลก'
  },
  eventLocationBangkok: {
    en: 'Bangkok',
    th: 'กรุงเทพมหานครฯ'
  },
  eventLocationOther: {
    en: 'Other...',
    th: 'อื่นๆ'
  },
  eventLocationVenuePlaceholder: {
    en: 'SET Investment Center, NU',
    th: 'ศูนย์การเรียนรู้การลงทุน มหาวิทยาลัยนเรศวร'
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

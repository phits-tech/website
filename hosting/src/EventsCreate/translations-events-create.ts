import { mapValues } from 'lodash'

import { TranslatedString } from '@phits-tech/common/dist/dao-firestore'

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
  eventNamePlaceholder: {
    en: 'TypeScript Together',
    th: 'TypeScript Together'
  },
  eventWebsiteLabel: {
    en: 'Website',
    th: 'เว็บไซต์'
  },
  eventWebsitePlaceholder: {
    en: 'https://awesomewebsite.com',
    th: 'https://awesomewebsite.com'
  },
  eventTopicsLabel: {
    en: 'Topics',
    th: 'หัวข้อ'
  },
  eventTopicsPlaceholder: {
    en: 'typescript, javascript, web dev, meetup',
    th: 'typescript, javascript, web dev, meetup'
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
    th: 'เวลาสิ้นสุด'
  },
  eventLocationLabel: {
    en: 'Location',
    th: 'สถานที่'
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
    th: 'อื่น ๆ ...'
  },
  eventLocationVenueLabel: {
    en: 'Venue or Map URL',
    th: 'สถานที่จัดงานหรือลิ้งค์แผนที่'
  },
  eventLocationVenuePlaceholder: {
    en: 'SET Investment Center, NU',
    th: 'ศูนย์การเรียนรู้การลงทุน มหาวิทยาลัยนเรศวร'
  },
  eventContactNameLabel: {
    en: 'Your Name',
    th: 'ชื่อของคุณ'
  },
  eventContactNamePlaceholder: {
    en: 'Charles Allen',
    th: 'Charles Allen'
  },
  eventContactIdLabel: {
    en: 'Contact',
    th: 'ติดต่อ'
  },
  eventContactIdPlaceholder: {
    en: 'LINE: @yourlineid',
    th: 'LINE: @yourlineid'
  },
  eventDescriptionRequestsLabel: {
    en: 'Description and Requests',
    th: 'คำอธิบายและคำขอ'
  },
  eventDescriptionRequestsPlaceholder: {
    en: 'Describe your idea\nWhat help do you need from Phits Tech?',
    th: 'อธิบายความคิดของคุณ\nคุณต้องการความช่วยเหลืออะไรจาก Phits Tech?'
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

export const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}

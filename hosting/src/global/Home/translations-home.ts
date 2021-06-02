import { mapValues } from 'lodash'

import { TranslatedString } from '@phits-tech/common/dist/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  today: {
    en: 'today',
    th: 'วันนี้'
  },
  tomorrow: {
    en: 'tomorrow',
    th: 'พรุ่งนี้'
  },
  seeAll: {
    en: 'see all',
    th: 'ดูทั้งหมด'
  },
  becomeHeroText: {
    en: 'Phits Tech aims to bring together the tech community in or around Phitsanulok to share, learn, grow and have fun together. If you are organising a meetup, talk, hackathon, or any other type of tech event that the community might be interested in then please let us know. Or if you have an idea for an event but need help organising then we also welcome your submissions.',
    th: 'Phits Tech มีความตั้งใจที่จะรวมกลุ่มคนสายเทคโนโลยีในจังหวัดพิษณุโลกและพื้นที่ใกล้เคียง เพื่อแบ่งปันประสบการณ์ แลกเปลี่ยนเรียนรู้ มาสนุกและเติบโตไปด้วยกัน หากคุณกำลังมีการจัดประชุม นัดพบปะพูดคุยในเรื่องที่พวกคุณสนใจเกี่ยวกับเทคโนโลยี หรือหากคุณมีความคิดที่จะจัดกิจกรรมอื่น ๆ เรายินดีช่วยประชาสัมพันธ์ ให้คำปรึกษาและช่วยเหลือคุณ'
  },
  hostAnEvent: {
    en: 'Host an event',
    th: 'จัดกิจกรรม'
  }
}

export const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}

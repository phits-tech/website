import { mapValues } from 'lodash'

import { TranslatedString } from '@phits-tech/common/dao-firestore'

const translations: { [key: string]: TranslatedString } = {
  heroesBecomeTitle: {
    en: 'Become a Hero',
    th: 'การเป็นฮีโร่'
  },
  heroesThe: {
    en: 'The',
    th: ''
  },
  heroesCommunityHero: {
    en: 'Community Hero',
    th: 'รางวัล Community Hero'
  },
  heroesAward: {
    en: "award is Phits.Tech's way to recognize and thank individuals for their contributions to our community. Every hour engaged in community events earns",
    th: 'คือวิธีของ Phis.Tech ในการยกย่องและขอบคุณบุคคลต่างๆ ที่มีส่วนร่วมกับชุมชนของเรา ทุก ๆ ชั่วโมงที่มีส่วนร่วมในกิจกรรมชุมชนจะได้รับ'
  },
  heroesEasiest: {
    en: 'The easiest way to become a Community Hero is to volunteer to run an event. Learn more about the',
    th: 'วิธีที่ง่ายที่สุดในการเป็นฮีโร่ชุมชนคือการอาสาจัดกิจกรรม เรียนรู้เพิ่มเติมเกี่ยวกับ'
  },
  heroesBenefits: {
    en: 'benefits of becoming a hero',
    th: 'ประโยชน์ของการเป็นฮีโร่'
  },
  heroesStarted: {
    en: ', or get started now:',
    th: ', หรือเริ่มต้นตอนนี้'
  },
  heroesYourContribution: {
    en: 'Your contribution',
    th: 'ผลงานของคุณ'
  }
}

export const messages = {
  en: mapValues(translations, vals => vals.en),
  th: mapValues(translations, vals => vals.th)
}

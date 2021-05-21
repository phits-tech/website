import firebase from 'firebase/app'
type Timestamp = firebase.firestore.Timestamp
type Language = 'en' | 'th'
type TranslatedString = Record<Language, string>

// TODO: Make a decision on slugs: store as field | store as id | store as both

/**
 * Types of property
 *   readonly  = managed by the DAO (calculated or set in conjunction with other fields)
 *   ?:        = optional during creation (default value used if not provided)
 *   other     = must be explicitly set at creation
 *
 * Note: all properties are optional during update (readonly are still managed by DAO)
 */

export type EventRole = 'attendee' | 'speaker' | 'organizer'

export interface EventLog {
  slug: string
  name: string
  banner169Url: string
  date: Timestamp
  role: EventRole
  ccus: number
}

export type UserSocialAccount = 'github' | 'gitlab' | 'stackoverflow' | 'linkedin' | 'twitter' | 'facebook' | 'line' | 'email'

// ID = GUID (from Auth)
export interface User {
  readonly name: string
  slug?: string
  nameFirst: string
  nameLast?: string
  pic?: string
  tagline?: string
  bio?: string
  skills?: string[]
  hasContributed?: boolean
  lccus?: number // calculate active CCUs on the client
  events?: EventLog[]
  socialAccountsIds?: Partial<Record<UserSocialAccount, string>>
  website?: string
}

// ID = GUID (from Auth)
export interface UserPrivate {
  email?: string
  emails?: string[]
  tokenNuConnect?: unknown
  // tokenGitHub?: unknown
  // tokenGitLab?: unknown
  // tokenStackExchange?: unknown
  // tokenTwitter?: unknown
  // tokenFacebook?: unknown
  // tokenLine?: unknown
}

// TODO: Maybe rename type to avoid clash with a built-in type
export interface Event {
  slug: string
  name: string
  description: string
  bannerUrl?: string
  dateStart: Timestamp
  dateEnd: Timestamp
  location: string
  series?: string
  seriesType?: string
  badges?: string[]
  hostId?: string
  hostName?: string
  registrationRequired?: boolean
  registrationUrl?: string // custom registration form
}

export type SpaceCategory = 'community' | 'coworking' | 'cafe' | 'online'

export interface Space {
  slug: string
  name: string
  logo: string
  banner: string
  description: TranslatedString
  category: SpaceCategory
  locationText: string
  locationLatitude?: number
  locationLongitude?: number
}

export interface Banner {
  banner169Url: string
  targetUrl?: string
  targetEventSlug?: string
  targetRoute?: string
  dateExpire: Timestamp
}

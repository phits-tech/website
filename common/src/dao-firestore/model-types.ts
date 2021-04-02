import type firebase from 'firebase/app'

type Timestamp = firebase.firestore.Timestamp

/**
 * Types of property
 *   readonly  = managed by the DAO (calculated or set in conjunction with other fields)
 *   ?:        = optional during creation (default value used if not provided)
 *   other     = must be explicitly set at creation
 *
 * Note: all properties are optional during update (readonly are still managed by DAO)
 */

// ID = GUID (from Auth)
export interface User {
  // TODO: Write real type
  readonly name: string
  nameFirst: string
  nameLast?: string
  code?: string
}

// ID = GUID (from Auth)
export interface UserPrivate {
  // TODO: Write real type
  email?: string
  nuConnectToken?: unknown
}

export interface Event {
  id: string
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
  registrationUrl?: string // custom registration
}

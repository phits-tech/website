import { GuidGen } from '@phits-tech/common/utils/guids'

import admin from '~/firebase-admin-initialized'

export default GuidGen(admin.firestore())

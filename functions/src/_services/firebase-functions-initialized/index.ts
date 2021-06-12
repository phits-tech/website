import * as functions from 'firebase-functions'

import { snakeToCamel } from '@phits-tech/common/dist/utils/string-cases'

interface FunctionsConfig {
  auth: {
    clientId: string
    clientSecret: string
    scopes: string
    baseUrl: string
  }
  project: {
    region: string
  }
}

const configSnake = functions.config()
export const config = snakeToCamel(configSnake, 3) as FunctionsConfig
export default functions.region(config.project.region)

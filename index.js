'use strict'
import { readDataFromJson } from './scripts/fetch-data'

readDataFromJson
  .then((result) => {
    console.info('result', result)
  })
  .catch((error) => console.error(error))

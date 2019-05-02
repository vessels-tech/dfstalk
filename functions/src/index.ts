import * as functions from 'firebase-functions';


const number = require('./handlers/number')(functions);

export default {
  number
}
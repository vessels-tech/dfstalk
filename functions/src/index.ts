import * as functions from 'firebase-functions';


const quotes = require('./handlers/quotes')(functions);

export default {
  quotes
}
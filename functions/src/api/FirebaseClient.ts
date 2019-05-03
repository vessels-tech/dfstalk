import firebase from 'firebase';
import { apiKey } from '../env';

const config = {
  apiKey,
  authDomain: "dfs-talk.firebaseapp.com",
  databaseURL: "https://dfs-talk.firebaseio.com",
  projectId: "dfs-talk",
  storageBucket: "dfs-talk.appspot.com",
};

const app = firebase.initializeApp(config);
const auth = app.auth();

export {
  app,
  auth,
}

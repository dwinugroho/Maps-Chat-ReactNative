import Config from "react-native-config";
import * as firebase from 'firebase'


const firebaseConfig = {
  apiKey: Config.API_KEY_FIREBASE,
  authDomain: Config.AuthDomain,
  databaseURL: Config.DatabaseURL,
  projectId: Config.ProjectID,
  storageBucket: Config.StorageBucket,
  messagingSenderId: Config.MessagingSenderID,
  appId: Config.APPID
};



export default class Firebase {

	static auth;

	static database;

	static init() {

		firebase.initializeApp(firebaseConfig);
		Firebase.auth = firebase.auth;
		Firebase.database = firebase.database;
	}
}
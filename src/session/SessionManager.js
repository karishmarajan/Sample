import React from 'react';
import {AsyncStorage} from 'react-native'
import { Actions } from 'react-native-router-flux';
export const KEY = "USER_ID";





class SessionManager extends React.Component {
  

  async login(user) {
    try {
      await AsyncStorage.setItem(KEY, user);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  async logout() {
    try {
      await AsyncStorage.clear();
      Actions.reset('login')
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

 
}
const session = new SessionManager();
export default session;

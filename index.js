/**
 * @format
 */

import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import Router from './route/Router.js';


AppRegistry.registerComponent(appName, () => Router);

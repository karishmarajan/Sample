import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Header } from 'react-native-elements';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/home/HomeScreen';
import DetailsScreen from '../screens/home/DetailsScreen';
import SettingsScreen from '../screens/home/SettingsScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import SlideTwo from '../screens/home/SlideTwo';
import SlideOne from '../screens/home/SlideOne';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const HomeTab = createStackNavigator(
  {
    Home: HomeScreen ,
    Details: DetailsScreen ,
    SlideOne:SlideOne,
    SlideTwo:SlideTwo,
  },
  {
    defaultNavigationOptions: {
    title:'Home',
    headerLeft:()=>(<TouchableOpacity style={{marginLeft:16}} onPress={()=> alert('hi') }><Icon color={'black'} size={24} name={'menu'}></Icon></TouchableOpacity>),
    headerRight:()=>(<TouchableOpacity style={{marginRight:16}} onPress={()=> alert('Do you want to logout ?')}><Icon color={'black'} size={24} name={'logout'}></Icon></TouchableOpacity>),
    },
  }
);

const SettingsTab = createStackNavigator(
  {
    Settings: SettingsScreen ,
    Details: DetailsScreen ,
  },
  // {
  //   defaultNavigationOptions: {
  //     headerShown:false
      
  //    },
  //}
);
const ProfileTab = createStackNavigator(
  {
    Profile: ProfileScreen ,
    
  },
  // {
  //   defaultNavigationOptions: {
  //     headerShown:false
      
  //    },
  // }
);

const MainApp = createBottomTabNavigator(
  {
    Home: HomeTab ,
    Settings: SettingsTab ,
    Profile: ProfileTab ,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            //icon directory link
            //https://expo.github.io/vector-icons/
            <IconFontAwesome name="home" size={30} color="#900" />
          );
        } else if(routeName === 'Settings') {
          return (
            <IconMaterialIcons name="settings" size={30} color="#900" />
          );
        }
        else if(routeName === 'Profile') {
          return (
            <IconMaterialIcons name="person" size={30} color="#900" />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);


export default createAppContainer(MainApp);
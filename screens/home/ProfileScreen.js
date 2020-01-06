
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import * as Style from '../../constants/Style_constants';
import {Header} from 'react-native-elements';
class ProfileScreen extends React.Component{
  render()
  {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
        {/* Fore custom Header */}
        
        {/* <Header
           statusBarProps={{translucent: true,backgroundColor:Style.PRIMARY_LIGHT}}
           containerStyle={{backgroundColor: Style.PRIMARY_DARK}}
           barStyle="light-content" // or directly
           placement="left"
           leftComponent={{ icon: 'person', color: '#fff' }}
           centerComponent={{ text: 'Profile', style: { color: '#fff',fontSize:20, } }}/> */}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
           <View>
             <Text>Page 3</Text>
          
           </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  
};
export default ProfileScreen;

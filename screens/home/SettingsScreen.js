
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
class SettingsScreen extends React.Component{
  render()
  {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
        {/* <Header
          statusBarProps={{translucent: true,backgroundColor:Style.PRIMARY_LIGHT}}
          containerStyle={{backgroundColor: Style.PRIMARY_DARK}}
          barStyle="light-content" // or directly
          placement="left"
          leftComponent={{ icon: 'settings', color: '#fff' }}
          centerComponent={{ text: 'Settings', style: { color: '#fff',fontSize:20, } }}/> */}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
           <View>
             <Text>Page 2</Text>
          
           </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  
};
export default SettingsScreen;

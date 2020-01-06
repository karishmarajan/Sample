
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

class SlideTwo extends React.Component{
    static navigationOptions = {
        headerShown: false,
    };
  render()
  {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic">
           <View>
             <Text>Slide two</Text>
          
           </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
  
};
export default SlideTwo;


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

class DetailsScreen extends React.Component{
  render()
  {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
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
export default DetailsScreen;

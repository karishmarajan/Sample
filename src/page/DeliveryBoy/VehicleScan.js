import React, { Component } from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomTitle from '../../component/CustomTitle';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';


export default class VehicleScan extends React.Component {

render(){
    var left = (
        <Left style={{ flex: 1 }}>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-menu' />
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-chatbubbles' />
          </Button>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-notifications' />
          </Button>
        </Right>
      );

    return(
      <Container>
        <Navbar left={left} right={right} title="Vehicle Scan" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:20}}>


        <View style={styles.eachview}>
        <CustomTitle  title={'Vehicle Details'} fontType={Strings.subtitle}/>
        <CustomText text={'Vehicle Number'} textType={Strings.maintext}/>
        <CustomInput/>
        <CustomText text={'Vehicle Type'} textType={Strings.maintext}/>
        <CustomInput/>
        </View>


        <View style={styles.eachview}>
        <CustomTitle  title={'Departed Time'} fontType={Strings.subtitle}/>
        <View style={styles.textinput}><Input /></View>
        <CustomButton title={'Set Departed Time'}/>
        </View>


        <View style={styles.eachview}>
        <CustomTitle  title={'Arrival Time'} fontType={Strings.subtitle}/>
        <View style={styles.textinput}><Input /></View>
        <CustomButton title={'Set Arrival Time'}/>
        </View>

        </View>
        </ScrollView>
        </Container>
    );
}

}

const styles=StyleSheet.create({
  textinput :{
    borderColor:'#c4c4cb',
    borderWidth:1,
    borderRadius:5,
    height:35,
    padding:5,
  },

  eachview :{
    backgroundColor:'white',
    marginTop:SECTION_MARGIN_TOP,
    height:180,
    borderRadius:10,
    padding:10
  },
});
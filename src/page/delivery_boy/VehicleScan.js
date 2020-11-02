import React, { Component } from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
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

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:20}}>

{/*////////////////////// Vehicle Details Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Vehicle Details'} textType={Strings.subtitle}/>
        <CustomText text={'Vehicle Number'} textType={Strings.maintext}/>
        <CustomInput />
        <CustomText text={'Vehicle Type'} textType={Strings.maintext}/>
        <CustomInput/>
        </View>

{/*////////////////////// Departed Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Departed Time'} textType={Strings.subtitle}/>
        <CustomInput borderRadius={5} borderColor={Colors.gray} borderWidth={1} backgroundColor={Colors.white} height={40}/>
        <CustomButton title={'Set Departed Time'}/>
        </View>

{/*////////////////////// arrival Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Arrival Time'} textType={Strings.subtitle}/>
        <CustomInput borderRadius={5} borderColor={Colors.gray} borderWidth={1} backgroundColor={Colors.white} height={40} />
        <CustomButton title={'Set Arrival Time'}/>
        </View>

        </View>
        </ScrollView>
        </Container>
    );
}

}

const styles=StyleSheet.create({

  eachview :{
    backgroundColor:'white',
    marginTop:SECTION_MARGIN_TOP,
    height:180,
    borderRadius:10,
    paddingLeft:30,
    paddingRight:30,
    
  },
});
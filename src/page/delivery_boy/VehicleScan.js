import React, { Component } from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text, Input,TextInput,Badge} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import SideMenuDrawer from '../../component/SideMenuDrawer';


export default class VehicleScan extends React.Component {

render(){
  var left = (
    <Left style={{ flex: 1 }}>
      <Button onPress={() => Actions.pop()} transparent>
        <Icon style={{ color:Colors.navbarIconColor}} name='ios-close' />
        </Button>
    </Left>
  );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button  transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-chatbubbles' />
          </Button>
          <Button  transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-notifications' />
            <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:20,borderRadius:10}} 
                            textStyle={{color: 'white', fontSize: 20, lineHeight: 20}}></Badge>
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

        <View style={styles.eachview1}>
        <CustomText  text={'Vehicle Details'} textType={Strings.subtitle}/>
        <CustomText text={'Vehicle Number'} textType={Strings.maintext}/>
        <CustomInput />
        <View style={{marginTop:10}}><CustomText text={'Vehicle Type'} textType={Strings.maintext}/>
        <CustomInput/></View>
        </View>

{/*////////////////////// Departed Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Departed Time'} textType={Strings.subtitle}/>
        <CustomInput borderRadius={5} borderColor={Colors.gray} borderWidth={1} backgroundColor={Colors.white} height={40}/>
        <CustomButton title={'Set Departed Time'} borderRadius={5}/>
        </View>

{/*////////////////////// arrival Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Arrival Time'} textType={Strings.subtitle}/>
        <CustomInput borderRadius={5} borderColor={Colors.gray} borderWidth={1} backgroundColor={Colors.white} height={40} />
        <CustomButton title={'Set Arrival Time'} borderRadius={5}/>
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
    paddingTop:20,
    
  },
  eachview1 :{
    backgroundColor:'white',
    marginTop:SECTION_MARGIN_TOP,
    height:200,
    borderRadius:10,
    paddingLeft:30,
    paddingRight:30,
    
  },
});
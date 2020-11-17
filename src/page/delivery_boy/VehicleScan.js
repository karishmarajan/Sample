import React, { Component } from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text, Input,TextInput,Badge} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP ,FIELD_MARGIN_TOP,MAIN_BLOCK_BORDER_RADIUS,SHORT_BLOCK_BORDER_RADIUS,TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,FOURTH_FONT} from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import SideMenuDrawer from '../../component/SideMenuDrawer';



export default class VehicleScan extends React.Component {

render(){
  var left = (
    <Left style={{ flex: 1 }}>
      <Button onPress={() => Actions.pop()} transparent>
        <Icon style={{ color:Colors.navbarIconColor}} name='md-arrow-round-back' />
        </Button>
    </Left>
  );
      // var right = (
      //   <Right style={{ flex: 1 }}>
      //     <Button  transparent>
      //       <Icon style={{ color:Colors.navbarIconColor}} name='ios-chatbubbles' />
      //     </Button>
      //     <Button  transparent>
      //       <Icon style={{ color:Colors.navbarIconColor }} name='ios-notifications' />
      //       <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:20,borderRadius:MAIN_BLOCK_BORDER_RADIUS}} 
      //                       textStyle={{color: 'white', fontSize: 20, lineHeight: 20}}></Badge>
      //     </Button>
      //   </Right>
      // );

    return(
    
      <Container>
        <Navbar left={left} title="Vehicle Scan" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*////////////////////// Vehicle Details Block //////////////////////////////////////////////// */}

        <View style={styles.eachview1}>
          <View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row',alignItems:'center',}}>
              <CustomText  text={'Vehicle Details'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
          </View>
        <CustomText text={'Vehicle Number'} textType={Strings.maintext} />
        <CustomInput flex={1} />
        <View style={{marginTop:FIELD_MARGIN_TOP,}}><CustomText text={'Vehicle Type'} textType={Strings.maintext}/>
        <CustomInput flex={1}/>
        </View>
        </View>

{/*////////////////////// Departed Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Departed Time'} textType={Strings.subtitle} fontWeight={'bold'} />
        {/* <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.gray} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} flex={1}/> */}
        <CustomButton title={'Set Departed Time'} borderRadius={SHORT_BLOCK_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue}/>
        </View>

{/*////////////////////// arrival Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Arrival Time'} textType={Strings.subtitle} fontWeight={'bold'} />
        {/* <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.gray} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} flex={1} /> */}
        <CustomButton title={'Set Arrival Time'} borderRadius={SHORT_BLOCK_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue}/>
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
    height:150,
    paddingLeft:30,
    paddingRight:30,
    paddingTop:20,
    
  },
  eachview1 :{
    backgroundColor:'white',
    height:250,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:30,
  },
});
import React, { Component } from 'react';
import { ScrollView,Picker } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput,Badge} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings'
import CustomDropdown from '../../component/CustomDropdown';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { Actions } from 'react-native-router-flux';
import { SECTION_MARGIN_TOP, SCREEN_HEIGHT,SHORT_BORDER_WIDTH,TEXT_FIELD_HIEGHT, MAIN_VIEW_PADDING , SHORT_BLOCK_BORDER_RADIUS, SECOND_FONT, SIGNATURE_VIEW_HEIGHT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';

const myArray1=[{name:"Cochin Regional Office" , value:"Cochin Regional Office"},{name:"a" , value:"a"},{name:"b" , value:"b"}];


export default class OrderTransfer1 extends React.Component {

    render(){
      var left = (
        <Left style={{ flex: 1 }}>
          <Button onPress={() => Actions.pop()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-arrow-round-back' />
            </Button>
        </Left>
      );
 
        return(
  
          <Container>
        <Navbar left={left} title="Request Task Transfer" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>

 {/*////////////////////// Request Order Transfer Details //////////////////////////////////////////////// */}

        <CustomText text={'Requested To'} textType={Strings.maintext}/> 
        <CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP}/>

        <CustomText text={'Reason'} textType={Strings.maintext}/>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} height={SIGNATURE_VIEW_HEIGHT} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1}/>
      
        <CustomButton title={'Request Order Transfer'} fontSize={SECOND_FONT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue} />
        </View>
        </View>
        </ScrollView>
        </Container>
      
        );
    }


}
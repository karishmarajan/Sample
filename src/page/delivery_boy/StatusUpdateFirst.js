import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet,BackHandler,Modal } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Input,Badge, Content, Card, CardItem, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,LOGIN_FIELD_HEIGHT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,SECOND_FONT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, ORDER_BLOCK,FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import CustomSearchableDropdown from '../../component/CustomSearchableDropdown';


export default class StatusUpdateFirst extends React.Component {

  
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
               <Navbar left={left} title="Status Update" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>

{/*////////////////////// Request Order Transfer Details //////////////////////////////////////////////// */}

<View style={{backgroundColor:Colors.white,flex:10,}}>
              <CustomText  text={'Scan Order'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              </View>

       <CustomText text={'Looks like you haven`t scanned any order yet. Scan the order for updating the status of the particular item.'} textType={Strings.subtext} color={Colors.grayTextColor}/> 
      
       <CustomButton title={'Barcode Scan'} fontSize={SECOND_FONT} showIcon={true} icon_name={'md-barcode'} icon_color={Colors.white} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue} onPress={()=>Actions.statusupdatemultiple()} />
      
       <CustomText text={'or'} textType={Strings.subtext} color={Colors.black} textAlign={'center'}/>

       <CustomInput backgroundColor={Colors.white} placeholder={'Enter Order Id here'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS}/>
      
       </View>
        
        </View>
             </ScrollView>
              </Container>

      );
  }
}
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
import { SECTION_MARGIN_TOP,LOGIN_FIELD_HEIGHT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, ORDER_BLOCK,FOURTH_FONT } from '../../constants/Dimen';
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
               <Navbar left={left} title="Delivery Out Details" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}></View>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
        <CustomButton/>
             </ScrollView>
              </Container>

      );
  }
}
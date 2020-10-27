import React, { Component } from 'react';
import { ScrollView} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';

export default class SelfAssign extends React.Component {
render(){
    var left = (
        <Left style={{ flex: 1 }}>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-menu' />
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-chatbubbles' />
          </Button>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-notifications' />
          </Button>
        </Right>
      );

    return(
      <Container>
        <Navbar left={left} right={right} title="Self Assign" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:10}}>
        <View style={{ backgroundColor:Colors.white,marginTop:30,padding:10,height:160,borderRadius:5}}>
   
        <Button style={{justifyContent:'center',marginBottom:10,marginLeft:10,marginTop:10,marginRight:180,height:30,backgroundColor:Colors.darkSkyBlue}}><Text uppercase={false} style={{ fontSize:14}}>Barcode Scan</Text></Button>
        <CustomText text={'Enter Order Id'} textType={Strings.maintext}/>
        <View style={{borderWidth:1,borderColor:Colors.borderColor,height:40,marginRight:10,flexDirection:'row',borderRadius:5,}}>
        <Text style={{color:Colors.grayTextColor,paddingLeft:10,paddingTop:10}}>#12345</Text>
        <Button style={{backgroundColor:Colors.buttonBackgroundColor,height:30,marginLeft:180,marginTop:5}}><Text>ADD</Text></Button>
        </View>
      
        </View>
        <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-evenly'}}>
        <CustomSubButton title={'Delete'}/>
        <CustomSubButton title={'Save'}/>
        <CustomSubButton title={'Submit'}/>
        </View>
        </View>
        </ScrollView>
        </Container>
    );
}


}
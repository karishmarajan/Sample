import React, { Component , useState } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput,Grid,Col} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomTitle from '../../component/CustomTitle';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';

import DropDownPicker from 'react-native-dropdown-picker';



export default class StatusUpdate extends React.Component {

render(){
    var left = (
        <Left style={{ flex: 1 }}>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-menu' />
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-chatbubbles' />
          </Button>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-notifications' />
          </Button>
        </Right>
      );

    return(
      <Container>
        <Navbar left={left} right={right} title="Status Update" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:15}}>
        <View style={{ backgroundColor:'white',marginTop:30,flexGrow:1,padding:20}}>
        <Button style={{justifyContent:'center',width:120,height:30,backgroundColor:'#165bd6'}}><Text uppercase={false} style={{ fontSize:14}}>Barcode Scan</Text></Button>
        <View style={{marginTop:10,flex:1,flexDirection:'row'}}>
        <Text style={{fontStyle:'italic',color:'#696969'}}>Customer Name: </Text>
        <Text style={{left:10}}>Alex</Text>
        </View>
        <View style={{marginTop:10,flex:1,flexDirection:'row'}}>
        <Text style={{fontStyle:'italic',color:'#696969'}}>Receiver ID: </Text>
        <Text style={{left:10}}>#1234567</Text>
        </View>
        <Text style={{marginTop:20,fontFamily:'lucida grande'}}>Status</Text>
        
      <Picker 
        selectedValue="Select a Status"
        style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Select a Status" value="java" />
        <Picker.Item label="a" value="js" />
        <Picker.Item label="b" value="js" />
        <Picker.Item label="c" value="js" />
      </Picker>
 
      <Text style={{marginTop:10,fontFamily:'lucida grande'}}>Reason</Text>
      <Picker 
        selectedValue="Select a Status"
        style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Select/Enter a Reason" value="java" />
        <Picker.Item label="a" value="js" />
        <Picker.Item label="b" value="js" />
        <Picker.Item label="c" value="js" />
      </Picker>

  <Grid><Col><CustomText text={'No of Pieces'} textType={Strings.subtext}/></Col>
        <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>32</Text></Col></Grid>
 <Grid ><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext}/></Col>
        <Col><Text style={{fontSize:14,color:Colors.subTextColor,backgroundColor:Colors.textBackgroundColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 5000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Amount to collect'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,backgroundColor:Colors.textBackgroundColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 1000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 2000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 1000</Text></Col></Grid>
  

<CustomTitle  title={'Customer Signature'} fontType={Strings.subtitle}/>
<View style={{ backgroundColor:Colors.signBackgroundColor,height:150,Right:20,borderRadius:5,padding:10}}></View>
<CustomButton title={'Submit'}/>


        </View>
        </View>

        </ScrollView>
        </Container>
    );
}

}

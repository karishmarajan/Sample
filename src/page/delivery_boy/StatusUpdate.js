import React, { Component , useState } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput,Grid,Col} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomButton from '../../component/CustomButton';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import CustomDropdown from '../../component/CustomDropdown';

const myArray=[{name:"Select a Status" , value:"Select a Status"},{name:"Delivered" , value:"Delivered"},{name:"Undelivered" , value:"Undelivered"}];
const myArray1=[{name:"Select/Enter a Reason" , value:"Select/Enter a Reason"},{name:"a" , value:"a"},{name:"b" , value:"b"}];




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

      // const desiredNumberOfObjects=20;
      // let markers=[];
      // for(let i=0;i<desiredNumberOfObjects;i++){
      //   markers.push({
      //     value:'Select a Status',
      //     name:'Select a Status'
      //   });
      // }

    return(
      <Container>
        <Navbar left={left} right={right} title="Status Update" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:15,}}>
        <View style={{ backgroundColor:'white',marginTop:SECTION_MARGIN_TOP,flexGrow:1,padding:10,paddingRight:20,paddingLeft:20}}>
        <CustomButton title={'Barcode Scan'} backgroundColor={Colors.darkSkyBlue} width={120} height={30} fontSize={16}  marginTop={SECTION_MARGIN_TOP}/>
        
        {/*////////////////////// Customer Details Block //////////////////////////////////////////////// */}
        
        <View style={{marginTop:10,flex:1,flexDirection:'row'}}>
        <Text style={{fontStyle:'italic',color:Colors.grayTextColor}}>Customer Name: </Text>
        <Text style={{left:10}}>Alex</Text>
        </View>
        <View style={{marginTop:10,flex:1,flexDirection:'row'}}>
        <Text style={{fontStyle:'italic',color:Colors.grayTextColor}}>Receiver ID: </Text>
        <Text style={{left:10}}>#1234567</Text>
        </View>
        

        {/*////////////////////// Order Status Block //////////////////////////////////////////////// */}

      <Text style={{marginTop:20,fontFamily:'lucida grande'}}>Status</Text>
      <CustomDropdown data={myArray} height={35} backgroundColor={Colors.textBackgroundColor} fontSize={16} borderWidth={.5} borderColor={Colors.borderColor} />
 
      <Text style={{marginTop:10,fontFamily:'lucida grande'}}>Reason</Text>
      <CustomDropdown data={myArray1} height={35} backgroundColor={Colors.textBackgroundColor} fontSize={16} borderWidth={.5} borderColor={Colors.borderColor}/>
  
     {/*////////////////////// Order Delivery Details Block //////////////////////////////////////////////// */}

<View style={{height:300,marginTop:SECTION_MARGIN_TOP}}>
<Grid ><Col><CustomText text={'No of Pieces'} textType={Strings.subtext}/></Col>
        <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>32</Text></Col></Grid>
 <Grid ><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext}/></Col>
        <Col><Text style={{fontSize:14,color:Colors.subTextColor,backgroundColor:Colors.textBackgroundColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 5000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Amount to collect'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,backgroundColor:Colors.textBackgroundColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 1000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 2000</Text></Col></Grid>
 <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>Rs: 1000</Text></Col></Grid>
       </View>


{/*////////////////////// Customer Signature Block //////////////////////////////////////////////// */}

<CustomText  text={'Customer Signature'} textType={Strings.subtitle}/>
<View style={{ backgroundColor:Colors.signBackgroundColor,height:150,Right:20,borderRadius:5,padding:10}}></View>
<CustomButton title={'Submit'}/>


        </View>
        </View>

        </ScrollView>
        </Container>
    );
}

}

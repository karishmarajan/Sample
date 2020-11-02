import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col,Input} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';

const myArray=[{name:"Select a Status" , value:"Select a Status"},{name:"Delivered" , value:"Delivered"},{name:"Undelivered" , value:"Undelivered"}];
const myArray1=[{name:"Select/Enter a Reason" , value:"Select/Enter a Reason"},{name:"a" , value:"a"},{name:"b" , value:"b"}];

export default class Delivery extends React.Component {
render(){
    var left = (
        <Left style={{ flex: 1 }}>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-menu' />
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{color:Colors.navbarIconColor}} name='ios-chatbubbles' />
          </Button>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{color:Colors.navbarIconColor }} name='ios-notifications' />
          </Button>
        </Right>
      );


    return(
        <Container>
        <Navbar left={left} right={right} title="Delivery" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:20}}>

        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,justifyContent:'space-evenly'}}>
        <CustomSubButton title={'Notify'}/>
        <CustomSubButton title={'Call'}/>
        <CustomSubButton title={'Print'}/>
        </View>
        
        <View style={{ backgroundColor:'white',height:1600,padding:10,marginTop:SECTION_MARGIN_TOP}}>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

        <View style={{flexDirection:'row',marginTop:10,padding:10}}>
          <CustomText  text={'Delivery Details'} textType={Strings.title}/>
          <Icon name="md-close" style={{position: 'absolute',marginLeft: 250,color:'black'}} />
        </View>

          <CustomText text={'Cust. Name'} textType={Strings.maintext}/>
          <CustomInput />
          <CustomText text={'Mobile No.'} textType={Strings.maintext}/>
          <CustomInput keyboardType={'number-pad'}/>
          <CustomText text={'Location'} textType={Strings.maintext}/>
          <CustomInput/>
          <CustomText text={'Address'} textType={Strings.maintext}/>
          <CustomInput/>


{/*////////////////////// Order Details block //////////////////////////////////////////////// */}

<CustomText  text={'Order No. 1'} textType={Strings.smalltitle} fontWeight={'bold'}/>
 <Grid ><Col><CustomText text={'Serial No.'} textType={Strings.subtext}/></Col>
        <Col><CustomInput height={30} keyboardType={'number-pad'}/></Col></Grid>
 <Grid ><Col><CustomText text={'Date and Time'} textType={Strings.subtext}/></Col>
        <Col><CustomInput height={30}/></Col></Grid>
 <Grid><Col><CustomText text={'Order No.'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={30} keyboardType={'number-pad'}/></Col></Grid>
 <Grid><Col><CustomText text={'Delivery Type'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={30}/></Col></Grid>
 <Grid><Col><CustomText text={'No. of Pieces'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={30} keyboardType={'number-pad'}/></Col></Grid>
 <Grid><Col><CustomText text={'Total'} textType={Strings.subtext}/></Col>
       <Col><CustomInput height={30} keyboardType={'number-pad'}/></Col></Grid>



{/*////////////////////// Order Status Block //////////////////////////////////////////////// */}

<View style={{marginTop:10}}>
<CustomText  title={'Status Update'} textType={Strings.smalltitle} fontWeight={'bold'}/>
<CustomText text={'Status'} textType={Strings.maintext}/>  
<CustomDropdown data={myArray} height={35} backgroundColor={Colors.textBackgroundColor} fontSize={16} borderWidth={.5} borderColor={Colors.borderColor} />  
<CustomText text={'Reason'} textType={Strings.maintext}/>
<CustomDropdown data={myArray1} height={35} backgroundColor={Colors.textBackgroundColor} fontSize={16} borderWidth={.5} borderColor={Colors.borderColor}/>
</View>


{/*////////////////////// Total Details Block //////////////////////////////////////////////// */}

<CustomText text={'Total'} textType={Strings.smalltitle} fontWeight={'bold'}/>
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


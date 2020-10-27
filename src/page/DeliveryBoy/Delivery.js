import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Grid,Col} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomSubButton from '../../component/CustomSubButton';
import CustomTitle from '../../component/CustomTitle';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';

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
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:20}}>

        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,justifyContent:'space-evenly'}}>
        <CustomSubButton title={'Notify'}/>
        <CustomSubButton title={'Call'}/>
        <CustomSubButton title={'Print'}/>
        </View>
        
        <View style={{ backgroundColor:'white',height:1600,padding:10,marginTop:SECTION_MARGIN_TOP}}>
        <View style={{flexDirection:'row',marginTop:10,padding:10}}>
          <CustomTitle  title={'Delivery Details'} fontType={Strings.title}/>
          <Icon name="md-close" style={{position: 'absolute',marginLeft: 250,color:'black'}} />
        </View>

          <CustomText text={'Cust. Name'} textType={Strings.maintext}/>
          <CustomInput/>
          <CustomText text={'Mobile No.'} textType={Strings.maintext}/>
          <CustomInput/>
          <CustomText text={'Location'} textType={Strings.maintext}/>
          <CustomInput/>
          <CustomText text={'Address'} textType={Strings.maintext}/>
          <CustomInput/>




<CustomTitle  title={'Order No. 1'} fontType={Strings.smalltitle} fontWeight={'bold'}/>
 <Grid ><Col><CustomText text={'Serial No.'} textType={Strings.subtext}/></Col>
        <Col><Text style={styles.textinput}></Text></Col></Grid>
 <Grid ><Col><CustomText text={'Date and Time'} textType={Strings.subtext}/></Col>
        <Col><Text style={styles.textinput}></Text></Col></Grid>
 <Grid><Col><CustomText text={'Order No.'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.textinput}></Text></Col></Grid>
 <Grid><Col><CustomText text={'Delivery Type'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.textinput}></Text></Col></Grid>
 <Grid><Col><CustomText text={'No. of Pieces'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.textinput}></Text></Col></Grid>
 <Grid><Col><CustomText text={'Total'} textType={Strings.subtext}/></Col>
       <Col><Text style={styles.textinput}></Text></Col></Grid>






<CustomTitle  title={'Status Update'} fontType={Strings.smalltitle} fontWeight={'bold'}/>
<CustomText text={'Status'} textType={Strings.maintext}/>  
        <Picker 
          selectedValue="Select a Status"
          style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Select a Status" value="java" />
          <Picker.Item label="a" value="js" />
          <Picker.Item label="b" value="js" />
          <Picker.Item label="c" value="js" />
        </Picker>   
<CustomText text={'Reason'} textType={Strings.maintext}/>
        <Picker 
          selectedValue="Select a Status"
          style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Select/Enter a Reason" value="java" />
          <Picker.Item label="a" value="js" />
          <Picker.Item label="b" value="js" />
          <Picker.Item label="c" value="js" />
        </Picker>




<CustomTitle  title={'Total'} fontType={Strings.smalltitle} fontWeight={'bold'}/>
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

const styles=StyleSheet.create({
  textinput :{
    fontSize:14,
    color:Colors.subTextColor,
    backgroundColor:Colors.textBackgroundColor,
    paddingLeft:10,
    paddingTop:5,
    height:30,
    borderRadius:5,
  },
});
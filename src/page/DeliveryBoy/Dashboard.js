import React, { Component } from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Text,Input,Item,Grid,Col } from 'native-base';

import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import { SECTION_MARGIN_TOP, SCREEN_HEIGHT } from '../../constants/Dimen';
import CustomTitle from '../../component/CustomTitle';
import CustomText from '../../component/CustomText';

export default class Dashboard extends React.Component {

  render() {
  
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
          <Icon style={{color:Colors.navbarIconColor }} name='ios-notifications' />
        </Button>
      </Right>
    );

    return (
        <Container>
          <Navbar left={left} right={right} title="Dashboard" titleStyle={{ color: Colors.navbarTitleColor}} />

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:20}}>

          <View style={{ backgroundColor:Colors.white,marginTop:SECTION_MARGIN_TOP,height:120,borderRadius:10,padding:10}}>
          <CustomText text={'Amount collected today'} textType={Strings.maintext}/>
           <Text style={{fontSize:20,fontWeight:'bold',marginTop:35}}>Rs:1,00,000</Text>
          </View>
          <View style={{ backgroundColor:Colors.white,marginTop:SECTION_MARGIN_TOP,height:120,borderRadius:10,padding:10}}>
          <CustomTitle title={'Order Transfer'} fontType={Strings.subtitle} />
          <CustomText text={'Wait for your Approval'} textType={Strings.maintext} />
          
            <View style={{marginTop:20,flex:1,flexDirection:'row'}}>
            <TouchableOpacity
                  style={{backgroundColor:Colors.red,width:80,height:30,justifyContent:'center',borderRadius:5}} >
                  <Text style={{color:Colors.white,textAlign:'center'}}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor:Colors.green,width:80,height:30,justifyContent:'center',left:20,borderRadius:5}} >
                  <Text style={{color:Colors.white,textAlign:'center'}}>Accept</Text>
                </TouchableOpacity>
            </View>
    
          </View>
       


 <Text style={{marginTop:SECTION_MARGIN_TOP,fontSize:19,fontFamily:'normal'}}>{`Today ${moment().format('DD')}th ${moment().format(`MMM  YYYY`)}`}</Text>
 <View style={{ backgroundColor:Colors.white,height:250,borderRadius:10,justifyContent:'center',padding:10}}>

 <Grid ><Col><CustomText text={'Pending Orders'} textType={Strings.maintext}/></Col>
        <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>23</Text></Col></Grid>
 <Grid ><Col><CustomText text={'Rejected Orders'} textType={Strings.subtext}/></Col>
        <Col><Text style={{fontSize:14,color:Colors.subTextColor,backgroundColor:Colors.textBackgroundColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>5</Text></Col></Grid>
 <Grid><Col><CustomText text={'Delivered Orders'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,backgroundColor:Colors.textBackgroundColor,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>71</Text></Col></Grid>
 <Grid><Col><CustomText text={'Total Orders'} textType={Strings.subtext}/></Col>
       <Col><Text style={{fontSize:14,color:Colors.subTextColor,borderColor:Colors.borderColor,borderWidth:1,paddingLeft:10,paddingTop:5,height:30,borderRadius:5}}>100</Text></Col></Grid>


           {/* <View style={{height:240,fontSize:22,borderColor:'#c4c4cb',borderWidth:1,marginTop:10,marginBottom:10}}>
             <View style={{backgroundColor:'#f4f4f4',padding:20,width:150}}><Text>{'Pending Orders'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text>{'Rejected Orders'}</Text></View>
             <View style={{backgroundColor:'#f4f4f4',padding:20}}><Text>{'Delivered Orders'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text>{'Total Orders'}</Text></View>
        </View>
        <View style={{height:240,fontSize:22,borderColor:'#c4c4cb',borderWidth:1,marginTop:10}}>
             <View style={{backgroundColor:'#f4f4f4',padding:20,width:150}}><Text style={{textAlign:'center'}}>{'23'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text style={{textAlign:'center'}}>{'5'}</Text></View>
             <View style={{backgroundColor:'#f4f4f4',padding:20}}><Text style={{textAlign:'center'}}>{'71'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text style={{textAlign:'center'}}>{'100'}</Text></View>
        </View> */}

          </View>

              </View>
        </Container>

    );
  }

}

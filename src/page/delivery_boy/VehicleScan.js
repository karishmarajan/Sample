import React, { Component } from 'react';
import { ScrollView,StyleSheet,AsyncStorage } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP ,FIELD_MARGIN_TOP,SHORT_BLOCK_BORDER_RADIUS,MAIN_VIEW_PADDING,FOURTH_FONT,SECOND_FONT} from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { DELIVERY_COUNT , DELIVERYBOY_VEHICLE } from '../../constants/Api';

import moment from 'moment';





export default class VehicleScan extends React.Component {


  state ={
    deliveryboy_details_list :[],
    departed_time:'',
    arrival_time:'',
  }


  // componentDidMount(){
  //   AsyncStorage.getItem(KEY).then((value => {
 
  //      let data = JSON.parse(value);
  //      this.fetch_deliveryboy_vehicle(data.personId);
    
  //  }));
  //  }

    
time_setting_function_depart(){

  var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
  this.setState({departed_time:time});
  alert(this.state.departed_time);
}

time_setting_function_arrival(){

  var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
  this.setState({arrival_time:time});
  alert(this.state.departed_time);
}
 
  //  fetch_deliveryboy_vehicle(val){

  //   Api.fetch_request(DELIVERYBOY_VEHICLE+val,'GET','')
  //   .then(result => {
     
  //     if(result.error != true){
  
  //       console.log('Success:', JSON.stringify(result));
  //       this.setState({deliveryboy_details_list : result.payload})
      
  //     }
  //     else{
  //       console.log('Failed');
  //     }
  // })
  
  //  }


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
        <Navbar left={left} title="Vehicle Scan" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*///////////////////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*////////////////////// Vehicle Details Block //////////////////////////////////////////////// */}

        <View style={styles.eachview1}>
          <View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row',alignItems:'center',}}>
              <CustomText  text={'Vehicle Details'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              <Icon name={'md-arrow-dropdown'} style={{color:Colors.black,fontSize:FOURTH_FONT,flex:1,}}/>
          </View>
          <CustomText text={'Vehicle Number'} textType={Strings.maintext} />
         <View style={{backgroundColor:Colors.textBackgroundColor,height:40,alignItems:'flex-start',justifyContent:'center'}}>
          <Text style={{fontSize:SECOND_FONT,paddingLeft:10,textAlign:'left'}}>{this.state.deliveryboy_details_list.vehicleNumber ? this.state.deliveryboy_details_list.vehicleNumber :'N/A' }</Text> 
         </View>

        <View style={{marginTop:FIELD_MARGIN_TOP,}}><CustomText text={'Vehicle Type'} textType={Strings.maintext}/>
        <View style={{backgroundColor:Colors.textBackgroundColor,height:40,alignItems:'flex-start',justifyContent:'center'}}>
         <Text style={{fontSize:SECOND_FONT,paddingLeft:10,textAlign:'left'}}>{this.state.deliveryboy_details_list.vehicleType ? this.state.deliveryboy_details_list.vehicleType :'N/A' }</Text> 
        </View>
        </View>
        </View>

{/*/////////////////////////// Departed Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Departed Time'} textType={Strings.subtitle} fontWeight={'bold'} />
        {/* <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.gray} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} flex={1}/> */}
        <CustomButton title={'Set Departed Time'} borderRadius={SHORT_BLOCK_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.time_setting_function_depart()}/>
        </View>

{/*////////////////////////// arrival Time Block //////////////////////////////////////////////// */}

        <View style={styles.eachview}>
        <CustomText  text={'Arrival Time'} textType={Strings.subtitle} fontWeight={'bold'} />
        {/* <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.gray} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} flex={1} /> */}
        <CustomButton title={'Set Arrival Time'} borderRadius={SHORT_BLOCK_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.time_setting_function_arrival()}/>
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
    paddingTop:SECTION_MARGIN_TOP,
    
  },
  eachview1 :{
    backgroundColor:'white',
    height:250,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:30,
  },
});
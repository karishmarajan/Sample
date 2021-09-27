import React, { Component, } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView,BackHandler ,AsyncStorage , } from 'react-native';
import { Container, View, Button, Left, Right, Icon, Text,Grid,Col,Row,Badge, Segment } from 'native-base';
import { Actions } from 'react-native-router-flux';




import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomSubButton from '../../component/CustomSubButton';
import { SECTION_MARGIN_TOP,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, ORDER_BLOCK_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SHORT_BUTTON_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT,FOURTH_FONT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { VEHICLE_DETAILS, VEHICLE_REQUEST } from '../../constants/Api';
import CustomInput from '../../component/CustomInput';
import CustomAlert from '../../component/CustomAlert';





export default class AssignPredefined extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////

  state ={
    vehicle_details :[],
   
  }

  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount(){
   AsyncStorage.getItem(KEY).then((value => {

      let data = JSON.parse(value);
      this.fetch_vehicle_details(data.personId);
   
  }));
  }
  //////////////////////////////////////////// Vehicle details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
  fetch_vehicle_details(val){

  Api.fetch_request(VEHICLE_DETAILS+val,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({vehicle_details : result.payload})
    
    }
    else{
      console.log('Failed');
    }
})

 }

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 vehicle_change_request() {

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

  let body={
    "requestedBy" :data.personId,
    "requestedFrom" : "DELIVERY_AGENT",
    "requestedTo" : "ADMIN"

};

  Api.fetch_request(VEHICLE_REQUEST ,'POST','',JSON.stringify(body))
  .then(result => {
   
    if(result.error != true){
    console.log('Success:', JSON.stringify(result));

    this.setState({alert_visible:true})
    setTimeout(()=>{this.setState({alert_visible:false})},3000);


    }
    else{
      console.log('Failed');
      alert(" Failed ! ")
    }
  })
}));
 
}


/////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////

  render() {
  
    var left = (
      <Left  style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon style={{ color:Colors.navbarIconColor }} name='md-arrow-round-back' />
          </Button>
      </Left>
    );
   

    return (
     
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar left={left} title="Assign"/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>



        {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>


              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
    );
  }


}



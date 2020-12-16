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
import { VEHICLE_DETAILS } from '../../constants/Api';
import CustomInput from '../../component/CustomInput';





export default class Dashboard extends React.Component {

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
  //////////////////////////////////////////// Amount collected fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
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
          <Navbar left={left} title="Delivery Vehicles"/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>



        {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>

        {/*////////////////////// Vehicles block //////////////////////////////////////////////// */}

          <View style={{ backgroundColor:Colors.white,height:100,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING,marginTop:SECTION_MARGIN_TOP}}>
          <CustomText text={'bmwww'} fontWeight={'bold'} textType={Strings.maintext}/>
          {/* <CustomText text={this.state.vehicle_details.modalName ? this.state.vehicle_details.modalName :'N/A' } fontWeight={'bold'} textType={Strings.maintext}/> */}
          <View style={{flexDirection:'row',flex:10}}>
          <View style={{flex:4}}><CustomText text={'kl 234567'}  textType={Strings.maintext}/></View>
            {/* <View style={{flex:9}}><CustomText text={this.state.vehicle_details.registrationNumber ? this.state.vehicle_details.registrationNumber :'N/A' }  textType={Strings.maintext}/></View> */}
            <View style={{flex:4}}><CustomButton title={'Request to activate'} backgroundColor={Colors.darkSkyBlue} marginTop={1} height={30} borderRadius={5}/></View>
          </View>
          </View>

          <View style={{ backgroundColor:Colors.white,height:100,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING,marginTop:SECTION_MARGIN_TOP}}>
          <CustomText text={'bmwww'} fontWeight={'bold'} textType={Strings.maintext}/>
          {/* <CustomText text={this.state.vehicle_details.modalName ? this.state.vehicle_details.modalName :'N/A' } fontWeight={'bold'} textType={Strings.maintext}/> */}
          <View style={{flexDirection:'row',flex:10}}>
          <View style={{flex:4}}><CustomText text={'kl 234567'}  textType={Strings.maintext}/></View>
            {/* <View style={{flex:9}}><CustomText text={this.state.vehicle_details.registrationNumber ? this.state.vehicle_details.registrationNumber :'N/A' }  textType={Strings.maintext}/></View> */}
            <View style={{flex:4}}><CustomText text={'Activate'}  textType={Strings.maintext} color={Colors.darkSkyBlue} fontWeight={'bold'}/></View>
          </View>
          </View>


              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
    );
  }


}



import React, { Component, } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView,FlatList ,AsyncStorage , } from 'react-native';
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
import { PAYMENT_DETAILS, VEHICLE_REQUEST } from '../../constants/Api';
import CustomInput from '../../component/CustomInput';
import CustomAlert from '../../component/CustomAlert';





export default class PaymentDetails extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////

  state ={
    payment_details :[],
  }

  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount(){
   AsyncStorage.getItem(KEY).then((value => {

      let data = JSON.parse(value);
      this.fetch_payment_details(this.props.order_id);
   
  }));
  }
  //////////////////////////////////////////// Vehicle details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
  fetch_payment_details(id){

  Api.fetch_request(PAYMENT_DETAILS+id+'/DELIVERY_CHARGE','GET','')
  .then(result => {
   
    if (result.error != true) {

      console.log('Success:', JSON.stringify(result))
      this.setState({ payment_details: result.payload })
console.log("test......"+result.payload[0].paymentType)
    }
    else {
      console.log('Failed');
      this.setState({ payment_details: ''})
    }
})

 }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 _body = (item) => {
  return (

    <View style={{ backgroundColor:Colors.white,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING,marginTop:SECTION_MARGIN_TOP}}>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Assigned By               : '} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.assignerName ? item.assignerName :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Assigned Date           : '} fontWeight={'bold'}  textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.createdDate ? item.createdDate :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    
    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Rate                             :'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.amountCollected ? item.amountCollected :'N/A' }  textType={Strings.maintext}/></View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Paid To                       :'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.assignerName? item.assignerName :'N/A' }  textType={Strings.maintext}/></View>
    </View>

    <View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><CustomText text={'Paid Date                   :'} fontWeight={'bold'} textType={Strings.maintext}/></View>
    <View style={{flex:4}}><CustomText text={item.createdDate ? item.createdDate :'N/A' }  textType={Strings.maintext}/></View>
    </View>
    </View>



  )
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
          <Navbar left={left} title="Payment Details"/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>



        {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>


        {/*////////////////////// Details block //////////////////////////////////////////////// */}


        

         
          <FlatList
                data={this.state.payment_details}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => this._body(item)}
              />


          <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
    );
  }


}



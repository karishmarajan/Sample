import React, { Component  } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView  ,AsyncStorage, FlatList, Alert} from 'react-native';
import { Container, Text,View, Button, Left, Icon, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';




import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
//import CustomTouchable from '../component/CustomTouchable';


import { SECTION_MARGIN_TOP,TEXT_PADDING_LEFT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, SHORT_BORDER_RADIUS,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SHORT_BUTTON_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT,FOURTH_FONT,CLOSE_SIZE,CLOSE_WIDTH} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';

import session,{KEY, KEY1} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { DELIVERYBOY_VIEW_MANUALORDERS } from '../../constants/Api';





export default class ManualPickupOrders extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////
  
  state ={
     order:[],
    manual:"",
    pickup:""
  }

  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    AsyncStorage.getItem(KEY).then((value => {
       let data = JSON.parse(value);
         console.log(data.personId);
       
         this.fetching_orders_manual_pickup(data.personId);
  
  
    }));
  }


  ////////////////////////////// Fetching customer packages with id function //////////////////////////////////////////////////////////////////////////////
  fetching_orders_manual_pickup(creator_id) {
   
  Api.fetch_request(DELIVERYBOY_VIEW_MANUALORDERS+creator_id,'GET','','')
  .then(result => {
    
    if(result.error != true){
     
     // console.log('Success:', JSON.stringify(result));
      this.setState({order : result.payload})
      
    }
    else{
      console.log('Failed');
      Toast.show({ text: "No package Available", type: 'warning' });
    }
})
 
}

///////////////////////////////// Creating package request function //////////////////////////////////////////////////////////////////////////////////////// 
 

 
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 _body = (item) => {
   
  if(item.isManualPickup==true)
  {
     manual="True";
  }
  else
  {
  manual="False";
  }

  if(item.isPickupRequired==true)
  {
     pickup="True";
  }
  else
  {
  pickup="False";
  }
  
  return (


<View style={{borderColor:Colors.gray,borderWidth:1,marginTop:SECTION_MARGIN_TOP,paddingBottom:20}}>
{/* <View style={{flexDirection:'row',padding:10}}> */}
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>

                      <View style={{flex:3}}><CustomText text={'Order Id'} textType={Strings.subtext} color={Colors.black}/></View>

                      <View style={{flex:2}}><CustomText text={item.orderId ? item.orderId : Strings.na} textType={Strings.maintext} color={Colors.darkSkyBlue}/></View>
</View>
{/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>

                      <View style={{flex:3}}><CustomText text={'Pickup Office ID'} textType={Strings.subtext} color={Colors.black}/></View>

                      <View style={{flex:2}}><CustomText text={item.pickupOfficeId ? item.pickupOfficeId : Strings.na} textType={Strings.maintext} color={Colors.darkSkyBlue}/></View>
                   </View>   
                   */}

                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                  <View style={{flex:3}}><CustomText text={'Customer ID'} textType={Strings.subtext} color={Colors.black}/></View>

                      <View style={{flex:2}}><CustomText text={item.customerId ? item.customerId : Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue}/></View>
                  </View>  
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Customer Type'} textType={Strings.subtext} color={Colors.black}/></View>
                      <View style={{flex:2}}><CustomText text={item.customerIdentityType ? item.customerIdentityType:Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue}/></View>
                  </View> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Number of shipment boxes'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={item.noOfShipmentBoxes ? item.noOfShipmentBoxes : Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue}/></View>
                  </View> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Order status'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={item.orderStatus ? item.orderStatus:Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue}/></View>
                  </View> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Pickup pincode'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={item.pickupPincode ? item.pickupPincode:Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue}/></View>
                  </View> 
                  {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Pickup required'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={pickup} textType={Strings.subtext} color={Colors.darkSkyBlue} mTop={1}/></View>
                  </View>  */}
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Delivery pincode'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={item.deliveryPincode ? item.deliveryPincode : Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue} mTop={1}/></View>
                  </View> 
                  {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Delivery type'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={item.deliveryType ? item.deliveryType : Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue} mTop={1}/></View>
                  </View> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Manual pickup'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      
                      <View style={{flex:2}}><CustomText text={manual} textType={Strings.subtext} color={Colors.darkSkyBlue} mTop={1}/></View>
                  </View>  */}
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
                      <View style={{flex:3}}><CustomText text={'Order rejection'} textType={Strings.subtext} color={Colors.black} mTop={1}/></View>
                      <View style={{flex:2}}><CustomText text={item.orderRejectedReason ? item.orderRejectedReason : Strings.na} textType={Strings.subtext} color={Colors.darkSkyBlue} mTop={1}/></View>
                  </View> 

                
                 
</View>



  )
}
    
/////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor,fontSize:CLOSE_SIZE }} name='ios-close' />
        </Button>
      </Left>
    );

    return (
     
     
        <Container>
          <Navbar  title="Manual Pickups" left={left}/>
          <ScrollView >
         
 

 {/*/////////////////////////////////////// main view /////////////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.white,padding:20}}>


        

<FlatList
                data={this.state.order}
               
                keyExtractor={(x, i) => i}
                renderItem={({ item })=> {
           var tempIdentityType= item.customerIdentityType;
           item.customerIdentityType = tempIdentityType.replace("_", " ");
          var temporderstatus=item.orderStatus;
          item.orderStatus=temporderstatus.replace("_"," ");
                  return this._body(item)}}
              />


              </View>
              </ScrollView>
        </Container>
      
    );
  }

// render(){
//   return (

//     <Text>hello</Text>
//   )
// }
}


const styles=StyleSheet.create({

 

  });
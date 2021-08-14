import React, { Component } from 'react';
import { ScrollView,StyleSheet,Modal,Linking } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Grid,Col,} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,LOGIN_FIELD_HEIGHT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, CREDIT_FIELD_HEIGHT,TEXT_MARGIN_TOP, CAMERA_SIZE,FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { PICKUP_DETAILS , PICKUP_ORDER_UPDATE } from '../../constants/Api';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';




export default class PickupDetailsView extends React.Component {

  state = {

    pickup_details:[],

  };


  componentDidMount() {
    
    this.fetch_pickup_details(this.props.pickup_id);
  }



  //////////////////////////////////////////// Pickup details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
 fetch_pickup_details(id){

  // alert(id)

  Api.fetch_request(PICKUP_DETAILS+id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({pickup_details : result.payload})
    
    }
    else{
      console.log('Failed');
    }
})

 }




  /////////////////////////////////// Render Method  /////////////////////////////////////////////////////////////////////////////

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
        


{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left}  title="PickUp Details" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Sender Address &  Details'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        {/* <CustomText text={'Deliver To'} textType={Strings.subtext} color={Colors.black}/>
        <View style={styles.inputview}><CustomText text={this.state.pickup_details.canBeDeliveredTo ? this.state.pickup_details.canBeDeliveredTo : Strings.na } textType={Strings.subtext} color={Colors.black}/></View> */}
          <CustomText text={'Customer Name'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.contactPersonName ? this.state.pickup_details.contactPersonName : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.preDefinedOrderId?this.state.pickup_details.preDefinedOrderId:this.state.pickup_details.customerId ? this.state.pickup_details.customerId : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Mobile No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.contactPersonNumber ? this.state.pickup_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.pickup_details.gmapLink ? this.state.pickup_details.gmapLink : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Address'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputviewaddress}>
            <CustomText text={this.state.pickup_details.addressLine1 ? this.state.pickup_details.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.pickup_details.addressLine2 ? this.state.pickup_details.addressLine2 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.pickup_details.city ? this.state.pickup_details.city : Strings.na} textType={Strings.subtext} color={Colors.black}/>
          </View>
</View>





{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:10}}>
<View style={{ backgroundColor:Colors.signBackgroundColor,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Order No. 1'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        <CustomText text={'Serial No.'} textType={Strings.subtext} color={Colors.black}/>
        <View style={styles.inputview2}><CustomText text={this.state.pickup_details.serialId ? this.state.pickup_details.serialId : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Order No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.orderId ? this.state.pickup_details.orderId : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Date And Time'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.pickupDate ? this.state.pickup_details.pickupDate + ' '+ this.state.pickup_details.pickupTime  : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Seller ID'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput keyboardType={'number-pad'} flex={1} backgroundColor={Colors.textBackgroundColor1}/>
          <CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.deliveryType ? this.state.pickup_details.deliveryType : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black}/>
          <CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview2}><CustomText text={this.state.pickup_details.gmapLink ? this.state.pickup_details.gmapLink : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Package Details'} textType={Strings.subtext} color={Colors.black}/>
          <View style={{flexDirection:'row',flex:2,justifyContent:'space-between'}}>
          <CustomText text={'No. of Pieces'} textType={Strings.subtext} color={Colors.black}/>
          <CustomText text={'Scanned Pieces'} textType={Strings.subtext} color={Colors.black}/>
          </View>
          <View style={{flexDirection:'row',flex:2,justifyContent:'space-between'}}>
          <View style={{flex:1}}><CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/></View>
          <View style={{flex:1,marginLeft:SECTION_MARGIN_TOP}}><CustomInput flex={1} backgroundColor={Colors.textBackgroundColor1}/></View>
          </View>
       

          </View>
</View>


          </View>
        </ScrollView>
        </Container>
    );

}
}

const styles=StyleSheet.create({
    modalview :{
      margin:SECTION_MARGIN_TOP,
      padding:SECTION_MARGIN_TOP,
      maxWidth:'60%',
      minWidth:'60%',
    },
    modalview1 :{
      padding:10 ,
      backgroundColor: Colors.white,
      marginTop:20,
      marginRight:20
      },
  iconstyle :{
    position: 'absolute',
    marginLeft: 250,
    color:'black',
    fontSize:22,
    marginTop:5
  },
  evenrowtext :{
    fontSize:14,
    color:Colors.subTextColor,
    backgroundColor:Colors.textBackgroundColor,
    paddingLeft:10,
    paddingTop:5,
    height:30,
    borderRadius:5
  },
  oddrowtext :{
    fontSize:14,
    color:Colors.subTextColor,
    borderColor:Colors.gray,
    borderWidth:1,
    paddingLeft:10,
    paddingTop:5,
    height:30,
    borderRadius:5
  },
  inputview :{
    backgroundColor:Colors.textBackgroundColor,
    height:40,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  inputviewaddress :{
    backgroundColor:Colors.textBackgroundColor,
    height:120,
    alignItems:'flex-start',
  },
  inputview2 :{
    backgroundColor:Colors.textBackgroundColor1,
    height:40,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  });
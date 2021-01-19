import React, { Component } from 'react';
import { ScrollView,StyleSheet,Modal, AsyncStorage , Linking, Platform, FlatList } from 'react-native';
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
import { DELIVERY_OUT_DETAILS , DELIVERY_CHARGE } from '../../constants/Api';


const myArray=[{name:"Select a Status" , value:"Select a Status"},{name:"COMPLETED" , value:"COMPLETED"},{name:"FAILED" , value:"FAILED"}];
const myArray1=[{name:"Select/Enter a Reason" , value:"Select/Enter here"},{name:"a" , value:"a"},{name:"b" , value:"b"},{name:"Enter a Reason" , value:"Enter a Reason"}];
const myArray2=[{name:"Cash" , value:"Cash"},{name:"Credit card" , value:"Credit card"},{name:"Debit card" , value:"Debit card"},{name:"Paytm" , value:"Paytm"}];

export default class DeliveryOutDetails extends React.Component {

  state = {
    modal_visible: false,
    reason:'',
    reason_val:'',
    modal_view: false,
    delivery_details:[],
    status:'',
    min_delivery_charge:'',
    package_applied:'',
    credit_available:'',
    delivery_charge:'',

  };


  componentDidMount() {
    
    this.fetch_delivery_out_details(this.props.delivery_id);
    this.generate_invoice();
  }
 /////////////////////////////////////// Call function ////////////////////////////////////////////////////////////////////////////

 dialCall = (no) => {

  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${'+no+'}';
  }
  else {
    phoneNumber = 'telprompt:${'+no+'}';
  }

  Linking.openURL(phoneNumber);
};

  //////////////////////////////////////////// Delivery out details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
 fetch_delivery_out_details(id){

  // alert(id)

  Api.fetch_request(DELIVERY_OUT_DETAILS+id,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({delivery_details : result.payload})
    
    }
    else{
      console.log('Failed');
    }
})

 }

 ////////////////////////////// Fetching delivery charge details function //////////////////////////////////////////////////////////////////////////////

generate_invoice() {

  Api.fetch_request(DELIVERY_CHARGE + 20 ,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      this.setState({min_delivery_charge : JSON.stringify( result.payload.originalDeliveryCharge) })
      this.setState({package_applied : JSON.stringify(result.payload.deliveryChargePackageDeduction)})
      this.setState({credit_available :JSON.stringify( result.payload.deliveryChargeCreditDeduction )})
      this.setState({delivery_charge : JSON.stringify(result.payload.deliveryChargeAfterDeductions )})

    }
    else{
      console.log('Failed');
    }
})
 
}

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

 {/*////////////////////////////////////// Modal Block //////////////////////////////////////////////// */}

 <Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent, }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center', marginTop:SECTION_MARGIN_TOP }}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>  
        <View style={styles.modalview}>
          <CustomInput  onChangeText={(text)=>this.setState({reason:text})} flex={1}/>
          <CustomButton title={'Submit'} onPress={()=>this.setState({reason_val:this.state.reason,modal_visible:false})}/>
        </View>
        </View>
    </View>
</View>
</Modal>

<Modal visible={this.state.modal_view} supportedOrientations={['landscape']} transparent>
<View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>  
        <View style={styles.modalview1}> 
        <CustomText text={'Notify Customer'} textType={Strings.subtext} onPress={()=>this.setState({modal_view:false})} />
        <CustomText text={'Call Customer'} textType={Strings.subtext} onPress={()=>{this.dialCall(this.state.delivery_details.contactPersonNumber) ; this.setState({modal_view:false})}} />
        <CustomText text={'Print'} textType={Strings.subtext} onPress={()=>this.setState({modal_view:false})}/>
        </View>
    </View>
</Modal>

{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} title="Delivery Details" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Delivery Address & Reciever Details'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        <CustomText text={'Deliver To'} textType={Strings.subtext} color={Colors.black}/>
        <View style={styles.inputview}><CustomText text={this.state.delivery_details.canBeDeliveredTo ? this.state.delivery_details.canBeDeliveredTo : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.delivery_details.contactPersonName ? this.state.delivery_details.contactPersonName : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.delivery_details.customerId ? this.state.delivery_details.customerId : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Mobile No.'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.delivery_details.contactPersonNumber ? this.state.delivery_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.delivery_details.localBodyType ? this.state.delivery_details.localBodyType : Strings.na} textType={Strings.subtext} color={Colors.black}/></View>
          <CustomText text={'Address'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputviewaddress}>
            <CustomText text={this.state.delivery_details.addressLine1 ? this.state.delivery_details.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.delivery_details.addressLine2 ? this.state.delivery_details.addressLine2 : Strings.na} textType={Strings.subtext} color={Colors.black}/>
            <CustomText text={this.state.delivery_details.city ? this.state.delivery_details.city : Strings.na} textType={Strings.subtext} color={Colors.black}/>
          </View>
          <CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black}/>
<View style={styles.inputview}><CustomText text={this.state.delivery_details.proofToBeProduced ? this.state.delivery_details.proofToBeProduced : Strings.na } textType={Strings.subtext} color={Colors.black}/></View>
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
    // modalview1 :{
    //     maxWidth:'60%',
    //     minWidth:'60%',
    //   },
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
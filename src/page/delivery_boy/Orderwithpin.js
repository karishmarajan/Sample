///////////////////////////////////////////////edited Nishanth///////////////////////////


import React from 'react';
import {Modal, ScrollView,AsyncStorage, TouchableOpacity, DatePickerAndroid, TimePickerAndroid, Keyboard ,Switch} from 'react-native';
import { Container, View, Button, Left, Icon,Text,Toast,StyleSheet} from 'native-base';
import { Actions } from 'react-native-router-flux';
import CustomMandatory from '../../component/CustomMandatory';
import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP, SHORT_BUTTON_HEIGHT, TEXT_PADDING_RIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING, BORDER_WIDTH, SHORT_BORDER_WIDTH, SHORT_BORDER_RADIUS, NORMAL_FONT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import { RNCamera } from 'react-native-camera';
import { KEY, KEY1 } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import {PREORDER_WITH_PIN,PHONE_SEARCH,PINCODE_SEARCH, COUNTRY , STATE , DISTRICT , CITY , CUSTOMER_DETALS ,PACKAGE_CATEGORY, PACKAGE_SUB_CATEGORY ,SHIPMENT_BOX, ORDER, COST_CHECKLIST, DELIVERY_CHARGE, ADD_COD ,PAYER_PAYMENT, PAYMENT_BY_CASH ,ORDER_TRACKING, PRODUCT_BILL_UPLOAD} from '../../constants/Api';

import SideMenuDrawer from '../../component/SideMenuDrawer';

export default class orderwithpin extends React.Component {



  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
  
    ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////
  
   this.state ={
    
      customer_id:'',
      customer_type:'',
      order_details_list:[],
      active:'REQUESTED',
      errorTextpreid: '',
      errorTextsender_pincode: '',
      errorTextreciever_pincode: '',
      hasError: false,
      predefinedpin:'',
      sender_pincode:'',
      reciever_pincode:'',
      customertype:'',
      customerId:'',
      modalVisible:false,
      toggle:true,
      bullet:false,
      additional_charge_toggle:false,
      cod_toggle:false,
      quick_order:'',
      additional_charge:'',
      cod:'',
      collected_toggle:false,
      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      }

    }
  }
    ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        AsyncStorage.getItem(KEY).then((value => {
          let data = JSON.parse(value);
// if(data.customerType=='INDIVIDUAL')


//     this.setState({customertype:'COMMON_USER'})
// else
// {
// this.setState({customertype:'BRANCH_USER'})
// }
    this.setState({customerId:data.personId})
    this.setState({sender_pincode:data.pincode})

         console.log('KKKKKKKKKKKKKK',data)
        
      }));
      }
     
   
     //////////////////////////////////////////// Delivery count fetching function  //////////////////////////////////////////////////////////////////////////////////  
   
//    fetch_customer_orders(){
  
//     AsyncStorage.getItem(KEY).then((value => {
  
//       let data = JSON.parse(value);
  
//       if((data.userId).charAt(0)==='B')
//       {
//         this.setState({customer_type:'BRANCH_USER', customer_id: data.userId.replace('B', '')})
//       }else
//       {
//         this.setState({customer_type:'COMMON_USER',customer_id :data.userId })
//       }
  
  
//       let body = {
//         "customerId": parseInt(this.state.customer_id),
//         "customerIdentityType": this.state.customer_type,
//         "status": this.state.active
  
//       };
  
//     Api.fetch_request(ORDER_HISTORY,'POST','', JSON.stringify(body))
//     .then(result => {
     
//       if(result.error != true){
  
//         console.log('Success:', JSON.stringify(result));
//         this.setState({order_details_list : result.payload})
      
//       }
//       else{
//         console.log('Failed');
//         this.setState({order_details_list : ""})
//         Toast.show({ text: result.message, type: 'warning' });
//       }
//   })
//   }));
  
//    }
  ///////////////////////////////////////////////////////////////////




  onBarCodeRead(scanResult) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data != null) {
	if (!this.barcodeCodes.includes(scanResult.data)) {
	  this.barcodeCodes.push(scanResult.data);
      this.setState({modalVisible:false,predefinedpin:scanResult.data})
      console.log("SCANNEDDDDDDDDDD",this.state.predefinedpin)
	  console.warn('onBarCodeRead call');
	}
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
 submit(){
console.log('CCCCCCCCC',this.state.customertype)
if(this.state.predefinedpin==="") {
    this.setState({hasError: true, errorTextpreid: 'Please enter preorder ID !'});
    return;
  }
  if(this.state.sender_pincode==="") {
    this.setState({hasError: true, errorTextsender_pincode: 'Please enter pincode !'});
    return;
  }
  if(this.state.reciever_pincode==="") {
    this.setState({hasError: true, errorTextreciever_pincode: 'Please enter pincode !'});
    return;
  }

  let body = {
    // "predefinedOrederId": this.state.predefinedpin,
    // "pickupPincode": this.state.reciever_pincode,
    // "customerId": this.state.customerId,
    // "customerIdentityType": this.state.customertype,
    // "createdAtOfficeId":0,
    // "creatorId": this.state.customerId,
    // "isManualPickup": 'false',
    // "creatorUserType": 'ADMIN',
    // "deliveryPincode":this.state.reciever_pincode,







    "createdAtOfficeId": 0,
    "creatorId": this.state.customerId,
    "creatorUserType": "DELIVERY_AGENT",
    // "customerId": this.state.customerId,
    // "customerIdentityType": this.state.customertype,
    "deliveryPincode":this.state.reciever_pincode,
    "isManualPickup": true,
    "pickupPincode": this.state.sender_pincode,
    "preDefinedOrderId": this.state.predefinedpin,
  };
  console.log('BODY ORDERWITH PIN:',body);

  Api.fetch_request(PREORDER_WITH_PIN, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {
        Toast.show({ text: 'Order Created', type: 'success' });
        // Actions.pop()
    //    this.setState({final_cod_charge:result.payload.finalCodCharge})
        console.log('Success:', JSON.stringify(result));
        
        this.setState({reciever_pincode:''})
        this.setState({predefinedpin:''})

      }
      else {
        console.log(result.message,'Failed');
        Toast.show({ text:result.message , type: 'warning' });

         
       


      }
    })
}
  /////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////
  
    render() {
      var left = (
          <Left style={{ flex: 1 }}>
            <Button width={CLOSE_WIDTH} onPress={() => Actions.pop()} transparent>
              <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-close' />
              </Button>
          </Left>
        );
        var right = (
          <Left style={{ flex: 1 }}>
            <Button width={CLOSE_WIDTH} onPress={() => this.setState({modalVisible:false})} transparent>
              <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-close' />
              </Button>
          </Left>
        );


      return (
       
        <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            <Navbar  title="Order with pin" left={left}/>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
  
  {/* ///////////////////////////////////////////////////////////////////////// */}

<Modal     animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        
        >

<View style={styles.container}>
   
<Navbar  title="Scanning" left={right}/>
       
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            // flashMode={RNCamera.Constants.FlashMode.on}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
	  {/* <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text> */}
	</View>
	{/* <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { console.log('scan clicked'); }}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
           />
	</View> */}
      </View>



</Modal>


  
             {/*////////////////////// main view //////////////////////////////////////////////// */}
  
         <View padding={30}>

         {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Collected'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) =>{ this.setState({collected_toggle: value})}}
          value={this.state.collected_toggle}
        />
           </View>

         <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Quick Order'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) =>{ this.setState({toggle: value});if(value==false){this.setState({additional_charge_toggle:false,cod_toggle:false,bullet:false})}}}
          value={this.state.toggle}
        />
           </View> */}

       
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Preorder Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1}   borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({predefinedpin: text , errorTextpreid:""})} value={this.state.predefinedpin} />
        {!!this.state.errorTextpreid && (<Text style={{color: 'red'}}>{this.state.errorTextpreid}</Text>)}
        <CustomButton title={'Scan code'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.setState({modalVisible:true})} />
       
        <View style={{flexDirection:'row'}}>
        <CustomText text={'Source Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({sender_pincode: text , errorTextsender_pincode:""})} value={this.state.sender_pincode} />
        {!!this.state.errorTextsender_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextsender_pincode}</Text>)}

        <View style={{flexDirection:'row'}}>
        <CustomText text={'Destination Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomMandatory/></View>
        <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({reciever_pincode: text , errorTextreciever_pincode:""})} value={this.state.reciever_pincode} />
        {!!this.state.errorTextreciever_pincode && (<Text style={{color: 'red'}}>{this.state.errorTextreciever_pincode}</Text>)}
      
      
        {this.state.toggle === false && (<View>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Bullet'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => this.setState({bullet: value,additional_charge_toggle:value})}
          value={this.state.bullet}
        />
           </View>

          {this.state.bullet === true &&(<View>  
            <CustomText text={'Additional Charges may apply'} textType={Strings.subtext} color={Colors.black} />
          </View>)}
           <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'Additional Charge'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => this.setState({additional_charge_toggle: value})}
          value={this.state.additional_charge_toggle}
        />
           </View>
          {this.state.additional_charge_toggle == true &&(<View>
            <CustomInput flex={1} value={this.state.aditional_charge} place_holder={'Additional charge'}  />
          </View>)} 
           <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:1}}>
           <CustomText text={'COD'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
           <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={(value) => this.setState({cod_toggle: value})}
          value={this.state.cod_toggle}
        />
           </View>
           {this.state.cod_toggle == true &&(<View>
            <CustomInput flex={1} value={this.state.cod} place_holder={'COD'}  />
           </View>)}

</View>)}
        <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.submit()} />
        </View>
                </ScrollView>
          </Container>
          </SideMenuDrawer>
      );
    }
  
  
  }
  
//   const styles=StyleSheet.create({
  
//        viewstyle:{
//          padding:20,
//              },
  
//   });
  
const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
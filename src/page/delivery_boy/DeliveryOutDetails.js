import React, { Component } from 'react';
import { ScrollView, StyleSheet, Modal, AsyncStorage, Linking, Platform, FlatList, TouchableOpacity, Image, BackHandler, } from 'react-native';
import { Container, View, Button, Left, Right, Icon, Grid, Col, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { TEXT_PADDING_LEFT, TEXT_PADDING_RIGHT, NORMAL_FONT, SHORT_BUTTON_HEIGHT, SECTION_MARGIN_TOP, SHORT_BORDER_RADIUS, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT, MAIN_VIEW_PADDING, BORDER_WIDTH, SHORT_BORDER_WIDTH, ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT, TOTAL_BLOCK, CREDIT_FIELD_HEIGHT, TEXT_MARGIN_TOP, CAMERA_SIZE, FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { ORDER_RECIVER_PAYMENT, DELIVERY_OUT_DETAILS, DELIVERY_CHARGE, DELIVERY_STATUS_UPDATE, DELIVERY_ORDER_PAYMENT, DELIVERY_PROOF_UPLOAD, UPDATE_RECEIVER_NAME, OTP, VERIFY_OTP } from '../../constants/Api';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import CustomRadioButton from '../../component/CustomRadioButton';


const myArray = [{ name: "Select a Status", value: "Select a Status" }, { name: "DELIVERED", value: "DELIVERED" }, { name: "ATTEMPT_FAILED", value: "ATTEMPT FAILED" }, { name: "UNVISITED", value: "UNVISITED" }];
const myArray1 = [{ name: "Select/Enter a Reason", value: "Select/Enter a reason" }, { name: "Address invalid", value: "Address invalid" }, { name: "Door was  locked", value: "Door was  locked" }, { name: "Enter a Reason", value: "Enter a Reason" }];
const myArray2 = [{ name: "Cash", value: "Cash" }, { name: "Credit card", value: "Credit card" }, { name: "Debit card", value: "Debit card" }, { name: "Paytm", value: "Paytm" }];

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class DeliveryOutDetails extends React.Component {

  state = {
    modal_visible: false,
    reason: '',
    reason_val: '',
    modal_view: false,
    delivery_details: [],
    status: '',
    min_delivery_charge: '',
    package_applied: '',
    credit_available: '',
    delivery_charge: '',

    imageUrl: '',

    amount_recieved: '',
    balance_amount: '',

    errorTextamount_recieved: '',
    hasError: false,

    modal_proof: false,
    modal_signature: false,

    proof_img: '',
    sign_img: '',

    receiver_name: '',
    errorTextreceiver_name: '',
    ispredefined: '',
    code_otp: '',
    phone_otp: '',
    verify_otp: '',
    otp_verified: false,
    mobile: '',
    otp: '',
    countrycode: '+91',
    same: true,
    altno: false,
    diffperson: false,
    modalVisibleProof: false,
    modalVisibleSignature: false,
    flag:0,
  };


  componentDidMount() {

    this.fetch_delivery_out_details(this.props.delivery_id);


  }


  ///////////////////////////// Taking image function ////////////////////////////////////////////////////////////////////////////////

  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    this.setState({ capture_url: data.uri })
    //  eslint-disable-next-line
    console.log(this.state.capture_url);

    this.setState({ proof_img: this.state.capture_url, modal_proof: false })
    // this.punch();
  };

  takePicture_sign = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    this.setState({ capture_url: data.uri })
    //  eslint-disable-next-line
    console.log(this.state.capture_url);

    this.setState({ sign_img: this.state.capture_url, modal_signature: false })
    // this.punch();
  };


  /////////////////////////////////////// Call function ////////////////////////////////////////////////////////////////////////////

  dialCall = (no) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + no + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + no + '}';
    }

    Linking.openURL(phoneNumber);
  };

  //////////////////////////////////////////// Delivery out details fetching function  //////////////////////////////////////////////////////////////////////////////////  

  fetch_delivery_out_details(id) {

    Api.fetch_request(DELIVERY_OUT_DETAILS + id, 'GET', '')
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          console.log("hello", result.payload.isPreDefinedOrderWithPin);
          if (result.payload.isPreDefinedOrderWithPin == false) {
            console.log("isprdefined is false")
            this.setState({ ispredefined: false,altno:false });

          }
          else if (result.payload.isPreDefinedOrderWithPin == true) {
            console.log("isprdefined is true")
            this.setState({ ispredefined: true,altno:true });

          }
          else {
            console.log("isprdefined is null")
            this.setState({ ispredefined: false,altno:false});

          }

          this.setState({ delivery_details: result.payload });

          console.log()
          this.setState({ receiver_name: result.payload.contactPersonName })
          this.generate_invoice();

        }
        else {
          console.log('Failed');
        }
      })

  }
  /////////////////////////////////////////////////////////
  isSelected(no) {
    if (no == 1) {
     
      this.setState({ same: true , otp_verified:false,mobile:''})
      this.setState({ altno: false })
      this.setState({ diffperson: false })


    }
    if (no == 2) {
      this.setState({ same: false, otp_verified:false,mobile:'' })
      this.setState({ altno: true })
      this.setState({ diffperson: false })


    }
    if (no == 3) {
      this.setState({ same: false, otp_verified:false,mobile:'' })
      this.setState({ altno: false })
      this.setState({ diffperson: true })


    }
  }

  //////////////////////////////////edited Nishanth/////////////////////////////
  /* send_otp(){
  
    let body={
      "countryCode": this.state.countrycode,
      "mobileNumber": this.state.mobile,
  
  };
    
  
    Api.fetch_request(OTP,'POST','',JSON.stringify(body))
    .then(result => {
     
      if(result.error != true){
      console.log('Success:', JSON.stringify(result))
      Toast.show({ text: result.message, type: 'success' });
      }
      else{
        console.log('Failed');
        Toast.show({ text: result.message, type: 'warning' });
      }
    })
  } */
  ////////////////////////////edited Nishanth////////////////////

  verify_otp(otp) {
   if(this.state.otp=='')
   {
     Toast.show({text:"Please Enter OTP No.",type:'warning'});

   }
   else
   {
     console.log("otp entered",this.state.otp)
    let body = {
      "countryCode": this.state.countrycode,
      "mobileNumber":`${this.state.altno ? this.state.mobile : this.state.diffperson ? this.state.mobile : this.state.delivery_details.contactPersonNumber}`,

    };

    Api.fetch_request(VERIFY_OTP +`${this.state.otp}`, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          this.setState({ otp_verified: true, errorTextverify: '' });
          Toast.show({ text: result.message, type: 'success' });
        }
        else {
          console.log('Failed');
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
    }
  }




  ////////////////////////////////////////edited Nishanth///////////////////////////
  send_otp() {

    //this.state.delivery_details.contactPersonNumber
    let body = {
      "countryCode": this.state.countrycode,
      "mobileNumber": `${this.state.altno ? this.state.mobile : this.state.diffperson? this.state.mobile :this.state.delivery_details.contactPersonNumber}`,

    };


    Api.fetch_request(OTP, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {
          console.log('Success:', JSON.stringify(result))
          Toast.show({ text: result.message, type: 'success' });
        }
        else {
          console.log('Failed');
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
  }

  ////////////////////////////// Fetching delivery charge details function //////////////////////////////////////////////////////////////////////////////


  generate_invoice() {

    Api.fetch_request(DELIVERY_CHARGE + this.state.delivery_details.orderId, 'GET', '')
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));

          this.setState({ min_delivery_charge: JSON.stringify(result.payload.originalDeliveryCharge) })
          this.setState({ package_applied: JSON.stringify(result.payload.deliveryChargePackageDeduction) })
          this.setState({ credit_available: JSON.stringify(result.payload.deliveryChargeCreditDeduction) })
          this.setState({ delivery_charge: JSON.stringify(result.payload.deliveryChargeAfterDeductions) })

        }
        else {
          console.log('Failed');
        }
      })

  }
  ///////////////////////////////////////////////////////////////////////////////////////////

  modalvisible() {

  }




  ///////////////////////////////// Delivery order update function //////////////////////////////////////////////////////////////////////////////////////// 

  delivery_status_update() {

    let body = {

      "deliveryFailedReason": this.state.reason_val,
      "deliveryStatus": this.state.status,
      "orderId": this.state.delivery_details.orderId

    };


    if (this.state.status == 'DELIVERED' && this.state.delivery_details.payableByReceiver > 0 && this.state.otp_verified === true) {
      Toast.show({ text: "Complete the payment and verification first", type: 'warning' });
    } else {

      Api.fetch_request(DELIVERY_STATUS_UPDATE, 'PUT', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {
            console.log('Success:', JSON.stringify(result));
            Toast.show({ text: result.message, type: 'success' });
            this.fetch_delivery_out_details(this.props.delivery_id);
          }
          else {
            console.log('Failed');
            Toast.show({ text: result.message, type: 'warning' });
          }
        })
    }

  }

  ////////////////////////////////// Balance calculating fuction /////////////////////////////////////////////////////////////////////////////////////

  balanceCalculate(text) {
    var myInt = parseInt(text);
    var payment = parseInt(this.state.delivery_details.payableByReceiver)
    var bal = myInt - payment;

    if (myInt == payment) {
      this.setState({ balance_amount: '0' });
    } else if (myInt > payment) {
      this.setState({ balance_amount: '' + bal });
    } else {
      this.setState({ balance_amount: '0' });
    }
  }
  ///////////////////////////////////////// Payment by cash function  //////////////////////////////////////////////////////////////////////////////////

  delivery_cash_payment() {

    if (this.state.amount_recieved === "" && this.state.delivery_details.payableByReceiver > 0) {
      this.setState({ hasError: true, errorTextamount_recieved: 'Please fill !' });
      return;
    }
    if (parseInt(this.state.amount_recieved) < parseInt(this.state.delivery_details.payableByReceiver)) {
      this.setState({ hasError: true, errorTextamount_recieved: 'Please collect full amount' });
      return;
    }

    let body = {
      "isAmountCollectedByDeliveryBoy": true,
      "orderId": this.state.delivery_details.orderId,
      "amountReceived": this.state.amount_recieved

    };

    Api.fetch_request(ORDER_RECIVER_PAYMENT, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });

          this.fetch_delivery_out_details(this.props.delivery_id);

        }
        else {
          console.log('Failed');
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
  }

  ///////////////////////////////////////// Update receivername function  //////////////////////////////////////////////////////////////////////////////////

  update_receiver_name() {

    // if(this.state.receiver_name==="") {
    //   this.setState({hasError: true, errorTextreceiver_name: 'Please fill !'});
    //   return;
    // }
    // if(this.state.otp_verified != true) {
    //   this.setState({hasError: true, errorTextverify: 'You have to verify OTP!'});2
    //   return;
    // }
if(this.state.otp_verified==true)
{
    let body = {
      "contactPersonAlterNativeNumber":`${this.state.altno?this.state.mobile:''}`,
      "contactPersonName": this.state.receiver_name,
      "deliveryId": this.props.delivery_id
    };

    Api.fetch_request(UPDATE_RECEIVER_NAME, 'PUT', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          Toast.show({ text: result.message, type: 'success' });

          // Actions.deliveryfirst();
          Actions.reset('deliveryfirst');

        }
        else {
          console.log('Failed');
          Toast.show({ text: result.message, type: 'warning' });
        }
      })
    }
    else{
      Toast.show({text:'Please verify',type:'warning'})
    }
  }

  ///////////////////////////////// Delivery order proof upload function //////////////////////////////////////////////////////////////////////////////////////// 

  delivery_proof_upload() {

    if (this.state.proof_img != '') {
      var filename = this.state.proof_img.substring(this.state.proof_img.lastIndexOf('/') + 1, this.state.proof_img.length);
    }

    let document_image_proof = this.state.proof_img != '' ? { name: 'proofProduced', filename: filename, type: 'image/jpeg', data: Platform.OS == 'android' ? RNFetchBlob.wrap(this.state.proof_img) : RNFetchBlob.wrap(this.state.proof_img.replace('file:///', '')) } : { name: 'image', data: '' };

    if (this.state.sign_img != '') {
      var filename1 = this.state.sign_img.substring(this.state.sign_img.lastIndexOf('/') + 1, this.state.sign_img.length);
    }

    let document_image_sign = this.state.sign_img != '' ? { name: 'receiverSignature', filename: filename1, type: 'image/jpeg', data: Platform.OS == 'android' ? RNFetchBlob.wrap(this.state.sign_img) : RNFetchBlob.wrap(this.state.sign_img.replace('file:///', '')) } : { name: 'image', data: '' };

    let formData = [];
    formData.push(document_image_proof);
    formData.push(document_image_sign);

    console.log('********', JSON.stringify(formData));

    Api.fetch_request(DELIVERY_PROOF_UPLOAD + this.state.delivery_details.orderId + '/proof-produced', 'PUT', { "Content-Type": "multipart/form-data" }, formData)
      .then(result => {
        setTimeout(() => {
          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            Toast.show({ text: 'Uploaded success', type: 'success' });


          }
          else {
            console.log('Failed');
            Toast.show({ text: 'Someting went wrong', type: 'warning' });
          }

        })
      }, 100);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  render() {

    const { ispredefined } = this.state;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor }} name='md-arrow-round-back' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>

        <Button onPress={() => this.setState({ modal_view: true })} transparent>
          <Icon style={{ color: Colors.navbarIconColor }} name='md-more' />
        </Button>
      </Right>
    );


    return (

      <Container>

        {/*////////////////////////////////////// Modal Block //////////////////////////////////////////////// */}

        <Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
          <View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.transparent, }}>
            <View style={{ backgroundColor: Colors.white, alignSelf: 'center', marginTop: SECTION_MARGIN_TOP }}>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <View style={styles.modalview}>
                  <CustomInput onChangeText={(text) => this.setState({ reason: text })} flex={1} />
                  <CustomButton title={'Submit'} onPress={() => this.setState({ reason_val: this.state.reason, modal_visible: false })} />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={this.state.modal_view} supportedOrientations={['landscape']} transparent>
          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
            <View style={styles.modalview1}>
              <CustomText text={'Notify Customer'} textType={Strings.subtext} onPress={() => this.setState({ modal_view: false })} />
              <CustomText text={'Call Customer'} textType={Strings.subtext} onPress={() => { this.dialCall(this.state.delivery_details.contactPersonNumber); this.setState({ modal_view: false }) }} />
              <CustomText text={'Print'} textType={Strings.subtext} onPress={() => this.setState({ modal_view: false })} />
            </View>
          </View>
        </Modal>

        {/* ////////////////////////////////////// Proof modal //////////////////////////////////////////////////////////////////////////// */}

        <Modal visible={this.state.modal_proof} supportedOrientations={['landscape']} transparent>


          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            ratio={'4:4'}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status, recordAudioPermissionStatus }) => {
              if (status !== 'READY') return <PendingView />;
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14, }}> Click here </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>

        </Modal>

        {/* ////////////////////////////////////// Signature modal //////////////////////////////////////////////////////////////////////////// */}

        <Modal visible={this.state.modal_signature} supportedOrientations={['landscape']} transparent>


          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            ratio={'4:4'}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status, recordAudioPermissionStatus }) => {
              if (status !== 'READY') return <PendingView />;
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                  <TouchableOpacity onPress={() => this.takePicture_sign(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14, }}> Click here </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>

        </Modal>


        {/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} right={right} title="Delivery Details" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: Colors.textBackgroundColor, padding: MAIN_VIEW_PADDING }}>

            {/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

            <View style={{ backgroundColor: Colors.white, flexGrow: 1, padding: MAIN_VIEW_PADDING }}>

              <View style={{ flexDirection: 'row', marginBottom: SECTION_MARGIN_TOP, }}>
                <CustomText text={'Delivery Address & Reciever Details'} textType={Strings.subtitle} fontWeight={'bold'} />
              </View>


              <CustomText text={'Deliver To'} textType={Strings.subtext} color={Colors.black} />
              <View style={styles.inputview}><CustomText text={this.state.delivery_details.canBeDeliveredTo ? this.state.delivery_details.canBeDeliveredTo : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
              {/* <CustomText text={'Customer Id'} textType={Strings.subtext} color={Colors.black}/>
          <View style={styles.inputview}><CustomText text={this.state.delivery_details.customerId ? this.state.delivery_details.customerId : Strings.na} textType={Strings.subtext} color={Colors.black}/></View> */}
              <CustomText text={'Mobile No.'} textType={Strings.subtext} color={Colors.black} />
              <View style={styles.inputview}><CustomText text={this.state.delivery_details.contactPersonNumber ? this.state.delivery_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
              <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black} />
              <View style={styles.inputview}><CustomText text={this.state.delivery_details.addressLine1 ? this.state.delivery_details.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
              <CustomText text={'Address'} textType={Strings.subtext} color={Colors.black} />
              <View style={styles.inputviewaddress}>
                <CustomText text={this.state.delivery_details.addressLine1 ? this.state.delivery_details.addressLine1 : Strings.na} textType={Strings.subtext} color={Colors.black} />
                <CustomText text={this.state.delivery_details.addressLine2 ? this.state.delivery_details.addressLine2 : Strings.na} textType={Strings.subtext} color={Colors.black} />
                <CustomText text={this.state.delivery_details.city ? this.state.delivery_details.city : Strings.na} textType={Strings.subtext} color={Colors.black} />
              </View>
            </View>


            {/*/////////////////////////// Order Details //////////////////////////////////////////////// */}

            <View style={{ backgroundColor: Colors.white, flexGrow: 1, padding: 10 }}>
              <View style={{ backgroundColor: Colors.signBackgroundColor, flexGrow: 1, padding: MAIN_VIEW_PADDING }}>

                <View style={{ flexDirection: 'row', marginBottom: SECTION_MARGIN_TOP, }}>
                  <CustomText text={'Order Details'} textType={Strings.subtitle} fontWeight={'bold'} />
                </View>

                {/* <CustomText text={'Serial No.'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.serialId ? this.state.delivery_details.serialId : Strings.na} textType={Strings.subtext} color={Colors.black} /></View> */}
                <CustomText text={'Order No.'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.preDefinedOrderId ? this.state.delivery_details.preDefinedOrderId : this.state.delivery_details.orderId ? this.state.delivery_details.orderId : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
                <CustomText text={'Date And Time'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.date ? this.state.delivery_details.date : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
                <CustomText text={'Seller ID'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.sellerId ? this.state.delivery_details.sellerId : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
                <CustomText text={'Delivery Type'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.deliveryType ? this.state.delivery_details.deliveryType : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
                <CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.creditAllowed ? this.state.delivery_details.creditAllowed : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
                <CustomText text={'Location'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.localBodyType ? this.state.delivery_details.localBodyType : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>
                <CustomText text={'Proof to be produced'} textType={Strings.subtext} color={Colors.black} />
                <View style={styles.inputview2}><CustomText text={this.state.delivery_details.proofToBeProduced ? this.state.delivery_details.proofToBeProduced : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>

                <CustomText text={'Package Details'} textType={Strings.subtext} color={Colors.black} />
                <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-between' }}>
                  <CustomText text={'No. of Pieces'} textType={Strings.subtext} color={Colors.black} />
                  <CustomText text={'Scanned Pieces'} textType={Strings.subtext} color={Colors.black} />
                </View>
                <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}><View style={styles.inputview2}><CustomText text={this.state.delivery_details.nopieces ? this.state.delivery_details.nopieces : Strings.na} textType={Strings.subtext} color={Colors.black} /></View></View>
                  <View style={{ flex: 1, marginLeft: SECTION_MARGIN_TOP }}><View style={styles.inputview2}><CustomText text={this.state.delivery_details.scanned ? this.state.delivery_details.scanned : Strings.na} textType={Strings.subtext} color={Colors.black} /></View></View>
                </View>
                <CustomButton title={'Scan Pieces'} backgroundColor={Colors.darkSkyBlue} marginTop={SECTION_MARGIN_TOP} />

              </View>
            </View>

            {/* //////////////////////////////////////proof////////////////////////////////////////////////////// */}


            <View style={{
              justifyContent: "center", alignItems: "center"
            }}>
              <Modal
                transparent={true}

                visible={this.state.modalVisibleProof}
                backdropOpacity={0.1}

                style={styles.model}
              //  animationIn={"fadeIn"}
              //  animationOut={"fadeOut"}
              >
                <View style={{
                  height: 150, width: 300, justifyContent: "center", alignItems: "center",
                  backgroundColor: "white", borderRadius: 7
                }}>
                  <View>
                    <CustomText text={'Select type of orders'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} />
                    <View style={{ flexDirection: "row" }}>
                      <CustomButton title={'Camera'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.setState({ modal_proof: true })} />

                      <CustomButton title={'Gallery'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.pin_search(this.state.picode_search)} />

                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            {/* //////////////////////////////////////signature////////////////////////////////////////////////////// */}


            <View style={{
              justifyContent: "center", alignItems: "center"
            }}>
              <Modal
                transparent={true}

                visible={this.state.modalVisibleSignature}
                backdropOpacity={0.1}

                style={styles.model}
              //  animationIn={"fadeIn"}
              //  animationOut={"fadeOut"}
              >
                <View style={{
                  height: 150, width: 300, justifyContent: "center", alignItems: "center",
                  backgroundColor: "white", borderRadius: 7
                }}>
                  <View>
                    <CustomText text={'Select type of orders'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} />
                    <View style={{ flexDirection: "row" }}>
                      <CustomButton title={'Camera'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.modalvisible()} />

                      <CustomButton title={'Gallery'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.pin_search(this.state.picode_search)} />

                    </View>
                  </View>
                </View>
              </Modal>
            </View>






            {/*////////////////////// Proof Upload Block //////////////////////////////////////////////// */}

            {(this.state.delivery_details.deliveryStatus == 'ASSIGNED') && (<View>

              <View style={{ backgroundColor: Colors.white, flex: 10, flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, padding: MAIN_VIEW_PADDING, alignItems: 'center', }}>
                <CustomText text={'Proof Upload & Receiver Signature'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              </View>



              <View style={{ backgroundColor: Colors.white, flexGrow: 1, paddingLeft: MAIN_VIEW_PADDING, paddingRight: MAIN_VIEW_PADDING, paddingBottom: MAIN_VIEW_PADDING }}>

                <CustomText text={'Proof Upload'} textType={Strings.subtext} color={Colors.black} />

                <View style={{ height: ADDRESS_FIELD_HEIGHT, backgroundColor: Colors.lightBackgroundColor, borderColor: Colors.lightborderColor, borderWidth: 0.5, alignItems: 'center' }}>
                  <Image
                    style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                    source={{ uri: this.state.proof_img ? this.state.proof_img : '' }}
                  />
                  {/* <Button onPress={() => this.setState({modal_proof:true})} transparent>
              <Icon name='ios-camera' style={{fontSize:CAMERA_SIZE,flex:1,marginTop:SECTION_MARGIN_TOP}}/>
              </Button> */}
                </View>
                <CustomButton title={'Capture Proof Photo'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} borderColor={Colors.darkSkyBlue} borderWidth={1} marginTop={1} fontSize={14} onPress={() => this.setState({ modal_proof: true })} />


                <View style={{ height: ADDRESS_FIELD_HEIGHT, backgroundColor: Colors.lightBackgroundColor, borderColor: Colors.lightborderColor, borderWidth: 0.5, alignItems: 'center', flex: 1, marginTop: SECTION_MARGIN_TOP }}>
                  <Image
                    style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                    source={{ uri: this.state.sign_img ? this.state.sign_img : '' }}
                  />
                  {/* <Button onPress={() => this.setState({modal_signature:true})} transparent>
              <Icon name='ios-camera' style={{fontSize:CAMERA_SIZE,flex:1,marginTop:SECTION_MARGIN_TOP}}/>
              </Button> */}
                </View>
                <CustomButton title={'Capture Signature'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} borderColor={Colors.darkSkyBlue} borderWidth={1} marginTop={1} fontSize={14} onPress={() => this.setState({ modal_signature: true })} />

                {/* <View style={{height:ADDRESS_FIELD_HEIGHT,backgroundColor:Colors.lightBackgroundColor,borderColor:Colors.lightborderColor,borderWidth:0.5,alignItems:'center',flex:1,marginTop:SECTION_MARGIN_TOP}}>
              <Icon name='ios-camera' style={{fontSize:CAMERA_SIZE,flex:1,marginTop:SECTION_MARGIN_TOP}}/>
          </View>
          <CustomButton title={'Capture Signature'} text_color={Colors.darkSkyBlue} backgroundColor={Colors.white} borderColor={Colors.darkSkyBlue} borderWidth={1} marginTop={1} fontSize={14} />

          <CustomText  text={'Receiver Signature'} textType={Strings.subtext} color={Colors.black} mTop={SECTION_MARGIN_TOP}/>
<View style={{ backgroundColor:Colors.signBackgroundColor,height:SIGNATURE_VIEW_HEIGHT,}}></View> */}

                <CustomButton title={'Upload'} backgroundColor={Colors.darkSkyBlue} onPress={() => this.delivery_proof_upload()} />

              </View>

            </View>)}

            {/*////////////////////// Total & Payment Block //////////////////////////////////////////////// */}
            {this.state.delivery_details.deliveryStatus == 'ASSIGNED' && (<View>
              {this.state.delivery_details.payableByReceiver > 0 && (<View>
                <View style={{ backgroundColor: Colors.white, flex: 10, flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, padding: MAIN_VIEW_PADDING, alignItems: 'center', }}>
                  <CustomText text={'Total & Payment'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />

                </View>
                <View style={{ backgroundColor: Colors.white, flexGrow: 1, paddingLeft: MAIN_VIEW_PADDING, paddingRight: MAIN_VIEW_PADDING, paddingBottom: MAIN_VIEW_PADDING }}>

                  <View style={{ height: 250 }}>
                    <Grid ><Col><CustomText text={'Delivery Charge'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><View style={styles.inputview}><CustomText text={this.state.delivery_details.originalDeliveryCharge} textType={Strings.subtext} color={Colors.black} /></View></Col></Grid>
                    <Grid ><Col><CustomText text={'Package Allowed'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><View style={styles.inputview}><CustomText text={this.state.delivery_details.deliveryChargePackageDeduction} textType={Strings.subtext} color={Colors.black} /></View></Col></Grid>
                    <Grid><Col><CustomText text={'Credit Allowed'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><View style={styles.inputview}><CustomText text={this.state.delivery_details.deliveryChargeCreditDeduction} textType={Strings.subtext} color={Colors.black} /></View></Col></Grid>
                      <Grid><Col><CustomText text={'Final COD'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><View style={styles.inputview}><CustomText text={this.state.delivery_details.finalCodCharge} textType={Strings.subtext} color={Colors.black} /></View></Col></Grid>      
                    <Grid><Col><CustomText text={'Total Amount'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><View style={styles.inputview}><CustomText text={this.state.delivery_details.deliveryChargeAfterDeductions} textType={Strings.subtext} color={Colors.black} /></View></Col></Grid>
                    <Grid><Col><CustomText text={'Reciever Payment'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><View style={styles.inputview}><CustomText text={this.state.delivery_details.payableByReceiver} textType={Strings.subtext} color={Colors.black} /></View></Col></Grid>
                  </View>

                  <CustomText text={'Payment Method'} textType={Strings.subtitle} flex={9} />
                  <CustomDropdown data={myArray2} height={TEXT_FIELD_HIEGHT} borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} />

                  <View style={{ marginTop: SECTION_MARGIN_TOP, height: ADDRESS_FIELD_HEIGHT }}>
                    <Grid><Col><CustomText text={'Amount Recieved'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><CustomInput flex={1} keyboardType={"number-pad"} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) => { this.balanceCalculate(text); this.setState({ amount_recieved: text, errorTextamount_recieved: '' }) }} value={this.state.amount_recieved} />
                      </Col></Grid>
                    {!!this.state.errorTextamount_recieved && (<Text style={{ color: 'red' }}>{this.state.errorTextamount_recieved}</Text>)}

                    <Grid><Col><CustomText text={'Balance Amount'} textType={Strings.subtext} color={Colors.black} /></Col>
                      <Col><CustomInput flex={1} value={this.state.balance_amount} /></Col></Grid>
                  </View>
                  <CustomButton title={'Update'} backgroundColor={Colors.darkSkyBlue} onPress={() => this.delivery_cash_payment()} />
                </View>

              </View>)}
            </View>)}

        
            {/* /////////////////////////////////////////////////////////   change with isPreDefinedOrderWithPin true case ///////////////////////////// */}
          
              
                <View style={{ flexDirection: 'row', }}>
                 {ispredefined==false&& <CustomRadioButton title={'Same as delivery details'} selectedColor={Colors.darkSkyBlue} selected={this.state.same} onPress={() => this.isSelected(1)} />}
                  <CustomRadioButton title={'Alternative number'} padding={12} selectedColor={Colors.darkSkyBlue} selected={this.state.altno} onPress={() => this.isSelected(2)} />
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <CustomRadioButton title={'Different person'} selectedColor={Colors.darkSkyBlue} selected={this.state.diffperson} onPress={() => this.isSelected(3)} />
                </View>
                {/* //////////////////////////////same person//////////////////////////// */}
                {ispredefined == false?
                <View>
                {this.state.same === true && (<View>
                  <CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black} />
                  <View style={styles.inputview1}><CustomText text={this.state.receiver_name ? this.state.receiver_name : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>

                  {!!this.state.errorTextreceiver_name && (<Text style={{ color: 'red' }}>{this.state.errorTextreceiver_name}</Text>)}
                  <View style={styles.input}>
                    <View style={styles.inputview4} ><CustomText text={this.state.delivery_details.contactPersonNumber ? this.state.delivery_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black} width={150} /></View>
                    <View style={{ flex: 3 }}><CustomButton title={'SEND OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.send_otp()} /></View>
                  </View>
                  {!!this.state.errorTextmobile && (<Text style={{ color: 'red' }}>{this.state.errorTextmobile}</Text>)}

                  <View style={styles.input}>
                    <View style={{ flex: 5 }}><CustomInput backgroundColor={Colors.white} flex={1} keyboardType={'number-pad'} placeholder={'Enter OTP'} onChangeText={(text) => this.setState({ otp: text, errorTextverify: "" })} value={this.state.otp} /></View>
                    {this.state.otp_verified === false && (<View style={{ flex: 3 }}><CustomButton title={'VERIFY OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.verify_otp(this.state.otp)} /></View>)}
                  </View>
                  {!!this.state.errorTextverify && (<Text style={{ color: 'red' }}>{this.state.errorTextverify}</Text>)}
                </View>)}
                </View>
  
:
undefined}
                {/* /////////////////////////////////alternative no/////////////////////////////// */}
                {this.state.altno === true && (<View>
                  <CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black} />

                  <View style={styles.inputview1}><CustomText text={this.state.receiver_name ? this.state.receiver_name : Strings.na} textType={Strings.subtext} color={Colors.black} /></View>

                  {!!this.state.errorTextreceiver_name && (<Text style={{ color: 'red' }}>{this.state.errorTextreceiver_name}</Text>)}
                  <View style={styles.input}>
                    <View style={{ flex: 6 }}><CustomInput backgroundColor={Colors.white} flex={1} maxLength={12} keyboardType={'phone-pad'} placeholder={'Mobile Number'} onChangeText={(text) => this.setState({ mobile: text, errorTextmobile: "" })} value={this.state.mobile} /></View>
                    <View style={{ flex: 3 }}><CustomButton title={'SEND OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.send_otp()} /></View>
                  </View>
                  {!!this.state.errorTextmobile && (<Text style={{ color: 'red' }}>{this.state.errorTextmobile}</Text>)}

                  <View style={styles.input}>
                    <View style={{ flex: 5 }}><CustomInput backgroundColor={Colors.white} flex={1} keyboardType={'number-pad'} placeholder={'Enter OTP'} onChangeText={(text) => this.setState({ otp: text, errorTextverify: "" })} value={this.state.otp} /></View>
                    {this.state.otp_verified === false && (<View style={{ flex: 3 }}><CustomButton title={'VERIFY OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.verify_otp(this.state.otp)} /></View>)}
                  </View>
                  {!!this.state.errorTextverify && (<Text style={{ color: 'red' }}>{this.state.errorTextverify}</Text>)}
                </View>)}
                {/* ////////////////////////////////different person//////////////////////////////// */}

                {this.state.diffperson === true && (<View>
                  <CustomText text={'Receiver Name'} textType={Strings.subtext} color={Colors.black} />
                  <CustomInput flex={1} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({ receiver_name: text, errorTextreceiver_name: '' })} value={this.state.receiver_name} />
                  {!!this.state.errorTextreceiver_name && (<Text style={{ color: 'red' }}>{this.state.errorTextreceiver_name}</Text>)}

                  <View style={styles.input}>
                    <View style={styles.inputview4} >
                      {/* <CustomText text={this.state.delivery_details.contactPersonNumber ? this.state.delivery_details.contactPersonNumber : Strings.na} textType={Strings.subtext} color={Colors.black} width={150} /> */}
                      <CustomInput backgroundColor={Colors.white} flex={1} maxLength={12} keyboardType={'phone-pad'} placeholder={'Mobile Number'} onChangeText={(text) => this.setState({ mobile: text, errorTextmobile: "" })} value={this.state.mobile} />
                    </View>
                    <View style={{ flex: 3 }}><CustomButton title={'SEND OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.send_otp()} /></View>
                  </View>
                  {!!this.state.errorTextmobile && (<Text style={{ color: 'red' }}>{this.state.errorTextmobile}</Text>)}

                  <View style={styles.input}>
                    <View style={{ flex: 5 }}><CustomInput backgroundColor={Colors.white} flex={1} keyboardType={'number-pad'} placeholder={'Enter OTP'} onChangeText={(text) => this.setState({ otp: text, errorTextverify: "" })} value={this.state.otp} /></View>
                    {this.state.otp_verified === false && (<View style={{ flex: 3 }}><CustomButton title={'VERIFY OTP'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={() => this.verify_otp(this.state.otp)} /></View>)}
                  </View>
                  {!!this.state.errorTextverify && (<Text style={{ color: 'red' }}>{this.state.errorTextverify}</Text>)}
                </View>)}

    {/*////////////////////// Order Status Block //////////////////////////////////////////////// */}


    {this.state.delivery_details.deliveryStatus == 'ASSIGNED' && (<View>
              <View style={{ backgroundColor: Colors.white, flex: 10, flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, padding: MAIN_VIEW_PADDING, alignItems: 'center', }}>
                <CustomText text={'Status Update'} textType={Strings.subtitle} flex={9} fontWeight={'bold'} />
              </View>
              <View style={{ backgroundColor: Colors.white, flexGrow: 1, paddingLeft: MAIN_VIEW_PADDING, paddingRight: MAIN_VIEW_PADDING, paddingBottom: MAIN_VIEW_PADDING }}>

                <CustomText text={'Status'} textType={Strings.maintext} />
                <CustomDropdown data={myArray} height={TEXT_FIELD_HIEGHT} borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value, index, data) => { this.setState({ status: data[index]['name'] }) }} value={this.state.status} />

                {this.state.status == 'ATTEMPT_FAILED' && (<View><CustomText text={'Reason/Remark'} textType={Strings.maintext} />
                  <CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT} borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value, index, data) => { if (index == (data.length) - 1) { this.setState({ modal_visible: true }); } else { this.setState({ reason_val: value }) } }} value={this.state.reason_val} />
                </View>)}
                <CustomButton title={'Update'} backgroundColor={Colors.darkSkyBlue} onPress={() => this.delivery_status_update()} />
              </View>
            </View>)}


            <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={() => this.update_receiver_name()} />

            <View style={{ alignItems: 'flex-end', marginTop: SECTION_MARGIN_TOP }}><CustomText text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </ScrollView>
      </Container>
    );

  }
}

const styles = StyleSheet.create({
  modalview: {
    margin: SECTION_MARGIN_TOP,
    padding: SECTION_MARGIN_TOP,
    maxWidth: '60%',
    minWidth: '60%',
  },
  modalview1: {
    padding: 10,
    backgroundColor: Colors.white,
    marginTop: 20,
    marginRight: 20
  },
  // modalview1 :{
  //     maxWidth:'60%',
  //     minWidth:'60%',
  //   },
  iconstyle: {
    position: 'absolute',
    marginLeft: 250,
    color: 'black',
    fontSize: 22,
    marginTop: 5
  },
  evenrowtext: {
    fontSize: 14,
    color: Colors.subTextColor,
    backgroundColor: Colors.textBackgroundColor,
    paddingLeft: 10,
    paddingTop: 5,
    height: 30,
    borderRadius: 5
  },
  oddrowtext: {
    fontSize: 14,
    color: Colors.subTextColor,
    borderColor: Colors.gray,
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 5,
    height: 30,
    borderRadius: 5
  },
  inputview: {
    backgroundColor: Colors.textBackgroundColor,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  inputview4: {
    backgroundColor: Colors.textBackgroundColor,
    height: 40,
    width: 200,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  inputview1: {
    backgroundColor: Colors.white,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  inputviewaddress: {
    backgroundColor: Colors.textBackgroundColor,
    height: 120,
    alignItems: 'flex-start',
  },
  inputview2: {
    backgroundColor: Colors.textBackgroundColor1,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  container: {
    marginTop: 50,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  input: {
    flexDirection: 'row',
    borderColor: Colors.borderColor,
    borderWidth: SHORT_BORDER_WIDTH,
    borderRadius: SHORT_BORDER_RADIUS,
    padding: 1, alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SECTION_MARGIN_TOP,
  },

});

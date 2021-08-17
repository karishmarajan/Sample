import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, AsyncStorage, FlatList, Alert, Dimensions, TextInput, BackHandler, Vibration } from 'react-native';
import { Container, Text, View, Button, Icon, Left, Toast, Grid, Col, Right, Body, Card, CardItem, } from 'native-base';
import { Actions } from 'react-native-router-flux';



import CustomInput from '../../component/CustomInput';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
//import CustomTouchable from '../component/CustomTouchable';
import Modal from 'react-native-modal';

import CustomButton from '../../component/CustomButton';

import { ORDER_BLOCK, TEXT_PADDING_RIGHT, SECTION_MARGIN_TOP, TEXT_PADDING_LEFT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, SHORT_BORDER_RADIUS, MAIN_VIEW_PADDING, BORDER_WIDTH, SHORT_BORDER_WIDTH, ADDRESS_FIELD_HEIGHT, SHORT_BUTTON_HEIGHT, TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT, TEXT_MARGIN_TOP, NORMAL_FONT, COLUMN_PADDING, AMOUNT_BLOCK_HIEGHT, SECOND_FONT, LOGIN_FIELD_HEIGHT, FOURTH_FONT, CLOSE_SIZE, CLOSE_WIDTH } from '../../constants/Dimen';
import CustomText from '../../component/CustomText';

import session, { KEY, KEY1 } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { ROUTE_FINDER, ORDER, PREORDER_PIN } from '../../constants/Api';
import { Color } from 'chalk';
import { RNCamera } from 'react-native-camera';

const { height, width } = Dimensions.get('window');
const maskRowHeight = Math.round((height - 300) / 20);
const maskColWidth = (width - 300) / 2;


export default class RouteFinderView extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      },
    loader: false,
    pinc: '',
    pincode: '',
    pin: '',
    orderid: '',
    locpickup: true,
    locdes: false,
    selectedoption: '',
    routeid: '',
    novalue: false,
    routename: [],
    datafound: false,
    orderstatus: '',
    cammodal: false,
    pickupPincode: '',
    deliveryPincode: '',
    destinations: [],
    officeinfo: [],
    route: [],
    hasError: false,
    errorTextuser: '',
    errorTextpass: '',
    modalvisible: true,
    alert_visible: false,
    

  }}
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

  _header = () => {
    const {locdes}=this.state;
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderTopWidth: 0.3, borderLeftWidth: 0.3, marginTop: 6 }}>

        <View style={styles.cell}><CustomText text={'ROUTE ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={locdes==true?"Destination Location":"Pickup Location"} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'NO. OF DESTINATION POINTS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} /></View>

      </View>
    )
  }



  _body = (item) => {
  
    return (


      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderLeftWidth: 0.3 }}>

        <View style={styles.cell}><CustomText text={item.routeId ? item.routeId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.routeName ? item.routeName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.noOfDestinations ? item.noOfDestinations : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      </View>

    )
  }

  onBarCodeRead(scanResult) {
  /*   console.warn(scanResult.type);
    console.warn(scanResult.data); */
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data);
        Vibration.vibrate(100);
        this.setState({ cammodal: false,
          // predefinedpin: scanResult.data 
          })
        console.log("Barcode Details=========>")
        this.setState({orderid:scanResult.data})
       // console.warn( scanResult.data);
       /*  Toast.show({text:scanResult.data,type:'success'}) */
      }
      else{
        Vibration.vibrate(100);
        this.setState({ cammodal: false,
          // predefinedpin: scanResult.data 
          })
        console.log("Barcode Details=========>")
        this.setState({orderid:scanResult.data})
       // console.warn( scanResult.data);
       /*  Toast.show({text:scanResult.data,type:'warning'}) */
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
  fetch_route(pincode) {

    Api.fetch_request(ROUTE_FINDER + pincode, 'GET', '')
      .then(result => {

        if (result.error != true) {
          this.setState({ route: result.payload, datafound: true })
          console.log('ROUTE :', this.state.route);
          // console.log('Success:', JSON.stringify(result));
          var count = (result.payload.routeResponse).length;

          console.log(count);
          let routeid = [];
          let routename = [];
          let destinations = [];
          console.log('Success55555555:', JSON.stringify(this.state.route.routeResponse[0].routeId));
          
          let officeinfo = [];


          console.log('ROUTE INFO :', this.state.routeinfo);
          var datas = [];
          for (var i = 0; i < count; i++) {
            // routeid.push({ value: result.payload.routeResponse[i].routeId  });
            // routename.push({ value: result.payload.routeResponse[i].routeName  });
            // destinations.push({ value: result.payload.routeResponse[i].noOfDestinations  });
            // console.log('Success:',routeid[i].value+routename[i].value+destinations[i].value);
            var responce = {
              routeId: result.payload.routeResponse[i].routeId,
              routeName: result.payload.routeResponse[i].routeName,
              noOfDestinations: result.payload.routeResponse[i].noOfDestinations,
            }
            datas.push(responce);
          }
          var offiinfo = {
            officeid: result.payload.officeResponse.officeId,
            officename: result.payload.officeResponse.officeName,
            officeaddress1: result.payload.officeResponse.addressLine1,
            officeaddress2: result.payload.officeResponse.addressLine2,
            officedistrict: result.payload.officeResponse.district.districtName,
            officecity: result.payload.officeResponse.city.cityName,
            mobileNumber: result.payload.officeResponse.mobileNumber,
            pincode:result.payload.officeResponse.pincode,
            routeResponse: datas,
          }
          officeinfo.push(offiinfo);
          this.setState({
            officeinfo: officeinfo
          });
          //  this.setState({ routename:routename });
          //  this.setState({ destinations:destinations });

          console.log('Success:', (routeid[1] + routename[1] + destinations[1]));

        }
        else {
          this.setState({ datafound: false, orderid: '', pin: '', officeinfo: '', route: '', })
          console.log('Failed');
          Toast.show({ text: "Enter a valid pincode!", type: 'warning' });
          return;
        }
      })
  }

  Find = () => {

    const { orderid, locdes, locpickup, } = this.state;
    if (orderid == '') {
      this.setState({ novalue: true, orderid: '' });
      Toast.show({ text: "Please enter Order ID", type: 'warning' })
    }
    else if (isNaN(orderid) == false) {
      Api.fetch_request(ORDER + "/" + orderid, 'GET', '')
        .then((responce) => {
          if (responce.error == false) {
            if (locpickup == true) {

              console.log(responce.payload.pickupPincode);
              this.setState({
                pickupPincode: responce.payload.pickupPincode,
                orderstatus: responce.payload.orderStatus,


              })
              this.fetch_route(responce.payload.pickupPincode)

            }
            else {

              console.log(responce.payload.deliveryPincode);
              this.setState({
                deliveryPincode: responce.payload.deliveryPincode,
                orderstatus: responce.payload.orderStatus,

              })
              this.fetch_route(responce.payload.deliveryPincode)
            }

          }
          else {
            Toast.show({ text: 'Sorry No Order Found!', type: 'warning' })
          }

        });
      /*  if(locpickup==true)
       {
         console.log("PICKUp:",pickupPincode)
       this.fetch_route(pickupPincode)
       } */


    }
    else {
      Api.fetch_request(PREORDER_PIN + orderid, 'GET', '')
        .then((responce) => {
          if (responce.error == false) {
            console.log("res==>", responce)
            if (responce.payload.orderId == null) {
              Toast.show({ text: 'Sorry No Order Found!', type: 'warning' })
            }
            else {
              Api.fetch_request(ORDER + "/" + responce.payload.orderId, 'GET', '')
                .then((responce) => {
                  if (responce.error == false) {
                    if (locpickup == true) {

                      console.log(responce.payload.pickupPincode);
                      this.setState({
                        pickupPincode: responce.payload.pickupPincode,
                        orderstatus: responce.payload.orderStatus

                      })
                      this.fetch_route(responce.payload.pickupPincode)

                    }
                    else {

                      console.log(responce.payload.deliveryPincode);
                      this.setState({
                        deliveryPincode: responce.payload.deliveryPincode,
                        orderstatus: responce.payload.orderStatus,

                      })
                      this.fetch_route(responce.payload.deliveryPincode)
                    }

                  }
                  else {
                    Toast.show({ text: 'Sorry No Order Found!', type: 'warning' })
                  }

                });
            }
          }
          else {
            Toast.show({ text: 'Sorry No Order Found!', type: 'warning' })
          }
        })


    }
  }

  render() {
    const { selectedoption, locpickup, locdes } = this.state;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => {
          console.log("hello")
          Actions.dashboard();
          Actions.routefinder();

        }} transparent>
          <Icon style={{ color: Colors.navbarIconColor, fontSize: CLOSE_SIZE }} name='ios-close' />
        </Button>
      </Left>
    );
    var left2 = (
      <Left style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => {
           this.setState({ datafound: "", orderid: "", pin: '', officeinfo: '', route: '',cammodal:false })
        }} transparent>
          <Icon style={{ color: Colors.navbarIconColor, fontSize: CLOSE_SIZE }} name='ios-close' />
        </Button>
      </Left>
    );
    var left1 = (
      <Left style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => {
          console.log("hello")
          this.setState({ datafound: "", orderid: "", pin: '', officeinfo: '', route: '', })
        }} transparent>
          <Icon style={{ color: Colors.navbarIconColor, fontSize: CLOSE_SIZE }} name='ios-close' />
        </Button>
      </Left>
    );
    return (
      <View style={styles.container}>
        {this.state.cammodal==true?
        <View style={styles.container} >
           <Navbar title="Scanner" left={left2} />
          <RNCamera
        ref={cam => {
          this.camera = cam;
        }}
        defaultTouchToFocus
        onFocusChanged={() => {}}
        flashMode={this.state.camera.flashMode}
        mirrorImage={false}
        onBarCodeRead={this.onBarCodeRead.bind(this)}
        style={styles.cameraView}
       /*  aspect={RNCamera.constants.Aspect.fill} */
        playSoundOnCapture
      >
        <View style={styles.maskOutter}>
          <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
           <View style={[{ flex: 30 }, styles.maskCenter]}>
           <View style={[{ width: maskColWidth }, styles.maskFrame]} />
           <View style={styles.maskInner} />
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
        </View>
      <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
    </View>
      </RNCamera>
          </View>


        :
        this.state.datafound == true ?

          <View style={{ width: width, height: height }}>
            <Navbar title="Result" left={left1} />
            <View style={{
              flex: 1,
              backgroundColor: Colors.white,
              justifyContent: 'center',
              width: width,
              // alignItems:'center',
              alignSelf: 'center',
              alignContent: 'center',
              marginTop: 20
            }}>



              <ScrollView>
                <FlatList

                  data={this.state.officeinfo}
                  style={{marginBottom:'15%'}}
                  {...console.log('FLAT INFO :', this.state.officeinfo)}
                  horizontal={false}
                  
                  renderItem={({ item, index }) => (
                    <ScrollView horizontal={true}>
                      <View style={{ borderBottomWidth: 0.3, width: width - 10, marginLeft: 5, borderLeftWidth: 0.3, borderTopWidth: 0.3, borderRightWidth: 0.3, }} >

                        <View style={{ borderBottomWidth: 0.3 }} ><CustomText text={'Office Details'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>


                        <CardItem style={{padding:2}}><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Order ID"}</Text></Left><Body><Text>
                            {': ' + (this.state.orderid ? this.state.orderid : Strings.na)}</Text></Body>
                        </CardItem>
                        <CardItem><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Order Status"}</Text></Left><Body><Text>
                            {': ' + (this.state.orderstatus ? this.state.orderstatus : Strings.na)}</Text></Body>
                        </CardItem>
                       
                        <CardItem ><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Pincode "} </Text></Left><Body><Text>
                            {': ' + (item.pincode ? item.pincode : Strings.na)}</Text></Body>
                        </CardItem>
                        <CardItem ><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Office ID"} </Text></Left><Body><Text>
                            {': ' + (item.officeid ? item.officeid : Strings.na)}</Text></Body>
                        </CardItem>
                        <CardItem><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Office Name"} </Text></Left><Body><Text>
                            {': ' + (item.officename ? item.officename : Strings.na)}</Text></Body>
                        </CardItem><CardItem><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Address"} </Text></Left><Body><Text>
                            {': ' + (item.officeaddress1 ? item.officeaddress1 : Strings.na) +
                              (item.officeaddress2 ? "," + item.officeaddress2 : Strings.na)}</Text></Body>
                        </CardItem>
                        <CardItem><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Location"}</Text></Left><Body><Text>
                            {': ' + (item.officecity ? item.officecity : Strings.na) + (item.officedistrict ? "," + item.officedistrict : Strings.na)}</Text></Body>
                        </CardItem><CardItem><Left><Text style={{ fontWeight: 'bold' }}>
                          {"Mobile number"} </Text></Left><Body><Text>
                            {': ' + (item.mobileNumber ? item.mobileNumber : Strings.na)}</Text></Body>
                        </CardItem>



                        <FlatList
                        horizontal={false}
                          ListHeaderComponent={this._header}
                          data={item.routeResponse}
                        
                          renderItem={({ item, index }) => this._body(item)}
                        />
                      </View>
                    </ScrollView>
                  )}
                />
              </ScrollView>

            </View>
          </View>

          :
          <View>
            <Navbar title="Route finder" left={left} />
            <View style={{
              backgroundColor: Colors.lightBackgroundColor,
              width: width,
              height: height
            }}>
              <Text style={{
                fontWeight: 'bold',
                padding: 10,
                marginTop: height / 3.5,
                color: Colors.subTextColor
              }}>
                Enter Order ID:
              </Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 6,
                borderColor: this.state.novalue ? 'red' : Colors.borderColor,
                borderWidth: 1

              }}>
                <TextInput
                  onChangeText={(text) => this.setState({ orderid: text.trimLeft(), novalue: false })}
                  value={this.state.orderid}
                  placeholder={'Order Id'}
                  style={{
                    padding: 10,
                    borderRadius: 6,
                    width: '80%',
                    color: Colors.subTextColor,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',

                  }}
                />
                <TouchableOpacity 
                onPress={()=>this.setState({cammodal:true})}
                >
                  <Icon name={'barcode-scan'}
                    type={'MaterialCommunityIcons'}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{
                width: width,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
                <TouchableOpacity
                  onPress={() => this.setState({ locdes: false, locpickup: true })}
                >
                  <View style={{
                    flexDirection: 'row',
                    marginRight: 10

                  }}

                  >
                    <Icon
                      style={{
                        color: 'black',
                        marginRight: 5
                      }}
                      type={'Ionicons'}
                      name={locpickup ? 'radio-button-on' : 'radio-button-off'}
                    />
                    <Text style={{
                      color: Colors.subTextColor,
                      fontWeight: 'bold'
                    }}>
                      Pickup
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ locdes: true, locpickup: false })}
                >
                  <View style={{
                    flexDirection: 'row'
                  }}>
                    <Icon
                      style={{
                        color: 'black',
                        marginRight: 5
                      }}
                      type={'Ionicons'}
                      name={locdes ? 'radio-button-on' : 'radio-button-off'}
                    />
                    <Text style={{
                      color: Colors.subTextColor,
                      fontWeight: 'bold'
                    }}>
                      Destination
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height / 16,
                alignSelf: 'center',
                borderRadius: 10,
                padding: 5,
                backgroundColor: Colors.buttonBackgroundColor
              }}
                onPress={() => this.Find()}
              >
                <Text style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '2.5%',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: Colors.buttonTextColor
                }}>
                  Find
                </Text>
              </TouchableOpacity>
            </View>
   </View>

        }
      </View>
    )
  }
}
const styles = StyleSheet.create({

  header: {
    backgroundColor: Colors.aash,

  },
  cell: {
    width: width / 3,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,


  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor:'rgba(0,0,0,0.9)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
  container: {
    flex: 1,
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: .5,
  },
  maskFrame: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },

  cell1: {
    width: 50,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,


  },
  cell2: {
    width: '100%',
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,


  },

  body: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: COLUMN_PADDING,
    paddingRight: COLUMN_PADDING,
    borderBottomWidth: 5,
    borderColor: Colors.textBackgroundColor1,

  },
  

});
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, AsyncStorage, FlatList, Alert, Dimensions, TextInput, BackHandler, Vibration, ActivityIndicator } from 'react-native';
import { Container, Text, View, Button, Icon, Left, Toast, Grid, Col, Row, Right, Body, Card, CardItem, } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Tts from 'react-native-tts';

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
      orderid2: '',
      officename: '',
      loading: false,
      locpickup: true,
      locdes: false,
      locpickup2: true,
      locdes2: false,
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
      torch_enable:RNCamera.Constants.FlashMode.off,


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
  /* componentDidMount=()=>{
    Tts.speak('Hello, Is This Dijal Tom?', {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  } */

//////////////////////////////  Toggle torch function   ////////////////////////////////////////////////////////////////////

toggleTorch()
{
    let tstate = this.state.torch_enable;
    if (tstate == RNCamera.Constants.FlashMode.off){
       tstate = RNCamera.Constants.FlashMode.torch;
    } else {
       tstate = RNCamera.Constants.FlashMode.off;
    }
    this.setState({torch_enable:tstate})
}

  _result = (item) => {

    /*     var a=this.state.orderid; */

    return (


      <ScrollView horizontal={true}>
        <View style={{ borderBottomWidth: 0.3, width: width - 10, marginLeft: 5, borderLeftWidth: 0.3, borderTopWidth: 0.3, borderRightWidth: 0.3, }} >







          <View style={{ flexDirection: 'row', padding: 5 }}>
            <Left><Text>
              {"ORDER ID :"}</Text></Left>
            {/*  <Body>
              <Text>{"    :"}</Text>
            </Body> */}
            <Right><Text>
              {(this.state.orderid2 ? this.state.orderid2 : Strings.na)}
            </Text></Right>

          </View>


          <View style={{ flexDirection: 'row', padding: 5 }}>
            <Left><Text>
              {"ORDER STATUS :"}</Text></Left>

            {/*   <Body>
              <Text>{':'}</Text>
            </Body> */}

            <Text>
              {(this.state.orderstatus ? this.state.orderstatus : Strings.na)}
            </Text>

          </View>

          {/*  <CardItem ><Left><Text style={{ fontWeight: 'bold' }}>
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
                {': ' + (item.officecity ? item.officecity : Strings.na) + (item.officedistrict ?  " , "  + item.officedistrict : Strings.na)}</Text></Body>
            </CardItem><CardItem><Left><Text style={{ fontWeight: 'bold' }}>
              {"Mobile number"} </Text></Left><Body><Text>
                {': ' + (item.mobileNumber ? item.mobileNumber : Strings.na)}</Text></Body>
            </CardItem>
*/}


          <FlatList
            horizontal={false}
            // ListHeaderComponent={this._header}
            data={item.routeResponse}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({ item, index }) => this._body(item)}
          />
        </View>
      </ScrollView>


    )
  }



  _body = (item) => {
    const { locdes2, locpickup, locpickup2 } = this.state;
    //this.setState({orderid:''})
    Tts.setDefaultPitch(1.12);
    Tts.speak(` ${locpickup2 ? 'PICK UP LOCATION!' : 'DESTINATION LOCATION!'} ROUTE NAME is ${item.routeName ? item.routeName : Strings.na} and OFFICE NAME IS ${this.state.officename ? this.state.officename : Strings.na}`, {
      androidParams: {
        KEY_PARAM_PAN: 1,
        KEY_PARAM_VOLUME: 1,

        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },

    });


    return (
      /*   PICK UP LOCATION FOR THIS ORDER IS */

      <CardItem style={{ flexDirection: 'column', borderBottomWidth: 0.3, borderTopWidth: .3, borderLeftWidth: 0.3 }}>



        <Text style={{ fontWeight: 'bold', textTransform: 'capitalize', textDecorationLine: 'underline', textAlign: 'center', marginBottom: 5, fontSize: 16 }}>
          {locpickup2 ? 'PICK UP LOCATION' : 'DESTINATION LOCATION'}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 17, textTransform: 'uppercase', textAlign: 'center', width: '100%' }}>
          {item.routeName ? item.routeName : Strings.na} - {this.state.officename ? this.state.officename : Strings.na}
        </Text>



        {/*  <View style={styles.cell}><CustomText text={item.routeId ? item.routeId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.routeName ? item.routeName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.noOfDestinations ? item.noOfDestinations : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
      </CardItem>

    )
  }

  onBarCodeRead(scanResult) {
    const { orderid, locpickup } = this.state;
    
    this.setState({cammodal:false})
    if (locpickup) {
      this.setState({ locpickup2: true, locdes2: false })

    }
    else {
      this.setState({ locdes2: true, locpickup2: false })
    }
    /*   console.warn(scanResult.type);
      console.warn(scanResult.data); */
    if (scanResult.data != '') {
      // if (!this.barcodeCodes.includes(scanResult.data)) {
        // this.barcodeCodes.push(scanResult.data);
    
        Vibration.vibrate(100);
   
        setTimeout(()=>{
          this.setState({ orderid: scanResult.data,officeinfo:'',loading:true, novalue: false, orderid2: scanResult.data, })
          this.Find();
        },1000)
        console.log("Barcode Details==   1 =======>", scanResult.data)
    
          
         
 
 
       
        

     
        // console.warn( scanResult.data);
        /*  Toast.show({text:scanResult.data,type:'success'}) */
      }
      else {
         this.setState({loading:false,})
        Toast.show({text:'Order id not found ,please choose anotherone',type:'warning'}) 
      }
    
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
          this.setState({ route: result.payload })
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
            pincode: result.payload.officeResponse.pincode,
            routeResponse: datas,
          }
          officeinfo.push(offiinfo);
          this.setState({ officename: result.payload.officeResponse.officeName })
          setTimeout(() => {
            this.setState({
              officeinfo: officeinfo
            });
          }, 1000)
          //  this.setState({ routename:routename });
          //  this.setState({ destinations:destinations });
       
          console.log('Success:', (routeid[1] + routename[1] + destinations[1]));
          this.setState({
            cammodal: false, loading: false, orderid: '', datafound: true
            // predefinedpin: scanResult.data 
          })
        }
        else {
          this.setState({
            cammodal: false, loading: false
            // predefinedpin: scanResult.data 
          })
          this.setState({ datafound: false, orderid: '', pin: '', officeinfo: '', route: '', })
          console.log('Failed');
          Toast.show({ text: 'Invalid Pincode Found!', type: 'warning' });
          return;
        }
      })
  }

  Find = () => {

    const { orderid, orderid2, locdes, locpickup, } = this.state;
    if (orderid == '') {
      this.setState({ novalue: true, orderid: '', officeinfo: '', loading: false, });
      Toast.show({ text: "Please enter Order ID", type: 'warning' })
    }
    else if (isNaN(orderid) == false) {

      if (locpickup) {
        this.setState({ locpickup2: true, locdes2: false })

      }
      else {
        this.setState({ locdes2: true, locpickup2: false })
      }
      Api.fetch_request(ORDER + "/" + orderid, 'GET', '')
        .then((responce) => {
          this.setState({ orderid2: orderid, orderid: '', novalue: false })
          if (responce.error == false) {
            if (locpickup == true) {

              console.log(responce.payload.pickupPincode);
              this.setState({
                pickupPincode: responce.payload.pickupPincode,
                orderstatus: responce.payload.orderStatus,
                loading: true,


              })
              this.fetch_route(responce.payload.pickupPincode)

            }
            else {

              console.log(responce.payload.deliveryPincode);
              this.setState({
                deliveryPincode: responce.payload.deliveryPincode,
                orderstatus: responce.payload.orderStatus,
                loading: true,

              })
              this.fetch_route(responce.payload.deliveryPincode)
            }

          }
          else {
            this.setState({ loading: false, officeinfo: '', datafound: false, novalue: false })
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
      if (locpickup) {
        this.setState({ locpickup2: true, locdes2: false })

      }
      else {
        this.setState({ locdes2: true, locpickup2: false })
      }
      Api.fetch_request(PREORDER_PIN + orderid, 'GET', '')
        .then((responce) => {
          if (responce.error == false) {
            this.setState({ orderid2: orderid, orderid: '', novalue: false })
            console.log("res==>", responce)
            if (responce.payload.orderId == null) {
              Toast.show({ text: 'Sorry No Order Found!', type: 'warning' })
              this.setState({ loading: false })
            }
            else {
              Api.fetch_request(ORDER + "/" + responce.payload.orderId, 'GET', '')
                .then((responce) => {
                  if (responce.error == false) {
                    if (locpickup == true) {

                      console.log(responce.payload.pickupPincode);
                      this.setState({
                        pickupPincode: responce.payload.pickupPincode,
                        orderstatus: responce.payload.orderStatus,
                        loading: true,

                      })
                      this.fetch_route(responce.payload.pickupPincode)

                    }
                    else {

                      console.log(responce.payload.deliveryPincode);
                      this.setState({
                        deliveryPincode: responce.payload.deliveryPincode,
                        orderstatus: responce.payload.orderStatus,
                        loading: true
                      })
                      this.fetch_route(responce.payload.deliveryPincode)
                    }

                  }
                  else {
                    this.setState({ loading: false, officeinfo: '', datafound: false, novalue: false })
                    Toast.show({ text: 'Sorry No Order Found!', type: 'warning' })
                  }

                });
            }
          }
          else {
            this.setState({ loading: false, officeinfo: '', datafound: false, novalue: false })
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
          this.setState({ datafound: "", orderid: "", pin: '', officeinfo: '', route: '', cammodal: false })
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
    var torch = (
      <Right style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => this.toggleTorch()} transparent>
          <Icon style={{ color:Colors.navbarIconColor,fontSize:22}} name='ios-flash' />
          </Button>
      </Right>
    );
    /*  var right = (
       <Left style={{ flex: 1 ,marginLeft:'20%''}}>
         <Button width={CLOSE_WIDTH} onPress={() => {
           console.log("hello")
          this.setState({cammodal:true})
         }} transparent>
           <Icon style={{ color: Colors.navbarIconColor, fontSize: CLOSE_SIZE }}  type={'MaterialCommunityIcons'}name={'barcode-scan'} />
         </Button>
       </Left>
     ); */
    return (
      <View style={styles.container}>
        {this.state.cammodal == true ?
          <View style={styles.container} >
            <Navbar title="Scanner" left={left2} right={torch} />
            <RNCamera
              ref={cam => {
                this.camera = cam;
              }}
              defaultTouchToFocus
              onFocusChanged={() => { }}
              flashMode={this.state.torch_enable}
              mirrorImage={false}
              onBarCodeRead={this.onBarCodeRead.bind(this)}
              style={styles.cameraView}
              /*  aspect={RNCamera.constants.Aspect.fill} */
              playSoundOnCapture
            >
              <View style={styles.maskOutter}>
                <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
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

          <View style={{ backgroundColor: 'white', width: width, height: height }}>
            <Navbar title="Route finder" left={left} />
            <View style={{
              backgroundColor: 'white',
              width: width,
              height: height
            }}>
              <View style={{
                width: width,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 15,
              }}>
                <TouchableOpacity
                  onPress={() => {this.setState({ locdes: false, locpickup: true, datafound: false, orderid: '',officeinfo:'' }),Tts.stop();}}
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
                  onPress={() =>{ this.setState({ locdes: true, locpickup: false, datafound: false, orderid: '',officeinfo:'' }),Tts.stop();}}
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
              <Text style={{
                fontWeight: 'bold',
                padding: 10,
                marginTop: 20,
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
                  onChangeText={(text) => {
                    this.setState({ orderid: text.trimLeft(), novalue: false, datafound: false, officeinfo: '' });
                    Tts.stop();
                  }

                  }
                  onSubmitEditing={() => { this.setState({ loading: true }), this.Find() }}
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
                {this.state.loading == true && <ActivityIndicator color={'gray'} style={{ marginLeft: -25 }} size={'small'} />}
                <TouchableOpacity
                  onPress={() => this.setState({ cammodal: true, orderid: '', orderid2: '', officeinfo: '' })}
                >
                  <Icon name={'barcode-scan'}
                    type={'MaterialCommunityIcons'}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height / 32,
                marginBottom:20,
                alignSelf: 'center',
                borderRadius: 10,
                padding: 2.5,
                backgroundColor: Colors.buttonBackgroundColor
              }}
                onPress={() => {this.setState({loading:true}),this.Find()}}
              >
              <View style={{flexDirection:'row'}}>
              <Text style={{
                  width: '80%',
                  textAlign: 'center',
                  marginTop: '2.5%',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: Colors.buttonTextColor
                }}>
                  Find
                </Text>
               {this.state.loading==true&& <ActivityIndicator color={'white'} style={{
                 marginLeft:"-20%"
               }} size={'small'}/>}
              </View>
              </TouchableOpacity> */}
              {this.state.datafound == true ?

                <ScrollView>
                  <FlatList

                    data={this.state.officeinfo}
                    style={{ marginTop: '5%' }}
                    {...console.log('FLAT INFO :', this.state.officeinfo)}
                    horizontal={false}

                    renderItem={({ item, index }) => this._result(item)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <View style={{ alignItems: 'flex-end', marginTop: SECTION_MARGIN_TOP, marginBottom: 20, marginRight: 10 }}><CustomText text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
                </ScrollView>

                :
                undefined}
              {this.state.datafound == false ? <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: SECTION_MARGIN_TOP }}><CustomText text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} />
              </View>
                :
                undefined
              }
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
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
  container: {
    flex: 1,
    backgroundColor: 'white'
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
///////////////////////////////////////////edited Nishanth//////////////////////////////



import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, AsyncStorage, FlatList, Alert, Dimensions, TextInput, SafeAreaView } from 'react-native';
import { Container, Text, View, Button, Left, Icon, Toast, Grid, Col, Right, Body ,CardItem} from 'native-base';
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

const { width, height } = Dimensions.get('window')



export default class RouteFinder extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      loader: false,
      pinc: '',
      pincode: '',
      pin: '',
      orderid: '',
      locpickup: true,
      locdes: false,
      selectedoption: false,
      routeid: [],
      novalue: false,
      routename: [],
      datafound: false,
      orderstatus: '',

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
    }
  }


  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    console.log("url:", ROUTE_FINDER)
  this.setState({ modalvisible: true,}) ;
    console.log("ROUTE FINDER",this.props.refresh)
    /* if(this.props.modalvisible==true)
    {
      console.log("suyfcuyed")
      this.setState({modalvisible:true})
    } */
  }


gotorder=()=>{
  Actions.routefinderview();
  this.setState({modalvisible:false})
}
  valid(pin) {
    if (this.state.pin === "") {
      Toast.show({ text: "Please fill!", type: 'warning' });
      this.setState({ datafound: false,orderid:'',pin:'',officeinfo:''})
      return;
    }
    if (isNaN(pin)) {
      Toast.show({ text: "Enter a valid pincode!", type: 'warning' });
      this.setState({ datafound: false,orderid:'',pin:'',officeinfo:''})
      return;
    }
    else {
      this.fetch_route(this.state.pin)
    }

  }


  ////////////////////////////// Fetching customer packages with id function //////////////////////////////////////////////////////////////////////////////
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
            routeResponse: datas
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
          this.setState({ datafound: false,orderid:'',pin:'',officeinfo:''})
          console.log('Failed');
          Toast.show({ text: "Enter a valid pincode!", type: 'warning' });
          return;
        }
      })
  }

  ///////////////////////////////// Creating package request function //////////////////////////////////////////////////////////////////////////////////////// 



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  modalcancel = () => {
    Actions.pop();
   // this.setState({modalvisible:false})
  }
 

  _header = () => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderTopWidth: 0.3, borderLeftWidth: 0.3, marginTop: 6 }}>

        <View style={styles.cell}><CustomText text={'ROUTE ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ROUTE NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'NO. OF       DESTINATION POINTS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

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
  /////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////

  render() {
    const { selectedoption, locpickup, locdes } = this.state;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button width={CLOSE_WIDTH} onPress={() => this.setState({ selectedoption: false, modalvisible: true ,officeinfo:'', datafound:'',orderid:''})} transparent>
          <Icon style={{ color: Colors.navbarIconColor, fontSize: CLOSE_SIZE }} name='ios-close' />
        </Button>
      </Left>
    );

    return (


      <Container>
 <Modal
          isVisible={this.state.modalvisible}
          backdropColor={'rgba(0,0,0,0.9)'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={500}
          animationOutTiming={500}
          onBackButtonPress={() => this.modalcancel()}
        >

          <SafeAreaView style={{
            backgroundColor: Colors.alertTitleTextColor,
            height: height /3,
            borderRadius: 10,

          }}>
            <View style={{ flexDirection: 'row' }}>
              <Left />
              <Body>
                <Text style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: height / 90,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: Colors.navbarBackgroundColor
                }}>
                  Search with
                </Text>
              </Body>
              <Right>
               <TouchableOpacity onPress={()=> this.modalcancel()}>
               <Icon
                style={{
                  marginRight:10
                }}
                //onPress={}
                  name={'close'}
                  type={'Ionicons'}
                />
               </TouchableOpacity>
              </Right>
              {/*  <Right>
              <Text>
                frjkgj
              </Text>
            </Right> */}
            </View>
            <View style={{
              justifyContent: 'center',
              width: '100%',
              height:'80%',
              justifyContent:'center',
              alignContent:'center',
              alignItems:'center',
              alignSelf:'center'

            }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: Colors.buttonBackgroundColor,
                  alignItems: 'center',
                  width: '50%',
                  alignSelf: 'center',
                  marginBottom: '2%',
                  borderRadius: 10,

                }}
                onPress={() =>this.setState({modalvisible:false,selectedoption:true})}
              >
                <Text style={{
                  fontWeight: 'bold',
                  color: Colors.buttonTextColor
                }}>
                  Pincode
                </Text>
              </TouchableOpacity>
              <Text style={{
                width: '100%',
                textAlign: 'center',
                marginTop: height / 90,
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.navbarBackgroundColor
              }}>
                Or
              </Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: Colors.buttonBackgroundColor,
                  alignItems: 'center',
                  width: '50%',
                  alignSelf: 'center',
                  marginBottom: '2%',
                  marginTop:height / 90,
                  borderRadius: 10,

                }}
                 onPress={()=>{
                   Actions.routefinderview();
                   this.setState({modalvisible:false})
                 }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: Colors.buttonTextColor
                }}>
                  Order ID
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

        </Modal>
   {selectedoption==true &&
    <View style={{ flex: 1 }}>
              <Navbar title="Route finder" left={left} />
              <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: Colors.textBackgroundColor, padding: MAIN_VIEW_PADDING }}>
                  <CustomText text={'Enter Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} />
                  <CustomInput flex={1} placeholder={'Pin Code'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => this.setState({ pin: text, errorpin: "" })} value={this.state.pin} />
                  {!!this.state.errorpin && (<Text style={{ color: 'red' }}>{this.state.errorpin}</Text>)}
                  <CustomButton title={'search'} marginTop={5.0} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} onPress={() => this.valid(this.state.pin)} />

                </View>
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
                  {...console.log('FLAT INFO :', this.state.officeinfo)}
                  renderItem={({ item, index }) => (
                    <ScrollView horizontal={true}>
                      <View style={{ borderBottomWidth: 0.3, width: width - 10, marginLeft: 5, borderLeftWidth: 0.3, borderTopWidth: 0.3, borderRightWidth: 0.3, }} >

                        <View style={{ borderBottomWidth: 0.3 }} ><CustomText text={'Office Details'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
                      
                       
                        <CardItem><Left><Text style={{fontWeight:'bold'}}>
                          {"Order ID"}</Text></Left><Body><Text>
                          {': '+(this.state.orderid ? "#"+this.state.orderid : Strings.na)}</Text></Body>
                            </CardItem>
                            <CardItem ><Left><Text style={{fontWeight:'bold'}}>
                          {"Office ID"} </Text></Left><Body><Text>
                            {': '+(item.officeid ? item.officeid : Strings.na)}</Text></Body>
                        </CardItem>
                            <CardItem><Left><Text style={{fontWeight:'bold'}}>
                          {"Order Status"}</Text></Left><Body><Text>
                          {': '+(this.state.orderstatus ? this.state.orderstatus : Strings.na)}</Text></Body>
                            </CardItem>
                        <CardItem><Left><Text style={{fontWeight:'bold'}}>
                          {"Office Name"} </Text></Left><Body><Text>
                          {': '+(item.officename ? item.officename : Strings.na)}</Text></Body>
                        </CardItem><CardItem><Left><Text style={{fontWeight:'bold'}}>
                          {"Address"} </Text></Left><Body><Text>
                          {': '+(item.officeaddress1 ? item.officeaddress1 : Strings.na)+
                          (item.officeaddress2 ?","+item.officeaddress2:Strings.na)}</Text></Body>
                            </CardItem>
                            <CardItem><Left><Text style={{fontWeight:'bold'}}>
                          {"Location"}</Text></Left><Body><Text>
                          {': '+(item.officecity ?item.officecity: Strings.na)+(item.officedistrict ?","+item.officedistrict : Strings.na)}</Text></Body>
                            </CardItem><CardItem><Left><Text style={{fontWeight:'bold'}}>
                          {"Mobile number"} </Text></Left><Body><Text>
                          {': '+(item.mobileNumber ? item.mobileNumber : Strings.na)}</Text></Body>
                        </CardItem>


                            <FlatList
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
              </ScrollView>
            </View>

  }
        </Container>
    )}}





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
import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, FlatList ,Linking, Platform, } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon, Right, Text, Input, TextInput, Grid, Col, Row, SearchBar, Item, View, Badge, Body } from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP, COLUMN_PADDING, SHORT_BUTTON_HEIGHT, LOGIN_FIELD_HEIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { PICKUP_ORDERS } from '../../constants/Api';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import RNPrint from 'react-native-print';
import _ from "lodash"


const myArray1 = [{ name: "Order No.", value: "Order No." }, { name: "CustomerName", value: "CustomerName" },];
const myArray = [{ name: "PENDING", value: "ASSIGNED" }, { name: "ALL", value: "ALL" }, { name: "FAILED", value: "FAILED" }, { name: "COMPLETED", value: "COMPLETED" }];



export default class PickUp extends React.Component {
  state = {
    filterType: Strings.status,
    search: '',
    pickup_list: [],
    offset: 0,
    status_type: Strings.pending,
    selectedPrinter: null,
    search_critieria:'Order No.',
    pickup_list_search:[],
    isSearch:false,
    searchText:'',
  };

  componentDidMount() {
    this.fetch_pickup_orders(Strings.pending)
    setTimeout(()=>{this.setState({loader:false})},3000);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First')
    }
  
    const jobName = await RNPrint.print({
      printerURL: this.state.selectedPrinter.url,
      html: '<h1>Silent Print</h1>'
    })
  
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

////////////////////////////////////// Pickup order fetching function ///////////////////////////////////////////////////////////////////////////////////

  fetch_pickup_orders(status_type) {

    this.setState({ status_type: status_type })

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      let body = {
        "offset": this.state.offset,
        "limit": 5,
        "filterType": status_type != Strings.all ? this.state.filterType : Strings.all,
        "status": status_type == Strings.all ? '0' : status_type,
        "personId": data.personId

      };

      Api.fetch_request(PICKUP_ORDERS, 'POST', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            this.setState({ pickup_list: result.payload })

          }
          else {
            console.log('Failed');
          }
        })
    }));
  }


  /////////////////////////////////// Searching with order no //////////////////////////////////////////////////////////////

  searchtext(text){

    let res=_.filter(this.state.pickup_list, obj=>obj.orderId==text);

    this.setState({pickup_list_search:res})


  }

   /////////////////////////////////// Searching with Customer name //////////////////////////////////////////////////////////////

   searchtext_name(text){

    let res=_.filter(this.state.pickup_list, obj=>obj.contactPersonName==text);

    this.setState({pickup_list_search:res})


  }

///////////////////////////////////// Pickup order header part ///////////////////////////////////////////////////////////////////////////////////////////
  _header = () => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
        <View style={styles.cell1}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'SERIAL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'CUSTOMER NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'LOCATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'MOBILE NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'DATE & TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ATTEMPT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'TOTAL'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       
      </View>
    )
  }

  ///////////////////////////////////// Pickup order body part ///////////////////////////////////////////////////////////////////////////////////////////

  _body = (item) => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
        <View style={styles.cell1}><Icon name='arrow-up' style={{ fontSize: 14 }} /></View>
        <View style={styles.cell}><CustomText text={item.serialId ? item.serialId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.orderId ? item.orderId :Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.contactPersonName} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  <CustomText text={item.addressLine2 ? item.addressLine2 : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  <CustomText text={item.city ? item.city : Strings.na} textType={Strings.subtext}  color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  </View>
        <View style={styles.cell}><CustomText text={item.gmapLink ? item.gmapLink : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.contactPersonNumber} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.pickupDate ? item.pickupDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  <CustomText text={item.pickupTime ? item.pickupTime : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} />
                                  </View>
        <View style={styles.cell}><CustomText text={item.pickupStatus ? item.pickupStatus : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.attempt ? item.attempt : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryType ? item.deliveryType : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.total ? item.total : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell}>
          <View>
            <CustomButton title={'Notify'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} />
            <CustomButton title={'Call'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} onPress={()=>this.dialCall(item.contactPersonNumber)}/>
            <CustomButton title={'Details'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} onPress={() => Actions.pickupdetails({pickup_id:item.pickupId})} />
          </View>
        </View>

      </View>


    )
  }

////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////////

render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-close' />
        </Button>
      </Left>
    );

    var right = (
      <Right style={{ flex: 1 }}>
        <Button  transparent onPress={()=>Actions.chat()}>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-chatbubbles' />
        </Button>
        <Button  transparent onPress={()=>Actions.notification()}>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-notifications' />
          <Badge style={{ width: 10, backgroundColor: 'orange', height: 12, marginTop: 20, borderRadius: 10 }}
            textStyle={{ color: 'white', fontSize: 20, lineHeight: 20 }}></Badge>
        </Button>
      </Right>
    );

    return (

      <Container>

  
<CustomActivityIndicator
               animating = {true}
               color = '#bc2b78'
               size = "large"
               />

        <Navbar left={left} right={right} title="Pickup" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>

          {/* ////////////////////////////////////// Manual Pickup Button ///////////////////////////////////////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center',backgroundColor:Colors.white,height:40,borderRadius:SHORT_BLOCK_BORDER_RADIUS,padding:10,borderWidth:1,borderColor:Colors.darkSkyBlue}}>
            <View style={{ flex: 9 }}><CustomText text={'Manual Pickup'} textType={Strings.maintext} mTop={1} color={Colors.darkSkyBlue}/></View>
            <View style={{ flex: 1, marginLeft: SECTION_MARGIN_TOP }}><Icon name={'ios-arrow-forward'} style={{color:Colors.darkSkyBlue,fontSize:16,flex:1,}} onPress={()=>Actions.ordercreation()}/></View>
          </View>


          {/*////////////////////// Order and Searchbar Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center',marginTop:SECTION_MARGIN_TOP }}>
            <View style={{ flex: 2 }}><CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white} fontSize={14} paddingBottom={SECTION_MARGIN_TOP} marginRight={10} onChangeValue={(value,index,data)=>{this.setState({search_critieria:value})}} value={this.state.search_critieria} /></View>
           {(this.state.search_critieria === 'Order No.' && <View style={{ flex: 3, marginLeft: SECTION_MARGIN_TOP }}><CustomInput placeholder={'Search here with no'} keyboardType={'number-pad'} icon_name={'ios-search'} onChangeText={(text)=>{this.searchtext(text); this.setState({isSearch:true}); if(text==''){this.setState({isSearch:false})}}} icon_color={Colors.navbarIconColor} icon_fontsize={18} placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} marginTop={5} flex={1} /></View>)}

           {(this.state.search_critieria === 'CustomerName' && <View style={{ flex: 3, marginLeft: SECTION_MARGIN_TOP }}><CustomInput placeholder={'Search here with name'} icon_name={'ios-search'} onChangeText={(text)=>{this.searchtext_name(text); this.setState({isSearch:true}); if(text==''){this.setState({isSearch:false})}}} icon_color={Colors.navbarIconColor} icon_fontsize={18} placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} marginTop={5} flex={1} /></View>)}
          </View>

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, backgroundColor: Colors.aash, }}>
            <View style={{ flex: 4 }}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => { this.setState({ offset: 0 }); setTimeout(() => { this.fetch_pickup_orders(value) }, 1000); }} /></View>
            <View style={{ flex: 2, }}><CustomButton title={'Print'} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={this.silentPrint} /></View>
          </View>

          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

          <View >
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.isSearch ? this.state.pickup_list_search : this.state.pickup_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />
            </ScrollView>

          </View>
          </ScrollView>
      </Container>


    );
  }


}

const styles = StyleSheet.create({

  header: {
    backgroundColor: Colors.aash,

  },
  cell: {
    width: 100,
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

  body: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: COLUMN_PADDING,
    paddingRight: COLUMN_PADDING,
    borderBottomWidth: 5,
    borderColor: Colors.textBackgroundColor1,

  },

});
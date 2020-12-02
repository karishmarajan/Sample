import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, FlatList } from 'react-native';
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

const myArray1 = [{ name: "Order No.", value: "Order No." }, { name: "PENDING", value: "CANCELLED" }, { name: "DELIVERED", value: "102" }, { name: "PICKUP FOR THE SAME CUSTOMER", value: "102" }];
const myArray = [{ name: "PENDING", value: "PENDING" }, { name: "ALL", value: "ALL" }, { name: "FAILED", value: "FAILED" }, { name: "COMPLETED", value: "COMPLETED" }];



export default class PickUp extends React.Component {
  state = {
    filterType: Strings.status,
    search: '',
    pickup_list: [],
    offset: 0,
    status_type: Strings.pending
  };

  componentDidMount() {
    this.fetch_pickup_orders(Strings.pending)
  }


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

  offset_change_next() {
    this.setState({
      offset: this.state.offset + 1
    })
    setTimeout(() => {
      this.fetch_pickup_orders(this.state.status_type)
    }, 1000);

  }
  offset_change_prev() {
    this.setState({
      offset: this.state.offset - 1
    })
    setTimeout(() => {
      this.fetch_pickup_orders(this.state.status_type)
    }, 1000);

  }

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

  _body = (item) => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
        <View style={styles.cell1}><Icon name='arrow-up' style={{ fontSize: 14 }} /></View>
        <View style={styles.cell}><CustomText text={item.serialId ? item.serialId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryId} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.contactPersonName} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.addressLine1 ? item.addressLine1 : Strings.na} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.city} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.contactPersonNumber} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.date ? item.date : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.status} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.attempt} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryType} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.total ? item.total : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

        <View style={styles.cell}>
          <View>
            <CustomButton title={'Notify'} backgroundColor={Colors.darkSkyBlue} height={20} fontSize={14} marginTop={1} marginBottom={5} />
            <CustomButton title={'Call'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} />
            <CustomButton title={'Details'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={1} marginBottom={5} textDecorationLine={'underline'} text_color={Colors.darkSkyBlue} onPress={() => Actions.deliveryoutdetails()} />
          </View>
        </View>

      </View>


    )
  }

  _footer = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 5 }}>
        <View style={{ flex: 2 }}><CustomButton title={'PREV'} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={() => this.offset_change_prev()} /></View>
        <View style={{ flex: 2, }}><CustomButton title={'NEXT'} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginLeft={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} onPress={() => this.offset_change_next()} /></View>
      </View>
    )
  }

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
        <Button transparent>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-chatbubbles' />
        </Button>
        <Button transparent>
          <Icon style={{ color: Colors.navbarIconColor }} name='ios-notifications' />
          <Badge style={{ width: 10, backgroundColor: 'orange', height: 12, marginTop: 20, borderRadius: 10 }}
            textStyle={{ color: 'white', fontSize: 20, lineHeight: 20 }}></Badge>
        </Button>
      </Right>
    );

    return (

      <Container>
        <Navbar left={left} right={right} title="Pickup" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>

          {/* ////////////////////////////////////// Manual Pickup Button ///////////////////////////////////////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center',backgroundColor:Colors.white,height:40,borderRadius:SHORT_BLOCK_BORDER_RADIUS,padding:10,borderWidth:1,borderColor:Colors.darkSkyBlue}}>
            <View style={{ flex: 9 }}><CustomText text={'Manual Pickup'} textType={Strings.maintext} mTop={1} color={Colors.darkSkyBlue}/></View>
            <View style={{ flex: 1, marginLeft: SECTION_MARGIN_TOP }}><Icon name={'ios-arrow-forward'} style={{color:Colors.darkSkyBlue,fontSize:16,flex:1,}} onPress={()=>Actions.manualpickup()}/></View>
          </View>


          {/*////////////////////// Order and Searchbar Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center',marginTop:SECTION_MARGIN_TOP }}>
            <View style={{ flex: 2 }}><CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT} backgroundColor={Colors.white} fontSize={14} paddingBottom={SECTION_MARGIN_TOP} marginRight={10} /></View>
            <View style={{ flex: 3, marginLeft: SECTION_MARGIN_TOP }}><CustomInput placeholder={'Search here'} icon_name={'ios-search'} icon_color={Colors.navbarIconColor} icon_fontsize={18} placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={TEXT_FIELD_HIEGHT} marginTop={5} /></View>
          </View>

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

          <View style={{ flexDirection: 'row', marginTop: SECTION_MARGIN_TOP, backgroundColor: Colors.aash, }}>
            <View style={{ flex: 4 }}><CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => { this.setState({ offset: 0 }); setTimeout(() => { this.fetch_pickup_orders(value) }, 1000); }} /></View>
            <View style={{ flex: 2, }}><CustomButton title={'Print'} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} marginRight={10} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={10} /></View>
          </View>

          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

          <View >
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.pickup_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />

            </ScrollView>
            <FlatList
              ListFooterComponent={this._footer}
            />

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
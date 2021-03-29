import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, TouchableOpacity, Linking, Platform, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon, Right, View, Badge, Body, Toast } from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP, COLUMN_PADDING, SHORT_BUTTON_HEIGHT, LOGIN_FIELD_HEIGHT, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { DELIVERY_OUT, UPDATE_DELIVERY_OUT } from '../../constants/Api';
import _ from "lodash"





export default class DeliveryOut extends React.Component {
  state = {
    delivery_out_list: [],
    status_type:'CREATED',
    
  };

  componentDidMount() {
    this.fetch_delivery_out()
    setTimeout(()=>{this.setState({loader:false})},3000);
  }


 ////////////////////////////////////// DeliveryOut updating function ///////////////////////////////////////////////////////////////////////////////////
 
delivery_status_update(id) {

   this.state.status_type == 'CREATED' ? this.setState({status_type:'IN_PROGRESS'}) : this.setState({status_type:'COMPLETED'})

   setTimeout(()=>{

      Api.fetch_request(UPDATE_DELIVERY_OUT+id+"/status/"+this.state.status_type, 'PUT', '')
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
             this.fetch_delivery_out();
             Toast.show({ text: result.message, type: 'success' });
          }
          else {
            console.log('Failed');
            Toast.show({ text: result.message, type: 'warning' });
          }
        })
    
    },3000);
  }


////////////////////////////////////// Delivery out fetching function ///////////////////////////////////////////////////////////////////////////////////
 
fetch_delivery_out() {


    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      Api.fetch_request(DELIVERY_OUT+data.personId+"/delivery-out", 'GET', '')
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            this.setState({ delivery_out_list: result.payload })

          }
          else {
            console.log('Failed');
          }
        })
    }));
  }

//////////////////////////////////// Delivery orders header part ///////////////////////////////////////////////////////////////////////////////////

  _header = () => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
       
        <View style={styles.cell}><CustomText text={'DELIVERYOUT ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'ROUTE ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'OUT DATE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'START TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'END TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'UPDATE STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       
       
      </View>
    )
  }


  //////////////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

  _body = (item) => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
       
        <View style={styles.cell}><CustomText text={item.deliveryOutId ? item.deliveryOutId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.routeId ? item.routeId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryOutDate ? item.deliveryOutDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryStartTime ? item.deliveryStartTime : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryEndTime ? item.deliveryEndTime : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.status ? item.status : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
      

        <View style={styles.cell}>
          <View>
              {item.status == "CREATED" && (<View>
                <CustomButton title={'IN PROGRESS'} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={5} marginBottom={5} text_color={Colors.darkSkyBlue} onPress={()=>{ this.delivery_status_update(item.deliveryOutId);}} />
                </View>)}
                {item.status == "IN_PROGRESS" && (<View>
                <CustomButton title={'COMPLETED'} paddingLeft={2} backgroundColor={Colors.white} height={20} fontSize={14} marginTop={5} marginBottom={5} text_color={Colors.darkSkyBlue} onPress={()=>{this.delivery_status_update(item.deliveryOutId); }} />
                </View>)}
           
          </View>
        </View>

      </View>


    )
  }

////////////////////////////////////// Render function //////////////////////////////////////////////////////////////////////////////////////

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
        <Navbar left={left} right={right} title="DeliveryOut" />
        <Container horizontal={true} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>

        {/* { this.state.loader === true && (<View style={{alignItems:'center'}}>
        <CustomActivityIndicator/>
        </View>)} */}

         
          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

          <View>
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.delivery_out_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />

            </ScrollView>
            <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </Container>
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
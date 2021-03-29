import React, { Component } from 'react';
import { ScrollView, AsyncStorage , StyleSheet, FlatList} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings'
import CustomDropdown from '../../component/CustomDropdown';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { Actions } from 'react-native-router-flux';
import { SECTION_MARGIN_TOP, COLUMN_PADDING,SHORT_BORDER_WIDTH,TEXT_FIELD_HIEGHT, MAIN_VIEW_PADDING , SHORT_BLOCK_BORDER_RADIUS, SECOND_FONT, SIGNATURE_VIEW_HEIGHT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { REQUEST_STATUS } from '../../constants/Api';

const myArray1=[{name:"Cochin Regional Office" , value:"Cochin Regional Office"},{name:"a" , value:"a"},{name:"b" , value:"b"}];


export default class RequestStatus extends React.Component {
  state ={
 status_list:[],
  };


   ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

   componentDidMount(){
    AsyncStorage.getItem(KEY).then((value => {
       let data = JSON.parse(value);

       this.fetch_request_status_list(data.personId);

   }));
   }

   ////////////////////////////////////// Task assigned fetching function ////////////////////////////////////////////////////////////////////////////////////

   fetch_request_status_list(val){

    Api.fetch_request(REQUEST_STATUS+val+"/DELIVERY_AGENT",'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({status_list : result.payload})
      
      }
      else{
        console.log('Failed');
      }
  })
  
   }

   //////////////////////////////////// Delivery orders header part ///////////////////////////////////////////////////////////////////////////////////

  _header = () => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:6}}>
      
        <View style={styles.cell}><CustomText text={'REQUEST TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        {/* <View style={styles.cell}><CustomText text={'REQUESTED TO'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
        <View style={styles.cell}><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
       
       
      </View>
    )
  }


  //////////////////////////////////// Delivery orders body part ///////////////////////////////////////////////////////////////////////////////////

  _body = (item) => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
        
        <View style={styles.cell}><CustomText text={item.requestType ? item.requestType+item.requestId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        {/* <View style={styles.cell}><CustomText text={item.requestedTo ? item.requestedTo : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View> */}
        <View style={styles.cell}><CustomText text={item.status ? item.status : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>

      </View>


    )
  }

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
        <Navbar left={left} title="Request Status" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>

 {/*////////////////////// Request Order Transfer Details //////////////////////////////////////////////// */}
 
 <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                data={this.state.status_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />

            </ScrollView>
        </View>
        <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
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
      width: '50%',
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
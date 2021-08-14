///////////////////////edited Nishanth/////////////////////////////////////////


import React, { Component } from 'react';
import { ScrollView, AsyncStorage , StyleSheet, FlatList} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Badge} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings'
import CustomDropdown from '../../component/CustomDropdown';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { Actions } from 'react-native-router-flux';
import { SECTION_MARGIN_TOP,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, ORDER_BLOCK ,CLOSE_SIZE,CLOSE_WIDTH} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { REQUEST_STATUS } from '../../constants/Api';



export default class BulkOrderView extends React.Component {
 
   ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  
   ////////////////////////////////////// Task assigned fetching function ////////////////////////////////////////////////////////////////////////////////////

//    fetch_request_status_list(val){

//     Api.fetch_request(REQUEST_STATUS+val+"/DELIVERY_AGENT",'GET','')
//     .then(result => {
     
//       if(result.error != true){
  
//         console.log('Success:', JSON.stringify(result));
//         this.setState({status_list : result.payload})
      
//       }
//       else{
//         console.log('Failed');
//       }
//   })
  
//    }

   //////////////////////////////////// Delivery orders header part ///////////////////////////////////////////////////////////////////////////////////


   _header = () => {
    return (

      <View  style={{ flexDirection: 'row'  }}>
        <View style={styles.cell}><CustomText text={'Bulk Upload ID'} textType={Strings.subtext}  color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Office ID'} textType={Strings.subtext}  color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View  style={styles.cell}><CustomText text={'Customer ID'} textType={Strings.subtext}  color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Creator ID'} textType={Strings.subtext} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Created Date'} textType={Strings.subtext}  color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>

     
      </View>
    )
  }
 
   

   

    render(){
        var left = (
            <Left style={{ flex: 1 }}>
              <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
                <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='ios-close' />
                </Button>
            </Left>
          );
          var right = (
            <Right style={{ flex: 1 }}>
              <Button transparent>
                <Icon style={{color:Colors.navbarIconColor}} name='ios-chatbubbles' />
              </Button>
              <Button  transparent>
                <Icon style={{color:Colors.navbarIconColor }} name='ios-notifications' />
                <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:SECTION_MARGIN_TOP,borderRadius:10}} 
                                textStyle={{color: 'white', fontSize:SECTION_MARGIN_TOP, lineHeight: SECTION_MARGIN_TOP}}></Badge>
              </Button>
            </Right>
          );
    
        return (
            <View>




                
                     <Navbar left={left} right={right} title="Bulk Order"/>
                     <View style={{alignItems: 'flex-end'}} >
                     <CustomButton title={'+ Order Creation'} marginRight={25} borderRadius={7} marginTop={25} marginBottom={25}  />
                    </View>
                    <View >
            <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
              <FlatList
                // data={this.state.isSearch ? this.state.pickup_list_search : this.state.pickup_list}
                // keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                // renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />
            </ScrollView>
            <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP,marginBottom:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </View>
    

    )
   
    
        }
}



const styles = StyleSheet.create({

    header: {
      backgroundColor: Colors.buttonBackgroundColor,
  
    },
    cell: {
        width: 130,
        padding: 6,
        alignSelf: 'stretch',
        textAlign: 'center',
        borderRightWidth: 0.3,
    
    
      },
})
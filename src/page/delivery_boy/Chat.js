import React, { Component } from 'react';
import { ScrollView, AsyncStorage} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings'
import CustomDropdown from '../../component/CustomDropdown';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import { Actions } from 'react-native-router-flux';
import { SECTION_MARGIN_TOP, SCREEN_HEIGHT,SHORT_BORDER_WIDTH,TEXT_FIELD_HIEGHT, MAIN_VIEW_PADDING , SHORT_BLOCK_BORDER_RADIUS, SECOND_FONT, SIGNATURE_VIEW_HEIGHT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { ORDER_TRANSFER } from '../../constants/Api';




export default class Chat extends React.Component {
  state ={
   requested :'',
   reason :'',
   hasError: false,
   errorTextreason: '',
   val:'',
  };


   ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

   componentDidMount(){
    AsyncStorage.getItem(KEY).then((value => {
 
       let data = JSON.parse(value);
       this.setState({val:data.personId});

   }));
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
        <Navbar left={left} title="Chat" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        

 {/*////////////////////// Notifications block //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,padding:10}}>
<View style={{flexDirection:'row'}}>
    <View style={{ flex: 9 }}><CustomText text={'John'} textType={Strings.subtext} fontWeight={'bold'}/></View>
    <View style={{ flex: 2, marginLeft: SECTION_MARGIN_TOP, marginTop:10 }}><CustomText text={'3 min'} textType={Strings.subtext} /></View>
</View>
        <CustomText text={'Lorem dgkjhlj jkjllhk hgkjllh gkjhjlhkh hjkgkhljl vjggkhl gkjhlhl bkhjlkh'} textType={Strings.subtext} mTop={1} />      
</View>

        </View>
        </ScrollView>
        </Container>
      
        );
    }


    order_transfer_request() {

      if(this.state.reason == '') {
        this.setState({hasError: true, errorTextreason: 'Should provide reason !'});
        return;
      }
  
      let body={
        "requestedTo" :this.state.requested,
        "reason" : this.state.reason,
        "personId" : this.state.val
    
    };
      
  
      Api.fetch_request(ORDER_TRANSFER,'POST','',JSON.stringify(body))
      .then(result => {
       
  
        if(result.error != true){
        console.log('Success:', JSON.stringify(result));
        alert(" Request sent " + result.message)
  
        }
        else{
          console.log('Failed');
          alert(" Failed ! ")
        }
      })
    }


}
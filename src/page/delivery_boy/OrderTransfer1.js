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

const myArray1=[{name:"Cochin Regional Office" , value:"Cochin Regional Office"},{name:"a" , value:"a"},{name:"b" , value:"b"}];


export default class OrderTransfer1 extends React.Component {
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
        <Navbar left={left} title="Request Task Transfer" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>

 {/*////////////////////// Request Order Transfer Details //////////////////////////////////////////////// */}

        <CustomText text={'Requested To'} textType={Strings.maintext}/> 
        <CustomDropdown data={myArray1} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeValue={(value) => this.setState({requested: value})} value={this.state.requested}/>

        <CustomText text={'Reason'} textType={Strings.maintext}/>
        <View>
        <CustomInput borderRadius={SHORT_BLOCK_BORDER_RADIUS} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} backgroundColor={Colors.white} height={SIGNATURE_VIEW_HEIGHT} paddingTop={SHORT_BLOCK_BORDER_RADIUS} flex={1} onChangeText={(text) => this.setState({reason: text})} value={this.state.reason}/>
        {!!this.state.errorTextreason && (<Text style={{color: 'red'}}>{this.state.errorTextreason}</Text>)}
        </View>
        <CustomButton title={'Request Order Transfer'} fontSize={SECOND_FONT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.order_transfer_request()}  />
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
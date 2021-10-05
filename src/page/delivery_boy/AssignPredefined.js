import React, { Component, } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView ,AsyncStorage , } from 'react-native';
import { Container, View, Button, Left, Right, Icon, Text,Grid,Col,Row,Badge, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';




import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomSubButton from '../../component/CustomSubButton';
import { SECTION_MARGIN_TOP,SHORT_BORDER_RADIUS, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, ORDER_BLOCK_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SHORT_BUTTON_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT,FOURTH_FONT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { ALL_USERS, DELIVERY_AGENT_BY_OFFICE_ID , GET_OFFICE_STAFFS, ASSIGN_PDOID} from '../../constants/Api';
import CustomInput from '../../component/CustomInput';
import CustomAlert from '../../component/CustomAlert';
import CustomDropdown from '../../component/CustomDropdown';
import CustomSearchBox from '../../component/CustomSearchBox';



const myArray = [{ name: "----Select----", value: "----Select----" },{ name: "DELIVERY BOY", value: "DELIVERY BOY" }, { name: "OFFICE STAFF", value: "OFFICE STAFF" } , { name: "CUSTOMER", value: "CUSTOMER" }];



export default class AssignPredefined extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////

  state ={
    user_type:'',
    errorTextuser_type:'',
    users:[],
    user_name:'',
    user_id:'',
    errorTextuser:'',
    no_pdoid:'',
    errorTextno_pdoid:'',
    pdoid_from:'',
    hasError:false,
  }

  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount(){
   AsyncStorage.getItem(KEY).then((value => {

      let data = JSON.parse(value);
   
  }));
  }
 
//////////////////////////////// Fetching all customers function //////////////////////////////////////////////////////////////////////////////

fetch_customers_list() {
this.setState({user_type:'CUSTOMER'})
  Api.fetch_request(ALL_USERS,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let customers = [];

      for(var i = 0; i < count; i++){
       customers.push({name:result.payload[i].firstName+' '+result.payload[i].lastName , id: result.payload[i].userId });
     }
     this.setState({ users: customers });
    }
    else{
      console.log('Failed');
    }
})
 
}

//////////////////////////////// Fetching all agents by office id function //////////////////////////////////////////////////////////////////////////////

fetch_delivery_agent_list() {
  this.setState({user_type:'DELIVERY_BOY'})

   AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

  Api.fetch_request(DELIVERY_AGENT_BY_OFFICE_ID+data.officeId,'GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let agents = [];

      for(var i = 0; i < count; i++){
       agents.push({name:result.payload[i].firstName+' '+result.payload[i].lastName , id: result.payload[i].personId });
     }
     this.setState({ users: agents });
    }
    else{
      console.log('Failed');
    }
})
 }));
}

//////////////////////////////// Fetching all staffs by office id function //////////////////////////////////////////////////////////////////////////////

fetch_office_staffs_list() {
  this.setState({user_type:'OFFICE_STAFF'})

   AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

  Api.fetch_request(GET_OFFICE_STAFFS+data.officeId+'/officeStaff/active','GET','')
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));

      var count = (result.payload).length;
      let staffs = [];

      for(var i = 0; i < count; i++){
       staffs.push({name: result.payload[i].firstName+' '+result.payload[i].lastName , id: result.payload[i].officeStaffId });
     }
     this.setState({ users: staffs });
    }
    else{
      console.log('Failed');
    }
})
 }));
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
assign_pdoid(){
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

if(this.state.user_type==="") {
    this.setState({hasError: true, errorTextuser_type: 'Please select user type!'});
    return;
  }
  if(this.state.no_pdoid==="") {
    this.setState({hasError: true, errorTextno_pdoid: 'Please enter no of PDOID !'});
    return;
  }
  if(parseInt(this.props.PDOID)<parseInt(this.state.no_pdoid)){
    this.setState({hasError:true, errorTextno_pdoid:'Only left '+this.props.PDOID})
    return;
  }
  if(this.state.user_name==="") {
    this.setState({hasError: true, errorTextuser: 'Please select user !'});
    return;
  }

  let body = {
    "assignerId": data.personId,
    "assignerName": data.firstName +''+ data.lastName,
    "assignerUserType": "DELIVERY_BOY",
    "preorderAssignId": this.props.assigned_id,
    "preorderRangeAssignRequest": [
      {
        "assigneeId": this.state.user_id,
        "assigneeName": this.state.user_name,
        "assigneeUserType":this.state.user_type,
        "preorderFrom": this.props.available_from,
        "preorderTo": parseInt(this.props.available_from)+parseInt(this.state.no_pdoid)
      }
    ]
    }

  Api.fetch_request(ASSIGN_PDOID, 'PUT', '', JSON.stringify(body))
    .then(result => {

      if (result.error != true) {
        Toast.show({ text: result.message, type: 'success' });
        console.log('Success:', JSON.stringify(result));
        Actions.predefinedorder();

      }
      else {
        console.log(result.message,'Failed');
        Toast.show({ text:result.message , type: 'warning' });


      }
    })
  }));

}




/////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////

  render() {
  
    var left = (
      <Left  style={{ flex: 1 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon style={{ color:Colors.navbarIconColor }} name='md-arrow-round-back' />
          </Button>
      </Left>
    );
   

    return (
     
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar left={left} title="Assign"/>
          <KeyboardAvoidingScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps = 'always'>



        {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>
        
        <CustomText text={'User Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomDropdown data={myArray} height={SHORT_BUTTON_HEIGHT} backgroundColor={Colors.aash} onChangeValue={(value, index, data) => {setTimeout(() => {this.setState({errorTextuser_type:''}) ;{if(value=='DELIVERY BOY'){this.fetch_delivery_agent_list()}else if(value=='CUSTOMER'){this.fetch_customers_list()}else if(value=='----Select----'){this.setState({user_type:''})}else {this.fetch_office_staffs_list()}}}, 100); }} />
        {!!this.state.errorTextuser_type && (<Text style={{color: 'red'}}>{this.state.errorTextuser_type}</Text>)}

       <CustomText text={'PDOID'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
         <CustomInput flex={1} keyboardType={"number-pad"} maxLength={6} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text) => {this.setState({no_pdoid: text , errorTextno_pdoid:""})}} value={this.state.no_pdoid} />
        {!!this.state.errorTextno_pdoid && (<Text style={{color: 'red'}}>{this.state.errorTextno_pdoid}</Text>)}
        <CustomText text={'User Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
       <CustomSearchBox onTextChange={(text)=>{setTimeout(()=>{this.setState({user_name: text})},0)}} value={this.state.user_name} placeholder={'Select'} onItemSelect={(item) =>{ setTimeout(() => {this.setState({user_name:item.name ,user_id:item.id, errorTextuser:""});}, 500); }} items={this.state.users} />
       {!!this.state.errorTextuser && (<Text style={{color: 'red'}}>{this.state.errorTextuser}</Text>)}

        <CustomButton title={'ADD'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.assign_pdoid()} />

              </View>
              </KeyboardAvoidingScrollView>
        </Container>
        </SideMenuDrawer>
    );
  }
  

}



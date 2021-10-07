import React, { Component } from 'react';
import { ScrollView, StyleSheet, AsyncStorage, TouchableOpacity, Linking, Platform, FlatList, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Button, Left, Icon, Right, View, Badge, Body, Toast } from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomCheckBox from '../../component/CustomCheckBox';
import { SECTION_MARGIN_TOP, COLUMN_PADDING, MAIN_VIEW_PADDING, SHORT_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,CLOSE_SIZE,CLOSE_WIDTH } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import session, { KEY } from '../../session/SessionManager';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';
import Api from '../../component/Fetch';
import { CUSTOMER_DETAILS, BRANCH_CUSTOMER_DETAILS , PDOID_LIST_BY_STATUS, UPDATE_PDOID_PAYMENT_STATUS} from '../../constants/Api';
import RNPrint from 'react-native-print';
import _ from "lodash";
import { RNCamera } from 'react-native-camera';


const myArray = [{ name: "PENDING", value: "Assign Pending" }, { name: "ASSIGNED", value: "Assigned" } , { name: "ASSIGNED", value: "Reassign" } , { name: "PENDING", value: "Reassign Pending" } , { name: "PAYMENT_PENDING", value: "Payment Pending" }, { name: "ACCEPTED", value: "Re-assign Accepted" },];



export default class CustomerAddress extends React.Component {
  constructor(props) {
    super(props);
 this.state = {
    predefined_details: [],
    predefinedpin:'',
    customer_id:'',
    customer_identity_type:'',

    customer_name:'',
    customer_no:'',
    customer_pincode:'',
    customer_state:'',
    customer_landmark:'',
    customer_localbody:'',
    customer_address1:'',
    customer_address2:'',
    customer_email:'',
    customer_gmap:'',
    customer_country:'',
    
  };
}

  componentDidMount() {
    if(this.props.cus_type === 'COMMON_USER'){
       this.verify_customer_id(this.props.cus_id);
    }else{
       this.verify_branch_customer_id(this.props.cus_id);
    }
  }


////////////////////////////// Fetching customer details with id function //////////////////////////////////////////////////////////////////////////////
verify_customer_id(customer_id) {


    Api.fetch_request(CUSTOMER_DETAILS + customer_id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({sender_details : result.payload})

        this.setState({customer_name : result.payload.firstName +" "+ result.payload.lastName})
        this.setState({customer_no : result.payload.mobileNumber})
        this.setState({customer_email : result.payload.emailId})
        this.setState({customer_country : result.payload.country})
        this.setState({customer_pincode : result.payload.pincode})
        this.setState({customer_localbody : result.payload.localBodyType})
        this.setState({customer_gmap : result.payload.gmapLink})
        this.setState({customer_address1 : result.payload.addressLine1})
        this.setState({customer_address2 : result.payload.addressLine2})
        this.setState({customer_state : result.payload.state})
        this.setState({customer_district : result.payload.district})
        this.setState({customer_district_id : result.payload.districtId})
        this.setState({customer_city : result.payload.city})
        this.setState({customer_landmark : result.payload.landMark})
        this.setState({customer_countrycode : result.payload.countryCode})
        this.setState({customer_countryid : result.payload.countryId})
        this.setState({customer_identity_type: 'COMMON_USER'})
        this.setState({parent_user_id : '0' })
        

      }
      else{
        console.log('Failed');
      
        
        Toast.show({ text: result.message, type: 'warning' });
      }
  })
   
  }

  ////////////////////////////// Fetching branch customer details with id function //////////////////////////////////////////////////////////////////////////////
 
  verify_branch_customer_id(customer_id) {

   
    Api.fetch_request(BRANCH_CUSTOMER_DETAILS + id,'GET','')
    .then(result => {
      
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({sender_details : result.payload})

       this.setState({branchUserId : result.payload.branchUserId })
      //  this.setState({customer_id : result.payload.branchUserId })
       this.setState({branchUserIdCode : result.payload.branchUserIdCode })
       this.setState({parent_user_id : result.payload.parent.userId })
        this.setState({customer_name : result.payload.firstName })
        this.setState({customer_no : result.payload.mobileNumber})
        this.setState({customer_email : result.payload.email})
        this.setState({customer_country : result.payload.country})
        this.setState({customer_pincode : result.payload.pincode})
        this.setState({customer_localbody : result.payload.localBodyType})
        this.setState({customer_gmap : result.payload.gmapLink})
        this.setState({customer_address1 : result.payload.addressLine1})
        this.setState({customer_address2 : result.payload.addressLine2})
        this.setState({customer_state : result.payload.state})
        this.setState({customer_district : result.payload.district})
        this.setState({customer_district_id : result.payload.districtId})
        this.setState({customer_city : result.payload.city})
        this.setState({customer_landmark : result.payload.landMark})
        this.setState({customer_countrycode : result.payload.countryCode})
        this.setState({customer_countryid : result.payload.countryId})
        this.setState({customer_identity_type: 'BRANCH_USER'})

      }
      else{
        console.log('Failed');
      
        Toast.show({ text: result.message, type: 'warning' });
      }
  })
   
  }



  
////////////////////////////////////// Render function //////////////////////////////////////////////////////////////////////////////////////

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button  width={CLOSE_WIDTH}  onPress={() => Actions.pop()} transparent>
          <Icon style={{ color: Colors.navbarIconColor,fontSize:22 }} name='md-arrow-round-back' />
        </Button>
      </Left>
    );

  
    return (

      <Container>
        <Navbar left={left} title="Address" />
        <ScrollView contentContainerStyle={{flexGrow:1}} style={{ flexDirection: 'column', padding: 10, backgroundColor: Colors.textBackgroundColor }}>
        

          {/*////////////////////// Print Button Block //////////////////////////////////////////////// */}

         
          {/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}
 
          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING}}>
              
          <CustomText text={'Full Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_name} />
        <CustomText text={'Mobile Number'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_no} />
        <CustomText text={'Email Id'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_email} />
        <CustomText text={'Country'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_country} />
        <CustomText text={'Pincode'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_pincode} />
        <CustomText text={'Local Body Type'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_localbody} />
        <CustomText text={'Gmap Link'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_gmap} />
        <CustomText text={'Address Line 1'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_address1} />
        <CustomText text={'Address Line 2'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_address2} />
        <CustomText text={'State'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_state} />
        <CustomText text={'District'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_district} />
        <CustomText text={'City'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_city} />
        <CustomText text={'Landmark'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
        <CustomInput flex={1} value={this.state.customer_landmark} />


            <View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP ,marginBottom:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
          </View>
        </ScrollView>
      </Container>


    );
  }


}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.aash,

  },
  cell: {
    width: 130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,
    backgroundColor:Colors.buttonBackgroundColor


  },
  cell2: {
    flex:1,
    width: 130,
    padding: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRightWidth: 0.3,
    backgroundColor:Colors.white,
    justifyContent:'center'


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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

});
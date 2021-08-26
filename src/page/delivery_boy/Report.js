import React, { Component, } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView ,AsyncStorage , FlatList, DatePickerAndroid} from 'react-native';
import { Container, View, Button, Left, Icon,Grid,Col,Row, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';

 


import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP, SHORT_BLOCK_BORDER_RADIUS,MAIN_VIEW_PADDING,SECOND_FONT,CLOSE_SIZE,CLOSE_WIDTH, COLUMN_PADDING, SHORT_BUTTON_HEIGHT, SHORT_BORDER_WIDTH,SHORT_BORDER_RADIUS} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { DELIVERY_REPORT , DELIVERY_REPORT_CUSTOMER } from '../../constants/Api';
import DatePickerAndroidCustom from '../../component/DatePickerAndroidCustom';
import moment from 'moment';
import CustomDatePicker from '../../component/CustomDatePicker';
import RNPrint from 'react-native-print';
import _ from "lodash";








export default class ShippingHistory extends React.Component {

  ///////////////////////////////////////// Declaring state variables ///////////////////////////////////////////////////////////////////////////////////

  state ={
    customer_id:'',
    customer_type:'',
    report_details_list:[],
    report_details:[],
    active:'REQUESTED',
    date_from:'',
    date_to:'',
    year:'',
    month:'',
    day:'',
    selected_date:'',
    cod_check:true,
    reciever_name:'',
    destination_pin:'',
    filter_type:'ALL',
   details_list_search:'',
   isSearch:false 

  }

  ///////////////////////////////////////// Component did mount function ///////////////////////////////////////////////////////////////////////////////

  componentDidMount(){

    this.fetch_customer_report(this.state.filter_type);

  }

   //////////////////////////////////////////// fetching customer report function  //////////////////////////////////////////////////////////////////////////////////  
 
 fetch_customer_report(filter){

  AsyncStorage.getItem(KEY).then((value => {

    let data = JSON.parse(value);

    let body = {
      "deliveryReportFilter": filter,
      "deliveryUserFilter": "DELIVERY_AGENT",
      "fromDate": this.state.date_from,
      "officeId": 0,
      "toDate": this.state.date_to,
      "userId": data.personId

    };

  Api.fetch_request(DELIVERY_REPORT,'POST','', JSON.stringify(body))
  .then(result => {
   
    if(result.error != true){

      console.log('Success:', JSON.stringify(result));
      this.setState({report_details_list : result.payload})
    
    }
    else{
      console.log('Failed');
      this.setState({report_details_list : ""})
      Toast.show({ text: result.message, type: 'warning' });
    }
})
}));

 }

  //////////////////////////////////////////// fetching purticular customer report function  //////////////////////////////////////////////////////////////////////////////////  
 
  fetch_oneCustomer_report(id){

    Api.fetch_request(DELIVERY_REPORT_CUSTOMER + id,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({report_details : result.payload})
        this.printHTML();
      
      }
      else{
        console.log('Failed');
        this.setState({report_details : ""})
        Toast.show({ text: result.message, type: 'warning' });
      }
  })
 
  
   }
 /////////////////////////////////// Searching with order no //////////////////////////////////////////////////////////

 searchtext(text){

  let res=_.filter(this.state.report_details_list, obj=>obj.deliveryPincode==text);
   this.setState({details_list_search:res})  
 }

 ///////////////////////// Date Picker Function  /////////////////////////////////////////////////////////////////////////////////////////

 async showPicker_from(mode) {
    if (Platform.OS == "android") {
      if (mode == 'time') {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour,
                minute,
                is24Hour: false, // Will display '2 PM'
                
            });
            if (action !== TimePickerAndroid.dismissedAction) {
             
              // setting AM/PM and hour to 12 by checking condition
               let am_pm = 'AM';
  
               if(hour>11){
                       am_pm = 'PM';
                      if(hour>12){
                let hour1 = hour - 12;
                  this.setState({ hour3: this.make_two_digit(hour1), minute3: this.make_two_digit(minute) });
                  this.setTimeout(
                  this.setState({selected_time:`${this.state.hour3}:${this.state.minute3} ${am_pm}`})
                ,100);
                
                 }
            }
  
                    if(hour == 0){
                       let hour1 = 12;
                         this.setState({ hour3: this.make_two_digit(hour1), minute3: this.make_two_digit(minute) });
                         const selectedTime = `${this.state.hour3}:${this.state.minute3} ${am_pm}` ;
                         this.setState({selected_time:selectedTime})
                      }

                      this.setState({ hour3: this.make_two_digit(hour), minute3: this.make_two_digit(minute) });
                      const selectedTime = `${this.state.hour3}:${this.state.minute3} ${am_pm}` ;
                      this.setState({selected_time:selectedTime})
            
            }
           

        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }

    } else {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(2021, 0, 1),
                maxDate:new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
  
                    this.setState({ year: year, month: this.make_two_digit(month+1), day: this.make_two_digit(day) });
                    this.setState({date_from:`${this.state.day}-${this.state.month}-${this.state.year}`});
            }
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }

    }
  }
}
make_two_digit(d) {
    return (parseInt(d) < 10 ? "0" : "") + d;
}



 ///////////////////////// Date Picker Function  /////////////////////////////////////////////////////////////////////////////////////////

 async showPicker_to(mode) {
  if (Platform.OS == "android") {
    if (mode == 'time') {
      try {
          const { action, hour, minute } = await TimePickerAndroid.open({
              hour,
              minute,
              is24Hour: false, // Will display '2 PM'
              
          });
          if (action !== TimePickerAndroid.dismissedAction) {
           
            // setting AM/PM and hour to 12 by checking condition
             let am_pm = 'AM';

             if(hour>11){
                     am_pm = 'PM';
                    if(hour>12){
              let hour1 = hour - 12;
                this.setState({ hour3: this.make_two_digit(hour1), minute3: this.make_two_digit(minute) });
                this.setTimeout(
                this.setState({selected_time:`${this.state.hour3}:${this.state.minute3} ${am_pm}`})
              ,100);
              
               }
          }

                  if(hour == 0){
                     let hour1 = 12;
                       this.setState({ hour3: this.make_two_digit(hour1), minute3: this.make_two_digit(minute) });
                       const selectedTime = `${this.state.hour3}:${this.state.minute3} ${am_pm}` ;
                       this.setState({selected_time:selectedTime})
                    }

                    this.setState({ hour3: this.make_two_digit(hour), minute3: this.make_two_digit(minute) });
                    const selectedTime = `${this.state.hour3}:${this.state.minute3} ${am_pm}` ;
                    this.setState({selected_time:selectedTime})
          
          }
         

      } catch ({ code, message }) {
          console.warn('Cannot open time picker', message);
      }

  } else {
      try {
          const { action, year, month, day } = await DatePickerAndroid.open({
              date: new Date(),
              minDate: new Date(2021, 0, 1),
              maxDate:new Date(),
          });
          if (action !== DatePickerAndroid.dismissedAction) {

                  this.setState({ year: year, month: this.make_two_digit(month+1), day: this.make_two_digit(day) });
                  this.setState({date_to:`${this.state.day}-${this.state.month}-${this.state.year}`});
          }
      } catch ({ code, message }) {
          console.warn("Cannot open date picker", message);
      }

  }
}
}
make_two_digit(d) {
  return (parseInt(d) < 10 ? "0" : "") + d;
}

////////////////////////////////////////////////////////////////////////////////////////////////

 
//////////////////////////////////// Report header part ///////////////////////////////////////////////////////////////////////////////////

_header = () => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3,borderTopWidth:0.3 , borderLeftWidth:0.3 ,marginTop:SECTION_MARGIN_TOP,backgroundColor:Colors.navbarBackgroundColor}}>
        <View style={styles.cell}><CustomText text={'Order ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Sender Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Receiver Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Delivery Boy Name'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Mobile Number'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Date & Time'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Delivery PIN'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={'Attempt'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText textType={Strings.subtext} fontWeight={'bold'} color={Colors.white} alignSelf={'center'} textAlign={'center'} /></View>
       
       
      </View>
    )
  }
////////////////////////////// Printing function //////////////////////////////////////////////////////////////////////////////////////

async printHTML(){
    await RNPrint.print({
     html: `<div style="width:${"100%"}; height:${"100%"}">
     <div style="margin-left: auto;margin-right: auto;">
     <img src="data:image/png;base64, ${this.state.image_code}" width="70" height="50"  >
     </div> 
     <div style="margin:${30};padding:${30}">
         
            <table>
            <th style="color:${Colors.blue};font-size:${30};width:${"100%"};text-align:${'center'}">Delivery Report</th>
           <tbody>
               <tr>
                 <td style="width:${40};font-size:${22};" >Photo(Receiver): </td>
                 <td style="width:${60};"><img src="data:image/png;base64, ${this.state.image_code}" width="100" height="100"> </td>
                 </tr>
                 <tr>
                 <td style="width:${40};padding:${5};font-size:${22};" >Delivery ID:</td>
                 <td style="width:${60};width:${50};font-size:${22};">${this.state.report_details.deliveryId} </td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};" >Sender Name:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.senderName}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};" >Receiver Name:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.receiverName} </td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};" >Actual Receiver Name:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.receiverName}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};" >Receiver Number:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.receiverNumber}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};" >Delivery Boy Name:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.deliveryAgentName}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};">Date & Time:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.updatedDate}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};">Destination PIN:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.deliveryPincode}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};">Number of Attempt:</td>
                 <td style="font-size:${22};width:${60};">${this.state.report_details.attempt}</td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};">Signature:</td>
                 <td ><img src="data:image/png;base64, ${this.state.image_code}" width="100" height="100"> </td>
                 </tr>
                 <tr>
                 <td style="padding:${5};font-size:${22};width:${40};">ID Card(Receiver):</td>
                 <td ><img src="data:image/png;base64, ${this.state.image_code}" width="100" height="100"> </td>
                 </tr>
           </tbody>
            </table>
         
     </div>
  </div> `
    });
  }


  //////////////////////////////////// Report body part ///////////////////////////////////////////////////////////////////////////////////

  _body = (item) => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
       
        <View style={styles.cell}><CustomText text={item.preDefinedOrderId?item.preDefinedOrderId:item.orderId ? item.orderId : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.senderName ? item.senderName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.receiverName ? item.receiverName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryAgentName ? item.deliveryAgentName : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.senderNumber ? item.senderNumber : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.updatedDate ? item.updatedDate : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={item.deliveryPincode ? item.deliveryPincode : Strings.na} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}><CustomText text={ item.attempt} textType={Strings.subtext} color={Colors.borderColor} alignSelf={'center'} textAlign={'center'} /></View>
        <View style={styles.cell}>
        <Button width={CLOSE_WIDTH} onPress={() => this.fetch_oneCustomer_report(item.deliveryId)} transparent>
            <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-print' />
            </Button>
         </View>

      </View>


    )
  }

/////////////////////////////////////////// Render method //////////////////////////////////////////////////////////////////////////////////

  render() {
    var left = (
        <Left style={{ flex: 1 }}>
          <Button width={CLOSE_WIDTH} onPress={() => Actions.pop()} transparent>
            <Icon style={{ color:Colors.navbarIconColor,fontSize:CLOSE_SIZE}} name='md-close' />
            </Button>
        </Left>
      );
    return (
     
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar  title="Report" left={left}/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>

           {/*////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING,}}>



{/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
<CustomButton  title={'Completed'} height={30} onPress={()=>{this.setState({active:'COMPLETED'}),this.fetch_customer_orders();}} borderRadius={SHORT_BLOCK_BORDER_RADIUS} fontSize={SECOND_FONT} backgroundColor={this.state.active == 'COMPLETED' ? Colors.darkSkyBlue : Colors.gray}/>
<CustomButton  title={'Cancelled'} height={30} onPress={()=>{this.setState({active:'CANCELLED'}),this.fetch_customer_orders();}} borderRadius={SHORT_BLOCK_BORDER_RADIUS} fontSize={SECOND_FONT} backgroundColor={this.state.active == 'CANCELLED' ? Colors.darkSkyBlue : Colors.gray}/>
<CustomButton  title={'Requested'} height={30} onPress={()=>{this.setState({active:'REQUESTED'}),this.fetch_customer_orders();}} borderRadius={SHORT_BLOCK_BORDER_RADIUS} fontSize={SECOND_FONT} backgroundColor={this.state.active == 'REQUESTED' ? Colors.darkSkyBlue : Colors.gray}/> 
</View> */}

<CustomText text={'Reciever Name'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} placeholder={'Name'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white} onChangeText={(text)=>{this.searchtext_name(text); }} value={this.state.reciever_name}/>

<CustomText text={'Destination PIN'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<CustomInput flex={1} placeholder={'Pincode'} borderColor={Colors.borderColor} borderWidth={SHORT_BORDER_WIDTH} borderRadius={SHORT_BORDER_RADIUS} backgroundColor={Colors.white}onChangeText={(text)=>{this.setState({isSearch:true}); this.searchtext(text); if(text==''){this.setState({isSearch:false})}}}/>


<CustomText text={'Date From'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<TouchableOpacity onPress={() => this.showPicker_from("date")}>
                                    <DatePickerAndroidCustom
                                        backgroundColor={'#fff'}
                                        elevation={8}
                                        mode={"date"}
                                        minDate={new Date("2021-01-01")}
                                        date={this.state.date_from}
                                        place_holder={'Select date from'}   
                                    />  
                                    </TouchableOpacity>

<CustomText text={'Date To'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
<TouchableOpacity onPress={() => this.showPicker_to("date")}>
                                    <DatePickerAndroidCustom
                                        backgroundColor={'#fff'}
                                        elevation={8}
                                        mode={"date"}
                                        minDate={new Date("2021-01-01")}
                                        date={this.state.date_to}
                                        place_holder={'Select date to'}   
                                    />  
                                    </TouchableOpacity>
       
                                    {/* {this.state.cod_check === true &&( <View style={{marginTop:SECTION_MARGIN_TOP, flexDirection:'row'}}>
          <CustomCheckBox color={Colors.buttonBackgroundColor} onPress={()=>{if(this.state.checked_cod==true){this.setState({checked_cod:false})}else{this.setState({checked_cod:true})}}} checked={this.state.checked_cod}/>
          <CustomText text={'COD'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'} paddingLeft={1} mTop={5} />
        </View>)} */}
<CustomButton title={'Filter'} backgroundColor={Colors.darkSkyBlue} height={SHORT_BUTTON_HEIGHT} fontSize={16} borderRadius={SHORT_BLOCK_BORDER_RADIUS} marginTop={SECTION_MARGIN_TOP} onPress={()=>this.fetch_customer_report('DATE')} />

 <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Colors.white }}>
<FlatList
                data={this.state.isSearch ? this.state.details_list_search : this.state.report_details_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />
              </ScrollView>

<View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP,marginBottom:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
    );
  }


}

const styles=StyleSheet.create({

     rowstyle:{
        alignItems:'center',
        
         
        },
        colstyleodd:{
            borderRightWidth:.5,
            borderRightColor:Colors.lightborderColor,
            width:'50%'
          
           },
           colstyleeven:{
            paddingLeft:SECTION_MARGIN_TOP,
            
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

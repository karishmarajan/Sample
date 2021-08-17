import React, { Component, } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView,BackHandler ,AsyncStorage , FlatList ,Modal, Alert} from 'react-native';
import { Container, View, Button, Left, Right, Icon, Text,Grid,Col,Row,Badge ,Toast} from 'native-base';
import { Actions } from 'react-native-router-flux';




import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import CustomSubButton from '../../component/CustomSubButton';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP,FIELD_MARGIN_TOP, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, ORDER_BLOCK_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SHORT_BUTTON_HEIGHT,TOTAL_BLOCK, SHORT_TEXT_FIELD_HIEGHT,TEXT_MARGIN_TOP, NORMAL_FONT,COLUMN_PADDING ,AMOUNT_BLOCK_HIEGHT,SECOND_FONT,LOGIN_FIELD_HEIGHT,FOURTH_FONT} from '../../constants/Dimen';
import CustomText from '../../component/CustomText';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { DELIVERY_COUNT , PICKUP_COUNT, DELIVERY_ASSIGNED_ACCEPT, DELIVERY_ASSIGNED_REJECT ,TASK_ASSIGNED, AMOUNT_COLLECTED ,PICKUP_ORDERS , PICKUP_ASSIGNED_ACCEPT , PICKUP_ASSIGNED_REJECT, DELIVERY_ORDERS } from '../../constants/Api';





export default class Dashboard extends React.Component {
  state ={
    mycart_count:'',
    count_list :[],
    pick_count_list :[],
    task_assigned_list :[],
    task_assigned_active_list :[],
    amount:[],
    pickup_assigned_list:[],
    person_id:'',
    checked: [],
    pickup_orders:[],
    delivery_reject_modal:false,
    pickup_reject_modal:false,
    pickup_rejectall_modal:false,
    reject_reason_delivery:'',
    reject_reason_pickup:'',
    selected_pickup_id:'',
    
  }

  backAction = () => {
    if (Actions.currentScene == 'dashboard') {
    Alert.alert("Wait!", "Do you want to exit From App?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
  }
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    AsyncStorage.getItem(KEY).then((value => {

      let data = JSON.parse(value);
      this.setState({person_id:data.personId});
     this.fetch_delivery_count(data.personId);
     this.fetch_pickup_count(data.personId);
      this.fetch_task_assigned_list(data.personId);
     this.amount_collected_today(data.personId);
     this.fetch_pickup_assigned_list(data.personId);
    //this.fetch_task_assigned_active_list(data.personId)
   
  }));
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  refresh(){
    AsyncStorage.getItem(KEY).then((value => {
  
      let data = JSON.parse(value);
      this.setState({person_id:data.personId});
     this.fetch_delivery_count(data.personId);
     this.fetch_pickup_count(data.personId);
      this.fetch_task_assigned_list(data.personId);
     this.amount_collected_today(data.personId);
     this.fetch_pickup_assigned_list(data.personId);
  
   
  }));
  }
  
    //////////////////////////////////////////// Amount collected fetching function  //////////////////////////////////////////////////////////////////////////////////  
   
   amount_collected_today(val){
  
    Api.fetch_request(AMOUNT_COLLECTED+val,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({amount : result.payload})
      
      }
      else{
        console.log('Failed');
      }
  })
  
   }
  
   //////////////////////////////////////////// Delivery count fetching function  //////////////////////////////////////////////////////////////////////////////////  
   
   fetch_delivery_count(val){
  
    Api.fetch_request(DELIVERY_COUNT+val,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({count_list : result.payload})
      
      }
      else{
        console.log('Failed');
      }
  })
  
   }
  
   //////////////////////////////// Pickup count fetching function /////////////////////////////////////////////////////////////////////////////////////
  
   fetch_pickup_count(val){
  
    Api.fetch_request(PICKUP_COUNT+val,'GET','')
    .then(result => {
     
      if(result.error != true){
  
        console.log('Success:', JSON.stringify(result));
        this.setState({pick_count_list : result.payload})
      
      }
      else{
        console.log('Failed');
      }
  })
  
   }
  
   ////////////////////////////////////// Task assigned fetching function ////////////////////////////////////////////////////////////////////////////////////
  
   fetch_task_assigned_list(val){
  
    let body = {
      "filterType": "STATUS",
      "status": "ASSIGNMENT_NOT_CONFIRMED",
      "personId": val
    };
  
    Api.fetch_request(DELIVERY_ORDERS, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.setState({ task_assigned_list: result.payload })
  
          this.setState({mycart_count:''+(this.state.task_assigned_list).length})
  
        }
        else {
          console.log('Failed');
          this.setState({ task_assigned_list: ''})
        }
      })
  
   }
  
   /////////////////////////////// Checkbox checking function ///////////////////////////////////////////////////////////////////////////////////
  
   checkItem = (item) => {
    const { checked } = this.state;
    console.log(item)
    if (!checked.includes(item)) {
  
      setTimeout(()=>{this.setState({ checked: [...this.state.checked, item] })},100);
      // setTimeout(()=>{ alert(this.state.checked)},3000);
     
    } else {
      setTimeout(()=>{this.setState({ checked: checked.filter(a => a !== item) })},100);
    }
    console.log(checked)
  };
  ////////////////////////////////////// Delivery assigned accepting function ////////////////////////////////////////////////////////////////////////////////////
  
  delivery_assigned_accept() {
  
    let body = {
      "deliveryId": this.state.checked,
    };
  
    Api.fetch_request(DELIVERY_ASSIGNED_ACCEPT, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.fetch_task_assigned_list(this.state.person_id);
  
        }
        else {
          console.log('Failed');
          
        }
      })
  }
  
  ////////////////////////////////////// Delivery assigned rejecting function ////////////////////////////////////////////////////////////////////////////////////
  
  delivery_assigned_reject() {
  
    if(this.state.reject_reason_delivery==="") {
      Toast.show({ text:"You have to provide reason", type: 'warning' });
      return;
    }
  
    let body = {
      "deliveryFailedReason": this.state.reject_reason_delivery ,
      "deliveryId": this.state.checked,
    };
  
    Api.fetch_request(DELIVERY_ASSIGNED_REJECT, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.fetch_task_assigned_list(this.state.person_id);
          this.setState({reject_reason_delivery:''})
  
        }
        else {
          console.log('Failed');
        }
      })
  }
  
  ////////////////////////////////////// Task assigned active fetching function ////////////////////////////////////////////////////////////////////////////////////
  
  fetch_task_assigned_active_list(val){
  
    let body = {
      "filterType": "STATUS",
      "status": "ACTIVE",
      "personId": val
    };
  
    Api.fetch_request(DELIVERY_ORDERS, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.setState({ task_assigned_active_list: result.payload })
  
        }
        else {
          console.log('Failed');
          this.setState({ task_assigned_active_list:''})
        }
      })
  
   }
  
   ////////////////////////////////////// Pickup assigned fetching function ////////////////////////////////////////////////////////////////////////////////////
  
  fetch_pickup_assigned_list(val) {
  
      let body = {
        "filterType": "STATUS",
        "status": "ASSIGNMENT_NOT_CONFIRMED",
        "personId": val
      };
  
      Api.fetch_request(PICKUP_ORDERS, 'POST', '', JSON.stringify(body))
        .then(result => {
  
          let orders=[];
  
          if (result.error != true) {
  
            console.log('Success:', JSON.stringify(result));
            this.setState({ pickup_assigned_list: result.payload })
            
            var count = (result.payload).length;
  
            for(var i = 0; i < count; i++){
             orders.push(result.payload[i].pickupId)
            }
            this.setState({ pickup_orders: orders })
  
            console.log('###############################'+this.state.pickup_orders);
          }
          else {
            console.log('Failed');
            this.setState({ pickup_assigned_list:''})
          }
        })
  }
  
  ////////////////////////////////////// Pickup assigned accepting function ////////////////////////////////////////////////////////////////////////////////////
  
  pickup_assigned_accept(val) {
  
    let body = {
      "pickupId": [val],
    };
  
    Api.fetch_request(PICKUP_ASSIGNED_ACCEPT, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.fetch_pickup_assigned_list(this.state.person_id);
  
        }
        else {
          console.log('Failed');
        }
      })
  }
  
  
  ////////////////////////////////////// Pickup accept all function ////////////////////////////////////////////////////////////////////////////////////
  
  pickup_assigned_acceptall() {
  
    let body = {
      "pickupId": this.state.pickup_orders,
    };
  
    Api.fetch_request(PICKUP_ASSIGNED_ACCEPT, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.fetch_pickup_assigned_list(this.state.person_id);
  
        }
        else {
          console.log('Failed');
        }
      })
  }
  
  ////////////////////////////////////// Pickup assigned rejecting function ////////////////////////////////////////////////////////////////////////////////////
  
  pickup_assigned_reject() {
   
  
    if(this.state.reject_reason_pickup==="") {
      Toast.show({ text:"You have to provide reason", type: 'warning' });
      return;
    }
  
    let body = {
      "pickupFailedReason": this.state.reject_reason_pickup,
      "pickupId": [this.state.selected_pickup_id],
    };
  
    Api.fetch_request(PICKUP_ASSIGNED_REJECT, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.fetch_pickup_assigned_list(this.state.person_id);
          this.setState({reject_reason_pickup:''})
  
        }
        else {
          console.log('Failed');
        }
      })
  }
  
  ////////////////////////////////////// Pickup areject all function ////////////////////////////////////////////////////////////////////////////////////
  
  pickup_assigned_rejectall() {
  
    if(this.state.reject_reason_pickup==="") {
      Toast.show({ text:"You have to provide reason", type: 'warning' });
      return;
    }
  
    let body = {
      "pickupFailedReason": this.state.reject_reason_pickup,
      "pickupId": this.state.pickup_orders,
    };
  
    Api.fetch_request(PICKUP_ASSIGNED_REJECT, 'POST', '', JSON.stringify(body))
      .then(result => {
  
        if (result.error != true) {
  
          console.log('Success:', JSON.stringify(result));
          this.fetch_pickup_assigned_list(this.state.person_id);
          this.setState({reject_reason_pickup:''})
  
        }
        else {
          console.log('Failed');
        }
      })
  }
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
   _bodypickup = (item) => {
    return (
  
      <Row style={styles.rowstyle1}>
      <Col style={styles.colstyle1}>
      <Text style={{fontSize:12,}}>Order ID: {item.preDefinedOrderId?item.preDefinedOrderId:item.orderId ? item.orderId : Strings.na}   </Text>
      {/* <Text style={{fontSize:12,}}>Cust. Name: {item.contactPersonName ? item.contactPersonName : Strings.na}</Text> */}
      <Text style={{fontSize:12,}}>After Pickup: {item.afterPickupStatus == 'TO_OFFICE' ? 'To Office' :'To Reciever'}</Text>
      <CustomText text={'Details'} color={Colors.darkSkyBlue} textType={Strings.subtext} onPress={()=>Actions.pickupdetailsview({pickup_id:item.pickupId})}/>
      </Col>
      <Col ><CustomButton title={'Reject'} text_color={Colors.red} backgroundColor={Colors.white}   marginTop={1} fontSize={NORMAL_FONT} showIcon={true} icon_name={'ios-close'} icon_color={Colors.red} icon_fontsize={NORMAL_FONT} onPress={()=>{this.setState({pickup_reject_modal:true,selected_pickup_id:item.pickupId});}}/>
     </Col>
      <Col ><CustomButton title={'Accept'} text_color={Colors.green} backgroundColor={Colors.white}  marginTop={1}  fontSize={NORMAL_FONT} showIcon={true} icon_name={'md-checkmark'} icon_color={Colors.green} icon_fontsize={NORMAL_FONT} onPress={()=>this.pickup_assigned_accept(item.pickupId)}/></Col>
    </Row>
  
  
  
    )
  }
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
   _body = (item) => {
    return (
  
  
  <View style={{borderRadius:5,backgroundColor:Colors.gray,padding:6,width:280,marginTop:SECTION_MARGIN_TOP}}>
  <View style={{flexDirection:'row'}}>
  <Grid><Col style={styles.colstyle}>{ item.deliveryStatus === "ASSIGNMENT_NOT_CONFIRMED" && (<View><CustomCheckBox color={Colors.buttonBackgroundColor} onPress={()=>this.checkItem(item.deliveryId)} checked={this.state.checked.includes(item.deliveryId)}/></View>)}</Col>
  <Col><Row style={styles.contents}><CustomText text={'Order ID'} color={Colors.black} textType={Strings.subtext}/></Row>
  <Row style={styles.contents}><CustomText text={'Cust. Name'} color={Colors.black} textType={Strings.subtext}/></Row></Col>
  <Col><Row style={styles.contents}><CustomText text={item.preDefinedOrderId?item.preDefinedOrderId: item.orderId ? item.orderId : Strings.na} color={Colors.black} textType={Strings.subtext}/></Row>
  <Row style={styles.contents}><CustomText text={item.contactPersonName ? item.contactPersonName : Strings.na} color={Colors.black} textType={Strings.subtext}/></Row>
  <Row style={styles.contents}><CustomText text={'Details'} color={Colors.darkSkyBlue} textType={Strings.subtext} onPress={()=>Actions.taskassigneddetails({delivery_id:item.deliveryId})}/></Row>
  </Col></Grid>
  </View>
  </View>
  
  
  
    )
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  _footer = () => {
    return (
      <View style={{flex:1,flexDirection:'row',marginLeft:10,flex:8}}>
                <CustomButton title={'Accept Selected'} backgroundColor={Colors.green}  height={SHORT_BUTTON_HEIGHT}  flex={1} onPress={()=>this.delivery_assigned_accept()}/>
                <CustomButton title={'Reject Selected'} backgroundColor={Colors.red}  height={SHORT_BUTTON_HEIGHT} marginLeft={SECTION_MARGIN_TOP}  flex={1} onPress={()=>{this.setState({delivery_reject_modal:true});}}/>
              </View>
    )
  }
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
   _body_activetask = (item) => {
    return (
      <View style={{height:90,borderRadius:5,backgroundColor:Colors.lightgreen,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
      <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
      <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
      <Col><Row style={styles.contents}><CustomText text={'Order ID'} color={Colors.black} textType={Strings.subtext}/></Row>
      <Row style={styles.contents}><CustomText text={'Cust. Name'} color={Colors.black} textType={Strings.subtext}/></Row></Col>
      <Col><Row style={styles.contents}><Text style={{fontSize:SECOND_FONT,marginTop:5}}>{item.preDefinedOrderId?item.preDefinedOrderId:item.orderId ? item.orderId : Strings.na}</Text></Row>
      <Row style={styles.contents}><Text style={{fontSize:SECOND_FONT,marginTop:5}}>{item.contactPersonName ? item.contactPersonName : Strings.na}</Text></Row></Col></Grid>
  </View>
  </View>
  
  
    )
  }
  

  render() {
    var left = (
      <Left  style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon style={{ color:Colors.navbarIconColor }} name='ios-menu' />
          </Button>
         
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        {/* <Button  transparent onPress={()=>Actions.chat()}>
          <Icon style={{ color:Colors.navbarIconColor }} name='ios-chatbubbles' />
        </Button> */}
        <Button  transparent onPress={()=>Actions.notification()}>
         <Icon style={{color:Colors.navbarIconColor }} name='ios-notifications' />
         <Badge style={{width: 10, backgroundColor: 'orange',height:12,marginTop:20,borderRadius:10}} 
                            textStyle={{color: 'white', fontSize: 20, lineHeight: 20}}></Badge>
        </Button>
        <Button  transparent onPress={()=>this.refresh()}>
          <Icon style={{ color:Colors.navbarIconColor }} name='ios-refresh' />
        </Button>
       
      </Right>
    );

    return (
     
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>


 {/*////////////////////////////////////// Modal Delivery reject Block //////////////////////////////////////////////// */}

 <Modal visible={this.state.delivery_reject_modal}  transparent={true} animationType={"fade"} supportedOrientations={['landscape']} >
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.dimColor }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center',justifyContent:'center', width:'80%', padding:20,borderRadius:SHORT_BLOCK_BORDER_RADIUS }}>
       
          <CustomText text={'Enter Reason'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text)=>this.setState({reject_reason_delivery:text})} flex={1}/>
          <CustomButton title={'Submit'} onPress={()=>{this.setState({delivery_reject_modal:false});  this.delivery_assigned_reject()}}/>
     
    </View>
</View>
</Modal>

 {/*////////////////////////////////////// Modal Pickup reject Block //////////////////////////////////////////////// */}

 <Modal visible={this.state.pickup_reject_modal}  transparent={true} animationType={"fade"} supportedOrientations={['landscape']} >
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.dimColor }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center',justifyContent:'center',width:'80%',padding:20,borderRadius:SHORT_BLOCK_BORDER_RADIUS }}>
       
          <CustomText text={'Enter Reason'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text)=>this.setState({reject_reason_pickup:text})} flex={1}/>
          <CustomButton title={'Submit'} onPress={()=>{this.setState({pickup_reject_modal:false}); this.pickup_assigned_reject()}}/>
     
    </View>
</View>
</Modal>

 {/*////////////////////////////////////// Modal Pickup reject All Block //////////////////////////////////////////////// */}

 <Modal visible={this.state.pickup_rejectall_modal}  transparent={true} animationType={"fade"} supportedOrientations={['landscape']} >
<View style={{ justifyContent: 'center', flex: 1, backgroundColor: Colors.dimColor }}>
    <View style={{ backgroundColor: Colors.white, alignSelf: 'center',justifyContent:'center',width:'80%',padding:20,borderRadius:SHORT_BLOCK_BORDER_RADIUS }}>
       
          <CustomText text={'Enter Reason'} textType={Strings.subtext} color={Colors.black} fontWeight={'bold'}/>
          <CustomInput borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text)=>this.setState({reject_reason_pickup:text})} flex={1}/>
          <CustomButton title={'Submit'} onPress={()=>{this.setState({pickup_rejectall_modal:false}); this.pickup_assigned_rejectall()}}/>
     
    </View>
</View>
</Modal>

{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <Navbar left={left} right={right} title="Dashboard"/>
          <ScrollView contentContainerStyle={{flexGrow:1}}>



  {/*////////////////////////////////////////////////// main view //////////////////////////////////////////////// */}

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:MAIN_VIEW_PADDING}}>

 {/*////////////////////////////////////// Order Transfer Block //////////////////////////////////////////////// */}

 {/* <View style={{ backgroundColor:Colors.white,height:ORDER_BLOCK_HIEGHT,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING}}>
          <CustomText text={'Order Transfer Status:'} textType={Strings.maintext} fontWeight={'bold'} />
          <CustomText text={'Waiting for your Approval'} textType={Strings.maintext} />
          <View style={{flex:3,flexDirection:'row',}}>
              <CustomButton title={'Reject'} backgroundColor={Colors.red}  height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BLOCK_BORDER_RADIUS} flex={1}/>
              <CustomButton title={'Verify'} backgroundColor={Colors.green}  height={SHORT_BUTTON_HEIGHT} marginLeft={SECTION_MARGIN_TOP} borderRadius={SHORT_BLOCK_BORDER_RADIUS} flex={1} onPress={()=>Actions.verifytasktransfer()}/>
          </View>
          </View> */}



{/*////////////////////////////////////////////////// Task Assigned Block //////////////////////////////////////////////// */}

<ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{marginTop:SECTION_MARGIN_TOP,}}>
<View style={{padding:10,backgroundColor:Colors.white,width:'100%',flexGrow:1,}}>
  
<View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',width:'25%'}}>
      <View style={{flex:4}}><CustomText text={'Delivery Assigned'} textType={Strings.maintext} fontWeight={'bold'}/></View>
      <View style={{flex:2}}><CustomSubButton title={'Save'}/></View>
      <View style={{flex:2}}><CustomSubButton title={'Submit'}/></View> 
        </View>
       <View style={{flexGrow:1,flexDirection:'row'}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
        <CustomCheckBox title={'MY CART'} color={Colors.buttonBackgroundColor} checked={true} fontSize={12}/>
        <Text style={{fontSize:14,color:Colors.darkSkyBlue,marginLeft:10,marginTop:11}}>({this.state.mycart_count})</Text>
        <CustomButton title={'VERIFY'} height={30} marginLeft={70} marginRight={15} marginTop={10}/>
        </View>
        </View>

        <FlatList
                data={this.state.task_assigned_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
                ListFooterComponent={this._footer}
              />

</ScrollView>


{/*////////////////////////////// Active Cart //////////////////////////////////////////////// */}

<View>
<View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,width:250}}>
        <CustomCheckBox title={'ACTIVE'} color={Colors.buttonBackgroundColor} checked={true}/>
        </View>
        </View>
       

        <FlatList
                data={this.state.task_assigned_active_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body_activetask(item)}
                // ListHeaderComponentStyle={styles.header}
                // ListFooterComponent={this._footer}
              />


        {/* <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} color={Colors.black} textType={Strings.subtext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} color={Colors.black} textType={Strings.subtext}/></Row></Col>
        <Col><Row style={styles.contents}><Text style={{fontSize:SECOND_FONT,marginTop:5}}>12345</Text></Row>
        <Row style={styles.contents}><Text style={{fontSize:SECOND_FONT,marginTop:5}}>Vivek purush</Text></Row></Col></Grid> */}

       
        </View>


{/*//////////////////////////////// Wrong Cart //////////////////////////////////////////////// */}


<View>
        <View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,width:250}}>
        <CustomCheckBox title={'WRONG'} color={Colors.buttonBackgroundColor} checked={true}/>
        </View>
        </View>
        <View style={{borderRadius:5,backgroundColor:Colors.lightPink,padding:6,width:280,marginTop:SECTION_MARGIN_TOP}}>
        <View style={{flexDirection:'row'}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor}/></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} color={Colors.black} textType={Strings.subtext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} color={Colors.black} textType={Strings.subtext}/></Row></Col>
        <Col><Row style={styles.contents}><CustomText text={'12345'} color={Colors.black} textType={Strings.subtext}/></Row>
        <Row style={styles.contents}><CustomText text={'Vivek purush'} color={Colors.black} textType={Strings.subtext}/></Row>
        <Row style={styles.contents}><CustomText text={'Details'} color={Colors.darkSkyBlue} textType={Strings.subtext} onPress={()=>Actions.taskassigneddetails()}/></Row>
        </Col></Grid>
        </View>
        </View>
        </View>


{/*////////////////////////// Missing Cart//////////////////////////////////////////////// */}

<View>
        <View style={{height:50,borderTopLeftRadius:5,borderTopRightRadius:8,backgroundColor:Colors.textBackgroundColor,marginTop:SECTION_MARGIN_TOP,marginRight:10,width:300}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP,width:250}}>
        <CustomCheckBox title={'MISSING'} color={Colors.buttonBackgroundColor} checked={true}/>
        </View>
        </View>
        <View style={{height:90,borderRadius:5,backgroundColor:Colors.darkPink,marginTop:SECTION_MARGIN_TOP,marginLeft:10,width:280}}>
        <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
        <Grid><Col style={styles.colstyle}><CustomCheckBox color={Colors.buttonBackgroundColor} /></Col>
        <Col><Row style={styles.contents}><CustomText text={'Order ID'} color={Colors.black} textType={Strings.subtext}/></Row>
        <Row style={styles.contents}><CustomText text={'Cust. Name'} color={Colors.black} textType={Strings.subtext}/></Row></Col>
        <Col><Row style={styles.contents}><CustomText text={'12345'} color={Colors.black} textType={Strings.subtext}/></Row>
        <Row style={styles.contents}><CustomText text={'Vivek purush'} color={Colors.black} textType={Strings.subtext}/></Row></Col></Grid>
        </View>
        </View>
        </View>
        
        </View>
</View>
            </ScrollView>


  {/*//////////////////////////////////////// Pickup Notification block //////////////////////////////////////////////// */}

              <View style={{backgroundColor:Colors.aash,flexDirection:'row',marginTop:SECTION_MARGIN_TOP,padding:6,alignItems:'center'}}>
              <View style={{flex:4}}><CustomText  text={'Pickup Assigned'} textType={Strings.maintext} /></View>
              <View style={{flex:2}}><CustomButton title={'Reject all'} text_color={Colors.red} backgroundColor={Colors.aash}  height={SHORT_BUTTON_HEIGHT} marginTop={5} paddingTop={2} paddingBottom={2} paddingRight={2} paddingLeft={2} fontSize={SECOND_FONT} onPress={()=>this.setState({pickup_rejectall_modal:true})} /></View>
              <View style={{flex:2}}><CustomButton title={'Accept all'} text_color={Colors.green} backgroundColor={Colors.aash}  height={SHORT_BUTTON_HEIGHT} marginTop={5} paddingTop={2} paddingBottom={2} paddingRight={2} paddingLeft={2} fontSize={SECOND_FONT} onPress={()=>this.pickup_assigned_acceptall()} /></View>
              </View>
              <View style={{backgroundColor:Colors.white,}}>
                <Grid>
                <FlatList
                data={this.state.pickup_assigned_list}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) => this._bodypickup(item)}
              />
                </Grid>
              </View>

 {/*//////////////////////////////////// Amount Collected block //////////////////////////////////////////////// */}

          <View style={{ backgroundColor:Colors.white,borderRadius:MAIN_BLOCK_BORDER_RADIUS,padding:COLUMN_PADDING,marginTop:SECTION_MARGIN_TOP}}>
          <CustomText text={'Amount collected today'} textType={Strings.maintext}/>
          <View style={{flexDirection:'row',flex:10}}>
           <Text style={{fontSize:FOURTH_FONT,fontWeight:'bold',marginLeft:5,flex:9}}>Rs:{this.state.amount.amountCollectedToday ? this.state.amount.amountCollectedToday :'N/A' }</Text>
           {/* <Icon name={'ios-arrow-forward'} style={{color:Colors.darkSkyBlue,fontSize:16,flex:1,}}/> */}
           </View>
          </View>

 {/*/////////////////////////////////////////////// Delivery Out Status block //////////////////////////////////////////////// */}

<View>
 <View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row',height:LOGIN_FIELD_HEIGHT,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',borderRadius:SHORT_BLOCK_BORDER_RADIUS}}>
              <CustomText  text={'Delivery Out Status'} textType={Strings.maintext} flex={9} />
             
              </View>
              <View style={{backgroundColor:Colors.aash,paddingBottom:SECTION_MARGIN_TOP,paddingLeft:SECTION_MARGIN_TOP,paddingRight:SECTION_MARGIN_TOP,height:120}}>
                <Grid>
                  <Row style={styles.rowstyleodd}>
                    <Col style={styles.colstyleodd}><CustomText text={'Completed'} textType={Strings.maintext} fontSize={SECOND_FONT}/></Col>
                    <Col style={styles.colstyleeven}><Text style={{fontSize:SECOND_FONT,}}>{this.state.count_list.DELIVERED ? this.state.count_list.DELIVERED :'0' }</Text></Col>
                  </Row>
                  <Row style={styles.rowstyleeven}>
                    <Col style={styles.colstyleodd}><CustomText text={'Pending'} textType={Strings.maintext} fontSize={SECOND_FONT}/></Col>
                    <Col style={styles.colstyleeven}><Text style={{fontSize:SECOND_FONT,}}>{this.state.count_list.ASSIGNED ? this.state.count_list.ASSIGNED :'0' }</Text></Col>
                  </Row>
                  <Row style={styles.rowstyleodd}>
                    <Col style={styles.colstyleodd}><CustomText text={'Failed'} textType={Strings.maintext} fontSize={SECOND_FONT}/></Col>
                    <Col style={styles.colstyleeven}><Text style={{fontSize:SECOND_FONT,}}>{this.state.count_list.ATTEMPT_FAILED ? this.state.count_list.ATTEMPT_FAILED :'0' }</Text></Col>
                  </Row>
                </Grid>
              </View>
         
              </View>

{/*//////////////////////////////////////////////// Pickup Status block //////////////////////////////////////////////// */}

<View>
<View style={{backgroundColor:Colors.white,flex:10,flexDirection:'row',height:LOGIN_FIELD_HEIGHT,marginTop:SECTION_MARGIN_TOP,padding:MAIN_VIEW_PADDING,alignItems:'center',borderRadius:SHORT_BLOCK_BORDER_RADIUS}}>
              <CustomText  text={'Pickup Status'} textType={Strings.maintext} flex={9} />
             
              </View>
              <View style={{backgroundColor:Colors.aash,paddingBottom:SECTION_MARGIN_TOP,paddingLeft:SECTION_MARGIN_TOP,paddingRight:SECTION_MARGIN_TOP,height:120}}>
                <Grid>
                  <Row style={styles.rowstyleodd}>
                    <Col style={styles.colstyleodd}><CustomText text={'Completed'} textType={Strings.maintext} fontSize={SECOND_FONT}/></Col>
    <Col style={styles.colstyleeven}><Text style={{fontSize:SECOND_FONT,}}>{this.state.pick_count_list.COLLECTED ? this.state.pick_count_list.COLLECTED :'0' }</Text></Col>
                  </Row>
                  <Row style={styles.rowstyleeven}>
                    <Col style={styles.colstyleodd}><CustomText text={'To be Collected'} textType={Strings.maintext} fontSize={SECOND_FONT}/></Col>
                    <Col style={styles.colstyleeven}><Text style={{fontSize:SECOND_FONT,}}>{this.state.pick_count_list.ASSIGNED ? this.state.pick_count_list.ASSIGNED :'0' }</Text></Col>
                  </Row>
                  <Row style={styles.rowstyleodd}>
                    <Col style={styles.colstyleodd}><CustomText text={'Failed'} textType={Strings.maintext} fontSize={SECOND_FONT}/></Col>
                    <Col style={styles.colstyleeven}><Text style={{fontSize:SECOND_FONT,}}>{this.state.pick_count_list.ATTEMPT_FAILED ? this.state.pick_count_list.ATTEMPT_FAILED :'0' }</Text></Col>
                  </Row>
                </Grid>
              </View>
              </View>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}

<View style={{alignItems:'flex-end',marginTop:SECTION_MARGIN_TOP}}><CustomText  text={Strings.version} textType={Strings.subtext} color={Colors.darkSkyBlue} /></View>
              </View>
              </ScrollView>
        </Container>
        </SideMenuDrawer>
    );
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color : "cadetblue"
  },
  textinput :{
    fontSize:SECOND_FONT,
    color:Colors.subTextColor,
    backgroundColor:Colors.textBackgroundColor,
    paddingLeft:10,
    paddingTop:6,
    height:30,
    borderRadius:5,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},

content: {
    minWidth: '30%',
    maxWidth: '50%',
    height: 70,
    top: 5,
    padding: 5,
    borderWidth: 0.6,
    borderColor: Colors.lightborderColor
},

contents: {
  minWidth: '30%',
  maxWidth: '100%',
  height: 30,
  
},

colstyle:{
  minWidth: '10%',
  maxWidth: '15%',
  paddingTop:6,
},
cusdetails: {
  height:90,
  borderRadius:5,
  backgroundColor:Colors.gray,
  marginTop:SECTION_MARGIN_TOP,
  marginLeft:10,
  width:280,
  paddingTop:SECTION_MARGIN_TOP,
  flexDirection:'row'
},
colstyle1:{
  minWidth: '30%',
  maxWidth: '50%',
  padding:10,
  
},
rowstyle1:{
 borderBottomWidth:2,
 borderColor:Colors.textBackgroundColor,
 
},
rowstyleodd:{
 backgroundColor:Colors.rowBackgroundColor,
 alignItems:'center',
  
 },
 rowstyleeven:{
  backgroundColor:Colors.aash,
 alignItems:'center',
 },
 colstyleodd:{
  borderRightWidth:.5,
  borderRightColor:Colors.lightborderColor,

 },
 colstyleeven:{
  paddingLeft:SECTION_MARGIN_TOP,
  minWidth:'20%',
  maxWidth:'40%',
 },
});
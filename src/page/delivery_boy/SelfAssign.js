import React, { Component } from 'react';
import { ScrollView,StyleSheet, FlatList, AsyncStorage, Modal} from 'react-native';
import { Container, View, Button, Left, Right,Icon,Text,Badge,Grid,Col,Row,} from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';
import { SECTION_MARGIN_TOP, SHORT_BORDER_WIDTH, SHORT_BORDER_RADIUS, MAIN_VIEW_PADDING, NORMAL_FONT, BORDER_WIDTH , TEXT_PADDING_RIGHT , SECOND_FONT , CAMERA_SIZE ,COLUMN_PADDING , SHORT_BUTTON_HEIGHT , SIXTH_FONT} from '../../constants/Dimen';
import session, { KEY } from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { DELIVERY_ORDERS ,SELF_ASSIGN_ORDERS , SELF_UNASSIGN ,SELF_ASSIGN } from '../../constants/Api';


export default class SelfAssign extends React.Component {

  state = {
    modal_visible: false,
    search: '',
    self_assigned_list: [],
    to_assign_list:[],
    order_id:'',
    checkbox_checked:false,
    checked: [],
  };

  // _menu = null;

  // setMenuRef = ref => {
  //   this._menu = ref;
  // };

  // hideMenu = () => {
  //   this._menu.hide();
  // };

  // showMenu = () => {
  //   this._menu.show();
  // };

  componentDidMount() {
    this.fetch_delivery_orders()
  }

/////////////////////////////////// Select orders for assign function //////////////////////////////////////////////////////////////////////////////////////
 
select_orders_forassign(order_id) {


    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      Api.fetch_request(SELF_ASSIGN_ORDERS+order_id+'/'+data.personId , 'GET', '')
      .then(result => {
     
        if(result.error != true){
    
          console.log('Success:', JSON.stringify(result));
          this.fetch_delivery_orders()
          
        }
        else{
          console.log('Failed');
          alert(result.message)
        }
    })
    }));
  }

/////////////////////////////// Fetching delivery orders function ////////////////////////////////////////////////////////////////////////////////////

  fetch_delivery_orders() {

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      let body = {
        "filterType": "STATUS",
        "status": "ASSIGNMENT_INPROGRESS",
        "personId": data.personId

      };

      Api.fetch_request(DELIVERY_ORDERS, 'POST', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            this.setState({ self_assigned_list: result.payload })

          }
          else {
            console.log('Failed');
          }
        })
    }));
  }

 ///////////////////////////////// Remove assigned orders function //////////////////////////////////////////////////////////////////////////////////////// 
 
 remove_assigned_order(delivery_id) {

    AsyncStorage.getItem(KEY).then((value => {
      let data = JSON.parse(value);

      let body = {
        "deliveryId": [delivery_id],
        "personId": data.personId

      };

      Api.fetch_request(SELF_UNASSIGN, 'POST', '', JSON.stringify(body))
        .then(result => {

          if (result.error != true) {

            console.log('Success:', JSON.stringify(result));
            alert("removed")
            this.fetch_delivery_orders()

          }
          else {
            console.log('Failed');
          }
        })
    }));
  }

///////////////////////////////// Remove assigned multiple orders function //////////////////////////////////////////////////////////////////////////////////////// 
 
remove_assigned_multiple_orders() {
  this.setState({modal_visible:false})
  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      "deliveryId": this.state.checked,
      "personId": data.personId

    };

    Api.fetch_request(SELF_UNASSIGN, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          alert("removed")
          this.fetch_delivery_orders()

        }
        else {
          console.log('Failed');
        }
      })
  }));
}

///////////////////////////////// Save assigned multiple orders function //////////////////////////////////////////////////////////////////////////////////////// 
 
save_assigned_multiple_orders() {

  this.setState({modal_visible:false})

  AsyncStorage.getItem(KEY).then((value => {
    let data = JSON.parse(value);

    let body = {
      "deliveryId": this.state.checked,
      "personId": data.personId

    };

    Api.fetch_request(SELF_ASSIGN, 'POST', '', JSON.stringify(body))
      .then(result => {

        if (result.error != true) {

          console.log('Success:', JSON.stringify(result));
          alert("Assigned")
          this.fetch_delivery_orders()

        }
        else {
          console.log('Failed');
        }
      })
  }));
}

/////////////////////////////// Checkbox checking function ///////////////////////////////////////////////////////////////////////////////////

  checkItem = (item) => {
    const { checked } = this.state;
    console.log(item)
    if (!checked.includes(item)) {
      this.setState({ checked: [...checked, item] });
      
    } else {
      this.setState({ checked: checked.filter(a => a !== item) });
    }
    console.log(checked)
};

  ///////////////////////////////////// Checkbox function ///////////////////////////////////////////////////////////////////////////////////////

  chkbox_checked_fun(delivery_id){
    if(this.state.checkbox_checked==true){
      this.setState({checkbox_checked:false})
    }
    if(this.state.checkbox_checked==false){
      this.setState({checkbox_checked:true})
    }
  }

  //////////////////////////////////// Flatlist header function /////////////////////////////////////////////////////////////////////////////////

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

  ////////////////////////////////////// Flat list body function ///////////////////////////////////////////////////////////////////////////////////
  
  _body = (item) => {
    return (

      <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 , borderLeftWidth:0.3 }}>
        <View style={styles.cell1}><CustomCheckBox color={Colors.buttonBackgroundColor} onPress={()=>this.checkItem(item.deliveryId)} checked={this.state.checked.includes(item.deliveryId)} /></View>
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
          <Icon name="remove-circle" style={{color:Colors.red,paddingLeft:SECTION_MARGIN_TOP,paddingRight:SECTION_MARGIN_TOP,fontSize:SIXTH_FONT}} onPress={()=>this.remove_assigned_order(item.deliveryId)}/>
          </View>
        </View>

      </View>


    )
  }

/////////////////////////////////  Render function  //////////////////////////////////////////////////////////////////////////////

render(){
  var left = (
    <Left style={{ flex: 1 }}>
      <Button onPress={() => Actions.pop()} transparent>
        <Icon style={{ color:Colors.navbarIconColor}} name='md-arrow-round-back' />
        </Button>
    </Left>
  );
      var right = (
        <Right style={{ flex: 1 }}>
          {/* <Button onPress={this.showMenu} transparent> */}
          <Button onPress={()=>this.setState({modal_visible:true})} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-more' />
          </Button>
        </Right>
      );


    return(
     
      <Container>

{/*////////////////////////////////////// Modal Block //////////////////////////////////////////////////////////////////////// */}

 <Modal visible={this.state.modal_visible} supportedOrientations={['landscape']} transparent>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>  
        <View style={styles.modalview}>
          <CustomText text={'Save'} textType={Strings.subtext} onPress={()=>this.save_assigned_multiple_orders()}/>
          <CustomText text={'Delete'} textType={Strings.subtext} onPress={()=>this.remove_assigned_multiple_orders()}/>
        </View>
        </View>
</Modal>
      
      <View style={{position:'absolute'}}>
       {/* <Menu
          ref={this.setMenuRef}>
          <MenuItem onPress={this.hideMenu}>Save</MenuItem>
          <MenuItem onPress={this.hideMenu}>Delete</MenuItem>
        </Menu> */}
        </View>

        <Navbar left={left} right={right} title="Self Assign" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.mainBackgroundColor,padding:COLUMN_PADDING}}>
        <View style={{ backgroundColor:Colors.white,padding:MAIN_VIEW_PADDING,borderRadius:SHORT_BORDER_RADIUS, marginTop:SECTION_MARGIN_TOP}}>
   
      

 {/*//////////////////////////////////////////////// Selecting Order id Block //////////////////////////////////////////////////// */}

        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,alignItems:'center',justifyContent:'space-between',padding:TEXT_PADDING_RIGHT,backgroundColor:Colors.scanBackground}}>
        <CustomText text={'Add order by scanning'} textType={Strings.subtext}  color={Colors.darkSkyBlue}/>
        <Icon style={{ color:Colors.darkSkyBlue}} name='ios-barcode' />
          </View>

          <CustomText text={'or'} textType={Strings.subtext} color={Colors.black} textAlign={'center'}/>

        <View style={{flexDirection:'row',flex:1,borderColor:Colors.borderColor,borderWidth:SHORT_BORDER_WIDTH,borderRadius:SHORT_BORDER_RADIUS,padding:1,alignItems:'center',justifyContent:'space-between',}}>
        <CustomInput backgroundColor={Colors.white} placeholder={'Enter Order Id here'} onChangeText={(text) => this.setState({order_id: text})} value={this.state.order_id}   />
        <CustomButton title={'ADD'} marginTop={BORDER_WIDTH} height={SHORT_BUTTON_HEIGHT} borderRadius={SHORT_BORDER_RADIUS} fontSize={NORMAL_FONT} marginRight={TEXT_PADDING_RIGHT} onPress={()=>this.select_orders_forassign(this.state.order_id)}/>
        </View>
      
        </View>

 {/*///////////////////////////////////////// Delivery Sheet Block //////////////////////////////////////////////// */}


<View style={{flexDirection:'row',backgroundColor:Colors.aash,height:CAMERA_SIZE,marginTop:SECTION_MARGIN_TOP}}>
<Text style={{fontSize:SECOND_FONT,fontWeight:'bold',textAlignVertical:'center',paddingLeft:TEXT_PADDING_RIGHT}}>Delivery Sheet 1</Text>
</View>


{/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

        <View>
        <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{backgroundColor:Colors.white}}>
    
        <FlatList
                data={this.state.self_assigned_list}
                keyExtractor={(x, i) => i}
                ListHeaderComponent={this._header}
                renderItem={({ item }) => this._body(item)}
                ListHeaderComponentStyle={styles.header}
              />



        </ScrollView>
        </View>


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
  modalview :{
  padding:10 ,
  backgroundColor: Colors.white,
  marginTop:20,
  marginRight:20
  },

});
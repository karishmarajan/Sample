import React, { Component } from 'react';
import { ScrollView,StyleSheet,BackHandler, AsyncStorage } from 'react-native';
import { Container, View, Left, Button, Icon, Input, Text, Col,Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Colors from '../../constants/Colors';
import CustomButton from '../../component/CustomButton';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import { SECTION_MARGIN_TOP, SCREEN_HEIGHT } from '../../constants/Dimen';
import session,{KEY} from '../../session/SessionManager';

export default class Index extends Component{


    render(){

    return(
 
<Container style={{backgroundColor:Colors.indexBackGroundColor, justifyContent:'center'}}>
<ScrollView contentContainerStyle={{flexGrow:1}}>

<View style={{flexDirection:'row'}}>
    <View style={{flex:4}}><Text style={{fontSize: 32, justifyContent:'center', color: Colors.white,textAlign:'center',marginTop:60,fontWeight:'bold',marginBottom:35}}>Epex </Text></View>
    {/* <View style={{flex:1}}><Button onPress={this.props.onClose} transparent>
        <Icon name="md-close" style={{color:'white',marginTop:120}} />
        </Button></View> */}
</View>




 <Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.dashboard()}}>Dashboard </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.deliveryfirst()}}>Delivery </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.pickup();  }}>Pickup </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.deliveryout();  }}>Delivery Out </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.deliveryvehicles()}}>View Vehicle </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.manualpickuporders()}}>Manual Pickups </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.predefinedorder()}}>Predefined Order </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.orderwithpin()}}> Order creation with pincode </Text>

{/* <Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.bulkorderview()}}>Bulk Orders </Text> */}

{/* <Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.statusupdatefirst()}}>Status Update </Text> */}
{/* <Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.selfassign()}}>Self Assign </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.ordertransfer1()}}>Order Transfer </Text> */}
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.requeststatus()}}>Request Status </Text>

<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.routefinder()}}>Route Finder </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.report()}}>Report </Text>

 <CustomButton title={'Log out'}  height={60} fontSize={18} marginTop={70} onPress={()=>{session.logout()}}/>

</ScrollView>

</Container>



);
 }
}

const styles=StyleSheet.create({
    index :{
        fontSize: 18,
         justifyContent:'center',
          width: '100%' ,
         color: Colors.white,
         textAlign:'center',
         marginTop:30,
    },
});
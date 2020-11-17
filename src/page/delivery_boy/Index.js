import React, { Component } from 'react';
import { ScrollView,StyleSheet,BackHandler } from 'react-native';
import { Container, View, Left, Button, Icon, Input, Text, Col,Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Colors from '../../constants/Colors';
import CustomButton from '../../component/CustomButton';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import { SECTION_MARGIN_TOP, SCREEN_HEIGHT } from '../../constants/Dimen';

export default class Index extends Component{


    render(){

    return(
 
<Container style={{backgroundColor:Colors.indexBackGroundColor, justifyContent:'center'}}>
<ScrollView contentContainerStyle={{flexGrow:1}}>
<Button onPress={this.props.onClose} transparent>
        <Icon name="md-close" style={{position: 'absolute',right: 20,top: 20,bottom: 0,color:'white'}} />
        </Button>

<Text style={{fontSize: 32, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:80,fontWeight:'bold',marginBottom:35}}>Epex </Text>
 <Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.dashboard()}}>Dashboard </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.deliveryfirst()}}>Delivery </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.pickup();  }}>Pickup </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.vehiclescan()}}>Vehicle Scan </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.statusupdatefirst()}}>Status Update </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.selfassign()}}>Self Assign </Text>
<Text style={styles.index} onPress={()=>{this.props.onClose(); Actions.ordertransfer1()}}>Order Transfer </Text>
 <CustomButton title={'Log out'}  height={60} fontSize={18} marginTop={70} onPress={()=>Actions.login()}/>

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
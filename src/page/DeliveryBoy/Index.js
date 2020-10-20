import React, { Component } from 'react';
import { ScrollView,StyleSheet,BackHandler } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Input, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Colors from '../../constants/Colors';

export default class Index extends Component{
    constructor(props){
        super(props);
        // navigate = props.navigation,
        // this.state={email:'',password:'',device_token:'',device_type:''};

    }

    render(){
    return(
<Container style={{backgroundColor:'#41415b', justifyContent:'center'}}>
<ScrollView contentContainerStyle={{flexGrow:1}}>
<Icon name="md-close" style={{position: 'absolute',right: 20,top: 20,bottom: 0,color:'white'}} />
<Text style={{fontSize: 32, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:80,fontWeight:'bold',marginBottom:35}}>Epex </Text>
 <Text style={styles.index} onPress={()=>Actions.dashboard()}>Dashboard </Text>
<Text style={styles.index} onPress={()=>Actions.delivery()}>Delivery </Text>
<Text style={styles.index} onPress={()=>Actions.pickup()}>Pickup </Text>
<Text style={styles.index} onPress={()=>Actions.vehiclescan()}>Vehicle Scan </Text>
<Text style={styles.index} onPress={()=>Actions.statusupdate()}>Status Update </Text>
<Text style={styles.index} onPress={()=>Actions.selfassign()}>Self Assign </Text>
<Text style={styles.index} onPress={()=>Actions.ordertransfer1()}>Order Transfer </Text>
<Button onPress={() => this.logout()} style={{backgroundColor:'#3a3954', marginTop: 70,width:330,justifyContent: 'center',height:60,borderRadius:5,left:15,Right:10}}>
                <Text uppercase={false} style={{fontSize:18,color: '#fdfdfd',fontFamily:'lucida grande'}}>Log out</Text>
              </Button>
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
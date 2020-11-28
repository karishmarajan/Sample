// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, BackHandler,Image, ToastAndroid } from 'react-native';
import { ScrollView,StyleSheet } from 'react-native';
import { Container, View,Text, } from 'native-base';
import { Actions, Scene } from 'react-native-router-flux';




import Colors from '../../constants/Colors';
import session,{KEY} from '../../session/SessionManager';

let data;

export default class SplashScreen extends Component {

    constructor(){  
        super();  
        this.state={  
            id : false,
       }  
     }  
 

    componentDidMount(){  
        
        AsyncStorage.getItem(KEY).then((value => {
        data = JSON.parse(value);
        
  
          
         }));
       
        setTimeout(()=>{  
            if(data != null){
               
                this.state.id = true
              //  alert(this.state.id)
                Actions.dashboard();
            }else{
               
                this.state.id = false
              //  alert(this.state.id)
                Actions.login();
            } 
        }, 1000);  
       }  

    render(){
        return(
            <Container style={{backgroundColor:Colors.white}}>
                <View style={{backgroundColor:Colors.black,justifyContent:"center",flex:1,alignItems:'center'}}>
                <Image source={require('../../assets/Logo2.png')} />
                </View>

            </Container>
        );
    }
}
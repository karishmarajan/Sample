// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, BackHandler,Image, ToastAndroid } from 'react-native';
import { Container, View,Text, } from 'native-base';
import { Actions, Scene } from 'react-native-router-flux';



import CustomText from '../component/CustomText';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import session,{KEY} from '../session/SessionManager';

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
                Actions.profile();
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
                <CustomText text={Strings.welcome} textType={Strings.titlelarge} color={Colors.white}/>

                </View>

            </Container>
        );
    }
}
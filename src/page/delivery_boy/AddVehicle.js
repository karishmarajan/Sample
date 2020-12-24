import React, { Component } from 'react';
import { ScrollView,StyleSheet,Modal, AsyncStorage } from 'react-native';
import { Container, View, Button, Left, Right,Icon,Grid,Col,Segment,Text} from 'native-base';
import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomInput from '../../component/CustomInput';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP,LOGIN_FIELD_HEIGHT, MAIN_BLOCK_BORDER_RADIUS, SHORT_BLOCK_BORDER_RADIUS, TEXT_FIELD_HIEGHT,MAIN_VIEW_PADDING,BORDER_WIDTH,SHORT_BORDER_WIDTH,ADDRESS_FIELD_HEIGHT, SIGNATURE_VIEW_HEIGHT,TOTAL_BLOCK, CREDIT_FIELD_HEIGHT,TEXT_MARGIN_TOP, CAMERA_SIZE,FOURTH_FONT } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';
import CustomDropdown from '../../component/CustomDropdown';
import CustomRadioButton from '../../component/CustomRadioButton';
import session,{KEY} from '../../session/SessionManager';
import Api from '../../component/Fetch';
import { DELIVERYBOY_VEHICLE , } from '../../constants/Api';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';


const myArray=[{name:"Hybrid" , value:"Hybrid"},{name:"a" , value:"a"},{name:"b" , value:"b"}];


export default class PickupDetails extends React.Component {

  state = {
    modal_visible: false,
    reason:'',
    reason_val:'',
    modal_view: false,
    pickup_details:[],
    activePage:1,
    active:'true',
    type:'',
    companyName:'',
    modalName:'',
    reg_no:'',
    wheels:'',
    fuel:'',
    id:'',
    radio_owned:'',
    radio_taxi:'',
    radio_rent:'',
    

  };


  componentDidMount() {
    
    AsyncStorage.getItem(KEY).then((value => {
 
        let data = JSON.parse(value);
        this.setState({id:data.personId});
 
    }));
  }

  selectComponent = (activePage) =>() =>this.setState({activePage})

  ghj(){
      if(this.state.activePage==1){
          this.setState({active:'true'})
      }else{
        this.setState({active:'false'})
      }
  }


  changeValue(value){
      if(value == 'Epex Owned / Staff Owned'){
          this.setState({radio_owned:true})
          this.setState({type:value})
          alert(this.state.type)

      }
      else if(value == 'Taxi / Private'){
        this.setState({radio_taxi:true})
        this.setState({type:value})
        alert(this.state.type)
      }
      else if(value == 'Rent / Lease'){
        this.setState({radio_rent:true})
        this.setState({type:value})
        alert(this.state.type)
      }
  }


  //////////////////////////////////////////// Delivery out details fetching function  //////////////////////////////////////////////////////////////////////////////////  
 
  add_vehicle(){

    let body={
        "vehicleId" : "0",
        "personId" :this.state.id,
        "vehicleType" : this.state.type,
        "companyName" : this.state.companyName,
        "modalName" : this.state.modalName,
        "registrationNumber" : this.state.reg_no,
        "noOfWheels" : this.state.wheels,
        "fuelType" : this.state.fuel,
        "active" : this.state.active,
    
    };

    Api.fetch_request(DELIVERYBOY_VEHICLE,'POST','',JSON.stringify(body))
      .then(result => {
       
  
        if(result.error != true){
        console.log('Success:', JSON.stringify(result));
        alert(" Added Successfully " + result.message)
  
        }
        else{
          console.log('Failed');
          alert(" Failed ! ")
        }
      })

 }

render(){
    var left = (
        <Left style={{ flex: 1 }}>
          <Button onPress={() => Actions.pop()} transparent>
            <Icon style={{ color:Colors.navbarIconColor}} name='md-close' />
            </Button>
        </Left>
      );



    return(
  
        <Container>


{/*//////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <Navbar left={left} title="Add New Vehicle" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>

{/*////////////////////// main view //////////////////////////////////////////////// */}

        <View style={{flex: 1, flexDirection: 'column',backgroundColor:Colors.textBackgroundColor,padding:MAIN_VIEW_PADDING}}>

{/*/////////////////////////// Customer Details //////////////////////////////////////////////// */}

<View style={{ backgroundColor:Colors.white,flexGrow:1,padding:MAIN_VIEW_PADDING}}>
       
        <View style={{flexDirection:'row',marginBottom:SECTION_MARGIN_TOP,}}>
          <CustomText  text={'Enter Vehicle Details'} textType={Strings.subtitle} fontWeight={'bold'} />
        </View>

        <CustomText text={'Select a type:'} textType={Strings.subtext} color={Colors.black}/>
        <CustomRadioButton selectedColor={Colors.darkSkyBlue} selected={this.state.radio_owned} title={'Epex Owned / Staff Owned'} onPress={(value) => this.changeValue(value)}/>
        <CustomRadioButton selectedColor={Colors.darkSkyBlue} selected={this.state.radio_taxi} title={'Taxi / Private'} onPress={(value) => this.changeValue(value)}/>
        <CustomRadioButton selectedColor={Colors.darkSkyBlue} selected={this.state.radio_rent} title={'Rent / Lease'} onPress={(value) => this.changeValue(value)}/>

        <CustomText text={'Company Name'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) => this.setState({companyName: text})} value={this.state.companyName} />
        <CustomText text={'Modal Name'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) => this.setState({modalName: text})} value={this.state.modalName} />
        <CustomText text={'Registration Number'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) => this.setState({reg_no: text})} value={this.state.reg_no} />
        <CustomText text={'No. of wheels'} textType={Strings.subtext} color={Colors.black}/>
        <CustomInput flex={1} borderColor={Colors.lightborderColor} borderWidth={BORDER_WIDTH} backgroundColor={Colors.white} borderRadius={SHORT_BLOCK_BORDER_RADIUS} onChangeText={(text) => this.setState({wheels: text})} value={this.state.wheels} />
        <CustomText text={'Fuel Type'} textType={Strings.subtext} color={Colors.black}/>
        <CustomDropdown data={myArray} height={TEXT_FIELD_HIEGHT}  borderWidth={SHORT_BORDER_WIDTH} borderColor={Colors.borderColor} paddingBottom={SECTION_MARGIN_TOP} onChangeText={(text) => this.setState({fuel: text})} value={this.state.fuel}/>
        <View style={{backgroundColor:Colors.white,marginTop:20}}><Segment>
              <Button active={this.state.activePage === 1} onPress={this.selectComponent(1)}><Text>Active</Text></Button>
              <Button active={this.state.activePage === 2} onPress={this.selectComponent(2)}><Text>Inactive</Text></Button>
            </Segment></View>
          
</View>



      <CustomButton title={'Submit'} backgroundColor={Colors.darkSkyBlue} onPress={()=>this.add_vehicle()} />

          </View>
        </ScrollView>
        </Container>
    );

}
}


import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput,Grid,Col,Row,SearchBar} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';

// import SearchBar from 'react-native-search-bar';
// import { SearchBar } from 'react-native-elements';


export default class PickUp extends React.Component {
    state = {
        search: '',
      };
    
      updateSearch = (search) => {
        this.setState({ search });
      };

render(){
    var left = (
        <Left style={{ flex: 1 }}>
            <Icon style={{ color:Colors.navbarIconColor}} name='ios-menu' />
        </Left>
      );
      var right = (
        <Right style={{ flex: 1 }}>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-chatbubbles' />
          </Button>
          <Button onPress={() => Actions.cart()} transparent>
            <Icon style={{ color:Colors.navbarIconColor }} name='ios-notifications' />
          </Button>
        </Right>
      );
     
    return(
        
      <Container>
        <Navbar left={left} right={right} title="PickUp" />
 <Container horizontal={true} style={{flexDirection:'column',padding:10}}>

 <Picker 
          selectedValue="Select a Status"
          style={{ height: 50, width: 150,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Order No." value="java" />
          <Picker.Item label="a" value="js" />
          <Picker.Item label="b" value="js" />
          <Picker.Item label="c" value="js" />
        </Picker>

        {/* <SearchBar style={{height:30,width:40,padding:5}} ref="searchBar" placeholder="Search" color="red" onChangeText={this.updateSearch} value={search}/> */}


        <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{marginTop:SECTION_MARGIN_TOP,borderColor:Colors.borderColor,borderWidth:1}}>
        <Grid ><Col><CustomText text={'SERIAL NO.'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'ORDER ID'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'CUSTOMER NAME'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'ADDRESS'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'LOCATION'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'MOBILE NO.'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'DATE & TIME'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'STATUS'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'ATTEMPT'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext}/></Col></Grid>
        <Grid ><Col><CustomText text={'TOTAL'} textType={Strings.subtext}/></Col></Grid>
        
        </ScrollView>
        </Container>
        </Container>


    );
}


}

const styles=StyleSheet.create({
  textinput :{
    fontSize:14,
    color:Colors.subTextColor,
    backgroundColor:Colors.textBackgroundColor,
    paddingLeft:10,
    paddingTop:5,
    height:30,
    borderRadius:5,
  },
});
import React, { Component } from 'react';
import { ScrollView,Picker,StyleSheet } from 'react-native';
import { Container, Header, Button, Left, Right,Icon,Text, Input,TextInput,Grid,Col,Row,SearchBar,Item, View} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import CustomText from '../../component/CustomText';
import CustomInput from '../../component/CustomInput';
import { SECTION_MARGIN_TOP } from '../../constants/Dimen';
import CustomButton from '../../component/CustomButton';

import CustomDropdown from '../../component/CustomDropdown';

const myArray1=[{name:"Order No." , value:"Order No."},{name:"101" , value:"101"},{name:"102" , value:"102"}];

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
 <Container horizontal={true} style={{flexDirection:'column',padding:10,backgroundColor:Colors.textBackgroundColor}}>

{/*////////////////////// Order and Searchbar Block //////////////////////////////////////////////// */}

<View style={{flexDirection:'row',justifyContent:'space-around'}}>
<CustomDropdown data={myArray1} height={35} backgroundColor={Colors.white} fontSize={14} width={100} />
 <CustomInput placeholder={'Search here'} icon_name={'ios-search'} icon_color={Colors.navbarIconColor} placeholderTextColor={Colors.navbarIconColor} fontSize={14} showIcon={true} backgroundColor={Colors.white} height={35} width={180} marginTop={5}/>
          </View>

{/*////////////////////// Manual Pickup Button Block //////////////////////////////////////////////// */}

       <View style={{flexDirection:'row',marginTop:SECTION_MARGIN_TOP}}>
<View style={{flexDirection:'row',width:100,backgroundColor:Colors.rowBackgroundColor,height:35,justifyContent:'center'}}><Text style={{fontSize:14,fontWeight:'bold'}}>ALL</Text><Text style={{fontSize:14,fontWeight:'bold',color:Colors.darkSkyBlue}}>  (50)    </Text>
<Icon name={'ios-arrow-down'} icon_color={Colors.navbarIconColor} size={20}/></View>
        <CustomButton title={'Manual Pickup'} backgroundColor={Colors.darkSkyBlue} width={120} height={35} fontSize={16} marginLeft={120} marginTop={1}/></View>


{/*//////////////////////// Horizontal Order Details Block //////////////////////////////////////////////// */}

        <View>
        <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{marginTop:5,backgroundColor:Colors.white}}>
        <Grid ><Col><CustomText text={'SERIAL NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>1234567890</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'ORDER ID'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'CUSTOMER NAME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>Vivek</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'ADDRESS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>FortKochi</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'LOCATION'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'MOBILE NO.'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'DATE & TIME'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'STATUS'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'ATTEMPT'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'DELIVERY TYPE'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        <Grid ><Col><CustomText text={'TOTAL'} textType={Strings.subtext} fontWeight={'bold'} color={Colors.borderColor}/>
        <Row style={styles.content}><Text>12345678</Text></Row>
        <Row style={styles.content}><Text>12345678</Text></Row></Col></Grid>
        
        </ScrollView>
        </View>
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
    minWidth: '100%',
    maxWidth: '100%',
    height: 100,
    top: 5,
    padding: 5,
    color:Colors.grayTextColor,
    
  
},
header: {
  minWidth: '100%',
  maxWidth: '100%',
  height: 30,
  justifyContent:'center',
  padding: 5,
  borderWidth: 0.6,
  borderColor: Colors.borderColor
},
});
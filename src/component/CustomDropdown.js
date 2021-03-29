
import React, { Component } from 'react';
import {  Button } from 'native-base';
import { TouchableOpacity ,Modal} from 'react-native';

// Our custom files and classes import
import { Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { Dropdown } from 'react-native-material-dropdown';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

export default class CustomDropdown extends Component {
    render() {

        const styles = {
            input: {
                height: this.props.height ? this.props.height : 50,
                width: this.props.width,
                borderWidth: this.props.borderWidth,
                marginTop: this.props.marginTop ? this.props.marginTop:5,
                marginBottom: 0,
                borderRadius: 4,
                justifyContent: 'center',
                textAlignVertical:'center',
                paddingBottom: 16,
                paddingLeft: 6,
                paddingRight: 6,
                borderColor: this.props.borderColor,
                backgroundColor:this.props.backgroundColor,
            }
        };

        let data = [];
        data = this.props.data;

        return (

            <View style={styles.input}>

                <Dropdown

                    style={{ alignSelf: 'center',height:this.props.height,width:this.props.width,textAlignVertical:'center',paddingBottom:this.props.paddingBottom, }}
                    baseColor={'gray'}
                    fontSize={this.props.fontSize ? this.props.fontSize:14}
                    selectedItemColor={Colors.primaryColor}
                    itemColor={Colors.secondaryColor}
                    inputContainerStyle={{ borderBottomWidth: 0, }}
                    label={this.props.label}
                    labelFontSize={16}
                    data={data}
                    dropdownPosition={this.props.position ? this.props.position : 0}
                    value={this.props.value ? this.props.value : data.length != 0 ? data[0]['value'] : ''}
                    onChangeText={this.props.onChangeValue}
                >
                </Dropdown>

     


            </View>

            

        );
    }
}




import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text, View } from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native';
// Our custom files and classes import
import Colors from '../constant/Colors';
import { from } from 'rxjs';

export default class DateInput extends Component {


    render() {
        const styles = {
            input: {
                flex:1,
                
                alignSelf: 'center',
                justifyContent: 'center',
                padding:0,
               textAlignVertical:'center',
                fontSize: this.props.fontSize && this.props.fontSize,
                color: Colors.black,

            }
        };
        return (
            <View onPress style={{ flexDirection: 'row', borderWidth: this.props.borderWidth ? this.props.borderWidth : .5, borderColor: this.props.borderColor ? this.props.borderColor : Colors.accentColor, padding: 6, height: this.props.height ? this.props.height : 50, width: this.props.width && this.props.width, marginTop: 6, marginBottom: 6, borderRadius: 6 }}>
                <View style={{ flexDirection: 'row', flex: 1, }}>
                    <TextInput textAlignVertical={'bottom'} disableFullscreenUI ref={this.props.DrefSubmit} maxLength={2} style={styles.input} placeholder={'DD'} value={this.props.Dvalue} onChangeText={this.props.DonChange} keyboardType={'number-pad'} />
                    <Text style={styles.input}>  -  </Text>
                    <TextInput disableFullscreenUI ref={this.props.MrefSubmit} maxLength={2} style={styles.input} placeholder={'MM'} value={this.props.Mvalue} onChangeText={this.props.MonChange} keyboardType={'number-pad'} />
                    <Text style={styles.input}>  -  </Text>
                    <TextInput disableFullscreenUI ref={this.props.YrefSubmit} maxLength={4} style={styles.input} placeholder={'YYYY'} value={this.props.Yvalue} onChangeText={this.props.YonChange} keyboardType={'number-pad'} />
                </View>

                <Icon style={{ fontSize: this.props.iconSize ? this.props.iconSize : 32, alignSelf: 'center', color: Colors.secondaryColor }} name='ios-calendar' />
            </View>

        );
    }
}



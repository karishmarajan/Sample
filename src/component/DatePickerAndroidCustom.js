
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text, View, Col } from 'native-base';
import { TextInput, TouchableOpacity, DatePickerAndroid, TimePickerAndroid, DatePickerIOS, Modal, Platform, } from 'react-native';
import Colors from '../constant/Colors';
import Dimen from '../constant/Dimen';
import CustomButton from './CustomButton';
import moment from 'moment';

export default class DatePickerAndroidCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_visible: false,
            modal_visible_android: false,
            year: '',
            month: '',
            day: '',
            hour: '',
            minute: '',
        }
    }

    async showPicker(mode) {

        if (Platform.OS == 'android') {
            if (mode == 'time') {
                try {
                    const { action, hour, minute } = await TimePickerAndroid.open({
                        hour,
                        minute,
                        is24Hour: true // Will display '2 PM'
                    });
                    if (action !== TimePickerAndroid.dismissedAction) {
                        this.setState({ hour: this.make_two_digit(hour), minute: this.make_two_digit(minute) });
                    }
                } catch ({ code, message }) {
                    console.warn('Cannot open time picker', message);
                }

            } else {
                try {
                    const {
                        action,
                        year,
                        month,
                        day
                    } = await DatePickerAndroid.open({
                        date: new Date()
                    });
                    if (action !== DatePickerAndroid.dismissedAction) {
                        // Selected year, month (0-11), day
                        this.setState({ year: year, month: this.make_two_digit(month), day: this.make_two_digit(day) });

                    }
                } catch ({ code, message }) {
                    console.warn('Cannot open date picker', message);
                }
            }

        }
    }
    make_two_digit(d) {
        return (parseInt(d) < 10 ? '0' : '') + d;
    }


    //onPress={() => this.showPicker(this.props.mode)}
    render() {
        const styles = {
            input: {
                flex: 1,
                marginLeft: 3,
                marginRight: 3,
                alignSelf: 'center',
                color: Colors.black,
                fontSize:this.props.fontSize
            }
        };
        
        return (
            // <TouchableOpacity activeOpacity={1}>
                <View style={{ flexDirection: 'row', borderWidth: .5, borderColor: Colors.accentColor, padding: 6, height: this.props.height ? this.props.height : 50,width:this.props.width, marginTop: 6, marginBottom: 6, borderRadius: 6 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {/* {
                            this.props.mode == 'time' ?
                                <Text style={styles.input}>{(this.state.hour || this.state.minute ) != '' ? `${this.state.hour}:${this.state.minute}` : this.props.place_holder}</Text>
                                :
                                <Text style={styles.input}>{(this.state.day || this.state.month || this.state.year) != '' ? `${this.state.day}-${this.state.month}-${this.state.year}` : this.props.place_holder}</Text>
                        } */}
                        <Text style={styles.input}>{this.props.date ? this.props.date : this.props.place_holder}</Text>
                    </View>
                    <Icon style={{ fontSize: this.props.iconSize ? this.props.iconSize :32, color: Colors.secondaryColor,alignSelf:'center' }} name={this.props.mode == 'time' ? 'ios-time' : 'ios-calendar'} />
                </View>
            // </TouchableOpacity>
        );
    }
}


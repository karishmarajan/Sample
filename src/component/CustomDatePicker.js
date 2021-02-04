
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text, View, Col } from 'native-base';
import { TextInput, TouchableOpacity, DatePickerAndroid, DatePickerIOS, Modal, Platform, } from 'react-native';
import Colors from '../constants/Colors';
import Dimen from '../constants/Dimen';
import CustomButton from './CustomButton';
import moment from 'moment';

export default class CustomDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_visible: false,
            modal_visible_android:false,
        }
    }

    showPicker() {

        if (Platform.OS == 'android') {
            this.setState({ modal_visible: true });
        }
    }
    ioSDateDone()
    {
        this.setState({modal_visible:false});
         this.setState({date: moment(this.state.chosenDate).format('YYYY-MM-DD'), time: moment(this.state.chosenDate).format('HH:mm')});
    }
    
   
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
        }
        return (
            <TouchableOpacity onPress={() => this.showPicker()} activeOpacity={1}>
                <View style={{ flexDirection: 'row', borderWidth: .5, borderColor: Colors.accentColor, padding: 6, height: this.props.height ? this.props.height : 40,width:this.props.width, marginTop: 6, marginBottom: 6, borderRadius: 6 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text  style={styles.input}>{this.props.date ?  this.props.date : this.props.place_holder }</Text>
                    </View>
                    <Icon style={{ fontSize: this.props.iconSize ? this.props.iconSize :24, color: Colors.secondaryColor, alignSelf:'center' }} name={this.props.mode == 'time' ? 'ios-time' : 'ios-calendar'} />
                </View>

                <Modal visible={this.state.modal_visible} transparent supportedOrientations={['landscape','landscape-left','landscape-right']}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#00000088', padding: 16 }}>
                        <View style={{ backgroundColor: Colors.primaryColor, padding: 16,justifyContent:'center' }}>
                            <View style={{backgroundColor:Colors.primaryColor,alignSelf:'center'}}>
                                <Text style={{ fontSize: 10, color: Colors.white, fontWeight: 'bold' }}> {this.props.title ? this.props.title : 'CHOOSE'} </Text>
                            </View>

                            <DatePickerAndroid
                                mode={this.props.mode}
                                date={this.props.chosenDate}
                                onDateChange={this.props.onDateChange}
                                minimumDate={this.props.minimumDate}
                                maximumDate={this.props.maximumDate}
                            />

                            <View style={{flexDirection:'row'}}>
                               {/* <TouchableOpacity onPress={()=> this.ioSDateClose()} activeOpacity={.7} style={{flex:1,marginRight:3}}><CustomButton color={Colors.accentColor} title={'CANCEL'}/></TouchableOpacity>  */}
                               <TouchableOpacity onPress={()=> this.ioSDateDone()} activeOpacity={.7} style={{flex:1,marginLeft:3}}><CustomButton color={Colors.white} text_color={Colors.black} title={'DONE'}/></TouchableOpacity> 
                              
                            </View>
                        </View>
                    </View>

                </Modal>
        
            </TouchableOpacity>
        );
    }
}



import React, { Component } from 'react';
import Colors from '../constants/Colors';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {  SHORT_BORDER_WIDTH,SHORT_BORDER_RADIUS, NORMAL_FONT, THIRD_FONT } from '../constants/Dimen';


export default class CustomSearchBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      color: Colors.secondaryColor,
    }
  }
  render() {

    return (
      <SearchableDropdown
        
        onItemSelect={this.props.onItemSelect}
        containerStyle={{ padding: 5 }}
        itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,

        }}
        itemTextStyle={{ fontSize: this.props.fontSize ? this.props.fontSize : 12,color: Colors.black }}
        itemsContainerStyle={{ maxHeight: this.props.maxHeight ? this.props.maxHeight :140, }}
        items={this.props.items}
        resetValue={false}
        textInputProps={
          {
            value: this.props.value,
            placeholder: this.props.placeholder,
            underlineColorAndroid: "transparent",
            style: {
                padding: 6,
                borderWidth: SHORT_BORDER_WIDTH,
                borderColor: Colors.borderColor,
                borderRadius: SHORT_BORDER_RADIUS,
            
            },
            onTextChange: this.props.onTextChange
          }
        }
        listProps={
          {
            nestedScrollEnabled: true,

          }
        }
      />
    );
  }
}
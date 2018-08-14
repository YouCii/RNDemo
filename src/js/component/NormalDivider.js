import React, {Component} from 'react'
import {View} from 'react-native'
import Colors from "../../res/style/colors";
import Constants from "../utils/Constants";

export default class NormalDivider extends Component {
    render() {
        return <View
            style={[{
                height: 0.3,
                width: Constants.width,
                backgroundColor: Colors.mediumGray,
            }, this.props.style]}
        />
    }
}
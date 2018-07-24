import {Component} from 'react';
import React from "react";

export default class BaseScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            gesturesEnabled: params.gestures == null ? false: params.gestures,
            header: null
        }
    };
}
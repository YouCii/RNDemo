import {Component} from 'react';
import React from "react";
import Orientation from 'react-native-orientation';

export default class BaseScreen extends Component {

    componentDidMount() {
        // 固定竖屏
        Orientation.lockToPortrait();
    }

}
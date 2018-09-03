import React, {Component,} from 'react';
import RootSiblings from 'react-native-root-siblings';
import Spinner from 'react-native-spinkit'
import Colors from "../../res/style/colors";
import Constants from "../utils/Constants";

/**
 * 加载样式
 */
const types = [
    'CircleFlip',
    'Bounce',
    'Wave',
    'WanderingCubes',
    'Pulse',
    'ChasingDots',
    'ThreeBounce',
    'Circle',
    '9CubeGrid',
    'WordPress',
    'FadingCircle',
    'FadingCircleAlt',
    'Arc',
    'ArcAlt'
];

let lastDialog = null;

export default class ProgressDialog extends Component {

    static show = () => {
        if (lastDialog) {
            lastDialog.destroy();
        }

        lastDialog = new RootSiblings(
            <Spinner
                style={{
                    position: 'absolute',
                    top: Constants.height / 2.5,
                    left: Constants.width / 2 - 25
                }}
                isVisible={true}
                size={50}
                type={types[5]}
                color={Colors.yellow}
            />
        );
        return lastDialog;
    };

    static hide = () => {
        lastDialog.destroy();
    };

}

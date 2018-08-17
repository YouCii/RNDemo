import BaseScreen from "../base/BaseScreen";
import {Button, View, Text, Image, StyleSheet} from "react-native";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import React from "react";
import {PAGE_TYPE} from "./CameraScreen";
import Constants from "../utils/Constants";

export default class PhotoScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            source: ""
        }
    }

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar('Photo')}

            <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{justifyContent: 'center', padding: 15}}>{this.state.text}</Text>

                <Image
                    style={{flex: 1, width: Constants.width - 20, margin: 10}}
                    resizeMode='cover'
                    source={{uri: "" === this.state.source ? null : this.state.source}}
                />
            </View>

            <View style={styles.ButtonContainer}>
                <Button
                    title={'点击拍照'}
                    onPress={() => {
                        this.props.navigation.navigate('Camera', {
                            type: PAGE_TYPE.PHOTO, callback: (backData) => {
                                this.setState({
                                    source: backData
                                });
                            }
                        })
                    }}
                />
                <Button
                    title={'扫描条码'}
                    onPress={() => {
                        this.props.navigation.navigate('Camera',
                            {
                                type: PAGE_TYPE.CODE,
                                callback: (backData) => {
                                    this.setState({
                                        text: backData
                                    });
                                }
                            })
                    }}
                />
            </View>
        </View>
    }
}

/**
 * 继承自BaseScreen, 用于控制是否允许Android-Back按键的返回功能
 * @link BaseScreen.defaultProps
 */
PhotoScreen.defaultProps = {
    disableBack: true
};

const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20
    }
});
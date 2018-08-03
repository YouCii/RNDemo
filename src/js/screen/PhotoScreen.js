import BaseScreen from "../base/BaseScreen";
import {Button, View, Image, StyleSheet} from "react-native";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import React from "react";
import {PAGE_TYPE} from "./CameraScreen";

export default class PhotoScreen extends BaseScreen {
    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar('Photo')}

            <View style={{flex: 1}}>
                <Image
                    resizeMode='cover'
                />
            </View>

            <View style={styles.ButtonContainer}>
                <Button
                    title={'点击拍照'}
                    onPress={() => {
                        this.props.navigation.navigate('Camera', {type: PAGE_TYPE.PHOTO})
                    }}
                />
                <Button
                    title={'扫描条码'}
                    onPress={() => {
                        this.props.navigation.navigate('Camera', {type: PAGE_TYPE.CODE})
                    }}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20
    }
});
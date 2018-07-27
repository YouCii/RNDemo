import BaseScreen from "../base/BaseScreen";
import React from "react";
import {Button, TextInput, View, StyleSheet, Alert} from "react-native";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import Colors from "../../res/style/colors";
import TopMovieResponse from "../model/TopMovieResponse"

/**
 * 实现网络请求
 *
 * 难点:
 *      1. 组件间传递数据: 通过state和shouldComponentUpdate搭配;
 *      2. 网络请求fetch;
 */
export default class NetScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            toSelectNum: '',
            topMovieResponse: TopMovieResponse
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.toSelectNum !== nextProps.toSelectNum;
    }

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            {PublicComponent.initTitleBar('网络请求')}

            <TextInput
                underlineColorAndroid={Colors.transparent}
                defaultValue={'10'}
                placeholder={'请输入查询数目'}
                keyboardType={'numeric'}
                autoFocus={false}
                clearButtonMode={'unless-editing'}
                returnKeyType={'go'}
                style={styles.textInput}
                multiline={false} // 注意如果是true的话, onSubmitEditing触发会有问题
                onChangeText={(text) => this.state.toSelectNum = text}
                onSubmitEditing={startNetWork(this.state.toSelectNum)}
            />

            <Button
                title={'查询'}
                onPress={() => {
                    startNetWork(this.state.toSelectNum)
                }}
            />
        </View>
    }
}

const startNetWork = (toSelectNum) => {
    if (isNaN(toSelectNum)) {
        Alert.alert(
            '提示',
            '\n只能输入数字',
            [{text: 'OK', onPress: () => console.log('OK Pressed')},],
            {cancelable: true}
        );
    } else {
        // fetch("https://mywebsite.com/endpoint/", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         firstParam: "yourValue",
        //         secondParam: "yourOtherValue"
        //     })
        // })
        //     .then(response => response.json())
        //     .catch(error => {
        //         console.error(error);
        //     });

    }
};

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        margin: 10,
    }
});
import BaseScreen from "../base/BaseScreen";
import React from "react";
import {Button, TextInput, View, StyleSheet, FlatList, Text, Image} from "react-native";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import Colors from "../../res/style/colors";
import TopMovieResponse from "../model/TopMovieResponse"
import AlertUtils from "../utils/AlertUtils";

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
            toSelectNum: '10',
            topMovieResponse: TopMovieResponse
        }
    }

    // 使用 this.state.xx = xx 不会触发重新渲染, setState才会
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.toSelectNum === nextState.toSelectNum;
    // }

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
                // 目前有bug: 渲染结束后自动调用, 暂时屏蔽
                // onSubmitEditing={
                //     this.startNetWork(this.state.toSelectNum)
                // }
            />

            <Button
                title={'查询'}
                onPress={() => {
                    this.startNetWork(this.state.toSelectNum)
                }}
            />

            <FlatList
                data={this.state.topMovieResponse.subjects}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <View style={styles.item}>
                        <Image
                            style={styles.itemImage}
                            source={{uri: item.images.large}}
                        />
                    </View>
                }
            />
        </View>
    }

    startNetWork(toSelectNum) {
        if (isNaN(toSelectNum)) {
            AlertUtils.showSimpleAlert('只能输入数字');
        } else {
            fetch("https://api.douban.com/v2/movie/top250?start=0&count=" + toSelectNum, {method: "GET"})
                .then(response => {
                    return response.json()
                })
                .then(responseJson => {
                    this.setState({
                        topMovieResponse: responseJson
                    });
                })
                .catch(error => {
                    AlertUtils.showSimpleAlert('请求失败: ' + error);
                })
                .done();
        }
    };
}

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        margin: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 0, // StyleSheet.hairlineWidth
        borderBottomColor: Colors.gray,
    },
    itemImage: {
        height: 180,
        width: 120,
        resizeMode: Image.resizeMode.stretch
    },
});
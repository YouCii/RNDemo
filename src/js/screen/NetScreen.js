import BaseScreen from "../base/BaseScreen";
import React from "react";
import {
    Button,
    TextInput,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableNativeFeedback
} from "react-native";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import Colors from "../../res/style/colors";
import TopMovieResponse from "../model/TopMovieResponse"
import AlertUtils from "../utils/AlertUtils";
import Constants from "../utils/Constants";
import ToastUtils from "../utils/ToastUtils";
import HttpUtils from "../utils/HttpUtils";

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
            toSelectNum: '10', // 查询的数目
            topMovieResponse: new TopMovieResponse(), // 查询回调
            imageRadio: 1, // 图片显示高宽比例
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
                ref={'tiCount'} // 类似于android的id
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
                    this.refs.tiCount.blur();
                    this.startNetWork(this.state.toSelectNum)
                }}
            />

            <FlatList
                data={this.state.topMovieResponse.subjects}
                keyExtractor={item => item.id}
                numColumns={3} // 一句话实现GridView
                renderItem={({item}) =>
                    <View style={styles.item}>
                        <TouchableNativeFeedback
                            onPress={() => ToastUtils.showShortToast(item.title)}>
                            <Image
                                style={[styles.itemImage, {
                                    width: Constants.width / 3,
                                    height: Constants.width / 3 * this.state.imageRadio
                                }]}
                                source={{uri: item.images.large}}/>
                        </TouchableNativeFeedback>
                    </View>
                }
            />
        </View>
    }

    startNetWork(toSelectNum) {
        if (isNaN(toSelectNum)) {
            AlertUtils.showSimpleAlert('只能输入数字');
        } else {
            let params = new Map();
            params.set('start', 0);
            params.set('count', toSelectNum);
            HttpUtils.startGetRequest("https://api.douban.com/v2/movie/top250", params)
                .then(responseJson => {
                    Image.getSize(responseJson.subjects[0].images.large, (width, height) => {
                        this.setState({
                            imageRadio: height / width,
                            topMovieResponse: responseJson,
                        });
                    })
                })
                .catch(error => {
                    AlertUtils.showSimpleAlert(error.toString());
                })
                .finally(() => {
                    // 无论成功与否都执行的回调, 例如加载完成后隐藏loading
                });
        }
    };
}

/**
 * 继承自BaseScreen, 用于控制是否允许Android-Back按键的返回功能
 * @link BaseScreen.defaultProps
 */
NetScreen.defaultProps = {
    disableBack: true
};

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        margin: 10,
    },
    item: {
        justifyContent: 'flex-start',
        borderBottomWidth: 0, // StyleSheet.hairlineWidth
        borderBottomColor: Colors.gray,
    },
    itemImage: {
        resizeMode: Image.resizeMode.stretch
    },
});
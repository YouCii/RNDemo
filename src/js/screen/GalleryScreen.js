import BaseScreen from "../base/BaseScreen";
import React from "react";
import PublicStyles from "../../res/style/styles";
import PublicComponent from "../component/PublicComponent";
import TitleBar from "../component/TitleBar";
import Constants from "../utils/Constants";
import {TabView} from "react-native-tab-view";
import {View, Image} from "react-native";
import {ADD_PHOTO} from "./PhotoUpScreen";
import ConfirmActionSheet from "../component/ConfirmActionSheet";

export default class GalleryScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            paths: [],

            // react-native-tab-view 相关, 注意不能包装进单独一个参数内
            index: 0,
            routes: [],
        }
    }

    componentWillMount() {
        this.state.paths = this.props.navigation.getParam('paths');
        this.state.index = this.props.navigation.getParam('index');

        this.state.paths.forEach((value) => {
            if (value !== ADD_PHOTO) {
                this.state.routes.push({key: value, title: ''})
            }
        });
    }

    /**
     * 加载各个tabView
     */
    _renderScene = ({route}) => {
        return <Image
            style={{
                flex: 1,
                width: Constants.width
            }}
            source={{uri: route.key}}
            resizeMode={'contain'}
        />;
    };

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            <TitleBar
                title={''}
                onBackClick={() => this.props.navigation.goBack()}
                rightButton={'trash-o'}
                onRightClick={() => this.refs.actionSheet.show()}
            />

            <TabView
                ref={'tabView'}
                navigationState={this.state}
                onIndexChange={(index) => this.setState({index})}
                useNativeDriver={true}
                initialLayout={{
                    width: Constants.width,
                    height: Constants.height
                }}
                renderScene={this._renderScene}
                renderTabBar={() => null}
            />

            <ConfirmActionSheet
                ref={'actionSheet'}
                title={'是否删除该图片'}
                onConfirm={() => {
                    this.props.navigation.state.params.callback(this.state.index);
                    this.props.navigation.goBack()
                }}
            />
        </View>
    }
}
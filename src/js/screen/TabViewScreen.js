import BaseScreen from "../base/BaseScreen";
import PublicComponent from "../component/PublicComponent";
import {View, Keyboard} from "react-native";
import React from "react";
import TabInfoBean from "../model/TabInfoBean";
import InfoItem from "../component/InfoItem";
import ToastUtils from "../utils/ToastUtils";
import PublicStyles from "../../res/style/styles";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from "../../res/style/colors";
import Constants from "../utils/Constants";
import TitleBar from "../component/TitleBar";
import PhotoTab from "./PhotoTab";

export default class TabViewScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            tabInfoBean: new TabInfoBean(),
            rightButtonString: RIGHT_BUTTON_STATE.EDIT,

            // react-native-tab-view 相关, 注意不能包装进单独一个参数内
            index: 0,
            routes: [
                {key: 'field', title: '基本信息'},
                {key: 'photo', title: '图片信息'},
            ],
        }
    }

    _showNewInfo() {
        ToastUtils.showShortToast(this.state.tabInfoBean.toString());
        this.setState({
            rightButtonString: RIGHT_BUTTON_STATE.EDIT
        });
    }

    // 测试证明, 使用了箭头函数, 多层传递也无需bind(this)
    _onRightClick = () => {
        if (this.state.rightButtonString === RIGHT_BUTTON_STATE.EDIT) {
            this.setState({
                rightButtonString: RIGHT_BUTTON_STATE.SAVE
            });
        } else if (this.state.rightButtonString === RIGHT_BUTTON_STATE.SAVE) {
            Keyboard.dismiss();
            // 牛逼了, 还真能用this.refs.tabView.refs获取到各个screen里的控件
            let {sex, age, single} = this.refs.tabView.refs;
            if (!(sex.getContent() && age.getContent())) {
                ToastUtils.showShortToast("部分必填参数还没有写入");
                return;
            }
            this.state.tabInfoBean.sex = sex.getContent();
            this.state.tabInfoBean.age = age.getContent();
            this.state.tabInfoBean.single = single.getContent();

            this._showNewInfo();
        } else {
            this.refs.tabView.refs.photoTab.showActionSheet(this.props.navigation, this.state.tabInfoBean.id);
        }
    };

    /**
     * 加载各个tabView
     */
    _renderScene = ({route}) => {
        switch (route.key) {
            case 'field':
                return <KeyboardAwareScrollView>
                    <View style={PublicStyles.screenView}>
                        <InfoItem
                            ref={'sex'}
                            title={'性别'}
                            content={this.state.tabInfoBean.sex}
                            necessaryParams={true}
                            editable={this.state.rightButtonString === RIGHT_BUTTON_STATE.SAVE}
                        />
                        <InfoItem
                            ref={'age'}
                            title={'年龄'}
                            content={this.state.tabInfoBean.age}
                            necessaryParams={true}
                            editable={this.state.rightButtonString === RIGHT_BUTTON_STATE.SAVE}
                        />
                        <InfoItem
                            ref={'single'}
                            title={'婚否'}
                            content={this.state.tabInfoBean.single}
                            necessaryParams={false}
                            editable={this.state.rightButtonString === RIGHT_BUTTON_STATE.SAVE}
                        />
                    </View>
                </KeyboardAwareScrollView>;
            case 'photo':
                return <PhotoTab
                    ref={'photoTab'}
                    fatherNavigation={this.props.navigation}
                />;
            default:
                return null;
        }
    };

    /**
     * 加载各个tabBar
     */
    _renderTabBar = (props) => <TabBar
        {...props}
        bounces={true}
        indicatorStyle={{backgroundColor: Colors.lightBlue}}
        tabStyle={{height: 42}}
        labelStyle={{color: Colors.lightBlue, height: 20, fontSize: 16}} // height 16 android显示不全
        style={{backgroundColor: Colors.white}}
    />;

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            <TitleBar
                title={"TabScreen"}
                rightButton={this.state.rightButtonString}
                onRightClick={this._onRightClick}
                onBackClick={() => this.props.navigation.goBack()}
            />

            <TabView
                ref={'tabView'}
                navigationState={this.state}
                onIndexChange={(index) => this.setState({
                    index,
                    rightButtonString: index === 0 ? RIGHT_BUTTON_STATE.EDIT : RIGHT_BUTTON_STATE.TAKE_PHOTO
                })}
                canJumpToTab={() => true}
                tabBarPosition={'top'}
                useNativeDriver={true}
                initialLayout={{
                    width: Constants.width,
                    height: Constants.height
                }}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
            />
        </View>;
    }
}

export const RIGHT_BUTTON_STATE = {'EDIT': '修改', 'SAVE': '保存', 'TAKE_PHOTO': 'camera'};
import BaseScreen from "../base/BaseScreen";
import {FlatList, Image, View, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import Constants from "../utils/Constants";
import ToastUtils from "../utils/ToastUtils";
import PhotoActionSheet from "../component/PhotoActionSheet";
import React from "react";
import PublicComponent from "../component/PublicComponent";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PublicStyles from "../../res/style/styles";
import TitleBar from "../component/TitleBar";
import Colors from "../../res/style/colors";

export default class PhotoUpScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            paths: [],

            upLimit: 0,
        }
    }

    componentWillMount() {
        let paths = this.props.navigation.getParam('paths');
        let upLimit = 9 - this.props.navigation.getParam('existNum');

        if (paths.length < upLimit) {
            paths.push(ADD_PHOTO);
        }

        this.state.paths = paths;
        this.state.upLimit = upLimit;
    }

    _goToGallery = (index) => {
        this.props.navigation.navigate('Gallery', {
            paths: this.state.paths,
            index: index,
            callback: (index) => {
                this.state.paths.splice(index, 1);
                this.setState({paths: this.state.paths})
            }
        })
    };

    _renderItem = ({item, index}) => {
        return <View style={{justifyContent: 'flex-start', padding: 5}}>
            {item === ADD_PHOTO
                ?
                <View style={{
                    width: Constants.width / 3 - 10,
                    height: Constants.width / 3 - 10,
                    flex: 1,
                    borderColor: Colors.darkGray,
                    borderWidth: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.refs.actionSheet.show();
                    }}>
                        <MaterialIcons
                            name={'add'}
                            size={Constants.width / 5}
                        />
                    </TouchableWithoutFeedback>
                </View>
                :
                <TouchableOpacity onPress={() => this._goToGallery(index)}>
                    <Image
                        style={{
                            resizeMode: Image.resizeMode.stretch,
                            width: Constants.width / 3 - 10,
                            height: Constants.width / 3 - 10
                        }}
                        source={{uri: item}}
                    />
                </TouchableOpacity>
            }
        </View>
    };

    _refreshDateList = (result: String[]) => {
        if ((result.length + this.state.paths.length) <= (this.state.upLimit + 1)) {
            if (this.state.paths[this.state.path.length - 1] === ADD_PHOTO) {
                this.state.paths.pop()
            }
            result.forEach((value) => {
                this.state.paths.push(value)
            });
            this.state.paths = Array.from(new Set(this.state.paths)); // 去重
            if (this.state.paths.length < this.state.upLimit) {
                this.state.paths.push(ADD_PHOTO);
            }
            this.setState({
                upLimit: this.state.upLimit
            })
        } else {
            ToastUtils.showShortToast('只能上传9张图片')
        }
    };

    render() {
        return <View style={PublicStyles.screenView}>
            {PublicComponent.initStatusBar()}
            <TitleBar
                title={''}
                rightButton={'上传'}
                onRightClick={() => {
                    if (this.state.paths[this.state.paths.length - 1] === ADD_PHOTO) {
                        this.state.paths.pop()
                    }
                    this.props.navigation.state.params.callback(this.state.paths)
                    this.props.navigation.goBack();
                }}
                onBackClick={() => this.props.navigation.goBack()}
            />

            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 20}}>
                <FlatList
                    data={this.state.paths}
                    keyExtractor={(path) => path}
                    numColumns={3} // 一句话实现GridView
                    renderItem={this._renderItem}
                    extraData={this.state}
                />
                <PhotoActionSheet
                    ref={'actionSheet'}
                    onPhotoReceive={this._refreshDateList}
                />
            </View>
        </View>
    }
}

export const ADD_PHOTO = 'add';
import React, {Component} from 'react'
import Colors from "../../res/style/colors";
import {FlatList, TouchableOpacity, View, StyleSheet, Image, Text} from "react-native";
import Constants from "../utils/Constants";
import CheckBox from "../component/CheckBox"
import ToastUtils from "../utils/ToastUtils";
import PhotoActionSheet from "../component/PhotoActionSheet";
import PropTypes from 'prop-types'
import ImageBean from "../model/ImageBean";

export default class PhotoTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageBeans: [],
            editable: false,   // 是否图片可编辑(选中)
        }
    }

    refreshPhotoInfo = () => {
        this.setState({imageBeans: this.state.imageBeans})
    };

    /**
     * @param indexArray 要删除的图片位置
     */
    _deletePhoto = (indexArray) => {
        indexArray.forEach((indexValue) => {
            this.state.imageBeans.splice(indexValue, 1)
        });
        this.refreshPhotoInfo()
    };

    showActionSheet = () => {
        if (this.state.imageBeans.length < 9) {
            // 弹出拍照/相册选择的选择框
            this.refs.actionSheet.show();
        } else {
            ToastUtils.showShortToast('最多只能存在9张照片')
        }
    };

    _goToUpScreen = (paths: String[]) => {
        let exitNum = this.state.imageBeans.length;
        if (paths.length + exitNum < 10) {
            this.props.fatherNavigation.navigate('PhotoUp', {
                paths: paths,
                existNum: exitNum,

                callback: (addedImages) => {
                    addedImages.forEach((value) => {
                        this.state.imageBeans.push(new ImageBean(value))
                    });
                    this.refreshPhotoInfo()
                }
            });
        } else {
            ToastUtils.showShortToast('最多只能再上传' + (9 - exitNum) + '张')
        }
    };

    _goToGallery = (index) => {
        let paths = [];
        this.state.imageBeans.forEach((imageBean: ImageBean) => {
            paths.push(imageBean.imgPath);
        });
        this.props.fatherNavigation.navigate('Gallery', {
            paths: paths,
            index: index,
            callback: (index) => {
                this._deletePhoto([index]);
            }
        })
    };

    _renderItem = ({item, index}) => {
        return <View style={{justifyContent: 'flex-start', padding: 5}}>
            <TouchableOpacity onPress={() => this._goToGallery(index)}>
                <Image
                    style={{
                        resizeMode: Image.resizeMode.stretch,
                        width: Constants.width / 3 - 10,
                        height: Constants.width / 3 - 10
                    }}
                    source={{uri: item.imgPath}}
                />
            </TouchableOpacity>
            {!this.state.editable ? null :
                <CheckBox // 不能设置checked, 否则只能自己setState控制是否选中
                    style={{position: 'absolute', right: 5, top: 5, width: 20, height: 20}}
                    checkboxStyle={{width: 20, height: 20}}
                    label={''}
                    onChange={(checked) => item.toDelete = checked}
                />
            }
        </View>
    };

    render() {
        return <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', paddingTop: padding}}>
            <FlatList
                data={this.state.imageBeans}
                keyExtractor={(item: ImageBean) => item.imgPath}
                numColumns={3} // 一句话实现GridView
                renderItem={this._renderItem}
                extraData={this.state}
            />

            {this.state.imageBeans.length === 0 ?
                <View style={[styles.editButton, {
                    flex: 1,
                    marginBottom: 200,
                    backgroundColor: Colors.transparent
                }]}>
                    <Text>暂无图片信息</Text>
                </View>
                :
                <TouchableOpacity onPress={() => {
                    if (this.state.editable) {
                        let indexArray = [];
                        this.state.imageBeans.forEach((value, index) => {
                            if (value.toDelete) {
                                indexArray.push(index);
                            }
                        });
                        if (indexArray.length === 0) {
                            ToastUtils.showShortToast('尚未选择图片')
                        } else {
                            this._deletePhoto(indexArray)
                        }
                    }
                    this.setState({editable: !this.state.editable})
                }}>
                    <View style={styles.editButton}>
                        <Text style={{color: Colors.white}}> {this.state.editable ? '删除' : '编辑'} </Text>
                    </View>
                </TouchableOpacity>
            }

            <PhotoActionSheet
                ref={'actionSheet'}
                onPhotoReceive={this._goToUpScreen}
            />

        </View>;
    }
}

const padding = 20;

PhotoTab.propTypes = {
    fatherNavigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    editButton: {
        height: 45,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 50,
        backgroundColor: Colors.lightBlue,
    },
});
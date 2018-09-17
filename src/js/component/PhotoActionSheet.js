import ActionSheet from "react-native-actionsheet";
import React, {Component} from "react";
import PropTypes from 'prop-types'
import ImagePicker from "react-native-image-crop-picker";
import Constants from '../utils/Constants'
import ToastUtils from '../utils/ToastUtils'

/**
 * 用于统一拍照和图库选择, 提供统一的图片路径回调
 */
export default class PhotoActionSheet extends Component {

    show = () => {
        this.refs.actionSheet.show();
    };

    render() {
        return <ActionSheet
            ref={'actionSheet'}
            title={'上传照片'}
            options={['拍摄', '相册选择', '取消']}
            cancelButtonIndex={2}
            onPress={(index) => {
                if (index === 0) {
                    ImagePicker.openCamera({
                        cropping: false,
                        includeBase64: false,
                        compressImageMaxWidth: Constants.width,
                        compressImageQuality: 0.5,
                        mediaType: 'photo',
                    }).then(image => {
                        let paths = [];
                        paths.push(image.path);
                        this.props.onPhotoReceive(paths);
                    }).catch(error =>
                        ToastUtils.showShortToast(error.toString())
                    )
                } else if (index === 1) {
                    ImagePicker.openPicker({
                        cropping: false,
                        multiple: true, // android 测试为长按时多选
                        includeBase64: false,
                        compressImageMaxWidth: Constants.width,
                        compressImageQuality: 0.5,
                        mediaType: 'photo',
                    }).then((response) => {
                        let paths = [];
                        response.forEach((value) => {
                            paths.push(value.path);
                        });
                        this.props.onPhotoReceive(paths);
                    }).catch(error =>
                        ToastUtils.showShortToast(error.toString())
                    )
                }
            }}
        />
    }
}

PhotoActionSheet.propTypes = {
    onPhotoReceive: PropTypes.func.isRequired,
};
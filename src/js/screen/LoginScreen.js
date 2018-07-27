import React from "react";
import {
    Button,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import PublicComponent from "../component/PublicComponent";
import PublicStyles from "../../res/style/styles";
import BaseScreen from "../base/BaseScreen";
import Colors from "../../res/style/colors";

const instructions = Platform.select({
    ios: 'IOS',
    android: 'Android',
});


export default class LoginScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {text: instructions};
    }

    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={[PublicStyles.screenView, {
                justifyContent: 'center',
                alignItems: 'stretch',
                backgroundColor: Colors.white,
            }]}>
                {PublicComponent.initStatusBar()}
                {PublicComponent.initTitleBar('Welcome')}
                <Text style={styles.welcome}>{this.state.text}</Text>
                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid={Colors.transparent}
                    placeholder="请输入查看随动效果"
                    onChangeText={(text) => this.setState({text})}
                />
                <Button
                    title="go to next page"
                    onPress={() => {
                        this.props.navigation.navigate("Main")
                    }}
                />
                <Image source={pic} style={[styles.image, {borderRadius: 10}]}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        textAlign: 'center',
    },

    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    instructions: {
        flex: 1,
        textAlign: 'center',
        color: '#006633',
    },
    image: {
        flex: 2,
    }
});
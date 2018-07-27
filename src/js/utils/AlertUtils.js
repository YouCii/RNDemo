import {Alert} from "react-native";

export default class AlertUtils{

    static showSimpleAlert(text){
        Alert.alert(
            '',
            text,
            [{text:'好'}],
            {cancelable: true}
        );
    }

}
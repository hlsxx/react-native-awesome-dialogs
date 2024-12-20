# react-native-awesome-dialogs

<div align="center">
  <img src="https://github.com/hlsxx/react-native-awesome-dialogs/blob/master/blob/example.gif" alt="react-native-awesome-dialogs" style="width:180px; height:400px" />
</div>

## Installation

```sh
npm install react-native-awesome-dialogs
```

## Usage


```js
import { Dialog, DialogRoot } from 'react-native-awesome-dialogs';

<DialogRoot>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Button
      title="Success"
      onPress={() => Dialog.success({ title: "Successfully", text: "Successfully executed" })}
    />
  </View>
</DialogRoot>
```

### Custom options

```js
Dialog.success({
  title: "Successfully",
  text: "Successfully executed",
  onHide: () => console.log("On hide"),
  onShow: () => console.log("On show"),
  titleStyle: {
    color: '#5c9614'
  },
  style: {
    borderRadius: 5,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#5c9614'
  },
  button: {
    text: "X",
    style: {
      alignSelf: 'center',
      borderRadius: 5,
      backgroundColor: 'gray',
      width: 40,
    }
  }
});

```

### Params

```js
export interface DialogShowProps {
  title?: string;
  text?: string;
  icon?: string;
  color?: string;
  titleStyle?: StyleProp<TextStyle>,
  textStyle?: StyleProp<TextStyle>,
  onShow?: () => void;
  onHide?: () => void;
  style?: StyleProp<ViewStyle>,
  button?: {
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    text?: string;
    onPress?: () => void;
  }
}
```

## License
MIT

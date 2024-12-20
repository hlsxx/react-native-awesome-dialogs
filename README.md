# react-native-awesome-dialogs

<div align="center">
  <img src="https://github.com/hlsxx/react-native-awesome-dialogs/blob/master/blob/example.gif" alt="react-native-awesome-dialogs" style="width:100%; max-height:400px" />
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


## License
MIT

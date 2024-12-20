import { View, Button } from 'react-native';
import { Dialog, DialogRoot } from 'react-native-awesome-dialogs';

const BUTTONS = [
  { title: "Success", onPress: () => Dialog.success({ title: "Successfully", text: "Successfully executed" })},
  { title: "Info", onPress: () => Dialog.info({ title: "Info", text: "Info dialog" })},
  { title: "Warning", onPress: () => Dialog.warning({ title: "Warning", text: "Some warning occured" })},
  { title: "Error", onPress: () => Dialog.error({ title: "Error", text: "Some error occured" })},
  { title: "Locked", onPress: () => Dialog.locked({ title: "Locked", text: "Locked action" })},
];

const showCustomSuccess = () => {
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
};

export default function App() {
  return (
    <DialogRoot>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ width: 175 }}>
          {BUTTONS.map((button) => (
            <View
              key={button.title}
              style={{ marginBottom: 5 }}
            >
              <Button
                title={button.title}
                onPress={() => button.onPress()}
              />
            </View>
          ))}
        </View>

        <View style={{ width: 175 }}>
          <Button
            title="Custom success"
            onPress={() => showCustomSuccess()}
          />
        </View>
      </View>
    </DialogRoot>
  );
}

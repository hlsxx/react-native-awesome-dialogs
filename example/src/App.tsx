import { View, Button } from 'react-native';
import { Dialog, DialogRoot } from 'react-native-awesome-dialogs';

const BUTTONS = [
  { title: "Success", onPress: () => Dialog.success({ title: "Successfully", text: "Successfully executed" })},
  { title: "Info", onPress: () => Dialog.info({ title: "Info", text: "Info dialog" })},
  { title: "Warning", onPress: () => Dialog.warning({ title: "Warning", text: "Some warning occured" })},
  { title: "Error", onPress: () => Dialog.error({ title: "Error", text: "Some error occured" })},
  { title: "Locked", onPress: () => Dialog.locked({ title: "Locked", text: "Locked action" })},
];

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
                title="Success"
                onPress={() => Dialog.success({ title: "Successfully", text: "Successfully executed" })}
              />
            </View>
          ))}
        </View>
      </View>
    </DialogRoot>
  );
}

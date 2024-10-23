import { View, Button } from 'react-native';
import { Dialog, DialogRoot } from 'react-native-awesome-dialogs';

export default function App() {
  return (
    <DialogRoot>
      <View style={{ flex: 1 }}>
        <Button
          title="Show on press"
          onPress={() => Dialog.success({ title: "Successfully", text: "Successfully executed" })}
        />
      </View>
    </DialogRoot>
  );
}

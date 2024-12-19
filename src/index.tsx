import { Component, createContext } from 'react';
import { View, Modal, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { DialogType, type DialogProps, type DialogShowProps, type DialogState, type DialogTypeParams } from './types';
import { getIconImage } from './helpers/image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ALERT_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH / 4);
const DialogContext = createContext<DialogState>({ isVisible: false, type: DialogType.Success });

class Dialog {
  public static success(_props: DialogShowProps): void {}
  public static warning(_props: DialogShowProps): void {}
  public static error(_props: DialogShowProps): void {}
  public static info(_props: DialogShowProps): void {}
  public static locked(_props: DialogShowProps): void {}
}

class DialogRoot extends Component<DialogProps, DialogState & DialogShowProps> {
  dialog: Dialog = new Dialog();

  constructor(props: DialogProps) {
    super(props);

    this.state = {
      isVisible: false,
      type: DialogType.Success,
    };

    Dialog.success = (props: DialogShowProps) => this._show(DialogType.Success, props);
    Dialog.warning = (props: DialogShowProps) => this._show(DialogType.Warning, props);
    Dialog.error = (props: DialogShowProps) => this._show(DialogType.Error, props);
    Dialog.info = (props: DialogShowProps) => this._show(DialogType.Info, props);
    Dialog.locked = (props: DialogShowProps) => this._show(DialogType.Locked, props);
  }

  private _show(type: DialogType, props: DialogShowProps) {
    this.setState({ ...props, isVisible: true, type: type });
  }

  private _onHide() {
    const onHide = this.state.onHide;

    this.setState({ isVisible: false }, () => {
      if (onHide) onHide();
    });
  }

  private _getTypeParams(): DialogTypeParams {
    switch (this.state.type) {
      case DialogType.Error: return { icon: "error", color: this.state.color ?? "#c74a4a" };
      case DialogType.Warning: return { icon: "alert", color: this.state.color ?? "#c7994a" };
      case DialogType.Info: return { icon: "info", color: this.state.color ?? "#4ac7bf" };
      case DialogType.Locked: return { icon: "lock", color: this.state.color ?? "#bfbfbf" };
      default: return { icon: "success", color: this.state.color ?? "#99c74a" };
    }
  }

  render() {
    const params = this._getTypeParams();

    return (
      <DialogContext.Provider value={{ isVisible: this.state.isVisible, type: this.state.type }}>
        {this.props.children}

        <Modal
          visible={this.state.isVisible}
          animationType="fade"
          transparent
          onRequestClose={() => this._onHide()}
        >
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={[styles.iconCircle, { backgroundColor: params.color }]}>
                <Image
                  source={getIconImage(this.state.type)}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>

              <Text style={[styles.title, { color: params.color }, this.state.titleStyle]}>{this.state.title}</Text>
              <Text style={[styles.text, this.state.textStyle]}>{this.state.text}</Text>

              <TouchableOpacity
                onPress={() => this._onHide()}
                style={[styles.btn, { backgroundColor: params.color }]}
              >
                <Text style={[{ color: '#fff' }, this.state.button?.style]}>{this.state.button?.text ?? "OK"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </DialogContext.Provider>
    );
  }
}

export { Dialog, DialogRoot };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: ALERT_WIDTH,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  iconCircle: {
    position: 'absolute',
    height: 64,
    width: 64,
    top: -32,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    margin: 10
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  }
});


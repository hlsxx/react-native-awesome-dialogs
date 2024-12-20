import type { DialogProps, DialogShowProps, DialogState,  DialogTypeParams } from 'react-native-awesome-dialogs';

import { Component, createContext } from 'react';
import { View, Modal, StyleSheet, Dimensions, Text, TouchableOpacity, Image, type ImageRequireSource } from 'react-native';

/*
 * Defined Dialog type
 */
export enum DialogType {
  Success,
  Warning,
  Error,
  Info,
  Locked
}

/*
 * Returns icon based on the DialogType
 */
const getIconImage = (type: DialogType): ImageRequireSource => {
  switch (type) {
    case DialogType.Info: return require("./assets/info.png");
    case DialogType.Warning: return require("./assets/warning.png");
    case DialogType.Error: return require("./assets/error.png");
    case DialogType.Locked: return require("./assets/lock.png");
    default: return require("./assets/success.png");
  }
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ALERT_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH / 4);
const DialogContext = createContext<DialogState>({ isVisible: false, type: DialogType.Success });

// Default properties used for the state reset
const DialogShowPropsDefault: DialogShowProps = {
  title: undefined,
  text: undefined,
  icon: undefined,
  color: undefined,
  titleStyle: undefined,
  textStyle: undefined,
  onShow: undefined,
  onHide: undefined,
  style: undefined,
  button: undefined
}

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
      type: DialogType.Success
    };

    Dialog.success = (props: DialogShowProps) => this._show(DialogType.Success, props);
    Dialog.warning = (props: DialogShowProps) => this._show(DialogType.Warning, props);
    Dialog.error = (props: DialogShowProps) => this._show(DialogType.Error, props);
    Dialog.info = (props: DialogShowProps) => this._show(DialogType.Info, props);
    Dialog.locked = (props: DialogShowProps) => this._show(DialogType.Locked, props);
  }

  /*
   * On the modal request show
   *
   * Sets isVisible to true
   */
  private _show(type: DialogType, props: DialogShowProps) {
    this.setState({ ...DialogShowPropsDefault, ...props, isVisible: true, type: type });
  }

  /*
   * On the modal request hide
   *
   * Sets isVisible to false
   * Calls the callback if exists
   */
  private _hide() {
    const onHide = this.state.onHide;

    this.setState({ isVisible: false }, () => {
      if (onHide) onHide();
    });
  }

  /*
   * Returns the Dialog params based on the DialogType
   */
  private _getTypeParams(): DialogTypeParams {
    const { color } = this.state;

    switch (this.state.type) {
      case DialogType.Error: return { icon: "error", color: color ?? "#c74a4a" };
      case DialogType.Warning: return { icon: "warning", color: color ?? "#c7994a" };
      case DialogType.Info: return { icon: "info", color: color ?? "#4a8fc7" };
      case DialogType.Locked: return { icon: "lock", color: color ?? "#abb0ba" };
      default: return { icon: "success", color: color ?? "#99c74a" };
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
          onRequestClose={() => this._hide()}
        >
          <View style={styles.container}>
            <View style={[styles.content, this.state.style]}>
              <View style={[styles.iconCircle, { backgroundColor: params.color }]}>
                <Image
                  source={getIconImage(this.state.type)}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>

              <Text style={[styles.title, { color: params.color }, this.state.titleStyle]}>{this.state.title}</Text>
              <Text style={[styles.text, this.state.textStyle]}>{this.state.text}</Text>

              <TouchableOpacity
                onPress={() => this._hide()}
                style={[styles.btn, { backgroundColor: params.color }, this.state.button?.style]}
              >
                <Text style={[{ color: '#fff' }, this.state.button?.textStyle]}>{this.state.button?.text ?? "OK"}</Text>
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


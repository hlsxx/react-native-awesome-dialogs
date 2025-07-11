import {
  DialogType, type DialogProps,
  type DialogRef,
  type DialogShowProps,
  type DialogState,
  type DialogTypeParams
} from './../types';

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react';

import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  type ImageRequireSource
} from 'react-native';

/*
 * Returns icon based on the DialogType
 */
const getIconImage = (type: DialogType): ImageRequireSource => {
  switch (type) {
    case DialogType.Info: return require("./../assets/info.png");
    case DialogType.Warning: return require("./../assets/warning.png");
    case DialogType.Error: return require("./../assets/error.png");
    case DialogType.Locked: return require("./../assets/lock.png");
    default: return require("./../assets/success.png");
  }
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ALERT_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH / 4);
const DialogContext = createContext<DialogState>({ isVisible: false, type: DialogType.Success });

const DialogShowPropsDefault: DialogShowProps = {
  title: undefined,
  text: undefined,
  icon: undefined,
  iconStyle: undefined,
  color: undefined,
  titleStyle: undefined,
  textStyle: undefined,
  onShow: undefined,
  onHide: undefined,
  style: undefined,
  button: undefined
};

// Singleton interface to call externally
export const Dialog = {
  success: (_props: DialogShowProps) => {},
  warning: (_props: DialogShowProps) => {},
  error: (_props: DialogShowProps) => {},
  info: (_props: DialogShowProps) => {},
  locked: (_props: DialogShowProps) => {}
};

const DialogRoot = forwardRef<DialogRef, DialogProps>(({ children }, ref) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isVisible: false,
    type: DialogType.Success
  });

  const [dialogProps, setDialogProps] = useState<DialogShowProps>(DialogShowPropsDefault);

  useImperativeHandle(ref, () => ({
    show
  }));

  const show = useCallback((type: DialogType, props: DialogShowProps) => {
    setDialogProps({ ...DialogShowPropsDefault, ...props });
    setDialogState({ isVisible: true, type });
  }, []);

  const hide = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isVisible: false }));
    if (dialogProps.onHide) dialogProps.onHide();
  }, [dialogProps]);

  const getTypeParams = useCallback((): DialogTypeParams => {
    const { color } = dialogProps;
    switch (dialogState.type) {
      case DialogType.Error: return { icon: "error", color: color ?? "#c74a4a" };
      case DialogType.Warning: return { icon: "warning", color: color ?? "#c7994a" };
      case DialogType.Info: return { icon: "info", color: color ?? "#4a8fc7" };
      case DialogType.Locked: return { icon: "lock", color: color ?? "#abb0ba" };
      default: return { icon: "success", color: color ?? "#99c74a" };
    }
  }, [dialogState.type, dialogProps]);

  Dialog.success = (props) => show(DialogType.Success, props);
  Dialog.warning = (props) => show(DialogType.Warning, props);
  Dialog.error = (props) => show(DialogType.Error, props);
  Dialog.info = (props) => show(DialogType.Info, props);
  Dialog.locked = (props) => show(DialogType.Locked, props);

  const params = useMemo(() => getTypeParams(), [getTypeParams]);

  return (
    <DialogContext.Provider value={{ isVisible: dialogState.isVisible, type: dialogState.type }}>
      {children}

      <Modal
        visible={dialogState.isVisible}
        animationType="fade"
        transparent
        onRequestClose={hide}
      >
        <View style={styles.container}>
          <View style={[styles.content, dialogProps.style]}>
            <View style={[styles.iconCircle, { backgroundColor: params.color }, dialogProps.iconStyle]}>
              <Image
                source={getIconImage(dialogState.type)}
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            <Text style={[styles.title, { color: params.color }, dialogProps.titleStyle]}>{dialogProps.title}</Text>
            <Text style={[styles.text, dialogProps.textStyle]}>{dialogProps.text}</Text>

            <TouchableOpacity
              onPress={hide}
              style={[styles.btn, { backgroundColor: params.color }, dialogProps.button?.style]}
            >
              <Text style={[{ color: '#fff' }, dialogProps.button?.textStyle]}>
                {dialogProps.button?.text ?? "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DialogContext.Provider>
  );
});

export { DialogRoot };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
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

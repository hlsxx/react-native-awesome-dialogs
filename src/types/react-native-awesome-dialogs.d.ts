declare module 'react-native-awesome-dialogs' {
  import type { ReactNode } from "react";
  import type { StyleProp, TextStyle, ViewStyle } from "react-native";

  export interface DialogTypeParams {
    icon: string;
    color: string;
  }

  export interface DialogProps {
    children: ReactNode;
  };

  export interface DialogState {
    isVisible: boolean;
    type: DialogType;
  };

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
}

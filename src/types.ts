import type { ReactNode } from "react";
import type { StyleProp, TextStyle } from "react-native";

export enum DialogType {
  Success,
  Warning,
  Error,
  Info
}

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
  button?: {
    style?: StyleProp<TextStyle>,
    text?: string;
    onPress?: () => void;
  }
}


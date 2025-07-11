import type { ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

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

export interface DialogTypeParams {
  icon: string;
  color: string;
}

export interface DialogProps {
  children: ReactNode;
}

export interface DialogRef {
  show: (dialogType: DialogType, props: DialogShowProps) => void;
}

export interface DialogState {
  isVisible: boolean;
  type: DialogType;
}

export interface DialogShowProps {
  title?: string;
  text?: string;
  icon?: string;
  iconStyle?: StyleProp<ViewStyle>;
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


import type { ImageRequireSource } from 'react-native';
import { DialogType } from '../types';

export const getIconImage = (type: DialogType): ImageRequireSource => {
  switch (type) {
    case DialogType.Warning: return require("../assets/warning.png");
    case DialogType.Error: return require("../assets/error.png");
    case DialogType.Info: return require("../assets/info.png");
    default: return require("../assets/success.png");
  }
}

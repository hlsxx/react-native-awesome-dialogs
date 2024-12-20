import type { ImageRequireSource } from 'react-native';
import { DialogType } from '../types';

export const getIconImage = (type: DialogType): ImageRequireSource => {

    console.log(type);
  switch (type) {
    case DialogType.Info: return require("../assets/info.png");
    case DialogType.Warning: return require("../assets/warning.png");
    case DialogType.Error: return require("../assets/error.png");
    case DialogType.Locked: return require("../assets/lock.png");
    default: return require("../assets/success.png");
  }
}

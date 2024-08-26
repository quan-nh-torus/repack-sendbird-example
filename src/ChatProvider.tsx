import React from 'react';

import {
  createNativeClipboardService,
  createNativeFileService,
  createNativeMediaService,
  createNativeNotificationService,
  createNativePlayerService,
  createNativeRecorderService,
  SendbirdUIKitContainerProps,
} from '@sendbird/uikit-react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFBMessaging from '@react-native-firebase/messaging';
import Video from 'react-native-video';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileAccess from 'react-native-file-access';
import * as ImagePicker from 'react-native-image-picker';
import * as Permissions from 'react-native-permissions';
import * as CreateThumbnail from 'react-native-create-thumbnail';
import * as ImageResizer from '@bam.tech/react-native-image-resizer';
import * as AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import {MMKV} from 'react-native-mmkv';
import {SENDBIRD_APP_ID} from './env';

const mmkv = new MMKV();

export const platformServices: SendbirdUIKitContainerProps['platformServices'] =
  {
    clipboard: createNativeClipboardService(Clipboard),
    notification: createNativeNotificationService({
      messagingModule: RNFBMessaging,
      permissionModule: Permissions,
    }),
    file: createNativeFileService({
      imagePickerModule: ImagePicker,
      documentPickerModule: DocumentPicker,
      permissionModule: Permissions,
      fsModule: FileAccess,
      mediaLibraryModule: CameraRoll,
    }),
    media: createNativeMediaService({
      VideoComponent: Video,
      thumbnailModule: CreateThumbnail,
      imageResizerModule: ImageResizer,
    }),
    player: createNativePlayerService({
      audioRecorderModule: AudioRecorderPlayer,
      permissionModule: Permissions,
    }),
    recorder: createNativeRecorderService({
      audioRecorderModule: AudioRecorderPlayer,
      permissionModule: Permissions,
    }),
  };

interface IChatProviderProps {
  children: React.ReactNode;
}

const ChatProvider = (props: IChatProviderProps) => {
  return (
    <SendbirdUIKitContainer
      appId={SENDBIRD_APP_ID}
      chatOptions={{localCacheStorage: mmkv}}
      platformServices={platformServices}>
      {props.children}
    </SendbirdUIKitContainer>
  );
};

export default ChatProvider;

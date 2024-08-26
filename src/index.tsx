import {View, Text} from 'react-native';
import React from 'react';
import ChatProvider from './ChatProvider';

const App = () => {
  return (
    <ChatProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Chat app sample</Text>
      </View>
    </ChatProvider>
  );
};

export default App;

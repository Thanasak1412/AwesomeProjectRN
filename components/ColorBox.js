import React, {useCallback} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// clipboard
import Clipboard from '@react-native-clipboard/clipboard';

const ColorBox = ({colorName, hexCode}) => {
  const handleColorClipboard = useCallback(() => {
    Clipboard.setString(hexCode);
    Alert.alert('Copied to clipboard!', '', [], {
      cancelable: true,
    });
  }, [hexCode]);

  return (
    <TouchableOpacity onPress={handleColorClipboard}>
      <View style={styles.boxColor(hexCode)}>
        <Text style={styles.textColor(hexCode)}>
          {colorName}: {hexCode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ColorBox;

const styles = StyleSheet.create({
  boxColor: backgroundColor => ({
    width: '100%',
    backgroundColor,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  }),
  textColor: hexCode => ({
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? '#000000'
        : '#ffffff',
    fontWeight: 'bold',
  }),
});

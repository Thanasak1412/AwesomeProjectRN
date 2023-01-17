import React, {memo, useCallback} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

function SelectColorList({selectedColors, setSelectedColors, item}) {
  const handleValueChange = useCallback(
    newValue =>
      newValue
        ? setSelectedColors(prev => [...prev, item])
        : setSelectedColors(prev => [
            ...prev.filter(color => color.colorName !== item.colorName),
          ]),
    [item, setSelectedColors],
  );

  return (
    <View style={styles.switchWrapper}>
      <Text style={styles.text}>{item.colorName}</Text>
      <Switch
        value={
          !!selectedColors.find(color => color.colorName === item.colorName)
        }
        onValueChange={handleValueChange}
      />
    </View>
  );
}

export default memo(SelectColorList);

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});

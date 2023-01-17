import React, {useCallback, memo} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function SampleColorPalette({item, navigateColorPalette}) {
  const handlePress = useCallback(() => {
    if (item) {
      navigateColorPalette(item);
    }
  }, [item, navigateColorPalette]);

  const onRenderItem = useCallback(
    color => (
      <View style={[styles.colorBox(color.item.hexCode), styles.color]} />
    ),
    [],
  );

  const onKeyExtractor = useCallback(({colorName}) => colorName, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.textHeader}>{item.paletteName}</Text>
      <FlatList
        style={styles.listItem}
        data={item.colors.slice(0, 5)}
        keyExtractor={onKeyExtractor}
        renderItem={onRenderItem}
      />
    </TouchableOpacity>
  );
}

export default memo(SampleColorPalette);

const styles = StyleSheet.create({
  textHeader: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  color: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    height: 40,
    width: 40,
    marginRight: 10,
  },
  colorBox: backgroundColor => ({
    backgroundColor,
  }),
});

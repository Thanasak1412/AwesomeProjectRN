import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

// components
import ColorBox from '../components/ColorBox';

export default function ColorPalette({route}) {
  const {colors} = route.params;

  const renderColorBox = useCallback(
    ({item}) => <ColorBox colorName={item.colorName} hexCode={item.hexCode} />,
    [],
  );

  const extractKey = useCallback(item => item.hexCode, []);

  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={extractKey}
      renderItem={renderColorBox}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

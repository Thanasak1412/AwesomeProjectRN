import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

// external library
import _ from 'lodash';

// components
import SampleColorPalette from '../components/SampleColorPalette';

export default function Home({navigation, route}) {
  const [colorPalette, setColorPalette] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const newPalette = useMemo(
    () => (route.params ? route.params.newPalette : null),
    [route.params],
  );

  const handleFetchPalette = useCallback(async () => {
    const url = 'https://color-palette-api.kadikraman.vercel.app/palettes';

    setIsFetching(true);

    const res = await fetch(url);

    if (res.ok) {
      const palettes = await res.json();

      if (!_.isEqual(colorPalette, palettes)) {
        setColorPalette(palettes);
      }
    }

    setTimeout(() => setIsFetching(false), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchPalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (_.isObject(newPalette) && !_.isEmpty(newPalette)) {
      setColorPalette(prevColorPalette =>
        !_.isEqual(prevColorPalette, [...prevColorPalette, newPalette])
          ? [newPalette, ...prevColorPalette]
          : prevColorPalette,
      );
    }
  }, [newPalette]);

  const navigateColorPalette = useCallback(
    item =>
      navigation.push('ColorPalette', {
        paletteName: item.paletteName,
        colors: item.colors,
      }),
    [navigation],
  );

  const onKeyExtractor = useCallback(item => item.paletteName, []);

  const onRenderItem = useCallback(
    ({item}) => {
      return (
        <SampleColorPalette
          item={item}
          navigateColorPalette={navigateColorPalette}
        />
      );
    },
    [navigateColorPalette],
  );

  const handleAddNewPalette = useCallback(() => {
    navigation.push('AddNewPalette', {
      colorPalette,
    });
  }, [navigation, colorPalette]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleAddNewPalette}>
        <Text style={styles.textButton}>Add a color scheme</Text>
      </TouchableOpacity>
      <FlatList
        data={colorPalette}
        keyExtractor={onKeyExtractor}
        renderItem={onRenderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleFetchPalette}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textButton: {
    color: '#258787',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

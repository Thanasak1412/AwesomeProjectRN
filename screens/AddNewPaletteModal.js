import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// utils
import _ from 'lodash';

// mocks
import {COLORS} from '../__mock__/colors';

// components
import SelectColorList from '../components/SelectColorList';

export default function AddNewPaletteModal({navigation, route}) {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const {colorPalette} = route.params;
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onRenderItem = useCallback(
    ({item}) => (
      <SelectColorList
        item={item}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
    ),
    [selectedColors],
  );

  const onKeyExtractor = useCallback(color => color.colorName, []);

  const handleSubmit = useCallback(() => {
    validateForm();

    navigation.navigate('Home', {
      newPalette: {paletteName: name, colors: selectedColors},
    });
  }, [name, navigation, selectedColors, validateForm]);

  const validateForm = useCallback(
    (isAlert = true) => {
      if (!name) {
        isAlert && Alert.alert('Please add a name of your color palette');
        return false;
      } else if (selectedColors.length < 3) {
        isAlert && Alert.alert('Please choose at lease 3 colors');
        return false;
      } else if (hasPaletteName()) {
        isAlert && Alert.alert('Name of your color palette is already');
        return false;
      }

      return true;
    },
    [hasPaletteName, name, selectedColors],
  );

  const hasPaletteName = useCallback(
    () => colorPalette.find(color => color.paletteName === name),
    [colorPalette, name],
  );

  useEffect(() => {
    !validateForm(false) ? setIsDisableButton(true) : setIsDisableButton(false);
  }, [validateForm]);

  const handleModalClose = useCallback(() => setIsModalVisible(false), []);

  const handleRenderModalList = useCallback(
    ({item}) => (
      <View style={styles.selectedColorsList(item.hexCode)}>
        <Text>{item.colorName}</Text>
      </View>
    ),
    [],
  );

  const handlePreview = useCallback(() => setIsModalVisible(true), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Name of your color palette</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={setName}
          value={name}
        />
      </View>

      {/* Modal Preview */}
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.selectColorListWrapper}>
          <FlatList data={selectedColors} renderItem={handleRenderModalList} />
          <View style={styles.closeButtonWrapper}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleModalClose}>
              <Text style={styles.closeButtonText}>(x)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.buttonPreview} onPress={handlePreview}>
        <Text style={styles.buttonText}>Preview</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.colorList}
        data={COLORS}
        keyExtractor={onKeyExtractor}
        renderItem={onRenderItem}
      />
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handleSubmit}
        disabled={isDisableButton}>
        <View style={[styles.button, isDisableButton && styles.disabledButton]}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    padding: 10,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  modal: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectColorListWrapper: {
    marginTop: 80,
  },
  selectedColorsList: backgroundColor => ({
    backgroundColor,
    marginHorizontal: 10,
    padding: 10,
  }),
  closeButtonWrapper: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  buttonPreview: {
    backgroundColor: '#00BDFE',
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  colorList: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonWrapper: {
    height: 100,
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: '#5F8A8B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#57595d',
  },
});

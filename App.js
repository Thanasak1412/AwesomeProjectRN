import 'react-native-gesture-handler';

import React, {useCallback} from 'react';

// external library
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import ColorPalette from './screens/ColorPalette';
import Home from './screens/Home';
import AddNewPaletteModal from './screens/AddNewPaletteModal';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  const optionProp = useCallback(
    ({route}) => ({title: route?.params?.paletteName}),
    [],
  );

  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={optionProp}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  const screenOptions = {
    presentation: 'modal',
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={screenOptions}>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="AddNewPalette" component={AddNewPaletteModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

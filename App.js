import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './home';
import Content from './content';

const stackNavigator=createStackNavigator({
  Home:{screen:Home},
  Content:{screen:Content}
},{initialRouteName:'Home'})

const App=createAppContainer(stackNavigator)
export default App;



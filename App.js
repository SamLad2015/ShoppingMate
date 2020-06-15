import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Lists from './screens/Lists';
import List from './screens/List';
import Items from './screens/Items';

const App = createStackNavigator({
        FirstScreen: { screen: Lists },
        SecondScreen: { screen: List },
        ThirdScreen: { screen: Items },
    },
    {
        initialRouteName: 'FirstScreen',
    }
);
export default createAppContainer(App);

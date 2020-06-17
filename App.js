import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Lists from './screens/Lists';
import List from './screens/List';
import Items from './screens/Items';

const App = createStackNavigator({
        Lists: { screen: Lists },
        List: { screen: List },
        Items: { screen: Items },
    },
    {
        initialRouteName: 'Lists',
    }
);
export default createAppContainer(App);

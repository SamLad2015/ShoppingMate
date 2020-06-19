import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Lists from './Lists';
import List from './List';
import Items from './Items';

const Nav = createStackNavigator({
        Lists: { screen: Lists },
        List: { screen: List },
        Items: { screen: Items },
    },
    {
        initialRouteName: 'Lists',
    }
);
export default createAppContainer(Nav);

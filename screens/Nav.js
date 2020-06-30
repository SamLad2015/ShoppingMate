import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import Lists from './Lists';
import List from './List';
import Items from './Items';

const Nav = createStackNavigator({
        Lists: { screen: Lists },
        List: { screen: List },
        Items: { screen: Items },
    },
    {
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        }
    }
);
export default createAppContainer(Nav);

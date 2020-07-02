import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import Lists from './Lists';
import List from './List';
import Items from './Items';
import Login from "./Login";

const Nav = createStackNavigator({
        Login: { screen: Login },
        Lists: { screen: Lists },
        List: { screen: List },
        Items: { screen: Items }
    },
    {
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
        initialRouteName: 'Lists'
    }
);
export default createAppContainer(Nav);

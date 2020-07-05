import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import Lists from './lists/Lists';
import List from './lists/List';
import Items from './lists/Items';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";

const Nav = createStackNavigator({
        Login: { screen: Login },
        Logout: { screen: Logout },
        Register: { screen: Register },
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

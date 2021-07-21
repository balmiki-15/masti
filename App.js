import React, {useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screen/Home';
import Register from './screen/Register';
import Login from './screen/Login';
import CameraRec from './screen/CameraRec'
import LoadingScreen from './screen/LoadingScreen';
import Search from './screen/Search';
import Message from './screen/Message';
import Profile from './screen/Profile';
import User_profile from './screen/User_profile';
import Download from './screen/Download';

const Stack = createStackNavigator();

const App = () => {

	return (
		<NavigationContainer>
			<Stack.Navigator headerMode="none">
				<Stack.Screen name="loading" component={LoadingScreen} />
				<Stack.Screen name="register" component={Register} />
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="search" component={Search} />
				<Stack.Screen name="camera" component={CameraRec} />
				<Stack.Screen name="message" component={Message} />
				<Stack.Screen name="profile" component={Profile} />
				<Stack.Screen name="user_profile" component={User_profile} />
				<Stack.Screen name="download" component={Download} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
export default App

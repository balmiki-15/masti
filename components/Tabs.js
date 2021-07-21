import React, { useState } from 'react'

import {TouchableOpacity} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Feather } from '@expo/vector-icons'

import styled from 'styled-components/native'

const Container = styled.View`
	height: 59px;
	width: 100%;
	position: absolute;
	bottom: 0;
	z-index: 1;
	border-top-width: 1px;
	border-top-color: rgba(255, 255, 255, 0.2);
	flex-direction: row;
`
const Menu = styled.TouchableOpacity`
	width: 20%;
	height: 100%;
	justify-content: center;
	align-items: center;
`
const Icon = styled.Image.attrs({ resizeMode: 'contain' })`
	height: 32px;
`
const MenuText = styled.Text`
	font-size: 9px;
	margin-top: -3px;
	color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.6)')};
`
const Border = styled(LinearGradient)`
	width: 44px;
	height: 28px;
	border-radius: 8px;
	align-items: center;
`
const Button = styled.TouchableOpacity`
	width: 36px;
	height: 28px;
	background: #fff;
	border-radius: 8px;
	justify-content: center;
	align-items: center;
`

const Tabs = ({props}) => {
	return (
		<Container>
			<Menu onPress={()=>props.navigation.replace('home')}>
				<Icon source={require('../assets/icons/home.png')} />
				<MenuText active={true}>Home</MenuText>
			</Menu>

			<Menu onPress={()=>props.navigation.navigate('search')}>
				<Icon source={require('../assets/icons/discover.png')} />
				<MenuText active={true}>Search</MenuText>
			</Menu>

			<Menu>
				<Border
					start={{ x: 1, y: 0 }}
					locations={[0, 0.5, 0.5, 1]}
					colors={['#F42365', '#f42365', '#37d7cf', '#37d7cf']}>
					<Button onPress={()=>props.navigation.navigate('camera')}>
						<Feather name='plus' size={20} />
					</Button>
				</Border>
			</Menu>

			<Menu onPress={()=>props.navigation.navigate('message')}>
				<Icon source={require('../assets/icons/message.png')} />
				<MenuText active={true}>Messages</MenuText>
			</Menu>

			<Menu onPress={()=>props.navigation.navigate('profile')}>
				<Icon source={require('../assets/icons/profile.png')} />
				<MenuText active={true}>Profile</MenuText>
			</Menu>
		</Container>
	)
}

export default Tabs

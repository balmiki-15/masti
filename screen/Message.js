import React, { useState, useEffect } from 'react'
import { StatusBar, Text} from 'react-native'
import styled from 'styled-components/native'
import Tabs from '../components/Tabs'
import { LinearGradient } from 'expo-linear-gradient'
import url from '../services/url'
import AsyncStorage from '@react-native-community/async-storage';
const Container = styled.View`
	flex: 1;
	background: purple;
`
const Gradient = styled(LinearGradient)`
	height: 100%;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
`



const Message = (props) => {
	useEffect( ()=>{
		detectToken();
		
	},[])
	async function detectToken(){
		let stoken = await AsyncStorage.getItem('token');
		// isliked(videoid, stoken);
		fetchData(stoken);
	}
	const [msg, setMsg] = useState("nothing new");
	const fetchData = async(token)=>{
		fetch(`${url}/notification`,{
			method:'POST',
			headers:new Headers({
				'x-access-token' : (token),
				'Content-Type' : 'application/json; charset=utf-8',
				"Accept": "application/json",
			})
		})
		.then(res=>res.json())
		.then(data=>{
			try{
			console.log(data);
			setMsg(data.message);
			}
			catch{
				console.log("e");
			}
		})
	}
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='black'
				barStyle='light-content'
			/>
			<Container>
				<Text style={{margin:30, fontWeight:"200",fontSize:16}}> {msg} </Text>
				<Gradient
					locations={[0, 0.26, 0.6, 1]}
					colors={[
							'rgba(26,26,26,0.6)',
							'rgba(26,26,26,0)',
							'rgba(26,26,26,0)',
							'rgba(26,26,26,0.6)',
							]}>
				<Tabs props = {props} />
				</Gradient>
			</Container>
		</>
	)
}

export default Message

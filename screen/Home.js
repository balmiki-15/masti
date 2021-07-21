import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react'
import { StatusBar} from 'react-native'
import styled from 'styled-components/native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Tabs from '../components/Tabs'
import url from '../services/url'
const Container = styled.View`
	flex: 1;
	background: transparent;
`

const Home = (props) => {

	useEffect( ()=>{
		detectToken();
	},[])
	async function detectToken(){
		let token = await AsyncStorage.getItem('token');
		fetchData(token);
	}
	const [Videos,setVideos] = useState([]);
	const fetchData = async(token)=>{
		fetch(`${url}/trending`,{
			method:"POST",
			headers:new Headers({
				'x-access-token' : (token),
				'Content-Type' : 'application/json; charset=utf-8',
				"Accept": "application/json",
			}),
		})
		.then(res=>res.json())
		.then(data=>{
			// console.log("----->00000----2",data.comments.comments);
			setVideos(data.videos);
		})
	}
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container>
				<Header props={props} tab_1={false} tab_2={true} />
				<Hero videos={Videos} />
				<Tabs props = {props} />
			</Container>
		</>
	)
}

export default Home

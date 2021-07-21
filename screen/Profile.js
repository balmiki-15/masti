import React, { useState, useEffect } from 'react'
import { StatusBar, Text, View,Image, StyleSheet, Alert } from 'react-native'
import Tabs from '../components/Tabs'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import  url from '../services/url'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
// ec2-3-7-75-223.ap-south-1.compute.amazonaws.com
const Gradient = styled(LinearGradient)`
	height: 100%;
	justify-content: space-between;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
`
const Profile = (props) => {
	async function detectToken(){
		const token = await AsyncStorage.getItem('token');
		// console.log(token);
		fetchData(token);

	}
	// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOjEzfQ.EXjyEpp01xODA7XLQADVXfpMwLDH4JOVeOYc-lijPfk';
	const [profiles,setProfiles] = useState("");
	async function fetchData(token){
		fetch(`${url}/profile`,{
			method:"POST",
			headers:{
				'x-access-token' : token,
				'Content-Type' : 'application/json; charset=utf-8'
			}
		})
		.then(res=>res.json())
		.then(data=>{
			// console.log(data);
			setProfiles(data.profile);
		})
	}
	useEffect( ()=>{
		detectToken();
	},[])
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='black'
				barStyle='light-content'
			/>
		<View style={{flex:1, height:"100%", backgroundColor:"purple"}}>
			<View style={styles.Container}>
				<View style={{alignSelf:"center"}}>
					<View style={styles.profileImage}>
						<Image source={{uri:profiles.img}} resizeMode="center" style={styles.image}></Image>
					</View>
					<View style={styles.add}>
						<Ionicons name="ios-add" size={40} color="#DFD8C8" style={{marginTop:6, marginLeft:2}} ></Ionicons>
					</View>
				</View>

				<View style={styles.infoContainer}>
					<Text style={[styles.text, {fontWeight:"200", fontSize:36} ]}> {profiles.name} </Text>
					<Text style={[styles.text, {color:"orange", fontSize:16} ]}> @lolipop lover </Text>
				</View>
				
				<View style={styles.statusContainer}>
					<View style={styles.statusBox}>
						<Text style={[styles.text,{fontSize:24}]}> {profiles.follower} </Text>
						<Text style={styles.text,styles.subText}> Follower </Text>
					</View>
					<View style={[styles.statusBox,{borderColor:"#D5D8C8", borderLeftWidth:1, borderRightWidth:1}]}>
						<Text style={[styles.text,{fontSize:24}]}> 100k </Text>
						<Text style={styles.text,styles.subText}> Likes </Text>
					</View>
					<View style={styles.statusBox}>
						<Text style={[styles.text,{fontSize:24}]}> {profiles.following} </Text>
						<Text style={styles.text,styles.subText}> Following </Text>
					</View>
				</View>
			</View>
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
		</View>	
		</>
	)
}
const styles = StyleSheet.create({
	Container:{
		height:"50%",
		backgroundColor:"white",
		borderBottomLeftRadius:50,
		borderBottomRightRadius:50,
		elevation:15
	},
	image:{
		flex:1,
		width:undefined,
		height:undefined,
		resizeMode:"cover",
	},
	profileImage:{
		width:100,
		height:100,
		borderRadius:100,
		overflow:"hidden",
		borderWidth:3,
		marginTop:30,
	},
	titleBar:{
		flexDirection:"row",
		justifyContent:"space-between",
		marginTop:24,
		marginHorizontal:16
	},
	add:{
		backgroundColor:"#41444B",
		position:"absolute",
		bottom:5,
		right:-4,
		width:25,
		height:25,
		borderRadius:50,
		alignItems:"center",
		justifyContent:"center"
	},
	text:{
		color:"purple",
	},
	subText:{
		fontSize:12,
		color:"grey",
		fontWeight:"500",
		textTransform:"uppercase"
	},
	infoContainer:{
		alignItems:"center",
		alignSelf:"center",
		marginTop:16
	},
	statusContainer:{
		flexDirection:"row",
		alignSelf:"center",
		marginTop:32
	},
	statusBox:{
		alignItems:"center",
		flex:1
	}
});
export default Profile

import React, { useState, useEffect } from 'react'
import { StatusBar, Text, View,Image, StyleSheet } from 'react-native'
import Tabs from '../components/Tabs'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import  url from '../services/url'
// ec2-3-7-75-223.ap-south-1.compute.amazonaws.com

const User_profile = ({route}) => {
	const detectToken = async()=>{
		const token = await AsyncStorage.getItem('token');
		setToken(token);
		
	}
	const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOjl9.ym2BF6vByQyjDNp-3q-LPoDpXOmxObSR1hHFAI91MBU';
	const {id, profiles} = route.params;
	// const [token,setToken] = useState("");
	const fetchData = async()=>{
		fetch(`${url}/follow/${id}`,{
			method:"POST",
			headers:{
				'x-access-token' : (token),
				'Content-Type' : 'application/json; charset=utf-8'
			}
		})
		.then(res=>res.json())
		.then(message=>{
			console.log(message);
		})
	}
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
					<Image source={{uri:profiles.user_prof_pic}} resizeMode="center" style={styles.image}></Image>
				</View>
				<View style={styles.add}>
					<Ionicons name="ios-add" size={48} color="#DFD8C8" style={{marginTop:6, marginLeft:2}} ></Ionicons>
				</View>
				</View>

				<View style={styles.infoContainer}>
					<Text style={[styles.text, {fontWeight:"200", fontSize:36} ]}> {profiles.user_name} </Text>
					<Text style={[styles.text, {color:"orange", fontSize:16} ]}> @lolipop lover </Text>
				</View>
				
				<View style={styles.statusContainer}>
					<View style={styles.statusBox}>
						<Text style={[styles.text,{fontSize:24}]}> {profiles.user_fans} </Text>
						<Text style={styles.text,styles.subText}> Follower </Text>
					</View>
					<View style={[styles.statusBox,{borderColor:"#D5D8C8", borderLeftWidth:1, borderRightWidth:1}]}>
						<Text style={[styles.text,{fontSize:24}]}> 100k </Text>
						<Text style={styles.text,styles.subText}> Likes </Text>
					</View>
					<View style={styles.statusBox}>
						<Text style={[styles.text,{fontSize:24}]}> {profiles.user_following} </Text>
						<Text style={styles.text,styles.subText}> Following </Text>
					</View>
				</View>

			</View>
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
		elevation:20
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
		marginTop:30
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
		bottom:10,
		right:-3,
		width:25,
		height:25,
		borderRadius:50,
		alignItems:"center",
		justifyContent:"center"
	},
	text:{
		color:"green"
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
export default User_profile

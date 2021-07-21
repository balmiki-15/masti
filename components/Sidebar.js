import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import {TouchableOpacity, Text, View, TextInput, Alert, FlatList, Image} from 'react-native';
import { Feather as Icona } from '@expo/vector-icons';
import  url from '../services/url';


const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: flex-end;
`
const Menu = styled.TouchableOpacity`
	margin: 9px 0;
	align-items: center;
`
const User = styled.View`
	width: 48px;
	height: 48px;
	margin-bottom: 13px;
`
const Avatar = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 48px;
	border-width: 2px;
	border-color: #ffffff;
`
const Icon = styled.Image`
	height: 40px;
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
`
const SoundBg = styled.View`
	background: #1f191f;
	width: 50px;
	height: 50px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`
const Sound = styled.Image`
	width: 25px;
	height: 25px;
	border-radius: 25px;
`

const Sidebar = ({ user, count, video, iPlay}) => {
	useEffect( ()=>{
		detectToken();
	},[])
	const [token, setToken] = useState("");
	const refRBSheet = useRef();
	const navigation = useNavigation();
	const [liked,setLiked] = useState(video.isliked);
	const [comment,setComment] = useState("");
	const [comment_data,setComment_Data] = useState([]);
	async function detectToken(){
		let stoken = await AsyncStorage.getItem('token');
		// isliked(videoid, stoken);
		setToken(stoken);
	}
	function doFollow(videoid, user){
		navigation.navigate('user_profile',{
			id : videoid,
			profiles : user,
		});
	}
	
	async function isliked(videoid, token){
		fetch(`${url}/islike/${videoid}`,{
			method:'POST',
			headers:new Headers({
				'x-access-token' : token,
				'Content-Type' : 'application/json; charset=utf-8',
				"Accept": "application/json",
			}),
		})
		.then(res=>res.json())
		.then(message=>{
			setLiked(message.message);
			// //console.log('new message hau bhaiwa-',message.message);
            // Alert.alert();
		})
	}
	async function displayComments(videoid){
		fetch(`${url}/get_comment/${videoid}`
		)
		.then(res=>res.json())
		.then(message=>{
			// console.log('new message hau bhaiwa------>>>>',message.message);
            // Alert.alert();
			setComment_Data(message.message);
		})
		refRBSheet.current.open();
	}
	async function doComment(videoid, comment, token){
		// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdWJsaWNfaWQiOjl9.ym2BF6vByQyjDNp-3q-LPoDpXOmxObSR1hHFAI91MBU';
		// console.log(videoid);
		fetch(`${url}/comment`,{
			method:'POST',
			headers:new Headers({
				'x-access-token' : (token),
				'Content-Type' : 'application/json; charset=utf-8',
				"Accept": "application/json",
			}),
			body:JSON.stringify({
				'id':videoid,
				'comment':comment
			})
		})
		.then(res=>res.json())
		.then(message=>{
			//console.log('new message hau bhaiwa------>>>>',message);
            // Alert.alert();
		})
		setComment("");
		displayComments(comment_data);
	}
	
	async function doLike(videoid, token){
		//console.log(video);
		fetch(`${url}/like/${videoid}`,{
			method:'POST',
			headers:new Headers({
				'x-access-token' : (token),
				'Content-Type' : 'application/json; charset=utf-8',
				"Accept": "application/json",
			})
		})
		.then(res=>res.json())
		.then(message=>{
			//console.log('new message hau bhaiwa------>>>>',message);
			setLiked(message.message);
            // Alert.alert();
		})
		// isliked(videoid, token);
	}
	async function downloadVideo(videoid){
		// const [d_url, setD_Url] = useState("");
		fetch(`${url}/download/${videoid}`)
		.then(res=>res.json())
		.then(data=>{
			// //console.log(data);
			navigation.navigate('download',{url : data.messege});
			// setD_Url(data);
		})
	}
	
	return iPlay ? (
		<Container>
			<RBSheet
        	ref={refRBSheet}
        	closeOnDragDown={true}
        	closeOnPressMask={true}
        	customStyles={{
          		wrapper: {
            		backgroundColor: "transparent"
          		},
          		draggableIcon: {
            		backgroundColor: "blue"
          		}
        	}}>
				<View style={{flex:1,margin:0, flexDirection:"column"}}>
					{/* {comment_data.map((item, index) => {
						return (
							<View key={index} style={{flexDirection:"row", alignSelf:"flex-start"}}>
								<Text style={{fontSize:14,color:"blue" , marginLeft:5 , justifyContent:"space-around"}}>{item.comment_.commentedby} : </Text>
								<Text style={{fontSize:14, color:"green" , marginLeft:5 , justifyContent:"space-around"}}> {item.comment_.comment}</Text>
							</View>
						)
					})} */}
					<FlatList
						keyExtractor = {(item,index)=>`${index}`}
						data = {comment_data}
						renderItem = 
						{({item})=>
						<View style={{flexDirection:"row", alignSelf:"flex-start", padding:5}}>
							<Image source={{uri:item.comment_.img}} resizeMode="cover" style={{height:36, width:36, borderRadius:50}}></Image>
							<Text style={{fontSize:18,color:"blue" , marginLeft:5 , justifyContent:"space-around"}}>{item.comment_.commentedby} : </Text>
							<Text style={{fontSize:18, color:"green" , marginLeft:5 , justifyContent:"space-around"}}> {item.comment_.comment}</Text>
						</View>
						}
					/>
						
				</View>

				<View style={{
					flexDirection:"row",
					alignSelf:"flex-end",
					top:0,
				}}>
					<TextInput 
						style={{
							marginLeft:5,
							width:"88%",
							height:40,
							backgroundColor:"white",
							elevation:10,
							borderTopRightRadius:15,
							borderBottomRightRadius:15,
						}}
						placeholder="comment goes here"
						value={comment}
						onChangeText={(text)=>setComment(text)} 
					/>
					<TouchableOpacity onPress={()=>doComment(video.id, comment, token)}>
						<Icona name="send" size={40} color="blue"></Icona>
					</TouchableOpacity>
				</View>

      		</RBSheet>
			<Menu onPress={()=>doFollow(video.id, user)}>
				<User>
					<Avatar resizeMode='cover' source={{uri:user.user_prof_pic}} />
				</User>
			</Menu>

			<Menu onPress={()=> doLike(video.id, token)}>
				<Icon resizeMode='contain' source={liked==="liked" ? require('../assets/icons/liked.png') : require('../assets/icons/like.png')} />
				<Count>{count.likes}</Count>
			</Menu>

			<Menu onPress={()=>displayComments(video.id)}>
				<Icon
					resizeMode='contain'
					source={require('../assets/icons/comment.png')}
				/>
				<Count>{count.comments}</Count>
			</Menu>

			<Menu onPress={()=>downloadVideo(video.id)}>
				<Icon resizeMode='contain' source={require('../assets/icons/share.png')} />
				<Count>{count.shares}</Count>
			</Menu>

			<Menu>
				<SoundBg>
					<Sound resizeMode='cover' source={{uri: user.user_prof_pic}} />
				</SoundBg>
			</Menu>
		</Container>
	):(
		<Text> problem in loading</Text>
	)
}

export default Sidebar

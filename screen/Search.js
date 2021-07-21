import React, { useState, useEffect } from 'react'
import { StatusBar, TouchableOpacity, Text, View, TextInput} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import  url from '../services/url'
import { Feather as Icon } from '@expo/vector-icons';

const Container = styled.View`
	flex: 1;
	background: transparent;
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


const Search = (props) => {
    const [query,setQuery] = useState('');
	const [msg, setMsg] = useState("");
	async function doSearch(query){
		fetch(`${url}/search/${query}`)
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
        <Container>
        <StatusBar backgroundColor='black' barStyle='light-content'/>
        <Gradient
            locations={[0, 0.26, 0.9, 1]}
            colors={[
                    'rgba(26,26,26,0.6)',
                    'rgba(26,26,26,0)',
                    'rgba(26,26,26,0)',
                    'rgba(26,26,26,0.6)',
                    ]}>
            <View style={{
                flexDirection:"row",
                marginTop:25,
                justifyContent:"space-between",
            }}>
                <TextInput 
                style={{
                    width:"90%",
                    height:45,
                    backgroundColor:"white",
                    elevation:15,
                }}
                placeholder='Search your queries here...' 
                value={query}
                onChangeText={(text)=>setQuery(text)} 
                />
                <TouchableOpacity onPress={()=>doSearch(query)}>
                    <Icon name = 'search' size={43} color='orange' style={{backgroundColor:"white", borderBottomRightRadius:40}}></Icon>
                </TouchableOpacity>
        
            </View>
            <View style={{flexDirection:"column",backgroundColor:"purple", flex:1}}>
                <Text 
                style={{fontSize:20,lineHeight:55, marginTop:5, padding:5,flexDirection:"column"
                }}>name : {msg.name} image: {msg.img} follower : {msg.follower} following :  {msg.following} 
                </Text>
            </View>
            </Gradient>
        </Container>
	)
}

export default Search

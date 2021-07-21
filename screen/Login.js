import React ,{useState} from 'react';
import { Text, StatusBar, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import url from '../services/url';
const Login = (props) => {
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    // function sendCred(){
    //     const data = { username: name,password:password };
    //     fetch('http://413ed79ecc05.ngrok.io/login', {
    //       method: 'POST', // or 'PUT'
    //       headers: new Headers({
    //         'Authorization': `Basic ${base64.encode(`${name}:${password}`)}`,
    //         'Content-Type': 'application/json; charset=utf-8'
    //         }),
    //     })
    //     .then(response => {
    //         if(response.ok) return response.json();
    //         throw new Error('Network response was not ok');
    //     })
    //     .then(data => {
    //       console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    // }
    const sendCred = async (props)=>{
        if(name!="" & password!=""){

            fetch(`${url}/login`,{
                method:'POST',
                headers:{
                'Content-Type' : 'application/json; charset=utf-8'
                },
            body:JSON.stringify({
                "username" : name,
                "password" : password
                })
            })
            .then((res)=>res.json())
            .then(async (data)=>{
                // console.log(data.token);
                try{
                    await AsyncStorage.setItem('token',data.token)
                    props.navigation.replace('home')
                }
                catch(e){
                    //saving error
                    // console.log('error hau ho---->',e);
                    Alert.alert('error hakau');
                }
            })
        }else{
            Alert.alert("pls enter valid details");
        }
}
    return(
        <>
            <KeyboardAvoidingView behavior="position">

            <StatusBar backgroundColor='blue' barStyle='dark-content'/>

            <TextInput
                label='UserName'
                theme={{colors:{primary:'blue'}}}
                mode="outlined"
                style={{fontSize:18,marginTop:20,marginLeft:10,marginRight:10}}
                value={name}
                onChangeText={(text)=>setName(text)}
            />

            <TextInput
                label='PassWord'
                secureTextEntry={true}
                theme={{colors:{primary:'blue'}}}
                mode="outlined"
                style={{fontSize:18,marginTop:20,marginLeft:10,marginRight:10}}
                value={password}
                onChangeText={(text)=>setPassword(text)}
            />

            <Button
            theme={{colors:{primary:'blue'}}}
            mode='contained' 
            style={{fontSize:18,marginTop:20,marginLeft:10,marginRight:10}}
            onPress={()=> sendCred(props)}>
                Login
            </Button>

            <TouchableOpacity>
            <Text style={{fontSize:18,marginTop:20,marginLeft:18}} onPress={()=>props.navigation.replace('register')}>
                    Don't have an account?
                </Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
};
export default Login;
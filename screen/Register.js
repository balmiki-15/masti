import React, {useState} from 'react';
import {Text,StatusBar,TouchableOpacity,KeyboardAvoidingView,Image, Alert, View} from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import  url from '../services/url'
const Register=(props)=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    sendCred = ()=>{
        if(name!="" & email!=""){

                fetch(`${url}/register`,{
                    method:"POST",
                    headers:{
                        'Content-Type' : 'application/json; charset=utf-8'
                    },
                    body:JSON.stringify({
                        "name" : name,
                        "email" : email,
                        "password" : password
                    })
                }).then(res=>res.json())
                .then(message=>{
                    console.log('new message hau bhiwa------>>>>',message);
                    // Alert.alert(message);
                    props.navigation.replace('login');
                })
        }
        else{
            Alert.alert("pls enter correct details");
            // console.log("pls enter input details");
        }
    }
    // sendCred = ()=>{
    //     fetch("https://b99ba60fac9d.ngrok.io/trending",{
    //         method:"GET",
    //         headers:{
    //             'Content-Type' : 'Application/json'
    //         }
    //     }).then(res=>res.json())
    //     .then((data)=>{
    //         console.log(data)
    //     })
    // }
    return(
        <>
            <StatusBar backgroundColor='blue' barStyle='dark-content'/>
            <KeyboardAvoidingView behavior="position">
            <View>
            <TextInput
                style={{marginTop:20,marginLeft:10,marginRight:10}}
                onChangeText={(text)=>setName(text)}
                value={name}
                label='UserName'
                theme={{colors:{primary:'blue'}}}
                mode="outlined"
                />

            <TextInput
                style={{marginTop:20,marginLeft:10,marginRight:10}}
                onChangeText={(text)=>setEmail(text)}
                value={email}
                label='E-Mail'
                theme={{colors:{primary:'blue'}}}
                mode="outlined"
                />

            <TextInput
                style={{marginTop:20,marginLeft:10,marginRight:10}}
                onChangeText={(text)=>setPassword(text)}
                value={password}
                label='PassWord'
                theme={{colors:{primary:'blue'}}}
                mode="outlined"
                
            />

            <Button
                theme={{colors:{primary:'blue'}}}
                mode='contained' 
                style={{marginTop:20,marginLeft:10,marginRight:10,borderRadius:50}}
                onPress={()=> sendCred()}>
                    Sign Up
            </Button>

            <TouchableOpacity>
                <Text style={{fontSize:18,marginTop:20,marginLeft:18}} onPress={()=>props.navigation.replace('login')}>
                    Already have an account?
                </Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            <Image source={require('../assets/lalipop.gif')} style={{width:"100%", height:"45%"}}></Image>
            {/* <Image source={require('../assets/lalipop.gif')}></Image> */}
        </>
    );
};
export default Register;
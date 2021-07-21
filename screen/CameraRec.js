import React, { useState, useRef, useEffect } from "react";
import { View,Text,TouchableOpacity, Alert} from "react-native";
import { Ionicons,Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Camera } from "expo-camera";
import * as Permissions from 'expo-permissions';
import url from '../services/url';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isVideoRecording, setIsVideoRecording] = useState(null);
  const [isVideoUploading, setisVideoUploading] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING,Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);
  const uploadVideo = async () => {
    setisVideoUploading(true);
    const token = await AsyncStorage.getItem('token');
    const type = "video/mp4";
    const formData = new FormData();
    formData.append("file", {
        name: "test1.mp4",
        type,
        uri: videoSource
    });
    fetch(`${url}/upload`,{
      method:'POST',
      headers: {
        'x-access-token' : token,
      },
			body:formData
		})
		.then(res=>res.json())
		.then(message=>{
      if(message.message=="done"){
        setisVideoUploading(false);
        Alert.alert(message.message);
        console.log('new message hau bhaiwa------>>>>',message);
      }
    })
    // .catch((error)=>{
    //   Alert.alert(error);
    // })
  };
  const recordVideo = async () => {
    if (cameraRef){
      try {
        setIsVideoRecording(true);
        // const options = {maxDuration:25}
        let video_data = await cameraRef.current.recordAsync();
        setVideoSource(video_data.uri);
      } catch (error) {
        console.warn('error hakau ------>',error);
      }
    }
  };
  const stopVideoRecording = () => {
    if (cameraRef) {
      cameraRef.current.stopRecording();
      setIsVideoRecording(false);
    }
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={{color:'red'}}>No access to camera</Text>;
  }
  return isVideoUploading ? (
    <View style={{flex:1,alignItems:"center",top:180}}>
      <Text style={{
        fontSize:50,
        color:"purple",
        backgroundColor:"black",
        }}>Uploading ...
      </Text>
    </View>
  ):(
    <View style={{flex:1}}>
      <Camera
        ref={cameraRef}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        style={{ flex: 1,flexDirection:"column", justifyContent:"space-around"}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent:'space-around'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginBottom:4,
            }}
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name={ Platform.OS === 'ios' ? "ios-reverse-camera" : 'md-reverse-camera'} size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginBottom:5,
            }}
            onPress={() => {
              if(!isVideoRecording){
                console.log('starting..');
                recordVideo();
                
              }else{
                stopVideoRecording();
                console.log('stopped....');
                // takePicture();
              }
            }}>
            <Icon name="aperture" size={40} color={isVideoRecording ?"red":"white"}></Icon>
          </TouchableOpacity>
      
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginBottom:5,
            }}
            onPress={() => {
              console.log("video source : --->", videoSource);
              uploadVideo();
            }}>
            <Icon name="send" size={40} color={isVideoRecording ? "transparent":"white"}></Icon>
          </TouchableOpacity>
        </View>
        </Camera>
    </View>
  );
}
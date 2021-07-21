import React, {useEffect} from 'react'
import {ActivityIndicator, StyleSheet,View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const LoadingScreen = (props) => {
	
	// await AsyncStorage.removeItem('token');
	const detectLogin = async()=>{
		const token = await AsyncStorage.getItem('token');
		if (token){
			props.navigation.replace('home');
		}else{
			props.navigation.replace('register');
		}
	}
	useEffect(()=>{
		detectLogin();
	},[])

	return (
        <View style={styles.loading}>
            <ActivityIndicator size='large' color='blue' />
        </View>
	)
}

const styles = StyleSheet.create({
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default LoadingScreen
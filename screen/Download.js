import React, { useEffect, useState } from 'react'
import { StatusBar, Text, View,Image, StyleSheet } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ProgressBar, Colors } from 'react-native-paper';
// ec2-3-7-75-223.ap-south-1.compute.amazonaws.com

const Download = ({route}) => {
	const {url} = route.params;
	const [progress, setProgress] = useState(0);
	const [d_status, setD_status] = useState("downloading");
	useEffect(()=>{
		downloadVideo(`${url}`);
	},[]);
	
	async function downloadVideo(videourl){
		const callback = downloadProgress => {
			var progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
			progress = progress.toFixed(2)*100;
			setProgress(progress);
			console.log(`downloading${progress}%`);
		  };
		  
		  const downloadResumable = FileSystem.createDownloadResumable(
			`${videourl}`,
			FileSystem.documentDirectory + 'lalipop.mp4',
			{},
			callback
		  );
		  
		  try {
			const { uri } = await downloadResumable.downloadAsync();
			setD_status("downloaded");
			console.log('Finished downloading to ', uri);
			await Sharing.shareAsync(uri);

		  } catch (e) {
			console.error(e);
		  }
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
				<View style={{marginTop:75, justifyContent:"space-between", padding:15}}>
					<Text style={{marginVertical:5}}> {d_status}...{progress} %</Text>
					<ProgressBar progress={progress/100} color={Colors.red800} />
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
	}
});
export default Download

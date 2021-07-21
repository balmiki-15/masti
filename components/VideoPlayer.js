import React from 'react';
import { Video } from 'expo-av';
import styled from 'styled-components/native';

const Play = styled(Video)`
	height: 100%;
`
const Poster = styled.Text`
	height: 100%;
`

const VideoPlayer = ({ video,isPlay }) => {
	return isPlay ? (
		<Play
			rate={1.0}
			volume={1.0}
			isMuted={false}
			shouldPlay
			useNativeControls={false}
			source={{ uri: video }}
			resizeMode='cover'
		/>
	) : (
		<Poster>Hello</Poster>
	)
}

export default VideoPlayer

const api = [
	{
		id: 0,
		video: require('../assets/videos/01.mp4'),
		poster: require('../assets/poster/01.jpg'),
		user: {
			username: '@saloni',
			description: 'lets do TikTok',
			music: 'lia original',
			avatar: require('../assets/avatar/01.jpg')
		},
		count: {
			like: '1.1M',
			comment: '4080',
			share: '2800'
		}
	},
	{
		id: 1,
		video: require('../assets/videos/02.mp4'),
		poster: require('../assets/poster/02.jpg'),
		user: {
			username: '@shivani',
			description:
				'lets daance on tiktok',
			music: 'som original',
			avatar: require('../assets/avatar/02.jpg')
		},
		count: {
			like: '380K',
			comment: '2388',
			share: '535'
		}
	}
]

export default api

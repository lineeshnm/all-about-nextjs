import type { YoutubeChannel } from './types'
const {
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_TOKEN
} = process.env

const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_TOKEN}&type=video&order=date&maxResults=6`

export const getYoutubeVideos = async () => {
  try {
    const youtubeResp = await fetch(YOUTUBE_API)
    const channelObject: YoutubeChannel = await youtubeResp.json()

    if (!channelObject.items) {
      throw channelObject
    }

    if (channelObject.items.length < 1) {
      return []
    }

    return channelObject.items.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      image: video.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`
    }))
  } catch (error) {
    // handle error
    // submit error
    throw error
  }
}
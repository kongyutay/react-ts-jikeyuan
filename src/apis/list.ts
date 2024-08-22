import {http} from '@/utils'
import type { ResType } from './shared'


type ChannelItem = {
    id: number,
    name: string
}

type ChannelRes = {
    channels: ChannelItem[]
}

//请求频道列表
export function fetchChannelAPI() {
    return http.request<ResType<ChannelRes>>({
        url:'/channels'
    })
}
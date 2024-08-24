import { Image, InfiniteScroll, List } from "antd-mobile";
import { useEffect, useState } from "react";
import {fetchListAPI, ListRes} from '@/apis/list'

type Props = {
  channelId: string
}

const HomeList = (props: Props) => {
    const {channelId} = props
    const [listRes, setListRes] = useState<ListRes>({
        results:[],
        pre_timestamp: '' + new Date().getTime(),
    })
    useEffect(()=> {
        const getList = async () => {
            try {
                const res = await fetchListAPI({
                    channel_id: channelId,
                    timestamp: ''+ new Date().getTime()
                })
                setListRes({
                  results: res.data.data.results,
                  pre_timestamp: res.data.data.pre_timestamp,
                })
            } catch (error) {
                throw new Error('fetch list error')
            }
        }
        getList();
    },[channelId])

    const [hasMore, setHasMore] = useState(true)
    const loadMore = async () => {
      try {
        const res = await fetchListAPI({
            channel_id: channelId,
            timestamp: listRes.pre_timestamp
        })
        //拼接新数据 + 存取下一次请求的事件戳
        setListRes({
          results: [...listRes.results, ...res.data.data.results],
          pre_timestamp: res.data.data.pre_timestamp,
        })
        //停止监听
        if(res.data.data.results.length === 0){
          setHasMore(false)

        }
    } catch (error) {
        throw new Error('fetch list error')
    }
    }

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10}/>
    </>
  );
};

export default HomeList;

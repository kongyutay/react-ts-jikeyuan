import './style.css'
import { Tabs } from 'antd-mobile'
import {fetchChannelAPI, type ChannelItem } from '@/apis/list'
import { useEffect, useState } from 'react';

const Home = () => {
    const [channels, setChannels] = useState<ChannelItem[]>([]);
    useEffect(()=> {
        const getChannels = async () => {
            try {
                const res = await fetchChannelAPI();
                setChannels(res.data.data.channels);
            } catch (error) {
                throw new Error('Fetch channel error');
            }
        }
        getChannels();
    }, [])
    return (
        <div>
            <div className='tabContainer'>
                <Tabs>
                    {channels.map(item => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            菠萝
                        </Tabs.Tab>
                    ))}
                    
                </Tabs>
            </div>
        </div>
    )
}

export default Home
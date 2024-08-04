import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify'

const ListSong = () => {

    const [data, setData] = useState([])

    const fetchSongs = () => {
        axios.get('/song/list')
            .then(data => data.data.songs)
            .then(setData)
            .catch(() => toast.error('Error Occured'))
    }

    const removeSong = id => {
        axios.delete(`/song/remove/${id}`)
            .then(data => data.data.message)
            .then(data => {
                toast.success(data)
                fetchSongs()
            })
            .catch(() => toast.error('Something went wrong'))
    }

    useEffect(() => {
        fetchSongs()
    }, [])

    return (
        <div>
            <p>All Songs List</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {
                    data.map(item => (
                        <div key={item._id} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <p className='cursor-pointer' onClick={() => removeSong(item._id)}>x</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListSong
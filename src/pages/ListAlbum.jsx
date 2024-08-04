import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify'

const ListAlbum = () => {
    const [data, setData] = useState([])

    const fetchData = () => {
        axios.get('/album/list')
            .then(data => data.data.albums)
            .then(setData)
            .catch(() => toast.error('Error Occured'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const removeAlbum = id => {
        axios.delete(`/album/remove/${id}`)
            .then(data => data.data.message)
            .then(data => {
                toast.success(data)
                fetchData()
            })
            .catch(() => toast.error('Something went wrong'))
    }

    return (
        <div>
            <p>All Albums List</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {
                    data.map(item => (
                        <div key={item._id} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' >
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColor} disabled />
                            <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}>x</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListAlbum
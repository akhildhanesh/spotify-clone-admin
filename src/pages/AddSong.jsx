import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify'

const AddSong = () => {
    const [image, setImage] = useState(false)
    const [song, setSong] = useState(false)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [album, setAlbum] = useState('none')
    const [loading, setLoading] = useState(false)
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        fetchAlbums()
    }, [])

    const fetchAlbums = () => {
        axios.get('/album/list')
            .then(data => data.data.albums)
            .then(data => {
                setAlbumData(() => data.map(item => item.name))
        })
    }

    const onSubmitHandler = async e => {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('album', album)
        formData.append('image', image)
        formData.append('audio', song)

        axios.post('/song/add', formData)
            .then(data => data.data)
            .then(data => {
                toast.success(data.message)
                setName('')
                setDesc('')
                setAlbum('None')
                setSong(false)
                setImage(false)
            })
            .catch(() => {
                toast.error('something went wrong')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return loading ? (
        <div className='grid place-items-center min-h-[80vh]'>
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin">

            </div>
        </div>
    ) : (
        <form className='flex flex-col items-start gap-8 text-gray-500' onSubmit={onSubmitHandler}>
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>upload Song</p>
                    <input onChange={e => setSong(e.target.files[0])} type="file" name="song" id="song" accept='audio/*' hidden />
                    <label htmlFor="song">
                        <img src={song ? assets.upload_added : assets.upload_song} alt="" className='w-24 cursor-pointer' />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input onChange={e => setImage(e.target.files[0])} type="file" name="image" id="image" accept='image/*' hidden />
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" className='w-24 cursor-pointer' />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Song name</p>
                <input onChange={e => setName(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 w-[40vw] p-2.5' placeholder='Type Here' required />
            </div>
            <div className="flex flex-col gap-2.5">
                <p>Song Desc</p>
                <input onChange={e => setDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 w-[40vw] p-2.5' placeholder='Type Here' required />
            </div>
            <div className='flex flex-col gap-2.5'>
                <p>Album</p>
                <select onChange={e => setAlbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'>
                        <option value="none">None</option>
                        {
                            albumData.map((item, i) => (
                                <option key={i} value="item">{ item }</option>
                            ))
                        }
                </select>
            </div>
            <button type='submit' className='text-base bg-black text-white px-14 py-2.5 cursor-pointer'>ADD</button>
        </form>
    )
}

export default AddSong
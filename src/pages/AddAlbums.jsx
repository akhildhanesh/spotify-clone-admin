import React, { useId, useState } from 'react'
import { assets } from '../assets/assets'
import axios from '../api/axiosInstance'
import { toast } from 'react-toastify'

const AddAlbums = () => {
    const id = useId()
    const [image, setImage] = useState(false)
    const [color, setColor] = useState('#121212')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = e => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('bgColor', color)
        formData.append('image', image)

        axios.post('/album/add', formData)
            .then(data => data.data.message)
            .then(data => {
                toast.success(data)
                setName('')
                setDesc('')
                setColor('#121212')
                setImage(false)
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setLoading(false))

    }

    return loading ? (
        <div className='grid place-items-center min-h-[80vh]'>
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin">

            </div>
        </div>
    ) : (
        <div>
            <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
                <div className='flex flex-col gap-4'>
                    <p>Upload Image</p>
                    <input onChange={e => setImage(e.target.files[0])} type="file" name="image" id={id + 'image'} accept='image/*' hidden />
                    <label htmlFor={id + 'image'}>
                        <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                </div>
                <div className="flex flex-col gap-2.5">
                    <p>Album Name</p>
                    <input onChange={e => setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 w-[40vw] p-2.5' type="text" placeholder='Type here' />
                </div>
                <div className="flex flex-col gap-2.5">
                    <p>Album Description</p>
                    <input onChange={e => setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 w-[40vw] p-2.5' type="text" placeholder='Type here' />
                </div>
                <div className='flex flex-col gap-3'>
                    <p>Background Colour</p>
                    <input onChange={e => setColor(e.target.value)} value={color} type="color" />
                </div>
                <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type="submit">ADD</button>
            </form>
        </div>
    )
}

export default AddAlbums
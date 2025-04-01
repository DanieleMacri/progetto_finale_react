import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='d-flex  flex-column justify-content-center align-items-center'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image mt-3 mb-2 rounded-3"
          style={{ height: size, width: size, boxShadow: "3px 3px 8px black" }}
        />
      ) : (
        <div className="avatar no-image rounded-3 " style={{ height: size, width: size, backgroundColor: 'white', boxShadow: "3px 3px 8px black" }} />
      )}
      <div style={{ width: size }} className='w-100'>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className='text-white mt-3 mb-2'
        />
      </div>
    </div>
  )
}
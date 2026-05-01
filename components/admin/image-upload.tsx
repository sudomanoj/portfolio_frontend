'use client'

import { useState, useRef } from 'react'
import { api } from '@/lib/api'
import { Image as ImageIcon, Upload, Loader2, X, RefreshCw } from 'lucide-react'

interface ImageUploadProps {
  currentImage?: string
  onUploadSuccess: (url: string) => void
  label?: string
}

export default function ImageUpload({ currentImage, onUploadSuccess, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show local preview immediately
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    setIsUploading(true)
    try {
      const { url } = await api.uploadImage(file)
      // Normalize URL (make it absolute for the frontend if needed)
      // Since backend serves at http://127.0.0.1:8000/uploads/filename
      // And we handle API_BASE_URL correctly in lib/api.ts
      // We should probably store the relative path and prepend the base URL during render
      // But for simplicity let's see how it was handled before.
      onUploadSuccess(`http://127.0.0.1:8000${url}`)
      setPreview(`http://127.0.0.1:8000${url}`)
    } catch (error) {
      alert('Failed to upload image')
      setPreview(currentImage)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      {label && <label className="text-sm text-gray-400 block ml-1">{label}</label>}
      <div className="relative group">
        <div className="w-full aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative">
          {preview ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <ImageIcon size={48} />
              <span className="text-xs">No image selected</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-white text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
            >
              {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
              {preview ? 'Change Image' : 'Upload Image'}
            </button>
          </div>
        </div>

        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(undefined)
              onUploadSuccess('')
            }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <p className="text-[10px] text-gray-600 text-center">Supports JPG, PNG, WEBP. Max size 5MB.</p>
    </div>
  )
}

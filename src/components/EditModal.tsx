'use client'

import { useState } from 'react'
import { useFeedback } from '@/context/FeedbackContext'

export default function EditModal({ listing, onClose, onUpdated }: any) {
    const [title, setTitle] = useState(listing.title)
    const { setMessage } = useFeedback()

    const handleSave = async () => {
        const res = await fetch('/api/actions/update', {
            method: 'POST',
            body: JSON.stringify({ id: listing.id, title }),
        })

        if (res.ok) {
            setMessage('Listing updated!')
            onUpdated()
            onClose()
        } else {
            setMessage('Failed to update listing.')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
                <h2 className="text-lg font-bold mb-4">Edit Listing</h2>
                <input
                    className="w-full p-2 border rounded mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="text-gray-600">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

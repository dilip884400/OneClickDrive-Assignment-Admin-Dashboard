'use client'

import { useEffect, useState } from 'react'
import { useFeedback } from '@/context/FeedbackContext'
import EditModal from '@/components/EditModal'

export default function DashboardPage() {
    const [listings, setListings] = useState([])
    const [editTarget, setEditTarget] = useState<any>(null)
    const [statusFilter, setStatusFilter] = useState('all')
    const [logs, setLogs] = useState([])
    const { setMessage } = useFeedback()

    const fetchListings = async () => {
        const res = await fetch('/api/listings')
        const data = await res.json()
        setListings(data.listings)
    }

    const fetchLogs = async () => {
        const res = await fetch('/api/audit-logs')
        const data = await res.json()
        console.log(data, "data")
        setLogs(data.logs)
    }

    useEffect(() => {
        fetchListings()
        fetchLogs()
    }, [])

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        const res = await fetch(`/api/actions/${action}`, {
            method: 'POST',
            body: JSON.stringify({ id }),
        })

        if (res.ok) {
            setMessage(`Listing ${action}d successfully`)
            fetchListings()
            fetchLogs()
        } else {
            setMessage('Something went wrong')
        }
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Car Listings</h1>

            <div className="mb-4">
                <label className="mr-2 font-medium">Filter by status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-3 py-1 rounded"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>


            <table className="w-full border mb-10">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Title</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings
                        .filter((listing: any) => statusFilter === 'all' || listing.status === statusFilter)
                        .map((listing: any) => (
                            <tr key={listing.id} className="border-t">
                                <td className="p-2">{listing.title}</td>
                                <td className="p-2">{listing.status}</td>
                                <td className="p-2 space-x-3">
                                    <button onClick={() => handleAction(listing.id, 'approve')} className="text-green-600">Approve</button>
                                    <button onClick={() => handleAction(listing.id, 'reject')} className="text-red-600">Reject</button>
                                    <button onClick={() => setEditTarget(listing)} className="text-blue-600">Edit</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>


            {editTarget && (
                <EditModal
                    listing={editTarget}
                    onClose={() => setEditTarget(null)}
                    onUpdated={() => {
                        fetchListings()
                        fetchLogs()
                    }}
                />
            )}


            <section className="mt-12">
                <h2 className="text-lg font-semibold mb-2">Audit Trail</h2>
                {logs.length === 0 ? (
                    <p className="text-gray-500">No actions yet.</p>
                ) : (
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Time</th>
                                <th className="p-2 border">Admin</th>
                                <th className="p-2 border">Action</th>
                                <th className="p-2 border">Listing ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log: any) => (
                                <tr key={log.id} className="border-t">
                                    <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
                                    <td className="p-2 border">{log.admin}</td>
                                    <td className="p-2 border capitalize">{log.action}</td>
                                    <td className="p-2 border">{log.listingId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </main>
    )
}

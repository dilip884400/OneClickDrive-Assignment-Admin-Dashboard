
type Listing = {
    id: string
    title: string
    status: 'pending' | 'approved' | 'rejected'
}

declare global {
    var listingsStore: Listing[] | undefined
}

if (!globalThis.listingsStore) {
    globalThis.listingsStore = [
        { id: '1', title: 'Toyota', status: 'pending' },
        { id: '2', title: 'Audi', status: 'pending' },
        { id: '3', title: 'BMW', status: 'pending' },
        { id: '4', title: 'Mercedes', status: 'pending' },
    ]
}

export const listings = globalThis.listingsStore!


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
  { id: '1', title: 'Lamborghini', status: 'pending' },
  { id: '2', title: 'Audi', status: 'pending' },
  { id: '3', title: 'BMW', status: 'pending' },
  { id: '4', title: 'Mercedes', status: 'pending' },
  { id: '5', title: 'Ford', status: 'pending' },
  { id: '6', title: 'Rolls-Royce', status: 'pending' },
  { id: '7', title: 'Bentley', status: 'pending' },
  { id: '8', title: 'Porsche', status: 'pending' },
  { id: '9', title: 'Maserati', status: 'pending' },
  { id: '10', title: 'Ferrari', status: 'pending' },
  { id: '11', title: 'Aston Martin', status: 'pending' },
  { id: '12', title: 'Jaguar', status: 'pending' },
  { id: '13', title: 'Bugatti', status: 'pending' },
  { id: '14', title: 'McLaren', status: 'pending' },
  { id: '15', title: 'Tesla', status: 'pending' }
]

}

export const listings = globalThis.listingsStore!

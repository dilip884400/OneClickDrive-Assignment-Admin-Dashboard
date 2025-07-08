"use client";

import { useEffect, useState } from "react";
import { useFeedback } from "@/context/FeedbackContext";
import EditModal from "@/components/EditModal";
import AuditTrail from "@/components/AuditTrail";

const ListingPage = ({ initialListings, initialLogs }: any) => {
  const [listings, setListings] = useState(initialListings);
  const [logs, setLogs] = useState(initialLogs);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const { setMessage } = useFeedback();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedListings = listings
    .filter(
      (listing: any) =>
        statusFilter === "all" || listing.status === statusFilter
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    listings.filter(
      (listing: any) =>
        statusFilter === "all" || listing.status === statusFilter
    ).length / itemsPerPage
  );

  const fetchListings = async () => {
    const res = await fetch("/api/listings");
    const data = await res.json();
    setListings(data.listings);
  };

  const fetchLogs = async () => {
    const res = await fetch("/api/audit-logs");
    const data = await res.json();
    setLogs(data.logs);
  };

  useEffect(() => {
    fetchListings();
    fetchLogs();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    const res = await fetch(`/api/actions/${action}`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMessage(`Listing ${action}d successfully`);
      fetchListings();
      fetchLogs();
    } else {
      setMessage("Something went wrong");
    }
  };

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
          {paginatedListings.map((listing: any) => (
            <tr key={listing.id} className="border-t">
              <td className="p-2">{listing.title}</td>
              <td className="p-2">{listing.status}</td>
              <td className="p-2 space-x-3">
                <button
                  onClick={() => handleAction(listing.id, "approve")}
                  className="text-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(listing.id, "reject")}
                  className="text-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => setEditTarget(listing)}
                  className="text-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {editTarget && (
        <EditModal
          listing={editTarget}
          onClose={() => setEditTarget(null)}
          onUpdated={() => {
            fetchListings();
            fetchLogs();
          }}
        />
      )}

      <AuditTrail logs={logs} />
    </main>
  );
};

export default ListingPage;

"use client";

import { useCallback, useEffect, useState } from "react";
import { useFeedback } from "@/context/FeedbackContext";
import EditModal from "@/components/EditModal";
import ListingRow from "./CarListingRow";

const ListingPage = ({ initialListings }: any) => {
  const [listings, setListings] = useState(initialListings);
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

  useEffect(() => {
    fetchListings();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    const res = await fetch(`/api/actions/${action}`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMessage(`Listing ${action}d successfully`);
      fetchListings();
    } else {
      setMessage("Something went wrong");
    }
  };

  const handleApprove = useCallback((id: string) => {
    handleAction(id, "approve");
  }, []);

  const handleReject = useCallback((id: string) => {
    handleAction(id, "reject");
  }, []);

  const handleEdit = useCallback((listing: any) => {
    setEditTarget(listing);
  }, []);

  return (
    <main className="md:p-6 p-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-4 md:mb-0">
          Car Listings
        </h1>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">
            Filter by status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm bg-white"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 mb-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm  text-gray-700 uppercase bg-white">
            <tr>
              <th className="px-6 py-3">Sr. No</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedListings.map((listing: any) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                onApprove={handleApprove}
                onReject={handleReject}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-6 space-x-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-400 text-white rounded disabled:opacity-50 hover:bg-orange-500 cursor-pointer"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-orange-400 text-white rounded disabled:opacity-50 hover:bg-orange-500 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {editTarget && (
        <EditModal
          listing={editTarget}
          onClose={() => setEditTarget(null)}
          onUpdated={() => {
            fetchListings();
          }}
        />
      )}
    </main>
  );
};

export default ListingPage;

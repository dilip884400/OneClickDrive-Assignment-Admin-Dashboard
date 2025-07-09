"use client";

import { useEffect, useState } from "react";
import { useFeedback } from "@/context/FeedbackContext";
import EditModal from "@/components/EditModal";
import { CheckCircle, XCircle, Pencil } from "lucide-react";
import Image from "next/image";
import { getStatusColor } from "@/constant/CommonFunction";

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
              <tr
                key={listing.id}
                className="bg-white  hover:bg-gray-100 transition"
              >
                <td className="px-6 py-4">{listing.id}</td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                  <div className="w-10 h-10 relative rounded-full border-2 border-orange-500 overflow-hidden">
                    <Image
                      src="/images/cars/car-icon.png"
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {listing.title}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                      listing.status
                    )}`}
                  >
                    {listing.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="group relative flex flex-col items-center">
                      <button
                        onClick={() => handleAction(listing.id, "approve")}
                        className="text-green-600 hover:text-green-700 cursor-pointer"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded shadow-md">
                        Approve
                      </span>
                    </div>

                    <div className="group relative flex flex-col items-center">
                      <button
                        onClick={() => handleAction(listing.id, "reject")}
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <XCircle size={20} />
                      </button>
                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded shadow-md">
                        Reject
                      </span>
                    </div>

                    <div className="group relative flex flex-col items-center">
                      <button
                        onClick={() => setEditTarget(listing)}
                        className="text-orange-400 hover:text-orange-600 cursor-pointer"
                      >
                        <Pencil size={20} />
                      </button>
                      <span className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded shadow-md">
                        Edit
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
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

"use client";

import { memo } from "react";
import { CheckCircle, XCircle, Pencil } from "lucide-react";
import Image from "next/image";
import { getStatusColor } from "@/constant/CommonFunction";

const ListingRow = ({
  listing,
  onApprove,
  onReject,
  onEdit,
}: {
  listing: any;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (listing: any) => void;
}) => {
  return (
    <tr className="bg-white hover:bg-gray-100 transition">
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
              onClick={() => onApprove(listing.id)}
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
              onClick={() => onReject(listing.id)}
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
              onClick={() => onEdit(listing)}
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
  );
};

export default memo(ListingRow);

"use client";

import { memo } from "react";
import { getStatusColor } from "@/constant/CommonFunction";

type AuditRowProps = {
  index: number;
  log: {
    id: string;
    timestamp: string;
    admin: string;
    action: string;
    listingId: string;
  };
};

const AuditRow = ({ index, log }: AuditRowProps) => {
  return (
    <tr className="bg-white hover:bg-gray-100 transition">
      <td className="px-6 py-4">{index + 1}</td>

      <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
        {new Date(log.timestamp).toLocaleString()}
      </td>

      <td className="px-6 py-4 text-gray-800">{log.admin}</td>

      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
            log.action
          )}`}
        >
          {log.action}
        </span>
      </td>

      <td className="px-6 py-4 text-gray-700">{log.listingId}</td>
    </tr>
  );
};

export default memo(AuditRow);

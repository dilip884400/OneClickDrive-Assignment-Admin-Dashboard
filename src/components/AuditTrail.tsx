"use client";

import { getStatusColor } from "@/constant/CommonFunction";
import { useEffect, useState } from "react";

type AuditTrailProps = {
  logs: any[];
};

const AuditTrail = ({ logs }: AuditTrailProps) => {
  const [logList, setLogList] = useState(logs);

  const fetchLogs = async () => {
    const res = await fetch("/api/audit-logs");
    const data = await res.json();
    setLogList(data.logs);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mb-4">
        Audit Trail
      </h2>

      {logList.length === 0 ? (
        <p className="text-gray-500">No actions yet.</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-white">
              <tr>
                <th className="px-6 py-3">Sr. No</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Listing ID</th>
              </tr>
            </thead>
            <tbody>
              {logList.map((log: any, index: any) => (
                <tr
                  key={log.id}
                  className="bg-white hover:bg-gray-100 transition"
                >
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AuditTrail;

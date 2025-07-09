"use client";
import { useEffect, useState } from "react";
import AuditListingRow from "./AuditListingRow";

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
    <section className="md:p-6 p-1">
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-4">
        Audit Trail
      </h1>

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
              {logList.map((log: any, index: number) => (
                <AuditListingRow key={log.id} log={log} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AuditTrail;

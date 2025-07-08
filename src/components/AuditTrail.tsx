"use client";
type AuditTrailProps = {
  logs: any[];
};

const AuditTrail = ({ logs }: AuditTrailProps) => {
  return (
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
                <td className="p-2 border">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="p-2 border">{log.admin}</td>
                <td className="p-2 border capitalize">{log.action}</td>
                <td className="p-2 border">{log.listingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AuditTrail;

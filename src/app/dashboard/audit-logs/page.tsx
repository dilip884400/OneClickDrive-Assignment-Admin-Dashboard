import AuditTrail from "@/components/AuditTrailTable";
import { auditLogs } from "@/lib/log";

const Page = () => {
  return (
    <>
      <AuditTrail logs={auditLogs} />
    </>
  );
};

export default Page;

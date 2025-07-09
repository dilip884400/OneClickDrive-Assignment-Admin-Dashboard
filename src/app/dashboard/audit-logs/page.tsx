import AuditTrail from "@/components/AuditTrail";
import { auditLogs } from "@/lib/log";

const Page = () => {
  return (
    <>
      <AuditTrail logs={auditLogs} />
    </>
  );
};

export default Page;

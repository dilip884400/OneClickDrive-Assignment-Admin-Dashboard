import ListingPage from "@/components/ListingPage";
import { listings } from "@/db/data";
import { auditLogs } from "@/lib/log";

const DashboardPage = async () => {
  return <ListingPage initialListings={listings} initialLogs={auditLogs} />;
};

export default DashboardPage;

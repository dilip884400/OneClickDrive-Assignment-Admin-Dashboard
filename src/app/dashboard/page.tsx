import ListingPage from "@/components/CarListingTable";
import { listings } from "@/db/data";
import { auditLogs } from "@/lib/log";

const DashboardPage = async () => {
  return <ListingPage initialListings={listings} initialLogs={auditLogs} />;
};

export default DashboardPage;

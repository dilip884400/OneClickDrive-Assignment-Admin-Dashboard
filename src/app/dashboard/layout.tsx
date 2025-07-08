import DashboardLayout from "@/components/Layout/DashboardLayout";

const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutWrapper;

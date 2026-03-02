import { DashboardAnalytics } from "@/types";
import { Text } from "../atoms";

interface IAnalyticsWrapperProps {
  analytics: DashboardAnalytics;
}

const AnalyticsWrapper = ({ analytics }: IAnalyticsWrapperProps) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="flex flex-col gap-2 items-center rounded-[16px] bg-yellow-300 p-6 text-black w-[175px]">
        <Text type="h3" className="text-3xl font-semibold">
          {analytics.totalPosted}
        </Text>
        <Text type="span" className="text-sm font-medium">
          Items posted
        </Text>
      </div>
      <div className="flex flex-col gap-2 items-center rounded-[16px] bg-red-400 p-6 text-white w-[175px]">
        <Text type="h3" className="text-3xl font-semibold">
          {analytics.totalGivenAway}
        </Text>
        <Text type="span" className="text-sm font-medium">
          Donations
        </Text>
      </div>
      <div className="flex flex-col gap-2 items-center rounded-[16px] bg-blue-500 p-6 text-white w-[175px]">
        <Text type="h3" className="text-3xl font-semibold">
          {analytics.totalSold}
        </Text>
        <Text type="span" className="text-sm font-medium">
          Sellings
        </Text>
      </div>
    </div>
  );
};

export default AnalyticsWrapper;

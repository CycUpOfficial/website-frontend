import { DashboardAnalytics, SampleProduct } from "@/types";
import AnalyticsWrapper from "../organisms/AnalyticsWrapper";

interface IProfileTemplateProps {
  analytics: DashboardAnalytics;
}

const ProfileTemplate = ({ analytics }: IProfileTemplateProps) => {
  return (
    <section className="h-full rounded-[20px] bg-white p-8 shadow-sm">
      <AnalyticsWrapper analytics={analytics} />
    </section>
  );
};

export default ProfileTemplate;

import { FeedbackTemplate } from "@/components/atomic/templates";
import { getUserRatings } from "@/services";
import { cookies } from "next/headers";

export default async function FeedbackPage() {
  const cookieHeader = (await cookies()).toString();
  const ratingsResponse = await getUserRatings({
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  const feedbacks = ratingsResponse.success ? ratingsResponse.data.ratings : [];
  const totalRatings = ratingsResponse.success
    ? ratingsResponse.data.totalRatings
    : 0;
  const overallRating = ratingsResponse.success
    ? ratingsResponse.data.overallRating
    : 0;

  return (
    <FeedbackTemplate
      feedbacks={feedbacks}
      totalRatings={totalRatings}
      overallRating={overallRating}
    />
  );
}

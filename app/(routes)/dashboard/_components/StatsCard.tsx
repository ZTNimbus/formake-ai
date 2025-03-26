import { fetchFormStats } from "@/actions/form.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";

interface StatsCardProps {
  loading: boolean;
  data: Awaited<ReturnType<typeof fetchFormStats>>;
}

function StatsCard({ data, loading }: StatsCardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Forms</CardDescription>

          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              <>{data?.totalFormsCreated ?? 0}</>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-xs text-muted-foreground">
            All forms created on your account
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Responses</CardDescription>

          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              <>{data?.totalResponses ?? 0}</>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-xs text-muted-foreground">
            Responses submitted for your forms
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Conversion Rate</CardDescription>

          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              <>{data?.conversionRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of views that resulted in responses
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Engagement Rate</CardDescription>

          <CardTitle className="text-4xl">
            {loading ? (
              <Loader className="h-[36px] animate-spin" />
            ) : (
              <>{data?.engagementRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of forms that received responses
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCard;

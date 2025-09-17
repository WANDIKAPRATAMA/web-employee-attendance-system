import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export function EmployeeStatistics({
  employeeCounts,
}: {
  employeeCounts: Record<string, number>;
}) {
  const totalEmployees = Object.values(employeeCounts).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Statistics</CardTitle>
        <CardDescription>Distribution across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(employeeCounts).map(([dept, count]) => {
            const percentage =
              totalEmployees > 0 ? (count / totalEmployees) * 100 : 0;

            return (
              <div key={dept} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept}</span>
                  <span className="text-sm text-muted-foreground">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {totalEmployees === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No employee data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

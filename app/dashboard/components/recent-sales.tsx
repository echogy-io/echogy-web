'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Sale {
  customer: {
    name: string
    email: string
  }
  amount: number
}

interface RecentSalesProps {
  sales: Sale[]
  title?: string
  description?: string
}

export function RecentSales({ 
  sales,
  title = "Recent Sales",
  description
}: RecentSalesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-6">
            {sales.map((sale, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{sale.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {sale.customer.email}
                  </p>
                </div>
                <div className="text-sm font-medium text-right">
                  +${sale.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: string | number
    timeframe: string
    isPositive?: boolean
  }
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend 
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <span className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}
            </span>
          )}
        </div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-1">
            {description || `${trend?.timeframe}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

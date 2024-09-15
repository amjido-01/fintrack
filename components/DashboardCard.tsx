import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  interface DashboardCardProps {
    cardTitle: string;
    cardContent: number | string;
    cardIcon: React.ReactElement;
  }
export const DashboardCard: React.FC<DashboardCardProps> = ({cardTitle, cardContent, cardIcon}) => {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
       {cardTitle}
      </CardTitle>
      <span className='text-gray-400'>{cardIcon}</span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{cardContent}</div>
      <p className="text-xs text-muted-foreground">
        +20.1% from last month
      </p>
    </CardContent>
  </Card>
  )
}

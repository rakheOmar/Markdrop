import {
  EyeIcon,
  HelpCircleIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featureData = [
  {
    desc: "Easily raise complaints about potholes, waste, streetlights, or other civic issues in your neighborhood.",
    icon: TrendingUpIcon,
    iconColor: "text-blue-600 dark:text-blue-300",
    bgColor: "bg-blue-100/70 dark:bg-blue-900/40",
    borderColor: "border-blue-300 dark:border-blue-600",
    title: "Quality Reporting",
    badgeTitle: "#1 Feature",
    gridClass: "md:col-span-1",
  },
  {
    desc: "Get real-time updates on the progress of your reported issues and see how the authorities respond.",
    icon: EyeIcon,
    iconColor: "text-emerald-600 dark:text-emerald-300",
    bgColor: "bg-emerald-100/70 dark:bg-emerald-900/40",
    borderColor: "border-emerald-300 dark:border-emerald-600",
    title: "Transparency",
    badgeTitle: "#2 Feature",
    gridClass: "lg:col-span-2",
  },
  {
    desc: "Our platform ensures fast, efficient issue tracking with data-driven insights for better decision making.",
    icon: ZapIcon,
    iconColor: "text-amber-600 dark:text-amber-300",
    bgColor: "bg-amber-100/70 dark:bg-amber-900/40",
    borderColor: "border-amber-300 dark:border-amber-600",
    title: "Performance",
    badgeTitle: "#3 Feature",
    gridClass: "md:col-span-1 lg:row-span-2",
    isLongest: true,
  },
  {
    desc: "Work together with local authorities and your community to drive meaningful, visible change.",
    icon: UsersIcon,
    iconColor: "text-violet-600 dark:text-violet-300",
    bgColor: "bg-violet-100/70 dark:bg-violet-900/40",
    borderColor: "border-violet-300 dark:border-violet-600",
    title: "Collaboration",
    badgeTitle: "#4 Feature",
    gridClass: "lg:col-span-2",
  },
  {
    desc: "Your reports are stored securely and prioritized to ensure reliability and accountability.",
    icon: ShieldCheckIcon,
    iconColor: "text-rose-600 dark:text-rose-300",
    bgColor: "bg-rose-100/70 dark:bg-rose-900/40",
    borderColor: "border-rose-300 dark:border-rose-600",
    title: "Reliability",
    badgeTitle: "#5 Feature",
    gridClass: "md:col-span-1",
  },
];

const Feature284 = () => {
  return (
    <section className="h-full overflow-hidden py-32">
      <div className="container flex h-full w-full items-center justify-center">
        <div className="grid w-full max-w-6xl grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 lg:h-[830px] lg:grid-cols-4">
          {featureData.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`flex flex-col ${feature.gridClass}`}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <Badge variant="secondary">{feature.badgeTitle}</Badge>
                  <HelpCircleIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent className="flex flex-col gap-3 flex-1">
                  <div
                    className={`rounded-xl w-full border-2 ${feature.bgColor} ${feature.borderColor} flex items-center justify-center backdrop-blur-sm ${
                      feature.isLongest ? "flex-1" : "h-48"
                    }`}
                  >
                    <IconComponent className={`${feature.iconColor} size-16`} />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feature284;

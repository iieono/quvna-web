"use client";
import { useOrderListByUserIdAndProductTypeQuery } from "@/features/historyApi";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import UCOrderCard from "@/components/UcOrderCard";
import SteamOrderCard from "@/components/SteamOrderCard";
import MobileLegendsOrderCard from "@/components/MLOrderCard";
import ProductOrderCard from "@/components/ProductOrder";

function CheckPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.localStorage.getItem("userId");
      setUserId(id);
    }
  }, []);

  // Fetch data for all product types
  const {
    data: UCOrders,
    isLoading: UCLoading,
    error: UCErrors,
  } = useOrderListByUserIdAndProductTypeQuery(
    { userId: userId ?? "", productType: "UC" },
    { skip: !userId }
  );

  const {
    data: STEAMOrders,
    isLoading: STEAMLoading,
    error: STEAMErrors,
  } = useOrderListByUserIdAndProductTypeQuery(
    { userId: userId ?? "", productType: "STEAM" },
    { skip: !userId }
  );

  const {
    data: MobileLegendsOrders,
    isLoading: MLLoading,
    error: MLErrors,
  } = useOrderListByUserIdAndProductTypeQuery(
    { userId: userId ?? "", productType: "MOBILE_LEGENDS" },
    { skip: !userId }
  );

  const {
    data: ProductOrders,
    isLoading: ProductLoading,
    error: ProductErrors,
  } = useOrderListByUserIdAndProductTypeQuery(
    { userId: userId ?? "", productType: "PRODUCT" },
    { skip: !userId }
  );

  if (UCLoading || STEAMLoading || MLLoading || ProductLoading) {
    return <div className="page-container">Loading...</div>;
  }

  if (UCErrors || STEAMErrors || MLErrors || ProductErrors) {
    console.error({
      UC: UCErrors,
      STEAM: STEAMErrors,
      MOBILE_LEGENDS: MLErrors,
      PRODUCT: ProductErrors,
    });
    return (
      <div>Error: Unable to fetch data for one or more product types.</div>
    );
  }

  const renderOrders = (orders: any[], title: string) =>
    orders?.length ? (
      <ul>
        {orders.map((order) => (
          <li key={order.id || order.name || Math.random()}>{order}</li>
        ))}
      </ul>
    ) : (
      <p>No orders found for {title}.</p>
    );

  return (
    <div className="bg-primary-bg p-2 lg:p-10 w-full h-full text-sm py-24">
      <Tabs
        defaultValue="UC"
        className="w-full overflow-hidden max-w-4xl mx-auto"
      >
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 h-full text-xl bg-white/10 text-secondary-text gap-2">
          <TabsTrigger
            value="UC"
            className={cn(
              "rounded-lg transition text-sm lg:text-base",
              "data-[state=active]:bg-white"
            )}
          >
            UC
          </TabsTrigger>
          <TabsTrigger
            value="STEAM"
            className={cn(
              "rounded-lg transition text-sm lg:text-base",
              "data-[state=active]:bg-white"
            )}
          >
            STEAM
          </TabsTrigger>
          <TabsTrigger
            value="MOBILE_LEGENDS"
            className={cn(
              "rounded-lg transition text-sm lg:text-base",
              "data-[state=active]:bg-white"
            )}
          >
            Mobile Legends
          </TabsTrigger>
          <TabsTrigger
            value="PRODUCT"
            className={cn(
              "rounded-lg transition text-sm lg:text-base",
              "data-[state=active]:bg-white"
            )}
          >
            Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="UC" className="max-h-[80vh] overflow-y-auto p-2">
          {UCOrders?.data?.length > 0 ? (
            UCOrders?.data?.map((order: any) => (
              <UCOrderCard key={order.id} order={order} />
            ))
          ) : (
            <p>No UC orders found.</p>
          )}
        </TabsContent>

        <TabsContent value="STEAM" className="max-h-[80vh] overflow-y-auto p-2">
          {STEAMOrders?.data?.length > 0 ? (
            STEAMOrders?.data?.map((order: any) => (
              <SteamOrderCard key={order.id} order={order} />
            ))
          ) : (
            <p>No Steam orders found.</p>
          )}
        </TabsContent>

        <TabsContent
          value="MOBILE_LEGENDS"
          className="max-h-[80vh] overflow-y-auto p-2"
        >
          {MobileLegendsOrders?.data?.length > 0 ? (
            MobileLegendsOrders?.data?.map((order: any) => (
              <MobileLegendsOrderCard key={order.id} order={order} />
            ))
          ) : (
            <p>No Mobile Legends orders found.</p>
          )}
        </TabsContent>

        <TabsContent
          value="PRODUCT"
          className="max-h-[80vh] overflow-y-auto p-2"
        >
          {ProductOrders?.data?.length > 0 ? (
            ProductOrders?.data?.map((order: any) => (
              <ProductOrderCard key={order.id} order={order} />
            ))
          ) : (
            <p>No product orders found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CheckPage;

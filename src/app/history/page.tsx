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
    return <div>Loading...</div>;
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
    <div className="bg-primary-bg p-10 w-full h-full pt-20">
      <Tabs defaultValue="UC" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 h-full text-xl bg-white/10 text-secondary-text gap-2">
          <TabsTrigger
            value="UC"
            className={cn(
              " rounded-lg transition text-base",
              "data-[state=active]:bg-white"
            )}
          >
            UC
          </TabsTrigger>
          <TabsTrigger
            value="STEAM"
            className={cn(
              " rounded-lg transition text-base",
              "data-[state=active]:bg-white"
            )}
          >
            STEAM
          </TabsTrigger>
          <TabsTrigger
            value="MOBILE_LEGENDS"
            className={cn(
              " rounded-lg transition text-base",
              "data-[state=active]:bg-white"
            )}
          >
            Mobile Legends
          </TabsTrigger>
          <TabsTrigger
            value="PRODUCT"
            className={cn(
              " rounded-lg transition text-base",
              "data-[state=active]:bg-white"
            )}
          >
            Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="UC">
          <Card className="bg-white/10 border-none text-primary-text">
            <CardHeader>
              <CardTitle className="text-lg">UC Orders</CardTitle>
              <CardDescription className="text-secondary-text text-base">
                Orders for product type 'UC'
              </CardDescription>
            </CardHeader>
            <CardContent>{renderOrders(UCOrders, "UC")}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="STEAM">
          <Card className="bg-white/10 border-none text-primary-text">
            <CardHeader>
              <CardTitle className="text-lg">STEAM Orders</CardTitle>
              <CardDescription className="text-secondary-text text-base">
                Orders for product type 'STEAM'
              </CardDescription>
            </CardHeader>
            <CardContent>{renderOrders(STEAMOrders, "STEAM")}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="MOBILE_LEGENDS">
          <Card className="bg-white/10 border-none text-primary-text">
            <CardHeader>
              <CardTitle className="text-lg">Mobile Legends Orders</CardTitle>
              <CardDescription className="text-secondary-text text-base">
                Orders for product type 'Mobile Legends'
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderOrders(MobileLegendsOrders, "Mobile Legends")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="PRODUCT">
          <Card className="bg-white/10 border-none text-primary-text">
            <CardHeader>
              <CardTitle className="text-lg">Product Orders</CardTitle>
              <CardDescription className="text-secondary-text text-base">
                Orders for product type 'Product'
              </CardDescription>
            </CardHeader>
            <CardContent>{renderOrders(ProductOrders, "Product")}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CheckPage;

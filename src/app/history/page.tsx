"use client";
import { useOrderListByUserIdAndProductTypeQuery } from "@/features/historyApi";
import React, { useEffect, useState } from "react";

function CheckPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.localStorage.getItem("userId");
      setUserId(id);
    }
  }, []);

  // Fetch the order list using the productType 'UC'
  const {
    data: orderList,
    error,
    isLoading,
  } = useOrderListByUserIdAndProductTypeQuery(
    { userId: userId ?? "", productType: "UC" },
    {
      skip: !userId, // Avoid making the query until userId is available
    }
  );
  console.log(orderList);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching order list:", error);
    return <div>Error: Unable to fetch data.</div>;
  }

  return (
    <div className="page-container">
      <h1>User Orders (Product Type: UC)</h1>
      {orderList?.length ? (
        <ul>
          {orderList.map((order: any) => (
            <li key={order.id || order.name || Math.random()}>{order}</li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this user with product type 'UC'.</p>
      )}
    </div>
  );
}

export default CheckPage;

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Product {
  productName: string;
  amount: number;
  bonus: number;
}

interface Order {
  gift_code?: string;
  playerName?: string;
  playerId?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  orderStatus?: string;
  totalPrice: number;
  payType?: string;
  createdAt?: string;
  attachment?: {
    contentURL: string;
  };
  productResponseDTOS?: Product[];
  cardNumber?: string; // added for card number
  isCoupon?: boolean; // added to check if it's a coupon
}

function UCOrderCard({ order }: { order: Order }) {
  // Calculate the total amount and total price of the products
  const totalAmount = order.productResponseDTOS?.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  const totalPrice = order.productResponseDTOS?.reduce(
    (acc, product) => acc + product.amount * product.bonus, // Assuming bonus is the price
    0
  );

  // Function to mask the gift code except for the first 4 characters
  const maskGiftCode = (giftCode: string) => {
    return giftCode
      ? giftCode.slice(0, 4) + "*".repeat(giftCode.length - 4)
      : "N/A";
  };

  // Function to copy gift code to clipboard
  const copyToClipboard = (giftCode: string) => {
    navigator.clipboard.writeText(giftCode).then(() => {
      //   alert("Gift code copied to clipboard!");
    });
  };

  return (
    <Card className="mb-2 bg-white/10 border-none text-primary-text">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{totalAmount || "N/A"} UC</span>
          <span>
            {totalPrice} {order.payType || ""}
          </span>
        </CardTitle>
        <CardDescription className="text-secondary-text flex justify-between">
          <span>Status: {order.orderStatus || "Unknown"}</span>
          <span>{order.createdAt || "Unknown Time"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Display Total UC Amount, Status, Time, and Price */}
        {order?.isCoupon && order?.gift_code && (
          <div className="flex justify-between items-center">
            <span>
              <strong>Gift Code:</strong> {maskGiftCode(order.gift_code)}
            </span>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => copyToClipboard(order.gift_code || "")}
            >
              Copy
            </button>
          </div>
        )}
        <div>
          <strong>Price:</strong> {totalPrice} {order.payType || "N/A"}
        </div>
        <div>
          <strong>Status:</strong> {order.orderStatus || "N/A"}
        </div>

        {/* Display price and amount of each product */}
        {order.productResponseDTOS?.map((product, index) => (
          <div key={index}>
            <div className="flex gap-5">
              <span>Amount: {product.amount}</span>
              <span>Price per unit: {product.bonus}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default UCOrderCard;

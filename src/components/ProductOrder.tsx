import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  productName: string;
  amount: number;
  bonus: number;
  description: string;
  attachmentIds: number[];
}

interface Order {
  fullName: string;
  email: string;
  phoneNumber: string;
  orderStatus: string;
  totalPrice: number;
  payType: string;
  createdAt: string;
  btsAddress: string;
  userAddress: string;
  productResponseDTOS: Product[];
}

function ProductOrderCard({ order }: { order: Order }) {
  // Calculate total product count
  const totalProductCount = order.productResponseDTOS?.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return (
    <Card className="mb-2 bg-white/10 border-none text-primary-text">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Total Products: {totalProductCount || "N/A"}</span>
          <span>
            {order.totalPrice} {order.payType || ""}
          </span>
        </CardTitle>
        <CardDescription className="text-secondary-text flex justify-between">
          <span>Status: {order.orderStatus || "Unknown"}</span>
          <span>{order.createdAt || "Unknown Time"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <strong>Full Name:</strong> {order.fullName || "N/A"}
        </div>
        <div>
          <strong>Email:</strong> {order.email || "N/A"}
        </div>
        <div>
          <strong>Phone Number:</strong> {order.phoneNumber || "N/A"}
        </div>
        <div>
          <strong>User Address:</strong> {order.userAddress || "N/A"}
        </div>
        <div>
          <strong>BTS Address:</strong> {order.btsAddress || "N/A"}
        </div>

        {/* Button to open dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <p className="= cursor-pointer hover:text-white text-secondary-text underline underline-offset-4">
              View Product Details
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
            <DialogHeader className="sticky top-0 bg-white text-primary-bg z-10">
              <DialogTitle>Product Details</DialogTitle>
              <DialogDescription>
                Below are the details for the products in this order.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto text-primary-bg">
              {order.productResponseDTOS.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <strong>Product Name:</strong>{" "}
                    {product.productName || "N/A"}
                  </div>
                  <div>
                    <strong>Description:</strong>{" "}
                    {product.description || "No description"}
                  </div>
                  <div>
                    <strong>Amount:</strong> {product.amount || 0}
                  </div>
                  <div>
                    <strong>Price:</strong> {product.bonus || 0}{" "}
                    {order.payType || ""}
                  </div>
                  {product.attachmentIds?.length > 0 && (
                    <div>
                      <strong>Attachment:</strong>{" "}
                      <img
                        src={`/profile/${order.fullName}/${product.attachmentIds[0]}.jpg`}
                        alt="Product Attachment"
                        className="w-32 h-32 object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" className="text-primary-bg">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ProductOrderCard;

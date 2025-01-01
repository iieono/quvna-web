import React from "react";
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
import { useGetAttachmentQuery } from "@/features/ratingApi";

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
  const totalProductCount = order.productResponseDTOS?.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return (
    <Card className="mb-2 bg-white/10 text border-none text-primary-text">
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

        {/* Dialog for product details */}
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer hover:text-white text-secondary-text underline underline-offset-4">
              View Product Details
            </p>
          </DialogTrigger>
          <DialogContent className="max-w-[90%] rounded-lg p-2 py-5 sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader className="  top-0 bg-white text-primary-bg z-10">
              <DialogTitle>Product Details</DialogTitle>
              <DialogDescription>
                Below are the details for the products in this order.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto text-primary-bg">
              {order.productResponseDTOS.map((product, index) => (
                <Card
                  key={index}
                  className="border border-secondary-text bg-white/5 shadow-md"
                >
                  <CardHeader>
                    <CardTitle>
                      {product.productName || "Unnamed Product"}
                    </CardTitle>
                    <CardDescription>
                      {product.description || "No description"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <strong>Amount:</strong> {product.amount || 0}
                    </div>
                    <div>
                      <strong>Price:</strong> {product.bonus || 0}{" "}
                      {order.payType || ""}
                    </div>
                    {product.attachmentIds?.length > 0 && (
                      <div>
                        <strong>Attachments:</strong>
                        <div className="flex space-x-4">
                          {product.attachmentIds.map((id) => {
                            const { data: imageBlob, isLoading } =
                              useGetAttachmentQuery(id.toString(), {
                                skip: !id,
                              });

                            const imageUrl = React.useMemo(() => {
                              if (!imageBlob)
                                return "/images/default-product.png";
                              return URL.createObjectURL(imageBlob as Blob);
                            }, [imageBlob]);

                            React.useEffect(() => {
                              return () => {
                                if (imageUrl.startsWith("blob:")) {
                                  URL.revokeObjectURL(imageUrl);
                                }
                              };
                            }, [imageUrl]);

                            return isLoading ? (
                              <div
                                key={id}
                                className="w-32 h-32 bg-gray-200 animate-pulse rounded-lg"
                              />
                            ) : (
                              <img
                                key={id}
                                src={imageUrl}
                                alt="Product Attachment"
                                className="w-32 h-32 object-cover rounded-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/images/default-product.png";
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ProductOrderCard;

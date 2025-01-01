import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ProductResponseDTO {
  productName: string;
  amount: number;
  bonus: number;
}

interface Order {
  gift_code?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  orderStatus: string;
  totalPrice: number;
  payType: string;
  createdAt: string;
  attachment?: {
    contentURL: string;
  };
  productResponseDTOS: ProductResponseDTO[];
}

function MobileLegendsOrderCard({ order }: { order: Order }) {
  // Calculate the total amount and price of products
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
    navigator.clipboard.writeText(giftCode).then(() => {});
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
        {/* Display customer details */}
        <div className="flex justify-between">
          <span>
            <strong>Full Name:</strong> {order.fullName || "N/A"}
          </span>
          <span>
            <strong>Phone:</strong> {order.phoneNumber || "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            <strong>Email:</strong> {order.email || "N/A"}
          </span>
        </div>

        {/* Display product details */}
        {order.productResponseDTOS?.map((product, index) => (
          <div key={index} className="flex gap-5 justify-between">
            <span>
              <strong>Product Name:</strong> {product.productName}
            </span>
            <span>
              <strong>Amount:</strong> {product.amount}
            </span>
            <span>
              <strong>Price per Unit:</strong> {product.bonus}
            </span>
          </div>
        ))}

        {/* Display gift code and attachment */}
        {order.gift_code && (
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
        {order.attachment && (
          <div>
            <strong>Attachment:</strong>
            <a
              href={order.attachment.contentURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View File
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MobileLegendsOrderCard;

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Define the type for productResponseDTO
interface ProductResponseDTO {
  amount: number;
  bonus: number; // Assuming bonus is the price
  productName?: string;
  description?: string;
}

// Define the type for order
interface Order {
  productResponseDTOS: ProductResponseDTO[];
  payType?: string;
  orderStatus?: string;
  createdAt?: string;
  isCoupon?: boolean;
  gift_code?: string;
}

interface SteamOrderCardProps {
  order: Order;
}

function SteamOrderCard({ order }: SteamOrderCardProps) {
  const product = order?.productResponseDTOS?.[0];
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
          <span>Steam Service</span>
          <span>
            {totalPrice} {order.payType || "N/A"}
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
            <div>
              <strong>Product Name:</strong> {product.productName || "N/A"}
            </div>
            <div>
              <strong>Description:</strong> {product.description || "N/A"}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default SteamOrderCard;

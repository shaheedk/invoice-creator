import { useState } from "react";
import instance from "../axios/axios";
import InvoiceList from "../components/InvoiceTable";

export default function CreateInvoice() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [loading, setLoading] = useState(false);

  // Handle item input change
  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add new item row
  const addItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  // Remove item row
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Submit form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/invoice/create", {
        customerName,
        customerPhone,
        items,
      });
      alert("✅ Invoice Created Successfully!");
      console.log(res.data);
      setCustomerName("");
      setCustomerPhone("");
      setItems([{ name: "", quantity: "", price: "" }]);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Invoice
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Customer Phone
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Items */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Items</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-3 items-start bg-gray-50 p-4 rounded-lg"
              >
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter item name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(i, "name", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(i, "quantity", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="Enter price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(i, "price", e.target.value)
                    }
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {items.length > 1 && (
                  <div className="col-span-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => removeItem(i)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Item
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Creating Invoice..." : "Create Invoice"}
        </button>
      </form>

      <div className="mt-10">
        <InvoiceList />
      </div>
    </div>
  );
}

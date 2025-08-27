import { useEffect, useState } from "react";
import instance from "../axios/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Item {
  name: string;
  quantity: number;
  price: number;
  rowTotal: number;
}

interface Invoice {
  _id: string;
  customerName: string;
  customerPhone: string;
  items: Item[];
  total: number;
  createdAt: string;
}

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await instance.get("/invoice/invoices"); // ✅ your endpoint
        setInvoices(res.data);
      } catch (err) {
        console.error("Error fetching invoices", err);
      }
    };
    fetchInvoices();
  }, []);

  // ✅ Generate PDF for one invoice
  const generateInvoice = (invoice: Invoice) => {
    const doc = new jsPDF();

    // -------- Header --------
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 14, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice ID: ${invoice._id}`, 14, 30);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString("en-IN")}`, 14, 37);

    // -------- Customer Info --------
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 14, 50);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.customerName, 14, 58);
    doc.text(invoice.customerPhone, 14, 65);

    // -------- Table (Items) --------
    const tableData = invoice.items.map((item) => [
      item.name,
      item.quantity,
      item.price.toLocaleString("en-IN"),
      item.rowTotal.toLocaleString("en-IN"),
    ]);

    autoTable(doc, {
      startY: 80,
      head: [["Item", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [240, 240, 240], textColor: 20, halign: "center" },
      bodyStyles: { valign: "middle", fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: "center", cellWidth: 20 },
        2: { halign: "right", cellWidth: 40 },
        3: { halign: "right", cellWidth: 40 },
      },
    });

    // -------- Totals --------
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total:", 140, finalY);
    doc.text(`${invoice.total.toLocaleString("en-IN")}`, 190, finalY, {
      align: "right",
    });

    // Save PDF
    doc.save(`Invoice-${invoice.customerName}.pdf`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id} className="hover:bg-gray-100">
              <td className="p-2 border">{inv.customerName}</td>
              <td className="p-2 border">{inv.customerPhone}</td>
              <td className="p-2 border">
                {new Date(inv.createdAt).toLocaleDateString("en-IN")}
              </td>
              <td className="p-2 border">₹{inv.total}</td>
              <td className="p-2 border">
                <button
                  onClick={() => generateInvoice(inv)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

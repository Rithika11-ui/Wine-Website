import React, { useState } from "react";
import { Package, Plus } from "lucide-react";
import ProductStatCards from "./ProductStatCart";
import ProductTable from "./ProductTable";
import AddProductForm from "./AddProduct";

const ProductManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#111C44] rounded-2xl flex items-center justify-center shadow-lg">
              <Package size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1B1E2B] tracking-tight">Product Management</h1>
              <p className="text-sm text-gray-400">Manage your product inventory</p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#111C44] text-white text-xs font-semibold rounded-xl hover:bg-[#1a2b63] shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus size={15} />
            Add Product
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <ProductStatCards />

        {/* ── Product Table ── */}
        <ProductTable />
      </div>

      {/* ── Add Product Drawer ── */}
      {showForm && (
        <AddProductForm
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log("New product:", data);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;
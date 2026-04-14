import { useState } from "react";

export default function PageHeader() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    Dashboard
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
                    <span id="breadcrumb-separator" className="text-gray-500">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Order List</span>
                </div>
            </div>
            <div id="action-button">
                <button id="add-button" className="bg-hijau text-white px-4 py-2 rounded-lg" onFocus={() => setShowModal(true)}>
		                Cari Menu
		            </button>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-[400px]">
                        <h2 className="text-lg font-bold mb-3">Search Menu</h2>
                        <input
                            type="text"
                            className="border p-2 w-full"
                            placeholder="Type something..."
                        />
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
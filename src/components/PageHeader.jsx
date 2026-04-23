import { useState } from "react";

export default function PageHeader(props) {
    const [showModal, setShowModal] = useState(false);
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {props.title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb" className="text-gray-500">{props.breadcrumb}</span>
                </div>
            </div>
            <div id="action-button">
                    {props.children}

                <button id="add-button" className="bg-hijau text-white px-4 py-2 rounded-lg" onFocus={() => setShowModal(true)}>
		                Cari Menu
		            </button>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
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
import React, { useState } from "react";

const TicketList = ({
  updateTicket,
  updateTicketErrors,
  handleUpdateTicketInput,
  handleUpdateTicketFields,
  ticketTypes,
  onDeleteTicket,
  onUpdateTicket,
  formatCurrency,
}) => {
  const [editingId, setEditingId] = useState(null);

  const handleUpdate = (ticket) => {
    handleUpdateTicketFields(ticket);
    setEditingId(ticket.id);
  };

  const handleCancelUpdate = () => {
    setEditingId(null);
    handleUpdateTicketFields({ type: "", price: "", quantity: "" });
  };

  const handleSaveUpdate = async (ticketId) => {
    const result = await onUpdateTicket(ticketId, updateTicket);
    if (result !== false) {
      setEditingId(null);
    }
  };

  if (ticketTypes.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg">
          Chưa có loại vé nào cho sự kiện này
        </div>
        <p className="text-gray-400 mt-2">Thêm loại vé mới ngay bên dưới</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ticketTypes.map((ticket) => (
        <div
          key={ticket.id}
          className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition relative"
        >
          {/* Nút xóa và Edit */}
          <div className="absolute top-3 right-3 flex gap-2">
            {editingId === ticket.id ? (
              <>
                <button
                  onClick={() => handleSaveUpdate(ticket.id)}
                  className="text-green-500 hover:text-green-700 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Save"
                  disabled={
                    !updateTicket.type?.trim() ||
                    !updateTicket.price ||
                    !updateTicket.quantity
                  }
                >
                  Save
                </button>
                <button
                  onClick={handleCancelUpdate}
                  className="text-gray-500 hover:text-gray-700 text-sm font-bold"
                  title="Cancel"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleUpdate(ticket)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-bold"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTicket(ticket.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold"
                  title="Delete"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Type</label>
              {editingId === ticket.id ? (
                <div>
                  <input
                    type="text"
                    name="type"
                    value={updateTicket.type}
                    onChange={handleUpdateTicketInput}
                    className={`w-full p-2 border rounded text-sm focus:ring-blue-500 focus:border-blue-500 ${
                      updateTicketErrors.type
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {updateTicketErrors.type && (
                    <div className="text-red-500 text-xs mt-1">
                      {updateTicketErrors.type}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-lg font-semibold text-blue-600">
                  {ticket.type}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Price</label>
              {editingId === ticket.id ? (
                <div>
                  <input
                    type="number"
                    name="price"
                    value={updateTicket.price}
                    onChange={handleUpdateTicketInput}
                    className={`w-full p-2 border rounded text-sm focus:ring-blue-500 focus:border-blue-500 ${
                      updateTicketErrors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                    min="0"
                  />
                  {updateTicketErrors.price && (
                    <div className="text-red-500 text-xs mt-1">
                      {updateTicketErrors.price}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-lg font-semibold text-green-600">
                  {formatCurrency(ticket.price)}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Quantity
              </label>
              {editingId === ticket.id ? (
                <div>
                  <input
                    type="number"
                    name="quantity"
                    value={updateTicket.quantity}
                    onChange={handleUpdateTicketInput}
                    className={`w-full p-2 border rounded text-sm focus:ring-blue-500 focus:border-blue-500 ${
                      updateTicketErrors.quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                    min="1"
                  />
                  {updateTicketErrors.quantity && (
                    <div className="text-red-500 text-xs mt-1">
                      {updateTicketErrors.quantity}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-lg font-semibold">{ticket.quantity}</div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Sold</label>
              <div className="text-lg font-semibold text-orange-600">
                {ticket.sold || 0}
              </div>
            </div>
          </div>

          {/* Description field */}
          <div className="mt-4">
            <label className="block text-sm text-gray-500 mb-1">
              Description
            </label>
            {editingId === ticket.id ? (
              <div>
                <textarea
                  name="description"
                  value={updateTicket.description}
                  onChange={handleUpdateTicketInput}
                  className={`w-full p-2 border rounded text-sm focus:ring-blue-500 focus:border-blue-500 ${
                    updateTicketErrors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  rows="2"
                  placeholder="Enter ticket description..."
                />
                {updateTicketErrors.description && (
                  <div className="text-red-500 text-xs mt-1">
                    {updateTicketErrors.description}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border">
                {ticket.description || (
                  <span className="text-gray-400 italic">
                    No description provided
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Remaining
              </label>
              <div className="text-lg font-semibold text-purple-600">
                {ticket.quantity - (ticket.sold || 0)}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Tỷ lệ bán
              </label>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        ((ticket.sold || 0) / ticket.quantity) * 100 || 0,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(
                    ((ticket.sold || 0) / ticket.quantity) * 100 || 0
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;

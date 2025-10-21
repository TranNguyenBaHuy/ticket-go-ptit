import React from "react";
import TicketList from "./TicketList";

const TicketManagement = ({
  newTicketErrors,
  updateTicketErrors,
  showTicketPopup,
  setShowTicketPopup,
  newTicket,
  updateTicket,
  handleTicketInput,
  handleUpdateTicketInput,
  handleUpdateTicketFields,
  handleAddTicket,
  handleUpdateTicket,
  handleDeleteTicket,
  ticketTypes,
  formatCurrency,
  showStatistics = true,
}) => {
  if (!showTicketPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowTicketPopup(false);
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl mx-4 max-h-[85vh] overflow-y-auto animate-fadeIn">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Ticket Types</h2>
          <button
            onClick={() => setShowTicketPopup(false)}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <div
          className={`grid grid-cols-1 ${
            showStatistics ? "md:grid-cols-3" : "md:grid-cols-1"
          } gap-6`}
        >
          <div className={`${showStatistics ? "md:col-span-2" : ""} space-y-4`}>
            {/* FORM THÊM LOẠI VÉ */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <form onSubmit={handleAddTicket} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={newTicket.type}
                      onChange={handleTicketInput}
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        newTicketErrors.type
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    {newTicketErrors.type && (
                      <div className="text-red-500 text-xs mt-1">
                        {newTicketErrors.type}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newTicket.price}
                      onChange={handleTicketInput}
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        newTicketErrors.price
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    {newTicketErrors.price && (
                      <div className="text-red-500 text-xs mt-1">
                        {newTicketErrors.price}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={newTicket.quantity}
                      onChange={handleTicketInput}
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        newTicketErrors.quantity
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    {newTicketErrors.quantity && (
                      <div className="text-red-500 text-xs mt-1">
                        {newTicketErrors.quantity}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newTicket.description}
                    onChange={handleTicketInput}
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      newTicketErrors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    rows="3"
                  />
                  {newTicketErrors.description && (
                    <div className="text-red-500 text-xs mt-1">
                      {newTicketErrors.description}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    + Add
                  </button>
                </div>
              </form>
            </div>

            {/* DANH SÁCH LOẠI VÉ */}
            <TicketList
              updateTicket={updateTicket}
              updateTicketErrors={updateTicketErrors}
              handleUpdateTicketInput={handleUpdateTicketInput}
              handleUpdateTicketFields={handleUpdateTicketFields}
              ticketTypes={ticketTypes}
              onDeleteTicket={handleDeleteTicket}
              onUpdateTicket={handleUpdateTicket}
              formatCurrency={formatCurrency}
            />
          </div>

          {/* THỐNG KÊ */}
          {showStatistics && (
            <div className="sticky top-0 bg-gray-50 border border-gray-200 rounded-xl p-5 h-fit">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Ticket Statistics
              </h3>

              {(() => {
                const totalSold = ticketTypes.reduce(
                  (sum, t) => sum + (t.sold || 0),
                  0
                );
                const totalQty = ticketTypes.reduce(
                  (sum, t) => sum + t.quantity,
                  0
                );
                const totalRevenue = ticketTypes.reduce(
                  (sum, t) => sum + t.price * (t.sold || 0),
                  0
                );
                const remain = totalQty - totalSold;

                return (
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span>Total Tickets</span>
                      <span className="font-semibold">{totalQty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sold</span>
                      <span className="font-semibold text-orange-600">
                        {totalSold}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining</span>
                      <span className="font-semibold text-purple-600">
                        {remain}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3 mt-2">
                      <span>Revenue</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(totalRevenue)}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 z-10 flex justify-end mt-8">
          <button
            onClick={() => setShowTicketPopup(false)}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;

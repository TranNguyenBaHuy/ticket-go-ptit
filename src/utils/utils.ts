// FORMAT CURRENCY
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// FORMAT DATETIME
export const formatDateTimeDisplay = (date: string) => {
  if (date) {
    if (typeof date === "string") {
      date = date.split("T")[0];
    } else {
      date = (date as Date).toISOString().split("T")[0];
    }
  }
  const [year, month, day] = date.split("-");
  const formattedDate = `${day} tháng ${month}, ${year}`;

  return formattedDate;
};

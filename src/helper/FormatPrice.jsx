const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-In", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 1,
  }).format(price * 82.69);
};

export default FormatPrice;

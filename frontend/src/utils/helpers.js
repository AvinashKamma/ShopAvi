function formatPrice(num) {
  return new Intl.NumberFormat("en-IN").format(num);
};

export {formatPrice};
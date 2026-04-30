function formatPrice(num) {
  return new Intl.NumberFormat("en-IN").format(num);
};

function formatDate(dateString) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }).format(date);
}

export {formatPrice, formatDate};
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDeliveryOption(optionId) {
  return deliveryOptions.find((option) => option.id === optionId);
}

function isWeekend(date) {
  return ["Sunday", "Saturday"].includes(date.format("dddd"));
}

export function calculateDeliveryDate(days) {
  let deliverDate = dayjs();

  while (days) {
    deliverDate = deliverDate.add(1, "days");
    if (!isWeekend(deliverDate)) {
      days--;
    }
  }

  return deliverDate.format("dddd, MMMM D");
}

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceInCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceInCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceInCents: 999,
  },
];

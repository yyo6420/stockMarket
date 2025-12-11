import { stockMarket } from "../data/data.js";

export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");

  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export function searchStock(identifier) {
  return stockMarket.stocks.filter(
    (stock) => stock.name === identifier || stock.id === identifier
  );
}

export function filterStocksByPrice(givenPrice, above) {
  if (above) {
    return stockMarket.stocks.filter(
      (stock) => stock.currentPrice > givenPrice
    );
  } else {
    return stockMarket.stocks.filter(
      (stock) => stock.currentPrice < givenPrice
    );
  }
}

export function OperateOnStock(operation, identifier) {
  const now = new Date();
  if (operation === "buy") {
    let theStock = stockMarket.stocks.filter(
      (stock) => stock.name === identifier || stock.id === identifier
    );
    if (theStock.length > 1) {
      theStock.splice(0, 1);
    }
    let theSameCategoryRest = stockMarket.stocks.filter(
      (stock) =>
        stock.category === theStock[0].category &&
        stock.id !== theStock[0].id &&
        stock.name !== theStock[0].name
    );
    theStock[0].availableStocks -= 1;
    theStock[0].previousPrices = theStock[0].currentPrice;
    theStock[0].currentPrice *= 1.05;
    if (theSameCategoryRest.length) {
      for (let stock = 0; stock < theSameCategoryRest.length; stock++) {
        theSameCategoryRest[stock].previousPrices =
          theSameCategoryRest[stock].currentPrice;
        theSameCategoryRest[stock].currentPrice *= 1.01;
      }
    }
    stockMarket.lastUpdated = formatDate(now);
  } else if (operation === "sell") {
    let theStock = stockMarket.stocks.filter(
      (stock) => stock.name === identifier || stock.id === identifier
    );
    if (theStock.length > 1) {
      theStock.splice(0, 1);
    }
    let theSameCategoryRest = stockMarket.stocks.filter(
      (stock) =>
        stock.category === theStock[0].category &&
        stock.id !== theStock[0].id &&
        stock.name !== theStock[0].name
    );
    theStock[0].availableStocks += 1;
    theStock[0].previousPrices = theStock[0].currentPrice;
    theStock[0].currentPrice *= 0.95;
    if (theSameCategoryRest.length) {
      for (let stock = 0; stock < theSameCategoryRest.length; stock++) {
        theSameCategoryRest[stock].previousPrices =
          theSameCategoryRest[stock].currentPrice;
        theSameCategoryRest[stock].currentPrice *= 0.99;
      }
    }
    stockMarket.lastUpdated = formatDate(now);
  }
}

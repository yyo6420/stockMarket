import input from "analiza-sync";
import {
  searchStock,
  filterStocksByPrice,
  OperateOnStock,
} from "./utills/utills.js";

function menu() {
  console.log("Welcome to our Stock Market :)");
  console.log("\nmenu:");
  console.log("\n1. Search for a stock by name or id.");
  console.log("\n2. Show all stocks above or below a given price.");
  console.log("\n3. Buy or sell a stock.");
  console.log("\n4. Exit");
  const action = input("what would you like to do now? ");
  if (action === "1") {
    const stodckIdentifier = input(
      "Please enter any identifier\n(name or id only):"
    );
    console.log(searchStock(stodckIdentifier));
  } else if (action === "2") {
    const priceAmount = input("What is the amount? ");
    const aboveOrbelow = input("enter: above or below: ");
    if (aboveOrbelow === "above") {
      console.log(filterStocksByPrice(priceAmount, true));
    } else {
      console.log(filterStocksByPrice(priceAmount, false));
    }
  }
}

menu();

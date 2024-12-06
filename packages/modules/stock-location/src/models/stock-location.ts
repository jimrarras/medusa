import { model } from "@medusajs/framework/utils"
import StockLocationAddress from "./stock-location-address"

const StockLocation = model
  .define("StockLocation", {
    id: model.id({ prefix: "sloc" }).primaryKey(),
    name: model.text().searchable(),
    metadata: model.json().nullable(),
    address: model
      .hasOne(() => StockLocationAddress, {
        foreignKey: true,
        mappedBy: undefined,
      })
      .nullable(),
  })
  .cascades({
    delete: ["address"],
  })

export default StockLocation

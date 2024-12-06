import { model } from "@medusajs/framework/utils"
import IndexData from "./index-data"

const IndexRelation = model.define("IndexRelation", {
  id: model.autoincrement().primaryKey(),
  pivot: model.text(),
  parent_id: model.text(),
  parent_name: model.text(),
  child_id: model.text(),
  child_name: model.text(),
  parent: model.manyToMany(() => IndexData, {
    mappedBy: "parents",
  }),
  child: model.manyToMany(() => IndexData, {
    mappedBy: "parents",
  }),
})

export default IndexRelation

import {
  deleteCustomerGroupsWorkflow,
  updateCustomerGroupsWorkflow,
} from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "../../../../types/routing"

import { MedusaError } from "@medusajs/utils"
import { refetchCustomerGroup } from "../helpers"
import { AdminUpdateCustomerGroupType } from "../validators"
import { DeleteResponse, HttpTypes } from "@medusajs/types"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<HttpTypes.AdminCustomerGroupResponse>
) => {
  const customerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )

  if (!customerGroup) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Customer group with id: ${req.params.id} not found`
    )
  }

  res.status(200).json({ customer_group: customerGroup })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateCustomerGroupType>,
  res: MedusaResponse<HttpTypes.AdminCustomerGroupResponse>
) => {
  await updateCustomerGroupsWorkflow(req.scope).run({
    input: {
      selector: { id: req.params.id },
      update: req.validatedBody,
    },
  })

  const customerGroup = await refetchCustomerGroup(
    req.params.id,
    req.scope,
    req.remoteQueryConfig.fields
  )
  res.status(200).json({ customer_group: customerGroup })
}

export const DELETE = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<DeleteResponse<"customer_group">>
) => {
  const id = req.params.id
  const deleteCustomerGroups = deleteCustomerGroupsWorkflow(req.scope)

  await deleteCustomerGroups.run({
    input: { ids: [id] },
  })

  res.status(200).json({
    id,
    object: "customer_group",
    deleted: true,
  })
}
import { UpdateUserDTO } from "../../user"

/**
 * The data to update users.
 */
export interface UpdateUsersWorkflowInputDTO {
  /**
   * The users to update.
   */
  updates: UpdateUserDTO[]
}

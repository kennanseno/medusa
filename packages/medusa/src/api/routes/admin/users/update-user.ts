import { IsOptional, IsString } from "class-validator"
import UserService from "../../../../services/user"
import { validator } from "../../../../utils/validator"

/**
 * @oas [post] /users/{user_id}
 * operationId: "PostUsersUser"
 * summary: "Update a User"
 * description: "Updates a User"
 * x-authenticated: true
 * parameters:
 *   - (path) user_id=* {string} The id of the User.
 *   - (body) name {string} The name of the User.
 *   - (body) api_token {string} The api_token of the User.
 * tags:
 *   - Users
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             user:
 *               $ref: "#/components/schemas/user"
 */
export default async (req, res) => {
  const { user_id } = req.params

  const validated = await validator(AdminUpdateUserRequest, req.body)

  const userService: UserService = req.scope.resolve("userService")
  const data = await userService.update(user_id, validated)
  res.status(200).json({ user: data })
}

export class AdminUpdateUserRequest {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  api_token?: string
}

import type {
  CreateUserDTO,
  Role,
  UpdateUserDTO,
  UserDTO,
  TeacherDTO,
} from "../../types";

interface IUserService {
  /**
   * Get user associated with id
   * @param id user's id
   * @returns a UserDTO with user's information
   * @throws Error if user retrieval fails
   */
  getUserById(userId: string): Promise<UserDTO>;

  /**
   * Get user associated with email
   * @param email user's email
   * @returns a UserDTO with user's information
   * @throws Error if user retrieval fails
   */
  getUserByEmail(email: string): Promise<UserDTO>;

  /**
   * Get role of user associated with authId
   * @param authId user's authId
   * @returns role of the user
   * @throws Error if user role retrieval fails
   */
  getUserRoleByAuthId(authId: string): Promise<Role>;

  /**
   * Get id of user associated with authId
   * @param authId user's authId
   * @returns id of the user
   * @throws Error if user id retrieval fails
   */
  getUserIdByAuthId(authId: string): Promise<string>;

  /**
   * Get authId of user associated with id
   * @param userId user's id
   * @returns user's authId
   * @throws Error if user authId retrieval fails
   */
  getAuthIdById(userId: string): Promise<string>;

  /**
   * Get all user information based on role
   * @returns array of UserDTOs
   * @throws Error if user retrieval fails
   */
  getUsersByRole(role: string): Promise<Array<UserDTO>>;

  /**
   * Create a user, email verification configurable
   * @param user the user to be created
   * @returns a UserDTO with the created user's information
   * @throws Error if user creation fails
   */
  createUser(user: CreateUserDTO): Promise<UserDTO>;

  /**
   * Update a user.
   * Note: the password cannot be updated using this method, use IAuthService.resetPassword instead
   * @param userId user's id
   * @param user the user to be updated
   * @returns a UserDTO with the updated user's information
   * @throws Error if user update fails
   */
  updateUserById(userId: string, user: UpdateUserDTO): Promise<UserDTO>;

  /**
   * Delete a user by email
   * @param email user's email
   * @throws Error if user deletion fails
   */
  deleteUserByEmail(email: string): Promise<void>;

  /**
   * This method gets all the users corresponding to the ids parameter
   *
   * @param ids the unique identifiers of the users to fetch
   */
  findAllUsersByIds(ids: string[]): Promise<Array<UserDTO>>;

  /**
   * This method gets all teachers with a 'school' field
   * @returns an array of TeacherDTO
   *
   */
  getAllTeachers(): Promise<Array<TeacherDTO>>;
}

export default IUserService;

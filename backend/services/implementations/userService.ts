import * as firebaseAdmin from "firebase-admin";

import type IUserService from "../interfaces/userService";
import type { User } from "../../models/user.model";
import MgUser from "../../models/user.model";
import MgSchool from "../../models/school.model";
import type {
  CreateUserDTO,
  Role,
  UpdateUserDTO,
  UserDTO,
  TeacherDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

const getMongoUserByAuthId = async (authId: string): Promise<User> => {
  const user: User | null = await MgUser.findOne({ authId });
  if (!user) {
    throw new Error(`user with authId ${authId} not found.`);
  }
  return user;
};

class UserService implements IUserService {
  /* eslint-disable class-methods-use-this */
  async getUserById(userId: string): Promise<UserDTO> {
    let user: User | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      user = await MgUser.findById(userId);

      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }

      firebaseUser = await firebaseAdmin.auth().getUser(user.authId);
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: firebaseUser.email ?? "",
      role: user.role,
      grades: user.grades,
      currentlyTeachingJM: user.currentlyTeachingJM,
      isVerified: firebaseUser.emailVerified,
    };
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    let user: User | null;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
      user = await MgUser.findOne({ authId: firebaseUser.uid });

      if (!user) {
        throw new Error(`userId with authId ${firebaseUser.uid} not found.`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: firebaseUser.email ?? "",
      role: user.role,
      grades: user.grades,
      currentlyTeachingJM: user.currentlyTeachingJM,
      isVerified: firebaseUser.emailVerified,
    };
  }

  async getUserRoleByAuthId(authId: string): Promise<Role> {
    try {
      const { role } = await getMongoUserByAuthId(authId);
      return role;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get user role. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getUserIdByAuthId(authId: string): Promise<string> {
    try {
      const { id } = await getMongoUserByAuthId(authId);
      return id;
    } catch (error: unknown) {
      Logger.error(`Failed to get user id. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getAuthIdById(userId: string): Promise<string> {
    try {
      const user = await MgUser.findById(userId);
      if (!user) {
        throw new Error(`userId ${userId} not found.`);
      }
      return user.authId;
    } catch (error: unknown) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getUsersByRole(role: string): Promise<Array<UserDTO>> {
    let userDtos: Array<UserDTO> = [];
    try {
      const users: Array<User> = await MgUser.find({
        role: { $eq: role as Role },
      });
      userDtos = await Promise.all(
        users.map(async (user) => {
          let firebaseUser: firebaseAdmin.auth.UserRecord;

          try {
            firebaseUser = await firebaseAdmin.auth().getUser(user.authId);
          } catch (error) {
            Logger.error(
              `user with authId ${user.authId} could not be fetched from Firebase`,
            );
            throw error;
          }

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: firebaseUser.email ?? "",
            role: user.role,
            grades: user.grades,
            currentlyTeachingJM: user.currentlyTeachingJM,
            isVerified: firebaseUser.emailVerified,
          };
        }),
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to get users by role. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return userDtos;
  }

  async createUser(user: CreateUserDTO): Promise<UserDTO> {
    let newUser: User;
    let firebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      firebaseUser = await firebaseAdmin.auth().createUser({
        email: user.email,
        password: user.password,
      });

      try {
        newUser = await MgUser.create({
          firstName: user.firstName,
          lastName: user.lastName,
          authId: firebaseUser.uid,
          role: user.role,
          email: user.email,
          grades: user.grades,
          currentlyTeachingJM: user.currentlyTeachingJM,
        });
      } catch (mongoDbError) {
        // rollback user creation in Firebase
        try {
          await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
        } catch (firebaseError: unknown) {
          const errorMessage = [
            "Failed to rollback Firebase user creation after MongoDB user creation failure. Reason =",
            getErrorMessage(firebaseError),
            "Orphaned authId (Firebase uid) =",
            firebaseUser.uid,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw mongoDbError;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to create user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: firebaseUser.email ?? "",
      role: newUser.role,
      grades: newUser.grades,
      currentlyTeachingJM: newUser.currentlyTeachingJM,
      isVerified: firebaseUser.emailVerified,
    };
  }

  async updateUserById(userId: string, user: UpdateUserDTO): Promise<UserDTO> {
    let oldUser: User | null;
    let updatedFirebaseUser: firebaseAdmin.auth.UserRecord;

    try {
      // must explicitly specify runValidators when updating through findByIdAndUpdate
      oldUser = await MgUser.findByIdAndUpdate(
        userId,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          grades: user.grades,
          currentlyTeachingJM: user.currentlyTeachingJM,
        },
        { runValidators: true },
      );

      if (!oldUser) {
        throw new Error(`userId ${userId} not found.`);
      }

      try {
        updatedFirebaseUser = await firebaseAdmin
          .auth()
          .updateUser(oldUser.authId, { email: user.email });
      } catch (error) {
        // rollback MongoDB user updates
        try {
          await MgUser.findByIdAndUpdate(
            userId,
            {
              firstName: oldUser.firstName,
              lastName: oldUser.lastName,
              role: oldUser.role,
              grades: oldUser.grades,
              currentlyTeachingJM: oldUser.currentlyTeachingJM,
            },
            { runValidators: true },
          );
        } catch (mongoDbError: unknown) {
          const errorMessage = [
            "Failed to rollback MongoDB user update after Firebase user update failure. Reason =",
            getErrorMessage(mongoDbError),
            "MongoDB user id with possibly inconsistent data =",
            oldUser.id,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to update user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: updatedFirebaseUser.email ?? "",
      role: user.role,
      grades: user.grades,
      currentlyTeachingJM: user.currentlyTeachingJM,
      isVerified: updatedFirebaseUser.emailVerified,
    };
  }

  async deleteUserByEmail(email: string): Promise<void> {
    try {
      const firebaseUser: firebaseAdmin.auth.UserRecord = await firebaseAdmin
        .auth()
        .getUserByEmail(email);
      const deletedUser: User | null = await MgUser.findOneAndDelete({
        authId: firebaseUser.uid,
      });

      if (!deletedUser) {
        throw new Error(`authId (Firebase uid) ${firebaseUser.uid} not found.`);
      }

      try {
        await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
      } catch (error) {
        try {
          // rollback user deletion in MongoDB
          await MgUser.create({
            firstName: deletedUser.firstName,
            lastName: deletedUser.lastName,
            authId: deletedUser.authId,
            role: deletedUser.role,
            grades: deletedUser.grades,
            currentlyTeachingJM: deletedUser.currentlyTeachingJM,
          });
        } catch (mongoDbError: unknown) {
          const errorMessage = [
            "Failed to rollback MongoDB user deletion after Firebase user deletion failure. Reason =",
            getErrorMessage(mongoDbError),
            "Firebase uid with non-existent MongoDB record =",
            deletedUser.authId,
          ];
          Logger.error(errorMessage.join(" "));
        }

        throw error;
      }
    } catch (error: unknown) {
      Logger.error(`Failed to delete user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  /**
   * This method gets all the users corresponding to the ids parameter
   *
   * @param ids the unique identifiers of the users to fetch
   */
  async findAllUsersByIds(ids: string[]): Promise<Array<UserDTO>> {
    let userDtos: Array<UserDTO> = [];
    try {
      const users: Array<User> = await MgUser.find({ _id: { $in: ids } });

      userDtos = await this.mapUsersToUserDTOs(users);
    } catch (error: unknown) {
      Logger.error(`Failed to get users. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return userDtos;
  }

  private async mapUsersToUserDTOs(
    users: Array<User>,
  ): Promise<Array<UserDTO>> {
    const userDtos: Array<UserDTO> = await Promise.all(
      users.map(async (user) => {
        let firebaseUser: firebaseAdmin.auth.UserRecord;

        try {
          firebaseUser = await firebaseAdmin.auth().getUser(user.authId);
        } catch (error) {
          Logger.error(
            `user with authId ${user.authId} could not be fetched from Firebase`,
          );
          throw error;
        }

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: firebaseUser.email ?? "",
          role: user.role,
          grades: user.grades,
          currentlyTeachingJM: user.currentlyTeachingJM,
          isVerified: firebaseUser.emailVerified,
        };
      }),
    );

    return userDtos;
  }

  async getAllTeachers(): Promise<TeacherDTO[]> {
    const pipeline = [
      // look up teachers
      {
        $lookup: {
          from: "users",
          localField: "teachers",
          foreignField: "_id",
          as: "teachers",
        },
      },
      // add school field

      {
        $addFields: {
          teachers: {
            $map: {
              input: "$teachers",
              as: "teacher",
              in: {
                $mergeObjects: [{ school: "$name" }, "$$teacher"],
              },
            },
          },
        },
      },
      // get list of list of teachers
      {
        $group: {
          _id: null,
          teachers: {
            $push: "$teachers",
          },
        },
      },

      // concatenate - now looks like {teachers: [...]}
      {
        $project: {
          _id: 0,
          teachers: {
            $reduce: {
              input: "$teachers",
              initialValue: [],
              in: {
                $concatArrays: ["$$value", "$$this"],
              },
            },
          },
        },
      },
      // unwind - now looks like [{teachers: {...}}, ..., {teachers: {...}}]
      {
        $unwind: {
          path: "$teachers",
        },
      },
      // replace root to get desired result
      {
        $replaceRoot: {
          newRoot: "$teachers",
        },
      },

      // replace _id field with id
      {
        $project: {
          _id: 0,
          id: "$_id",
          firstName: 1,
          lastName: 1,
          authId: 1,
          role: 1,
          email: 1,
          school: 1,
          __v: 1,
        },
      },
    ];

    return MgSchool.aggregate(pipeline);
  }
}

export default UserService;

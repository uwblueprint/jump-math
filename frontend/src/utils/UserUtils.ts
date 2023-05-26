import type { AdminUser, TeacherUser } from "../types/UserTypes";

import { includesIgnoreCase } from "./GeneralUtils";

const getTeacherUser = (user: TeacherUser): TeacherUser => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    school: user.school,
  };
};

const getAdminUser = (user: AdminUser): AdminUser => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const filterTeacherUsersBySearch = (
  users: TeacherUser[],
  search: string,
): TeacherUser[] => {
  let filteredUsers = users;
  if (search) {
    filteredUsers = filteredUsers.filter(
      (user: TeacherUser) =>
        includesIgnoreCase(`${user.firstName} ${user.lastName}`, search) ||
        includesIgnoreCase(user.email, search) ||
        includesIgnoreCase(user.school, search),
    );
  }
  return filteredUsers?.map(getTeacherUser);
};

export const filterAdminUsersBySearch = (
  users: AdminUser[],
  search: string,
): AdminUser[] => {
  let filteredUsers = users;
  if (search) {
    filteredUsers = filteredUsers.filter(
      (user: AdminUser) =>
        includesIgnoreCase(`${user.firstName} ${user.lastName}`, search) ||
        includesIgnoreCase(user.email, search),
    );
  }
  return filteredUsers?.map(getAdminUser);
};

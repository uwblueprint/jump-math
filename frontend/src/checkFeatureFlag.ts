const flags = {
  ENABLE_CLASSROOM_ARCHIVING: () => true,
  ENABLE_TEACHER_DATA_VIZ: () => false,
  ENABLE_ADMIN_DATA_VIZ: () => false,
} as const;

export default (flag: keyof typeof flags): boolean => {
  return flags[flag]();
};

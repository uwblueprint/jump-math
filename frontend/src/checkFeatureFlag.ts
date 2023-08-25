const flags = {
  ENABLE_CLASSROOM_ARCHIVING: () => false,
} as const;

export default (flag: keyof typeof flags): boolean => {
  return flags[flag]();
};

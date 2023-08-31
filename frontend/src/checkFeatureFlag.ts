const flags = {
  ENABLE_CLASSROOM_ARCHIVING: () => true,
} as const;

export default (flag: keyof typeof flags): boolean => {
  return flags[flag]();
};

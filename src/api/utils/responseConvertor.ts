export const SuccessResponse = <T = unknown>(data: T) => {
  return { ok: true, data };
};

export const ErrorResponse = (message: string) => {
  return { ok: false, data: [], message };
};

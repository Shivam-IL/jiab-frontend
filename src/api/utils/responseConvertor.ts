export const SuccessResponse = (data: any[]) => {
  return { ok: true, data };
};

export const ErrorResponse = (message: string) => {
  return { ok: false, data: [], message };
};

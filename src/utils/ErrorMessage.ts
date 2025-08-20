import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: unknown): string => {
  if (!error) return "An unknown error occurred.";

  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data;

      if (data && typeof data === "object" && "message" in data) {
        return `${(data as any).message}`;
      }

      switch (status) {
        case 400:
          return "Bad request. Please check your input.";
        case 401:
          return "Unauthorized. Please login again.";
        case 403:
          return "Forbidden. You don’t have permission.";
        case 404:
          return "Resource not found.";
        case 500:
          return "Internal server error. Please try later.";
        default:
          return `Server returned status ${status}.`;
      }
    }

    if (axiosError.request) {
      return "No response from server. Check your network connection.";
    }

    return `Request error: ${axiosError.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};

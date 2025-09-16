interface CursorPagination {
  has_next: boolean;
  next_id: number | null;
  limit: number;
}
interface ErrorDetail {
  field: string;
  message: string;
}
type IPagination = {
  has_next_page: boolean;
  next_page?: number;
  current_page: number;
  total_pages: number;
  total_items: number;
};
interface Payload<T = any> {
  data: T;
  pagination?: IPagination | CursorPagination;
  errors: ErrorDetail[];
}

interface APIResponse<T = any> {
  status: "success" | "error" | "fail";
  status_code: number;
  message: string;
  payload: Payload<T>;
}
//  const mapSupabaseError = (
//   error: any,
//   message: string
// ): APIResponse<any> => {
//   console.log({ error, message });
//   return {
//     message,
//     payload: {
//       data: null,
//       errors: [
//         {
//           message,
//           field: error?.message || "Unknown error",
//         },
//       ],
//     },
//     status: "error",
//     status_code: 500,
//   };
// };

//  const NOT_FOUND_ERR = "PGRST116";
//  const MISSING_SESSION: APIResponse<null> = {
//   message: "Unauthorized",
//   payload: {
//     data: null,
//     errors: [
//       {
//         message: "Please Sign in to Continue",
//         field: "session",
//       },
//     ],
//   },
//   status: "error",
//   status_code: 403,
// };
type StatusCodeCreated = 201;

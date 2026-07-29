import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  SubmitFeedbackPayload,
  SubmitFeedbackResponseData,
} from "../types/feedback.types";

export class FeedbackApiError extends Error {
  public readonly status?: number;
  public readonly details?: ApiErrorResponse["details"];

  constructor(message: string, status?: number, details?: ApiErrorResponse["details"]) {
    super(message);
    this.name = "FeedbackApiError";
    this.status = status;
    this.details = details;
  }
}

export const feedbackService = {
  async submitFeedback(
    payload: SubmitFeedbackPayload
  ): Promise<SubmitFeedbackResponseData> {
    try {
      const response = await api.post<ApiSuccessResponse<SubmitFeedbackResponseData>>(
        "/feedback",
        payload
      );
      return response.data.data;
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        const message =
          error.response?.data?.error ??
          "We couldn't submit your feedback. Please try again.";
        throw new FeedbackApiError(message, error.response?.status, error.response?.data?.details);
      }
      throw new FeedbackApiError("We couldn't submit your feedback. Please try again.");
    }
  },
};

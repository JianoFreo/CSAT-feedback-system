import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackFormSchema, type FeedbackFormValues } from "../types/feedbackForm.schema";
import type { RatingValue } from "../types/feedback.types";
import { feedbackService, FeedbackApiError } from "../services/feedbackService";
import { CategoryCheckboxes } from "./CategoryCheckboxes";
import { LoadingSpinner } from "./LoadingSpinner";
import { AlertBanner } from "./AlertBanner";
import { getRatingTheme } from "../lib/ratingTheme";

interface FeedbackFormProps {
  ticketId: number;
  rating: RatingValue;
  onSubmitted: () => void;
}

export function FeedbackForm({ ticketId, rating, onSubmitted }: FeedbackFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const theme = getRatingTheme(rating);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: { feedback: "", categories: [] },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    setSubmitError(null);
    try {
      // ticket_id and rating are injected here from the URL-derived props,
      // never from form state — the customer has no control they can edit.
      await feedbackService.submitFeedback({
        ticket_id: ticketId,
        rating,
        feedback: values.feedback?.trim() ? values.feedback.trim() : null,
        categories: values.categories ?? [],
      });
      onSubmitted();
    } catch (error) {
      const message =
        error instanceof FeedbackApiError
          ? error.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="feedback" className="mb-1.5 block text-sm font-medium text-slate-700">
          Tell us more about your experience
        </label>
        <textarea
          id="feedback"
          rows={5}
          placeholder="What went well, or what could we do better?"
          className={`w-full resize-none rounded-2xl border px-4 py-3 text-sm shadow-sm outline-none transition focus:ring-2 ${theme.fieldClass} ${theme.fieldFocusClass}`}
          {...register("feedback")}
        />
        {errors.feedback && (
          <p className="mt-1 text-xs text-red-600">{errors.feedback.message}</p>
        )}
      </div>

      <CategoryCheckboxes register={register} />

      {submitError && <AlertBanner variant="error" message={submitError} />}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${theme.buttonClass} ${theme.buttonHoverClass}`}
      >
        {isSubmitting && <LoadingSpinner className="h-4 w-4 text-white" />}
        {isSubmitting ? "Submitting..." : "Submit feedback"}
      </button>
    </form>
  );
}

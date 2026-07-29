import type { UseFormRegister } from "react-hook-form";
import { CATEGORY_LABELS, FEEDBACK_CATEGORIES } from "../types/feedback.types";
import type { FeedbackFormValues } from "../types/feedbackForm.schema";

interface CategoryCheckboxesProps {
  register: UseFormRegister<FeedbackFormValues>;
}

export function CategoryCheckboxes({ register }: CategoryCheckboxesProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-slate-700">
        What was this about? <span className="font-normal text-slate-400">(optional)</span>
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {FEEDBACK_CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 has-[:checked]:border-indigo-400 has-[:checked]:bg-indigo-50"
          >
            <input
              type="checkbox"
              value={category}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              {...register("categories")}
            />
            {CATEGORY_LABELS[category]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

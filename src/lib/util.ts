import { differenceInYears, format } from "date-fns";
import { ZodIssue } from "zod";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((e) => {
      const fieldName = e.path.join(".") as Path<TFieldValues>;
      setError(fieldName, { message: e.message });
    });
  } else {
    setError("root.serverError", { message: errorResponse.error });
  }
}

export function formatShortDateTime(date: Date) {
  return format(date, 'dd MMM yy h:mm:a');
}

export function truncateString(text?: string | null, num = 50) {
  if (!text) return null;
  if (text.length <= num) {
    return text;
  }
  return text.slice(0,num) + '...';
}
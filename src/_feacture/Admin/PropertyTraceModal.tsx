import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../_ui/input";
import {
  propertyTraceSchema,
  type PropertyTraceModel,
} from "../../_models/PropertyTraceSchema";

export function PropertyTraceModal({
  isOpen,
  setOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: PropertyTraceModel) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<PropertyTraceModel>({
    resolver: zodResolver(propertyTraceSchema) as Resolver<PropertyTraceModel>,
    mode: "onChange",
  });

  const handleClose = () => {
    if (
      isDirty &&
      !confirm("Are you sure you want to exit? Changes will be lost.")
    ) {
      return;
    }
    reset();
    setOpen(false);
  };

  const onFormSubmit = handleSubmit(async (data: PropertyTraceModel) => {
    try {
      await onSubmit(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error saving trace property:", error);
    }
  });

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      center
      classNames={{
        overlay: "!bg-black/60 backdrop-blur-sm",
        modal: "!bg-transparent !shadow-none !p-0 !m-4 !max-w-3xl",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add new buyer</h2>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              📍 Property Trace Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name new owner"
                name="name"
                placeholder="Jhon Doe"
                register={register("name")}
                error={errors.name?.message}
              />

              <InputField
                label="Price (USD)"
                name="price"
                type="number"
                placeholder="50000"
                register={register("price")}
                error={errors.price?.message}
              />
              <InputField
                label="Tax"
                name="tax"
                placeholder="1000"
                register={register("tax")}
                error={errors.tax?.message}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg font-medium
                bg-gray-100 text-gray-700
                hover:bg-gray-200 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg font-medium
                bg-blue-600 text-white
                hover:bg-blue-700 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Trace"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

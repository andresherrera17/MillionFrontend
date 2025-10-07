import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  propertySchema,
  type PropertyFormData,
} from "../../_models/propertySchema";
import { InputField } from "../../_ui/input";

export function PropertyAddModal({
  isOpen,
  setOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (formData: FormData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as Resolver<PropertyFormData>,
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

  const onFormSubmit = handleSubmit(async (data: PropertyFormData) => {
    const formData = new FormData();

    formData.append("Name", data.name);
    formData.append("Address", data.address);
    formData.append("Price", data.price.toString());
    formData.append("Year", data.year.toString());
    formData.append("CodeInternal", data.codeInternal);
    formData.append("Tax", data.tax.toString());
    formData.append("OwnerName", data.ownerName);
    formData.append("OwnerAddress", data.ownerAddress);
    formData.append("OwnerBirthday", data.ownerBirthday);

    if (data.ownerPhoto?.[0]) {
      formData.append("OwnerPhoto", data.ownerPhoto[0]);
    }

    if (data.files) {
      Array.from(data.files).forEach((file) => {
        formData.append("Files", file);
      });
    }

    try {
      await onSubmit(formData);
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error saving property:", error);
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
          <h2 className="text-2xl font-bold text-gray-800">Add Property</h2>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              📍 Property Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name"
                name="name"
                placeholder="E.g.: Beach house"
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
                label="Internal Code"
                name="codeInternal"
                placeholder="PROP-001"
                register={register("codeInternal")}
                error={errors.codeInternal?.message}
              />

              <InputField
                label="Year Built"
                name="year"
                type="number"
                placeholder="2020"
                register={register("year")}
                error={errors.year?.message}
              />
              <InputField
                label="Full Address"
                name="address"
                placeholder="123 Main St, City"
                register={register("address")}
                error={errors.address?.message}
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              👤 Owner Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                name="ownerName"
                placeholder="John Doe"
                register={register("ownerName")}
                error={errors.ownerName?.message}
              />

              <InputField
                label="Birthday"
                name="ownerBirthday"
                type="date"
                register={register("ownerBirthday")}
                error={errors.ownerBirthday?.message}
              />

              <InputField
                label="Address"
                name="ownerAddress"
                placeholder="456 Main St, City"
                register={register("ownerAddress")}
                error={errors.ownerAddress?.message}
              />

              <InputField
                label="Owner Photo"
                name="ownerPhoto"
                type="file"
                accept="image/*"
                register={register("ownerPhoto")}
                error={errors.ownerPhoto?.message}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              📸 Property Images
            </h3>

            <InputField
              label="Images (max 10)"
              name="files"
              type="file"
              accept="image/*"
              multiple
              register={register("files")}
              error={errors.files?.message}
            />
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
                "Save Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

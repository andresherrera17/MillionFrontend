import { z } from "zod";

export const propertySchema = z.object({
    // 🏠 Propiedad
    name: z.string().min(3, "Name must be at least 3 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),

    price: z.coerce
        .number()
        .positive("Price must be greater than 0")
        .min(1000, "Minimum price is $1,000"),
    tax: z.coerce
        .number()
        .positive("Tax must be greater than 0"),

    year: z.coerce
        .number()
        .min(1900, "Year must be greater than 1900")
        .max(new Date().getFullYear(), "Year cannot be in the future"),

    codeInternal: z.string().min(3, "Code must be at least 3 characters"),

    // 👤 Owner
    ownerName: z.string().min(3, "Owner name must be at least 3 characters"),
    ownerAddress: z.string().min(5, "Owner address must be at least 5 characters"),
    ownerBirthday: z
        .string()
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18 && age <= 120;
        }, "Owner must be at least 18 years old"),

    ownerPhoto: z
        .instanceof(FileList)
        .optional()
        .refine(
            (files) => !files || files.length === 0 || files[0].size <= 5_000_000,
            "Photo must not exceed 5MB"
        ),

    // 📸 Images
    files: z
        .instanceof(FileList)
        .optional()
        .refine((files) => !files || files.length <= 10, "Maximum 10 images"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

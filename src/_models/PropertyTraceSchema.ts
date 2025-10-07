import { z } from "zod";

export const propertyTraceSchema = z.object({
    // 🏠 Propiedad
    idProperty: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters"),

    price: z.coerce
        .number()
        .positive("Price must be greater than 0")
        .min(1000, "Minimum price is $1,000"),
    tax: z.coerce
        .number()
        .positive("Tax must be greater than 0"),


});

export type PropertyTraceModel = z.infer<typeof propertyTraceSchema>;

const { z } = require("zod");

//creating an object schema
const signupSchema = z.object({
    username: z.string({ required_error: "Name is required" }).trim().min(3, { message: "Name must be at least 3 chars" }).max(255, { message: "Name must not be more than 255 chars" }),

    email: z.string({ required_error: "Email is required" }).trim().email({message:"Invalid email address"}).min(3, { message: "Email must at least 3 chars" }).max(255, { message: "Email must at least 255 chars" }),

    phone: z.string({ required_error: "Phone no is required" }).trim().min(10, { message: "Phone must at least 10 chars" }).max(20, { message: "Phone must at least 20 chars" }),

    password: z.string({ required_error: "Password is required" }).trim().min(6, { message: "Password must be at least 6 chars" }).max(1024, { message: "Password cant be greater than 1024 chars" })
})

module.exports = signupSchema;
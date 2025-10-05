import {z} from "zod"

const LoginSchema = z.object({
    userName:z.string("Invalid string").startsWith("@", "Invalid username").min(12, "Invalid username").max(12,"Invalid username"),
    userPassword:z.string("Invalid string").min(4, "Invalid password").max(4,"Invalid password")
}).strict()

export {
    LoginSchema
}
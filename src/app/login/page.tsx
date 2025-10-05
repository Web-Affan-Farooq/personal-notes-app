"use client";

// _____ Hooks ...
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// _____ Libraries ...
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// _____ Types and schemas ...
import { LoginSchema } from "@/validations/LoginSchema";

// _____ Server actions ...
import LoginAction from "@/actions/LoginAction";

// _____ Components ...
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// _____ Infer type of formdata ...
type LoginFormdata = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // Destructure isSubmitting for button state
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (formData: LoginFormdata) => {
    try {
      // NOTE: The function name here should not shadow the component name (Login)
      // I've renamed the form submission function to `onSubmit` for clarity.
      const { success, message } = await LoginAction(
        formData.userName,
        formData.userPassword
      );

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        reset();
        router.push("/");
        // Clear the form on successful submission
        // You might want to add a redirect here, e.g., router.push("/dashboard")
      }
    } catch (err) {
      console.error(err); // Changed to console.error for actual errors
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <main>
      <article>
        <section className="flex w-full h-screen flex-col flex-nowrap justify-center items-center text-white">
          {/* Added some base styles */}
          <div className="lg:w-[400px] p-8 rounded-lg shadow-2xl border border-gray-700">
            {" "}
            {/* Adjusted container styles */}
            <h1 className="font-bold text-[28px] mb-6 text-center">
              Login to your account
            </h1>
            {/* The onSubmit handler is attached to the form element, pointing to react-hook-form's handleSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Input Group */}
              <div>
                <label
                  htmlFor="userName" // htmlFor should match the input's id or name for accessibility
                  className="sr-only" // Use sr-only instead of hidden to keep it accessible
                >
                  Enter user name
                </label>
                <Input
                  id="userName"
                  type="text"
                  className="focus:ring-indigo-500 border-none placeholder:text-sm text-indigo-100"
                  placeholder="Enter user name"
                  {...register("userName")}
                />
                {errors.userName && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              {/* Password Input Group */}
              <div>
                <label htmlFor="userPassword" className="sr-only">
                  Enter password
                </label>
                <Input
                  id="userPassword"
                  type="password" // Important: set type to password
                  className="focus:ring-indigo-500 border-none placeholder:text-sm text-indigo-100"
                  placeholder="Enter password"
                  {...register("userPassword")}
                />
                {errors.userPassword && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.userPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}

              <Button
                type="submit"
                className={`cursor-pointer transition-all duration-200 ease-in-out text-sm bg-indigo-400/20 border-none px-[20px] rounded-md py-[5px] text-indigo-600 hover:text-white ${
                  isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Login;

"use client";

import { useFormState } from "react-dom";
import FullBorderInput from "@/app/ui/custom/inputs/FullBorderInput";
import Button from "@/app/ui/custom/inputs/Button";
import { initialState } from "@/app/ui/forms/auth/signupForm";
import { ZodError } from "@/app/ui/custom/ZodError";
import { sendMessage } from "@/app/lib/actions/contactActions";

export default function ContactForm() {
  const [formState, formAction] = useFormState(sendMessage, initialState);
  return (
    <form
      action={formAction}
      className="py-10 px-6 md:px-16 rounded-lg flex flex-col gap-5 w-full bg-gray-50 shadow-md relative z-40"
    >
      <div className="text-md md:text-base w-full flex justify-between gap-x-5">
        <div className="w-1/2">
          <FullBorderInput
            type="text"
            placeholder="First Name"
            name="firstName"
            error={formState.errors?.firstName}
          />
        </div>
        <div className="w-1/2">
          <FullBorderInput
            type="text"
            placeholder="Last Name"
            name="lastName"
            error={formState.errors?.lastName}
          />
        </div>
      </div>

      <FullBorderInput
        type="email"
        placeholder="E-mail"
        name="email"
        error={formState.errors?.email}
      />

      <FullBorderInput
        type="text"
        placeholder="Subject"
        name="subject"
        error={formState.errors?.subject}
      />

      <div>
        <textarea
          placeholder="Message"
          name="message"
          className={`focus:outline-none bg-white bg-transparent p-3 border rounded-lg focus:border-sky-500 focus:border-2 my-3 w-80 w-full text-start text-left
          ${formState.errors?.message ? "border-red-500" : "border-gray-200"}`}
          style={{
            height: "30vh",
          }}
        />
        <ZodError error={formState.errors?.message} />
      </div>

      <Button
        body={"Send Message"}
        style={{
          width: "100%",
        }}
      />
    </form>
  );
}

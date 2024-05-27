import {z} from 'zod';

const messageSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1,  "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(1, "Please enter a message")
})

export const sendMessage = async (prevState: any, formData:FormData) =>{
  const validatedFields = messageSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success)
    return {
      ...prevState,
      message: '',
      errors: validatedFields.error.flatten().fieldErrors
    }

    // TODO: Send message to the backend if there is an endpoint

    return {
      data: validatedFields.data,
      message:"",
      errors:null
    }
}
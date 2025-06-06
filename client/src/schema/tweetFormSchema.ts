import { z } from "zod";

export const tweetFormSchema = z.object({
  text: z.string().min(1, "O texto do tweet é obrigatório"),
});

export type TTweetForm = z.infer<typeof tweetFormSchema>;

export const defaultTweetForm: TTweetForm = {
  text: "",
};

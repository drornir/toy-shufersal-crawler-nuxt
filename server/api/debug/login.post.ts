import { login as loginAction } from "@/agent/actions";
import { makePlaywright } from "@/agent/playwright";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const pw = await makePlaywright({ headless: false });
  const body = await readValidatedBody(
    event,
    z.object({
      email: z.string().email(),
      password: z.string(),
    }).safeParse,
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
      data: body.error,
    });
  }

  try {
    await loginAction(pw, {
      email: body.data?.email,
      password: body.data?.password,
    });
  } catch (e) {
    console.error("login failed:", e);
    let msg = "Login failed";
    if (e instanceof Error) {
      msg = `${msg}: ${e.message}`;
    } else if (typeof e === "string") {
      msg = `${msg}: ${e}`;
    }
    throw createError({
      statusCode: 500,
      message: msg,
    });
  } finally {
    await pw.close();
  }

  return { message: "Login successful" };
});

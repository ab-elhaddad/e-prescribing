import {
  clerkClient,
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  setRole(auth);
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

async function setRole(auth: ClerkMiddlewareAuth) {
  const userId = auth().userId;
  if (!userId) return;

  const user = await clerkClient().users.getUser(userId);
  if (!user) return;

  if (user.publicMetadata.role === undefined) {
    await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        role: "patient",
      },
    });
  }
}

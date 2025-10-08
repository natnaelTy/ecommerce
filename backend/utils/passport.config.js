import passportConfig from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../prisma/prismaClient.js";


passportConfig.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email in Google profile"));

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              fullName: profile.displayName || "",
              profileImage: profile.photos?.[0]?.value || null,
              isEmailVerified: true,
              password: "", 
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// optional but harmless for token-only flows
passportConfig.serializeUser((user, done) => done(null, user.id));
passportConfig.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passportConfig;
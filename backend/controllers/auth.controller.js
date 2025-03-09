import { pool } from "../db/mysqldb.js";
import bcrypt from "bcryptjs";
import { generateTokenSetCookie } from "../../utils/generateTokenSetCookie.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res) => {
  const { email, fullName, user_password } = req.body;

  try {
    if (!email || !fullName || !user_password) {
      return res.status(400).json({ error: "fill all fields" });
    }

    const checkIfUserExist = "SELECT * FROM user WHERE email = ?";
    pool.query(checkIfUserExist, email, async (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      } else if (results.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "user already exist" });
      }
      if (results.length === 0) {
        // hash password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        const query =
          "INSERT INTO user (fullName, email, user_password) VALUES (?, ?, ?)";
        pool.query(query, [fullName, email, hashedPassword], (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            return res
              .status(500)
              .json({ success: false, message: "Database error" });
          }
          const user = { fullName, email };
          // Get the inserted user's ID
          const userId = results.insertId;
          const token = generateTokenSetCookie(res, userId, email, fullName);
          
          res.status(201).json({
            sucess: true,
            message: "user created sucessfully",
            user: {
              ...user,
              token,
            },
          });
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, user_password } = req.body;

    const loginQuery = "SELECT * FROM user WHERE email = ?";

    pool.query(loginQuery, [email], async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Server Error");
      }

      if (results.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Email or Password is not Valid!" });
      }

      const user = results[0];

      console.log(user);

      const isPasswordValid = await bcrypt.compare(
        user_password,
        user.user_password
      );

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Email or Password is not Valid!" });
      }

      const token = generateTokenSetCookie(res, user.userId, email);

      return res
        .status(200)
        .json({ success: true, message: "You are successfully logged in", token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// google oauth2
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "754841437945-ffv2uajkvufvdsl9rhp5pb6ie2cftkqu.apps.googleusercontent.com",
      clientSecret:
        process.env.CLIENTSECRECT || "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",
      callbackURL:
        process.env.CALLBACKURL || "http://localhost:5000/auth/google/login",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;

        // check if user already exist
        const checkIfUserExist = "SELECT * FROM user WHERE email = ?";
        pool.query(checkIfUserExist, [email], (err, result) => {
          if (err) {
            return done(err);
          } else if (result.length > 0) {
            const user = result[0];
            return done(null, user);
          } else {
            const query =
              "INSERT INTO user (fullName, email, user_password) VALUES (?, ?, ?)";
            const hashedPassword = bcrypt.hashSync("", 10);

            pool.query(
              query,
              [fullName, email, hashedPassword],
              (err, result) => {
                if (err) return done(err, null);

                const userId = result.insertId;
                const newUser = { userId, fullName, email };

                return done(null, newUser);
              }
            );
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
  const query = "SELECT * FROM user WHERE userId = ?";
  pool.query(query, [userId], (err, results) => {
    if (err) return done(err);
    const user = results[0];
    done(null, user);
  });
});

// Google OAuth2 Login Route
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google OAuth2 Callback Route
export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");

    // Generate token and set cookie
    const token = generateTokenSetCookie(res, user.userId, user.email, user.fullName);
    res.redirect(`http://localhost:5173?${token}`);
  })(req, res, next);
};

export const getProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const query = "SELECT userId, fullName, email, WHERE userId = ?";
    pool.query(query, [userId], (error, result) => {
      if (error) {
        console.log(`Error exucuting query: ${error}`);
        return res
          .status(500)
          .json({ success: false, message: "Error in database" });
      } else if (result.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }

      const user = result[0];
      return res.status(200).json({ success: true, user });
    });
  } catch (err) {}
};

//
export const logout = (_, res) => {
  res.clearCookie("token");
  res.status(200).json({success: true, message: "You are successfully logged out"});
};

// get token from payload, then vaildate with secrate key then return decoded
export const verify = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRECT);
    if(!decode){
      return res.status(401).json({success: false, message: "Unauthorized - invalid token"})
    }

    res.status(200).json({ success: true, user: decode });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

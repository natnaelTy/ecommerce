import { pool } from "../db/mysqldb.js";
import bcrypt from "bcryptjs";
import { generateTokenSetCookie } from "../../utils/generateTokenSetCookie.js";
import { query } from "express";


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
        pool.query(
          query,
          [fullName, email, hashedPassword],
          (err, results) => {
            if (err) {
              console.error("Error executing query:", err);
              return res
                .status(500)
                .json({ success: false, message: "Database error" });
            }

            // Get the inserted user's ID
            const userId = results.insertId;
            generateTokenSetCookie(res, userId, email);
            console.log({ results });
            return res
              .status(201)
              .json({ sucess: true, message: "user created sucessfully" });
          }
        );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

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
        return res.status(400).json({success: false, message: "Email or Password is not Valid!"});
      }
    
      const user = results[0];
      
      console.log(user)

      const isPasswordValid = await bcrypt.compare(
        user_password,
        user.user_password
      );
      
      if (!isPasswordValid) {
        return res.status(400).json({success: false, message: "Email or Password is not Valid!"});
      }

      generateTokenSetCookie(res, user.userId, email);

      return res
        .status(200)
        .json({ success: true, message: "You are successfully logged in" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

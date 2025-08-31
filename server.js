import jsonServer from "json-server";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const JWT_SECRET = "your_super_secret_key_12345";

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(middlewares);
server.use(cookieParser());
server.use(jsonServer.bodyParser);

const authorize = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "دسترسی غیرمجاز: لطفا وارد شوید." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "توکن نامعتبر است." });
  }
};
server.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const existingUser = db.get("users").find({ username }).value();
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "این نام کاربری قبلاً استفاده شده است." });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = db
    .get("users")
    .insert({ username, password: hashedPassword })
    .write();
  const token = jwt.sign(
    { userId: newUser.id, username: newUser.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });
  res.status(201).json({
    user: { id: newUser.id, username: newUser.username },
  });
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ username }).value();
  if (!user) {
    return res
      .status(400)
      .json({ message: "نام کاربری یا رمز عبور اشتباه است." });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "نام کاربری یا رمز عبور اشتباه است." });
  }
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });
  res.status(200).json({
    user: { id: user.id, username: user.username },
  });
});

server.patch("/users/:id", authorize, (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const db = router.db;

  if (req.user.userId.toString() !== id) {
    return res
      .status(403)
      .json({ message: "شما فقط اجازه تغییر اطلاعات خود را دارید." });
  }

  // Lowdb can find by string or number, so we check the type of the ID in db.
  const isIdNumeric =
    db.has("users[0].id").value() &&
    typeof db.get("users[0].id").value() === "number";
  const user = db.get("users").find({ id: isIdNumeric ? Number(id) : id });

  if (!user.value()) {
    return res.status(404).json({ message: "کاربر یافت نشد." });
  }

  const updates = {};
  if (username) {
    updates.username = username;
  }
  if (password) {
    updates.password = bcrypt.hashSync(password, 10);
  }

  const updatedUser = user.assign(updates).write();

  res.status(200).json({
    user: { id: updatedUser.id, username: updatedUser.username },
  });
});

server.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "خروج با موفقیت انجام شد." });
});

server.post("/users/verify-password", authorize, (req, res) => {
  const { currentPassword } = req.body;
  const { userId } = req.user;
  const db = router.db;

  const isIdNumeric =
    db.has("users[0].id").value() &&
    typeof db.get("users[0].id").value() === "number";
  const user = db
    .get("users")
    .find({ id: isIdNumeric ? Number(userId) : userId })
    .value();

  if (!user) {
    return res.status(404).json({ message: "کاربر یافت نشد." });
  }

  const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "رمز عبور فعلی اشتباه است." });
  }

  res.status(200).json({ message: "رمز عبور تایید شد." });
});

server.use((req, res, next) => {
  const protectedRoutes = ["/carts", "/wishlists"];
  if (protectedRoutes.some((route) => req.path.startsWith(route))) {
    return authorize(req, res, next);
  }
  next();
});

server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running securely on port ${port}`);
});

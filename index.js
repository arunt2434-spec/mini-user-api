const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {

  const currentTime = new Date().toLocaleString();

  console.log(`Request received at: ${currentTime}`);
  console.log(`${req.method} ${req.url}`);
  next();
});

let users=[];
app.get("/",(req,res)=>{
    res.json({
        message:"Server Running",
        time:new Date().toLocaleString()
    });
});

app.get("/users",(req,res)=>{
    res.json({
        message:"user fetched successfully",
        users: users,
        time:new Date().toLocaleString()
    });
});

app.post("/users",(req,res)=>{
    const{name, email} =req.body;

    if(!name || !email){
        return res.status(400).json({
            message: "Name and email are required",
            time: new Date().toLocaleString()
        });
    }
    const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
      time: new Date().toLocaleString()
    });
  }

  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  
  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
    time: new Date().toLocaleString()
  });
    
});

// DELETE user by id
app.delete("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const userIndex = users.findIndex((u) => u.id === id);

  // User not found
  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
      time: new Date().toLocaleString()
    });
  }

  // Delete user
  users.splice(userIndex, 1);

  res.json({
    message: "User deleted successfully",
    time: new Date().toLocaleString()
  });

});
app.get("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      time: new Date().toLocaleString()
    });
  }

  res.json({
    message: "User found",
    user: user,
    time: new Date().toLocaleString()
  });

});
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required",
      time: new Date().toLocaleString()
    });
  }

  
  if (email === "admin@gmail.com" && password === "1234") {

    return res.json({
      message: "Login Success",
      time: new Date().toLocaleString()
    });

  }

  res.status(401).json({
    message: "Invalid Credentials",
    time: new Date().toLocaleString()
  });

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
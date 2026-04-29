🔐 SecureAuth: Full-Stack Authentication & SQL Injection Defense System
📌 Overview

SecureAuth is a full-stack web application designed to demonstrate both insecure and secure authentication mechanisms. The project highlights how SQL Injection attacks occur and how they can be prevented using best security practices.

This system is built for educational purposes, helping developers understand real-world vulnerabilities and their solutions.

🎯 Key Features
🔑 User Authentication System (Login)
⚠️ Vulnerable Mode (demonstrates SQL Injection)
🛡️ Secure Mode (prevents SQL Injection using parameterized queries)
📊 Admin Dashboard
📝 Attack Logging System (logs injection attempts with details)
🔄 Mode Toggle (switch between secure & vulnerable systems)
🏗️ Tech Stack
Frontend
React.js
HTML, CSS, JavaScript
Backend
Node.js
Express.js
Database
MySQL
Tools
VS Code
Postman
🧠 How It Works
User enters login credentials
Request is sent to backend
Based on selected mode:
⚠️ Vulnerable Mode
Uses raw SQL queries
Allows SQL Injection

Example attack:

' OR '1'='1
🛡️ Secure Mode
Uses parameterized queries
Prevents SQL Injection completely
📂 Project Structure
/frontend     → React UI
/backend      → Node.js server
/database     → MySQL schema
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo-name.git
2️⃣ Backend Setup
cd backend
npm install
npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm start
4️⃣ Database Setup
Create database: secureauth
Create users table
Insert sample data
🧪 Testing SQL Injection
In Vulnerable Mode:

Use:

' OR '1'='1

➡️ Login will succeed (attack works)

In Secure Mode:

➡️ Attack fails ❌

📊 Results
Vulnerable mode successfully demonstrates SQL Injection
Secure mode blocks all injection attempts
Attack logs are generated and displayed
Admin dashboard shows system activity
🚀 Future Enhancements
JWT Authentication
Password Hashing (bcrypt)
Improved UI/UX
Role-based access control
Cloud Deployment (AWS/Heroku)
Additional OWASP vulnerability simulations

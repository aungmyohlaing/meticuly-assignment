# Meticuly Demo Project

This is a demo admin interface developed for Meticuly to manage customer records efficiently and prevent duplicate entries.

The system is built as a monorepo containing:
- `frontend/`: Admin UI using **Nuxt 3**, **Vue 3**, **TypeScript**, and **Tailwind CSS**
- `backend/`: REST API server using **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**

---

## 🧩 Features

- Admin login system
- Customer entry form with:
  - First name, Last name
  - Phone number, Email
  - Address
- Real-time duplicate detection based on:
  - Fuzzy matching of first and last names using `fuse.js`
  - Verification via phone number
- Customer list dashboard

---

## 🔍 Duplicate Detection

The backend uses [`fuse.js`](https://fusejs.io/) to perform fuzzy matching on customer first and last names. When a new customer is entered:

- It searches existing records for similar names (e.g., "Jon" vs. "John").
- It then uses phone number as a secondary check to confirm whether the entry is truly a duplicate.

This helps reduce human errors caused by typos and inconsistent spelling.


---

## 🗂️ Monorepo Structure

```
.
├── backend/ # Node.js REST API
├── frontend/ # Nuxt 3 admin interface
├── .gitignore
└── README.md
```
---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

```
--- 

### 2. Setup Environment Variables

```bash
Create .env files in both backend/ and frontend/ folders.

🔧 backend/.env
PORT=4000
JWT_SECRET=your_secrect
DATABASE_URL=postgres://user:password@localhost:5432/your_db

🌐 frontend/.env
API_BASE=http://localhost:4000/api

```
---

### 3.Install Dependencies

## Backend
cd backend
npm install

## Frontend
cd ../frontend
npm install

---

### 4.Run the Project (Dev Mode)
### Start Backend
cd backend
npm run dev

### Start Frontend
cd ../frontend
npm run dev

Visit the frontend at: http://localhost:3000

---

🧪 Scripts
| Location  | Command         | Description                |
| --------- | --------------- | -------------------------- |
| backend/  | `npm run dev`   | Start backend with nodemon |
| frontend/ | `npm run dev`   | Run Nuxt 3 dev server      |
| backend/  | `npm run build` | Build production server    |
| frontend/ | `npm run build` | Build Nuxt frontend        |

---

🗃️ Database
- Uses PostgreSQL
- Sequelize handles migrations and models
- Add a .env with your DATABASE_URL to connect


---

👨‍💻 Technologies Used
- **Frontend:** Nuxt 3, Vue 3, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, Sequelize, PostgreSQL, Fuse.js
- **Tools:** Monorepo structure, RESTful API, dotenv

---

📌 Notes
This is a demo version and not yet production-hardened.

For deployment, both frontend and backend can be containerized or deployed on separate droplets/instances.

---

📫 Contact
- For any questions, please contact:
- Aung – amhlaing@gmail.com


# My Blog Application

Aplikasi blog sederhana yang dibangun menggunakan teknologi web modern.  
Project ini menyediakan fitur autentikasi pengguna dan manajemen artikel blog.

---

##  Penjelasan Project

My Blog adalah aplikasi web yang memiliki fitur:

### Fitur Utama
- Autentikasi pengguna
  - Login
  - Register
- Manajemen blog
  - Membuat artikel
  - Mengubah artikel
  - Menghapus artikel
  - Melihat daftar artikel
- Manajemen kategori
  - Membuat kategori
  - Mengubah kategori
  - Menghapus kategori
- Halaman publik blog
  - Halaman daftar artikel
  - Halaman detail artikel

User yang sudah login dapat mengelola kategori dan artikel, sementara pengunjung dapat membaca artikel blog.

---

## 🗄 Desain Database

Aplikasi menggunakan **PostgreSQL** sebagai database.

### Tabel Utama

#### 1. users
- id 
- name
- username
- password
- created_at
- updated_at

#### 2. categories
- id 
- name
- slug   
- created_at
- updated_at

#### 3. posts
 - id
 - title
 - content
 - slug
 - created_at 
 - updated_at
 - category_id
 - author_id

### Relasi Antar Tabel

- Satu user dapat membuat banyak kategori.
- Satu user dapat membuat banyak artikel.
- Satu kategori dapat memiliki banyak artikel.

Relasi:

User (1) ---- (N) Categories
User (1) ---- (N) Posts
Category (1) ---- (N) Posts

---

## Screenshot Aplikasi

Screenshot aplikasi akan ditambahkan pada bagian ini.

<img width="1366" height="681" alt="Capture5" src="https://github.com/user-attachments/assets/8cb7471a-9b5a-4098-aff3-a09284195cae" />
<img width="1366" height="681" alt="Capture4" src="https://github.com/user-attachments/assets/7016fee7-7027-468a-8e1e-8c002ddd8070" />
<img width="1366" height="681" alt="Capture3" src="https://github.com/user-attachments/assets/bf241a16-d6c2-441f-a92f-bdc963d26cd5" />
<img width="1365" height="680" alt="Capture2" src="https://github.com/user-attachments/assets/43c40e62-ea4f-467b-97c0-95055870e046" />
<img width="1352" height="683" alt="Capture1" src="https://github.com/user-attachments/assets/59229a45-b174-43e3-8935-3d600356bb4c" />
<img width="1353" height="681" alt="Capture" src="https://github.com/user-attachments/assets/f97d84d4-eb88-41c2-a775-5540ad15854e" />
<img width="1366" height="680" alt="Capture6" src="https://github.com/user-attachments/assets/69fde67c-2705-4f6c-8d93-f20606a24097" />


---

## Dependency & Teknologi yang Digunakan

Project ini terdiri dari dua bagian utama:

### Backend (`/backend`)
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication

### Frontend (`/frontend`)
- React
- TypeScript
- Axios
- React Router
- Library UI sesuai kebutuhan project

---

## Struktur Project

myblogpanel/
│
├── backend/
│ ├── src/
│ └── ...
│
├── frontend/
│ ├── src/
│ └── ...
│
└── README.md


---

## ⚙️ Cara Menjalankan Project

### Menjalankan Backend

### bash
cd backend
npm install
npm run start:dev

### Menjalankan Frontend
cd frontend
npm install
npm run dev




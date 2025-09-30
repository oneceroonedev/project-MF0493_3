# 🏦 MyItems – Backend + Frontend

This project is a **fullstack** application (Spring Boot + React) for managing users, bank accounts, and basic operations. It also includes the creation and management of products (items).

Includes:

* **Backend** developed in Java using Spring Boot.
* **Frontend** written in React with Vite.
* Connection and status check through `HealthCheck`.
* Item management with full CRUD (create, list, view, update, delete).

---

## 🚀 Requirements

* **Java 17**
* **Maven**
* **Node.js** (with `npm`)
* **Visual Studio Code**
* **Postman**

---

## ⚙️ Environment Variables

### Backend (`application.properties` or environment variables)

```properties
# Default port
server.port=8080
```

### Frontend (`.env` or `.env.example`)


```env
VITE_API_URL=http://localhost:8080
```

---

## ▶️ Local Start

### 1. Backend

```bash
cd backend
mvn spring-boot:run
```
The backend will be running at:

http://localhost:8080

If the last command fails with an error, apply this first:

```bash
export PATH=/ruta/a/apache-maven-3.x/bin:$PATH
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running at:

http://localhost:5173

---

## 🔍 Endpoints API

### Health Check

* `GET /api/health` → Verifies that the backend is running.

### Items (ejemplo CRUD)

#### C (Crear)

* `POST /api/items` → Create item.


#### R (Read)
* `GET /api/items` → List items.
* `GET /api/items?page=0&pageSize=10` → Paginated list of items with page size
* `GET /api/items/{id}` → Get item by ID.
* `GET /api/items?search=loan&page=0&pageSize=10` → Search and pagination combined.

#### U (Update)
* `PUT /api/items/{id}` → Update item.

#### D (Delete)
* `DELETE /api/items/{id}` → Delete item.


## 🖥️ Frontend Routes

* `/` → Redirects to `/items`.
* `/items` → Items list.
* `/items/new` → Creation form.
* `/items/{id}` → Item details.
* `/items/{id}/edit` → Edit an item.

## ⛰ Header

Includes a "Test Connection" button to verify if the backend is available.


## 🖥 Capturas de pantalla

### Test Connection
![](/frontend/src/assets/test-connection.png)

### Items list
![](/frontend/src/assets/list-items.png)
### Create item
![](/frontend/src/assets/create-item.png)
### View item
![](/frontend/src/assets/view-item.png)
### Edit/Update item
![](/frontend/src/assets/edit-item.png)
### Search item
![](/frontend/src/assets/search-item.png)
### Delete item
![](/frontend/src/assets/delete-item.png)
---

## 🔗 Extra Links

- [Postman Collection](https://oneceroonedev-6508060.postman.co/workspace/oneceroonedev's-Workspace~0cfb17d2-ec11-4ea9-8420-a960ba8e9eee/collection/47178195-901eaad3-a782-493b-9bdb-71cdaaccd6f0?action=share&creator=47178195)
# Brugergodkendelsessystem

Opgaven lyder på:
Implementér et system hvor serveren forhindrer SQL-injektioner i brugerforespørgsler via en browser. Der skal faktisk kunne foretages forespørgsler i flere forskellige felter, så der må mindst foreligge en lille testdatabase.

## Beskrivelse:
**Teknologier**
- Node.js, Express.js, SQLite, bcrypt.js, CORS, Vue.js

## API Endpoints
### Registrering

**POST** ```/api/registerUser```
```
{
  "email": "user@example.com",
  "password": "password"
}
```
### Login

**POST**  ```/api/login```
```
{
  "email": "user@example.com",
  "password": "password"
}
```

### Frontend (Vue.js)
- **Login.vue:** Håndterer brugerlogin
- **Register.vue:** Håndterer brugerregistrering

### Beskyttelse mod SQL-injektion

**Alle** databaseforespørgsler anvender **prepared statements**, hvilket forhindrer SQL-injektion ved at **adskille SQL-logik fra brugerinput**.
I server.js, bruges ```db.prepare()``` til at sikre, at brugerinput ikke indsættes direkte i SQL-kommandoer.

**Eksempel på sikker forespørgsel:**
```
const checkUserStmt = db.prepare("SELECT 1 FROM users WHERE email = ?");
const userExists = checkUserStmt.get(email);
```
Her sendes brugerens e-mail som en parameter i stedet for at blive indsat direkte i SQL-sætningen.

### Bemærk
Server kører på http://localhost:3000
- SQL-forespørgsler håndteres sikkert med prepared statements
- Adgangskoder hashes sikkert med bcrypt
- Svage adgangskoder blokeres via. Rockyou.js

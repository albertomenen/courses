# Project's name REST API
## Description

This is a the backend repository for the React application `app's name`.

---

## Instructions


Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

The Models using for this app are: 

- Courses: Every Course is related to a Instructor ID
- Instructors
- Payments
- Users


```

The technology used for the payment in this app is Stripe.

---


How the system works.

SiestaFunds is a company where everyone can update a course with a video or some information about a nice portfolio. 

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |

---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()


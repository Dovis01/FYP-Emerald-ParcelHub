# Emerald Parcel Hub System

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  And this system is made by Mr. Shijin Zhang from SETU (Ireland). This is my Final Year Project for Software System Practice.

## Deployed Link

You can access my deployed version, the website link is [`Emerald Parcel Hub`](https://fyp-emerald-parcel-hub-deployed.vercel.app/auth/signIn) Thanks!👍

## Some config before running

1. You need to add your Google Map API Key in this file (`fyp-next-code/.env`). For the “.env” file, you must neet to create.

```tex
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<<Your Google Map API Key>>
```

2. You need to create “.env” file in the Root Path. Out of the folders (`fyp-next-code`, `fyp-springboot-code`). Like this:

```tex
ENVIRONMENT=development
SECRET_KEY=ILoveChenRui
PASS_SALT=Dovis
DEFAULT_PASS=zsj123456
GOOGLE_MAPS_API_KEY=<<Your Google Map API Key>>
AWS_ACCESS_KEY_ID=<<Your IAM Account AWS ACCESS KEY ID>>
AWS_SECRET_ACCESS_KEY=<<Your IAM Account AWS SECRET ACCESS KEY>>
AWS_REGION=<<Your IAM Account AWS REGION>>
```

3. You also need to add your MySQL username and password in the file: 

   [`fyp-springboot-code/src/main/resources/application.yml`](https://github.com/Dovis01/FYP-Emerald-ParcelHub/blob/main/fyp-springboot-code/src/main/resources/application.yml)

```
......

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/setu_fyp?serverTimezone=GMT%2b8
    username: <<Your MySQL username>>
    password: <<Your MySQL password>>
  devtools:
    restart:
      additional-paths: src/main
      exclude: "static/**,public/**"
      polling-interval: 1000
  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB
      
.......      
```

## Getting Started

1. **First**, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

2. **Secondly**, run the backend system from `fyp-springboot-code` folder. Open the path 

[`src/main/java/com/example/fypspringbootcode/FypSpringbootCodeApplication`](https://github.com/Dovis01/FYP-Emerald-ParcelHub/blob/main/fyp-springboot-code/src/main/java/com/example/fypspringbootcode/FypSpringbootCodeApplication.java) 

and running the java class(FypSpringbootCodeApplication) to start the backend server.

## Attention Points

This is project is based on the E-commerce simulation data to run for other roles. And I have design the two types simulation json file (`Real time` and `Past Time`). You check it [`E-commerce-Json-data.json`](https://github.com/Dovis01/FYP-Emerald-ParcelHub/blob/main/fyp-next-code/src/dataSimulation/E-commerce-Json-data.json) and [`E-commerce-past-Json-data.json`](https://github.com/Dovis01/FYP-Emerald-ParcelHub/blob/main/fyp-next-code/src/dataSimulation/E-commerce-past-Json-data.json). Firstly, you must log in the system by Admin role to upload these simulation data files.

# Existing Accounts for All Roles

## Admin Login
Basically, all the test user account's password is `Zsj123456.`

+ username: adminRoot

+ password: zsj123456

## Station Manager Login

- username: Liacac
- email: Liacacadh@163.com
- password: Zsj123456.

## Courier Login

Work Type: Collect Parcels

- username: IsabellaSScott
- email: IsabellaSScott@gmail.com
- password: Zsj123456.

Work Type: Deliver Parcels

- username: HannLLewis
- email: Hann665lewis@gmail.com
- password: Zsj123456.

## Customer Login

- username: JohnLDoe44
- email: johndoe223344@gmail.com
- password: Zsj123456.

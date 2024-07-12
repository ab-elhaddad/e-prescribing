# E-Prescribing

[![License](https://img.shields.io/badge/license-MIT-red.svg)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black.svg)](https://e-prescribing.vercel.app/home)

E-Prescribing is a web application that allows doctors to create and send prescriptions to patients. Patients can view their prescriptions and the instructions for each prescription. Assistants can scan prescriptions and upload them to the system. The application is built using [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Typescript](https://www.typescriptlang.org), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com), and [Nanonets OCR API](https://nanonets.com/). The application is deployed on [Vercel](https://vercel.com/) and can be accessed [here](https://e-prescribing.vercel.app/home).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Doctors**
  - Create prescriptions
  - Send prescriptions to patients
  - Create and manage patients
  - Add an existing patient to a prescription
  - View patients
  - Create and manage assistants
  - Add an existing assistant to their staff
  - View assistants
  - Create and manage drugs
  - View drugs
  - View pending prescriptions for assistants
  - Update and approve prescriptions for assistants
  - View profile
  - Update profile
  - Change password
  - Logout

- **Patients**
  - View prescriptions
  - View instructions for each prescription
  - View associated doctors
  - View profile
  - Update profile
  - Change password
  - Logout

- **Assistants**
  - Upload prescriptions
  - Scan prescriptions using OCR
  - View pending prescriptions
  - View profile
  - Update profile
  - Change password
  - Logout

## Technologies

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com)
- [Nanonets OCR API](https://nanonets.com/)
- [Vercel](https://vercel.com/)

## Screenshots

### Home Page

![Home Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/9ceac64a-68dd-4770-82a5-77c110b90794)

### About Page

![About Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/6dc16dad-402b-4b1f-840c-cdea06a96b17)

### Login Page

![Login Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/2984dd27-a4be-48b5-b93e-14c10e3e8181)

### Signup Page

![Register Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/6886f0c8-f566-45d4-a32f-10bf343a4fb4)

### Profile Page

![Profile Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/7eba5466-fd65-472e-a260-7661572b84e9)

### Doctor Dashboard

![Doctor Dashboard](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/95dbf0e3-4afc-4b64-9d84-c1aa6f199e55)

### Create Prescription Page

![Create Prescription Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/17d85139-18c4-4fc0-b848-307097399f0c)

### Patient Dashboard

![Patient Dashboard](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/d62c380a-998d-4a5b-b766-c65a16398082)

### View Prescription Page

![View Prescription Page](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/61accdd7-b49b-42b3-a7c7-2c91ce258b93)

### Assistant Dashboard

![Assistant Dashboard](https://github.com/ab-elhaddad/e-prescribing/assets/113056556/fe35e730-ae8d-4d26-9fa1-9b6975c7bb46)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/) ([steps](#creating-a-mongodb-instance))
- [Nanonets OCR API](https://nanonets.com/) ([steps](#creating-an-account-on-nanonets))

#### Creating a MongoDB Instance

1. Visit MongoDB Atlas Website:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Sign Up / Log In:
   - Sign up for a new account or log in if you already have an account.

3. Create a New Project:
   - Once logged in, click on "New Project".
   - Enter a project name and click "Create Project".

4. Create a New Cluster:
   - In the project dashboard, click on "Build a Cluster".
   - Choose a cluster tier (the free tier is suitable for testing and development).
   - Select your cloud provider and region.
   - Click "Create Cluster".

5. Configure Cluster:
   - Wait for the cluster to be created (this may take a few minutes).

6. Add a Database User:
   - Once the cluster is ready, click on "Database Access" in the left-hand menu.
   - Click on "Add New Database User".
   - Enter a username and password. Save these credentials, as you will need them later.
   - Assign the user the role of "Read and write to any database".

7. Whitelist IP Address:
   - Click on "Network Access" in the left-hand menu.
   - Click on "Add IP Address".
   - Add your current IP address or use `0.0.0.0/0` to allow access from anywhere (not recommended for production).

8. Get Connection String:
   - Go back to the cluster view by clicking on "Clusters" in the left-hand menu.
   - Click on "Connect" for your cluster.
   - Choose "Connect your application".
   - Copy the connection string. It will look something like this:

    ```bash
      mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    ```

#### Creating an Account on Nanonets

1. Visit the Nanonets Website:
    - Go to Nanonets.

2. Sign Up:
    - Click on the "Sign Up" button.
    - You can sign up using your Google account or provide an email and password to create an account.

#### Creating an OCR Workflow

1. Login to Your Account:
    - After creating your account, log in to the Nanonets dashboard.
  
2. Create a New Model:
    - On the dashboard, click on the "New Model" button.
    - Select "OCR" from the available model types.
    - Name your model and click on "Create".

3. Upload Training Data:
    - Click on the newly created OCR model.
    - You will be prompted to upload images or documents for training your model. Upload a few samples to start.
    - Nanonets will automatically start training your model once you have uploaded enough data.
  
4. Train Your Model:
    - After uploading the training data, click on "Train Model". The training process may take some time, depending on the amount of data and complexity.

#### Getting the Model Key and API Key

1. Obtain the Model Key:
    - Once your model is trained, go to the model details page.
    - You will find the "Model Key" on this page. Copy this key, as you will need it to use the model.

2. Obtain the API Key:
    - Go to the Nanonets dashboard.
    - Click on your profile icon in the top-right corner.
    - Select "API Keys" from the dropdown menu.
    - You will see your API key listed here. If there is no API key, you can generate a new one. Copy this key.

### Installation

1. Clone the repository

```bash
git clone https://github.com/ab-elhaddad/e-prescribing
```

2. Install dependencies

```bash
cd e-prescribing
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables

```bash
# Database
MONGODB_URI=your_mongodb_uri
MONGODB_DB=your_mongodb_db
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password

# Nanonets OCR API
OCR_API_KEY=your_ocr_api_key
OCR_API=https://app.nanonets.com/api/v2/OCR/Model/{{OCR_MODEL_ID}}/LabelFile/
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any ideas on how to improve this project.

## License

This project is open source and available under the [MIT License](LICENSE).

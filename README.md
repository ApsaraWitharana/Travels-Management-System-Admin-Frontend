# Tour Management System Admin Panel

<a href="https://git.io/typing-svg">     
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=50&pause=1000&center=true&vCenter=true&color=FFA500&width=1000&height=70&lines=TRAVEL+MANAGEMENT+ADMIN+PANEL" alt="Orange Themed Admin Panel" />
</a>

## 🌍 About the Project

This is the admin panel for the Tour Management System, built using React, Tailwind CSS, and Axios. It provides functionalities for adding, updating, deleting, and retrieving tour-related data.

## Features
- Add new tours
- Update existing tours
- Delete tours
- Retrieve all tours

## Technology Stack
- **Frontend**: React, Tailwind CSS, Axios
- **Build Tool**: Vite
- **Linting**: ESLint
- **Type Checking**: TypeScript

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (latest stable version)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   https://github.com/ApsaraWitharana/Travels-Management-System-Admin-Frontend.git
   ```
2. Backend repository:
   ```sh
   https://github.com/ApsaraWitharana/Travels-Management-System-Backend.git
   ```   
4. Navigate to the project directory:
   ```sh
   cd tour-management-system-admin
   ```
5. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project
To start the development server, run:
```sh
npm run dev
```
This will start the project on a local server and provide a development environment.

### Building the Project
To create a production build, run:
```sh
npm run build
```

### Linting the Code
To check for linting issues, run:
```sh
npm run lint
```

### Preview the Build
To preview the production build, run:
```sh
npm run preview
```

## Project Structure
```
/tour-management-system-admin
│── src
│   ├── components  # Reusable components
│   ├── pages       # Application pages
│   ├── services    # API calls with Axios
│   ├── styles      # Tailwind configurations
│   ├── App.tsx     # Main App component
│   ├── main.tsx    # React entry point
│── public          # Static assets
│── package.json    # Project dependencies
│── tailwind.config.js  # Tailwind configuration
│── tsconfig.json   # TypeScript configuration
│── vite.config.js  # Vite configuration
```

## API Integration
This project uses Axios for handling API requests. Below is an example of how an API request is made:
```tsx
import axios from 'axios';

const fetchTours = async () => {
  try {
    const response = await axios.get('/api/tours');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching tours:', error);
  }
};
```

## Screenshots 

### Dashboard
![WhatsApp Image 2025-02-18 at 16 21 39_689a2d89](https://github.com/user-attachments/assets/a7501bb1-a92d-4c44-8121-e3eea270f658)

![WhatsApp Image 2025-02-18 at 16 22 11_eb98e94d](https://github.com/user-attachments/assets/c76670dd-d931-44aa-8ad0-a0a7b4c833e4)


## Acknowledgments
- **React**: For building the UI
- **Tailwind CSS**: For styling
- **Axios**: For API requests
- **Vite**: For fast build and development


## 💜License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For inquiries or collaboration:
- **Author:** [Sachini Apsara](https://github.com/ApsaraWitharana)
  
<div align="center">
    © 2025 All Rights Reserved, Designed By Sachini Apsara
</div>


⭐ **Feel free to contribute, star the repo, and explore more!**

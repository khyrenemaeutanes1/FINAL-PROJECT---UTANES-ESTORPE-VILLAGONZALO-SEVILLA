import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

function FirebaseConfig(){
    const firebaseConfig = {
        apiKey: "AIzaSyCi8-hViyiA6iFdvxeZt2iIDAIPu5sGZ3k",
        authDomain: "final-project-7e83a.firebaseapp.com",
        projectId: "final-project-7e83a",
        storageBucket: "final-project-7e83a.appspot.com",
        messagingSenderId: "369058458569",
        appId: "1:369058458569:web:f89caf81746445f9171618"
      };
      
      
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);

}

export default FirebaseConfig;
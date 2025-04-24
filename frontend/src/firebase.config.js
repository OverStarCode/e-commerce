

import { initializeApp ,getApps} from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_apiKey,
        authDomain: process.env.NEXT_PUBLIC_authDomain,
        projectId: process.env.NEXT_PUBLIC_projectId,
        storageBucket: process.env.NEXT_PUBLIC_storageBucket,
        messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
        appId: process.env.NEXT_PUBLIC_appId,
        measurementId: process.env.NEXT_PUBLIC_measurementId  
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, auth };

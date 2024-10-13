import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSK75CBgecge25CnvxE28bd_TJuv4XTtc",
  authDomain: "signin-2f153.firebaseapp.com",
  databaseURL: "https://signin-2f153-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signin-2f153",
  storageBucket: "signin-2f153.appspot.com",
  messagingSenderId: "319342754495",
  appId: "1:319342754495:web:7e2655cc045345dd82a40a",
  measurementId: "G-QJ2FQV4JRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserFName').innerText = userData.firstName;
          document.getElementById('loggedUserEmail').innerText = userData.email;
          document.getElementById('loggedUserLName').innerText = userData.lastName;
        } else {
          console.log("no document found matching id");
        }
      })
      .catch((error) => {
        console.log("Error getting document");
      });
  } else {
    console.log("User Id not Found in Local storage");
  }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error Signing out:', error);
    });
});

// Download files from Firebase Storage
const downloadFile1Button = document.getElementById('downloadFile1');
const downloadFile2Button = document.getElementById('downloadFile2');

downloadFile1Button.addEventListener('click', () => {
  const fileRef = ref(storage, 'study/Rainfall Prediction with A final.pdf');  // Adjust the path according to your Firebase Storage structure
  getDownloadURL(fileRef)
    .then((url) => {
      window.open(url, '_blank');
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
});

downloadFile2Button.addEventListener('click', () => {
  const fileRef = ref(storage, 'study/carsales.pdf');  // Adjust the path according to your Firebase Storage structure
  getDownloadURL(fileRef)
    .then((url) => {
      window.open(url, '_blank');
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
});

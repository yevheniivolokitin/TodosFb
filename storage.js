import { initializeApp } from "firebase/app";
import {
   getFirestore,
   collection,
   doc,
   setDoc,
   getDocs,
   writeBatch,
   updateDoc,
   serverTimestamp,
   query,
   orderBy,
} from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyB7mgpoBKAP_nRx2W_O-xehtrsl5x-nEBo",
   authDomain: "todos-607b3.firebaseapp.com",
   projectId: "todos-607b3",
   storageBucket: "todos-607b3.appspot.com",
   messagingSenderId: "959099835479",
   appId: "1:959099835479:web:058f5dfd44aa12c5683f12",
   measurementId: "G-7JE92JSDDF",
};

export function createStorage(key) {
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   return {
      key,
      db,
      pull: async function () {
         const ref = collection(this.db, this.key);
         const q = query(ref, orderBy("createdAt"));
         const querySnapshot = await getDocs(q);
         const todos = [];
         querySnapshot.forEach((doc) => {
            todos.push({
               id: doc.id,
               title: doc.data().title,
               done: doc.data().done,
            });
         });
         return todos;
      },
      push: async function (todo) {
         try {
            await setDoc(doc(this.db, this.key, todo.id), {
               title: todo.title,
               done: todo.done,
               createdAt: serverTimestamp(),
            });
            console.log("Document written with ID: ", todo.id);
         } catch (e) {
            console.error("Error adding document: ", e);
         }
      },
      delete: async function ({ todosIds }) {
         const batch = writeBatch(this.db);

         todosIds.forEach((id) => {
            const ref = doc(this.db, this.key, id);
            batch.delete(ref);
         });

         await batch.commit();
      },
      update: async function (todo) {
         const ref = doc(this.db, this.key, todo.id);

         await updateDoc(ref, {
            done: todo.done,
         });
      },
   };
}

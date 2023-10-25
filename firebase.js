async function addData() {
   try {
      const docRef = await addDoc(collection(db, "Todos"), {
         title: "Todo 3",
         status: "active",
      });
      console.log("Document written with ID: ", docRef.id);
   } catch (e) {
      console.error("Error adding document: ", e);
   }
}
async function readData() {
   const querySnapshot = await getDocs(collection(db, "Todos"));
   querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().title}`);
   });
}
addData();
readData();

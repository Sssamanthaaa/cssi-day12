let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    const dbRef = firebase.database().ref('users/${userId}');
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
});
};

const renderData = (data)=>{
    const destination = document.querySelector('#app');
    destination.innerHTML="";
    for (let key in data){
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
};

// const createCard = (note) => {
//     return '<div class="column is-one-quarter">
//                 <div class= "card">
//                     <header class="card-header">
//                         <p class="card-header-title">
//                             ${note.title}
//                         </p>
//                     </header>
//                     <div class="card-content">
//                         <div class="content">
//                         ${note.text} 
//                         <div/>
//                     <div/>
//                 <div/>
//          <div/>';
// };
const createCard = (note) => {
  let innerHTML = "";
  innerHTML += `<div class="column is-one-quarter">`
  innerHTML += `<div class="card">`
  innerHTML += `<header class="card-header">`
  innerHTML += `<p class="card-header-title">`
  innerHTML += `${note.title}`
  innerHTML += `</p>`
  innerHTML += `</header>`
  innerHTML += `<div class="card-content">`
  innerHTML += `<div class="content">`
  innerHTML += `${note.text}`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML += `</div>`
  innerHTML += `</div>`
  return innerHTML;
};
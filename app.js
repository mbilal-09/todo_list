import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  set,
  child,
  get,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

//Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGes9_V8DQUwcHu7gVE0VAO9geVerIlhg",
  authDomain: "todolist-9e451.firebaseapp.com",
  databaseURL: "https://todolist-9e451-default-rtdb.firebaseio.com",
  projectId: "todolist-9e451",
  storageBucket: "todolist-9e451.appspot.com",
  messagingSenderId: "145156251254",
  appId: "1:145156251254:web:668a3d2d207b73648f0957",
  measurementId: "G-G3F9KZR9DL",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const db = getDatabase();
let uid;
// SignIn SignUp
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const registerBtn = document.querySelector("#register-btn");
const signInBtn = document.querySelector("#signIn-btn");
const logoutBtn = document.getElementById('logout');
// TodoApp
const btn = document.querySelector("#submit");
const name = document.getElementById("name");
const nametext = document.getElementById("nametext");
const msg = document.querySelector(".msg");
const listall = document.querySelector("#listall");
const listP = document.querySelector("#list-p");
const listC = document.querySelector("#list-c");
const closeBtn = document.querySelector(".close");
const clearBtn = document.querySelector(".button");
const todos = document.getElementsByTagName("li");
const textarea = document.querySelector("textarea");
const upperBtn = document.querySelector(".upperBtn");
const lowerBtn = document.querySelector(".lowerBtn");
const text = document.querySelector(".text");
const textc = document.querySelector(".textc");
const textp = document.querySelector(".textp");
const borderBox = document.querySelector(".border-bot");
const listContainer = document.querySelector(".list-container");
const body = document.querySelector("body");
const allBtn = document.querySelector(".all");
const pendingBtn = document.querySelector(".pending");
const completedBtn = document.querySelector(".completed");
const formsTextandName = document.querySelector(".form");
const alertbox = document.querySelector(".alertbox");
const okay = document.querySelector(".okay");
const cancel = document.querySelector(".cancel");

// signIn signUp

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    document.getElementById("loader-contianer").style.display = "none";
    document.querySelector(".container").style.display = "none";
    document.querySelector("#todo-list-container").style.display = "block";
    logoutBtn.style.display = 'block';
    gettingData();
  } else {
    document.querySelector(".container").style.display = "block";
    document.querySelector("#todo-list-container").style.display = "none";
    logoutBtn.style.display = 'none';
  }
});

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function register() {
  let email = document.getElementById("register-email").value;
  let password = document.getElementById("register-password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      document.querySelector(".container").style.display = "none";
      document.querySelector("#todo-list-container").style.display = "block";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.querySelector(".container").style.display = "block";
      document.querySelector("#todo-list-container").style.display = "none";
    });
}
registerBtn.addEventListener("click", register);

function logIn() {
  let email = document.getElementById("signIn-email").value;
  let password = document.getElementById("signIn-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      document.querySelector(".container").style.display = "none";
      document.querySelector("#todo-list-container").style.display = "block";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.querySelector(".container").style.display = "block";
      document.querySelector("#todo-list-container").style.display = "none";
    });
}
signInBtn.addEventListener("click", logIn);

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      }).catch((error) => {
      });
})

// TodoApp

closeBtn.addEventListener("click", (a) => {
  msg.style.display = "none";
});

//nav link
okay.addEventListener("click", () => {
  allBTN();
});

allBtn.addEventListener("click", () => {
  allBTN();
});

function allBTN() {
  listall.classList.add("dpflex");
  listP.classList.remove("dpflex");
  listP.classList.add("dpnone");
  listC.classList.remove("dpflex");
  listC.classList.add("dpnone");

  pendingBtn.classList.remove("active");
  allBtn.classList.add("active");
  completedBtn.classList.remove("active");
  borderBox.style.top = "5%";
  borderBox.style.width = "45%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

pendingBtn.addEventListener("click", () => {
  listall.classList.remove("dpflex");
  listall.classList.add("dpnone");
  listP.classList.add("dpflex");
  listP.classList.remove("dpnone");
  listC.classList.remove("dpflex");
  listC.classList.add("dpnone");

  pendingBtn.classList.add("active");
  allBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  borderBox.style.top = "24%";
  borderBox.style.width = "63%";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

completedBtn.addEventListener("click", () => {
  listall.classList.remove("dpflex");
  listall.classList.add("dpnone");
  listP.classList.remove("dpflex");
  listP.classList.add("dpnone");
  listC.classList.add("dpflex");
  listC.classList.remove("dpnone");

  pendingBtn.classList.remove("active");
  allBtn.classList.remove("active");
  completedBtn.classList.add("active");
  borderBox.style.top = "43%";
  borderBox.style.width = "79%";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

btn.addEventListener("click", allBTN);
name.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onclick = allBTN();
  }
});

function textFlexing() {
  const allitems = document.querySelectorAll("#listall li");
  const penditems = document.querySelectorAll("#list-p li");
  const compitems = document.querySelectorAll("#list-c li");

  if (allitems.length <= 0) {
    text.style.display = "flex";
  } else {
    text.style.display = "none";
  }

  if (penditems.length <= 0) {
    textp.style.display = "flex";
  } else {
    textp.style.display = "none";
  }

  if (compitems.length <= 0) {
    textc.style.display = "flex";
  } else {
    textc.style.display = "none";
  }
}
textFlexing();

function index(title, description, status, key) {
  function indexS() {
    let ispushData = false;
    if (title || description) {
      nametext.value = title;
      valeu = description;
    } else {
      ispushData = true;
    }
    msg.style.display = "none";
    const li = document.createElement("li");
    const lia = document.createElement("li");

    const editInputname = document.createElement("input");
    const editInputdesc = document.createElement("textarea");
    editInputdesc.classList = "editTextarea";
    editInputdesc.placeholder = "Description";
    editInputname.type = "text";
    editInputname.placeholder = "New note title";
    editInputname.classList = "editInputname";
    editInputname.maxLength = "20";

    const editInputnamea = document.createElement("input");
    const editInputdesca = document.createElement("textarea");
    editInputdesca.classList = "editTextarea";
    editInputdesca.placeholder = "Description";
    editInputnamea.type = "text";
    editInputnamea.placeholder = "New note title";
    editInputnamea.classList = "editInputname";
    editInputnamea.maxLength = "20";

    const div = document.createElement("div");
    const diva = document.createElement("div");
    div.className = "edit-container";
    diva.className = "edit-container";
    div.innerHTML = `<div class='color'>
        <div class='default'></div>
        <div class='red'></div>
        <div class='tomato'></div>
        <div class='green'></div>
        </div>
        <div id="${key}_check" class='read'>
        <i class='fa-regular fa-circle-check'></i>
        </div>
        <div class='dropbtn-c'>
        <i style='font-size:22px' class='fa-solid fa-ellipsis'></i>
        <div class='dropbtn'>
        <a class='save' id="${key}_edit">Save</a>
        <a class='edit'>Edit</a>
        <a class='remove' id="${key}_del">Delete</a>
        </div>
        </div>`;
    diva.innerHTML = `<div class='colora'>
    <div class='defaulta'></div><div class='reda'></div>
    <div class='tomatoa'></div><div class='greena'></div>
    </div>
    <div class='reada'>
    <i class='fa-regular fa-circle-check'></i>
    </div>
    <div class='dropbtn-c'>
    <i style='font-size:22px' class='fa-solid fa-ellipsis'></i>
    <div class='dropbtn'>
    <a class='savea'>Save</a>
    <a class='edita'>Edit</a>
    <a class='removea'>Delete</a>
    </div></div>`;

    const namevalue = `<div class="nametext">${nametext.value}</div>`;
    const litext = `<div class="litext">${valeu}</div>`;

    li.className = "activex";
    lia.className = "activex";
    li.appendChild(div);
    li.appendChild(editInputname);
    li.appendChild(editInputdesc);
    lia.appendChild(diva);
    lia.appendChild(editInputnamea);
    lia.appendChild(editInputdesca);
    li.insertAdjacentHTML(
      "afterbegin",
      `<div class="nametext">${nametext.value}</div>`,
    );
    li.insertAdjacentHTML("beforeend", `<div class="litext">${valeu}</div>`);

    lia.insertAdjacentHTML(
      "afterbegin",
      `<div class="nametext">${nametext.value}</div>`,
    );
    lia.insertAdjacentHTML("beforeend", `<div class="litext">${valeu}</div>`);

    listall.prepend(li);
    listP.prepend(lia);

    name.value = "";
    nametext.value = "";

    editInputnamea.style.display = "none";
    editInputname.style.display = "none";
    editInputdesca.style.display = "none";
    editInputdesc.style.display = "none";

    const saveBtn = document.querySelector(".save");
    const editBtn = document.querySelector(".edit");
    const saveaBtn = document.querySelector(".savea");
    const editaBtn = document.querySelector(".edita");
    saveBtn.style.display = "none";
    saveaBtn.style.display = "none";

    const namestext = document.querySelector("#listall .nametext");
    const desctext = document.querySelector("#listall .litext");
    const namestexta = document.querySelector("#list-p .nametext");
    const desctexta = document.querySelector("#list-p .litext");
    const redColor = document.querySelector(".red");
    const greenColor = document.querySelector(".green");
    const tomatoColor = document.querySelector(".tomato");
    const defaultColor = document.querySelector(".default");
    const redColora = document.querySelector(".reda");
    const greenColora = document.querySelector(".greena");
    const tomatoColora = document.querySelector(".tomatoa");
    const defaultColora = document.querySelector(".defaulta");
    defaultColor.addEventListener("click", () => {
      li.style.borderColor = "#ffffff40";
      lia.style.borderColor = "#ffffff40";
      redColor.style.border = "2px solid transparent";
      greenColor.style.border = "2px solid transparent";
      tomatoColor.style.border = "2px solid transparent";
    });
    redColor.addEventListener("click", () => {
      console.log("sdfsdf");
      li.style.borderColor = window.getComputedStyle(redColor).backgroundColor;
      lia.style.borderColor = window.getComputedStyle(redColor).backgroundColor;
      redColor.style.border = "2px solid skyblue";
      greenColor.style.border = "2px solid transparent";
      tomatoColor.style.border = "2px solid transparent";
    });
    greenColor.addEventListener("click", () => {
      li.style.borderColor =
        window.getComputedStyle(greenColor).backgroundColor;
      lia.style.borderColor =
        window.getComputedStyle(greenColor).backgroundColor;
      greenColor.style.border = "2px solid skyblue";
      redColor.style.border = "2px solid transparent";
      tomatoColor.style.border = "2px solid transparent";
    });
    tomatoColor.addEventListener("click", () => {
      li.style.borderColor =
        window.getComputedStyle(tomatoColor).backgroundColor;
      lia.style.borderColor =
        window.getComputedStyle(tomatoColor).backgroundColor;
      tomatoColor.style.border = "2px solid skyblue";
      redColor.style.border = "2px solid transparent";
      greenColor.style.border = "2px solid transparent";
    });
    defaultColora.addEventListener("click", () => {
      li.style.borderColor = "#ffffff40";
      lia.style.borderColor = "#ffffff40";
      redColor.style.border = "2px solid transparent";
      greenColor.style.border = "2px solid transparent";
      tomatoColor.style.border = "2px solid transparent";
    });
    redColora.addEventListener("click", () => {
      li.style.borderColor = window.getComputedStyle(redColor).backgroundColor;
      lia.style.borderColor = window.getComputedStyle(redColor).backgroundColor;
      redColor.style.border = "2px solid skyblue";
      greenColor.style.border = "2px solid transparent";
      tomatoColor.style.border = "2px solid transparent";
    });
    greenColora.addEventListener("click", () => {
      li.style.borderColor =
        window.getComputedStyle(greenColor).backgroundColor;
      lia.style.borderColor =
        window.getComputedStyle(greenColor).backgroundColor;
      greenColor.style.border = "2px solid skyblue";
      redColor.style.border = "2px solid transparent";
      tomatoColor.style.border = "2px solid transparent";
    });
    tomatoColora.addEventListener("click", () => {
      li.style.borderColor =
        window.getComputedStyle(tomatoColor).backgroundColor;
      lia.style.borderColor =
        window.getComputedStyle(tomatoColor).backgroundColor;
      tomatoColor.style.border = "2px solid skyblue";
      redColor.style.border = "2px solid transparent";
      greenColor.style.border = "2px solid transparent";
    });

    editBtn.addEventListener("click", () => {
      editInputname.value = namestext.textContent;
      editInputdesc.value = desctext.textContent;
      editInputnamea.value = namestext.textContent;
      editInputdesca.value = desctext.textContent;

      editInputname.style.display = "block";
      editInputdesc.style.display = "block";
      editInputnamea.style.display = "block";
      editInputdesca.style.display = "block";
      editBtn.style.display = "none";
      editaBtn.style.display = "none";
      saveBtn.style.display = "block";
      saveaBtn.style.display = "block";
      setTimeout(anim, 1000);
      function anim() {
        editInputname.style.left = "0px";
        editInputdesc.style.left = "0px";
        editInputnamea.style.left = "0px";
        editInputdesca.style.left = "0px";
        editInputdesc.style.opacity = "1";
        editInputname.style.opacity = "1";
        editInputdesca.style.opacity = "1";
        editInputnamea.style.opacity = "1";
      }
      read.style.transform = "scale(0)";
      reada.style.transform = "scale(0)";
      editInputdesc.focus();
    });

    function saveing(btn) {
      namestext.textContent = editInputname.value;
      desctext.textContent = editInputdesc.value;
      namestexta.textContent = editInputname.value;
      desctexta.textContent = editInputdesc.value;
      if (
        editInputname.value.trim().length === 0 &&
        editInputdesc.value.trim().length === 0
      ) {
        lia.classList.add("activexs");
        li.classList.add("activexs");
        setTimeout(removes, 200);
        function removes() {
          li.remove(valeu);
          lia.remove(valeu);
          textFlexing();
        }
      } else {
        let id = btn.target.id
        id = id.slice(0, id.length - 5)
        let editRef = ref(db, `list/${uid}/${id}`);
        update(editRef, {title: namestext.textContent, description: desctext.textContent})
      }

      editInputname.style.left = "-300px";
      editInputdesc.style.left = "-350px";
      setTimeout(anim, 300);
      function anim() {
        editInputname.style.display = "none";
        editInputdesc.style.display = "none";
        editInputnamea.style.display = "none";
        editInputdesca.style.display = "none";
        editBtn.style.display = "block";
        saveBtn.style.display = "none";
        editaBtn.style.display = "block";
        saveaBtn.style.display = "none";
        read.style.transform = "scale(1)";
        reada.style.transform = "scale(1)";
      }
    }

    saveBtn.addEventListener("click", (btn) => {
      saveing(btn);
    });

    editaBtn.addEventListener("click", () => {
      editInputnamea.value = namestext.textContent;
      editInputdesca.value = desctext.textContent;
      editInputname.value = namestexta.textContent;
      editInputdesc.value = desctexta.textContent;

      editInputname.style.display = "block";
      editInputdesc.style.display = "block";
      editInputnamea.style.display = "block";
      editInputdesca.style.display = "block";
      editBtn.style.display = "none";
      saveBtn.style.display = "block";
      editaBtn.style.display = "none";
      saveaBtn.style.display = "block";
      setTimeout(anim, 1000);
      function anim() {
        editInputnamea.style.left = "0px";
        editInputdesca.style.left = "0px";
        editInputname.style.left = "0px";
        editInputdesc.style.left = "0px";
        editInputdesca.style.opacity = "1";
        editInputnamea.style.opacity = "1";
        editInputdesc.style.opacity = "1";
        editInputname.style.opacity = "1";
      }
      read.style.transform = "scale(0)";
      reada.style.transform = "scale(0)";
      editInputdesca.focus();
    });

    function saveaing() {
      namestext.textContent = editInputnamea.value;
      desctext.textContent = editInputdesca.value;

      namestexta.textContent = editInputnamea.value;
      desctexta.textContent = editInputdesca.value;
      if (
        editInputnamea.value.trim().length === 0 &&
        editInputdesca.value.trim().length === 0
      ) {
        lia.classList.add("activexs");
        li.classList.add("activexs");
        setTimeout(removes, 200);
        function removes() {
          li.remove(valeu);
          lia.remove(valeu);
          textFlexing();
        }
      } else {
        let id = btn.target.id
        id = id.slice(0, id.length - 5)
        let editRef = ref(db, `list/${uid}/${id}`);
        update(editRef, {title: namestext.textContent, description: desctext.textContent})
      };

      editInputnamea.style.left = "-300px";
      editInputdesca.style.left = "-350px";
      editInputname.style.left = "-300px";
      editInputdesc.style.left = "-350px";
      setTimeout(anim, 300);
      function anim() {
        editInputname.style.display = "none";
        editInputdesc.style.display = "none";
        editInputnamea.style.display = "none";
        editInputdesca.style.display = "none";
        editBtn.style.display = "block";
        saveBtn.style.display = "none";
        editaBtn.style.display = "block";
        saveaBtn.style.display = "none";
        read.style.transform = "scale(1)";
        reada.style.transform = "scale(1)";
      }
    }

    editaBtn.addEventListener("mousedown", () => {
      document.addEventListener("mousedown", (evt) => {
        let targetElement = evt.target;
        do {
          if (targetElement == li || targetElement == lia) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        saveaing();
      });
    });

    editBtn.addEventListener("mousedown", () => {
      document.addEventListener("mousedown", (evt) => {
        let targetElement = evt.target;
        do {
          if (targetElement == lia || targetElement == li) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        saveing();
      });
    });

    saveaBtn.addEventListener("click", () => {
      saveaing();
    });
  }

  var valeu = name.value;
  indexS();

  const removeBtn = document.querySelector(".remove");
  const removea = document.querySelector(".removea");

  const li = document.querySelector("li");
  const lia = document.querySelector("#list-p li");

  const read = document.querySelector(".read");
  const reada = document.querySelector(".reada");
  //edit

  if (status === "completed") {
    lia.classList.toggle("checked");
    li.classList.toggle("checked");
    listC.prepend(lia);
    read.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
    reada.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
  } else if (status === "pending"){
    listP.prepend(lia);
    read.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
    reada.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
  }

  read.addEventListener("click", (e) => {
    setTimeout(flexing, 200);
    function flexing() {
      textFlexing();
    }
    e.preventDefault();
    lia.classList.toggle("checked");
    li.classList.toggle("checked");
    setTimeout(pending, 100);
    function pending() {
      if (lia.className === "activex checked") {
        listC.prepend(lia);
        let id = read.id
        id = id.slice(0, id.length - 6)
        let dataRef = ref(db, `list/${uid}/${id}`);
        update(dataRef, {status: 'completed'})
        read.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
        reada.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
      } else {
        listP.prepend(lia);
        read.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
        reada.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
        let id = e.target.id
        id = id.slice(0, id.length - 6);
        let dataRef = ref(db, `list/${uid}/${id}`);
        update(dataRef, {status: 'pending'})
      }
    }
  });
  reada.addEventListener("click", (e) => {
    setTimeout(flexing, 200);
    function flexing() {
      textFlexing();
    }
    e.preventDefault();

    lia.classList.toggle("checked");
    li.classList.toggle("checked");

    setTimeout(pending, 100);
    function pending() {
      if (lia.className === "activex checked") {
        listC.prepend(lia);
        read.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
        reada.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
      } else {
        listP.prepend(lia);
        read.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
        reada.innerHTML = "<i class='fa-regular fa-circle-check'></i>";
      }
    }
  });
  //coming
  okay.addEventListener("click", () => {
    alertbox.style.display = "none";
    var valeu = name.value;
    lia.remove(valeu);
    li.remove(valeu);
    textFlexing();
    let clear_ref = ref(db, `list/${uid}`);
    remove(clear_ref)
  });
  cancel.addEventListener("click", () => {
    alertbox.style.display = "none";
  });
  clearBtn.addEventListener("click", () => {
    const alerko = document.querySelectorAll("#listall li");
    if (alerko.length > 0) {
      alertbox.style.display = "flex";
    }
  });
  //remover
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.id;
    id = id.slice(0, id.length - 4);
    const delRef = ref(db, `list/${uid}/${id}`);
    remove(delRef);
    lia.classList.add("activexs");
    li.classList.add("activexs");
    setTimeout(removes, 200);
    function removes() {
      li.remove(valeu);
      lia.remove(valeu);
      textFlexing();
    };
  });

  removea.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.id;
    id = id.slice(0, id.length - 4);
    const delRef = ref(db, `list/${uid}/${id}`);
    remove(delRef);
    lia.classList.add("activexs");
    setTimeout(removes, 200);
    function removes() {
      li.remove(valeu);
      lia.remove(valeu);
      textFlexing();
    }
  });
};

function settingData() {
  let title = document.getElementById("nametext").value;
  let description = document.getElementById("name").value;
  const postListRef = ref(db, `list/${uid}`);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    title,
    description,
    status: "pending",
  });
}

// setTimeout(() => {
//     get(child(dbRef, `list/${auth.currentUser.uid}`)).then((snapshot) => {
//         if (snapshot.exists()) {
//             let data = Object.values(snapshot.val())
//             let title, description;
//             data.forEach((e) => {
//                 title = e.title
//                 description = e.description
//                 index(title, description)
//                 textFlexing()
//                 allBTN()
//             })
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
// }, 1500);

// formsTextandName.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         e.preventDefault()
//         formkabul()
//     }
// })

function gettingData() {
  const dbRef = ref(db, `list/${uid}`);
  onValue(dbRef, (snapshot) => {
    if (snapshot.val()) {
        document.getElementById('listall').innerHTML = null;
        document.getElementById('list-p').innerHTML = null;
        document.getElementById('list-c').innerHTML = null;   
    }
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      index(childData.title, childData.description, childData.status, childKey);
      textFlexing();
      allBTN();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function formkabul() {
  if (nametext.value.trim().length === 0 && name.value.trim().length === 0) {
    msg.style.display = "flex";
    msg.classList.toggle("animation");
    name.value = "";
    nametext.value = "";
  } else {
    settingData();
  }
}

btn.addEventListener("click", () => {
  formkabul();
});

upperBtn.addEventListener("click", () => {
  var valeu = name.value;
  var valeus = nametext.value;
  name.value = valeu.toUpperCase();
  nametext.value = valeus.toUpperCase();
});

lowerBtn.addEventListener("click", () => {
  var valeu = name.value;
  var valeus = nametext.value;
  name.value = valeu.toLowerCase();
  nametext.value = valeus.toLowerCase();
});

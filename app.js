import { collection, addDoc, db, getDocs, doc, onSnapshot, serverTimestamp, query, orderBy, deleteDoc, updateDoc, getDoc, where } from "./firebase.js";

let addBtn = document.querySelector("#addBtn");

let todo = document.querySelector(".input");

let list = document.querySelector(".list");


let addTodo = async () => {
    if (todo.value !== "") {
        const docRef = await addDoc(collection(db, "Todos"), {
            todo: todo.value,
            checked: false,
            timeStamp: serverTimestamp(),
        });

        list.innerHTML += `<div class="row tval">
        <div class="col forcheck">
        <div class="ccheck text-center pb-4"><i class="fa-solid fa-check"></i></div> <p class="li p-1">${todo.value}</p>
        <button id="editBtn" class="btn btn-light">Edit</button>
        <button id="DeleteBtn" class="btn btn-danger">Delete</button>
        </div>
        </div>`;
    }
}

let clr = () => {
    todo.value = "";
}


addBtn.addEventListener("click", addTodo);
addBtn.addEventListener("click", clr);

let getData = async () => {

    const q = query(collection(db, "Todos"), orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        list.innerHTML = "";
        querySnapshot.forEach((doc) => {
            list.innerHTML += `<div class="row tval">
            <div class="col forcheck">
            <div id="${doc.id}" onclick="letCheck(this)" class="ccheck text-center pb-4"><i class="fa-solid fa-check"></i></div> <p class="li p-1">${doc.data().todo}</p>
            <button id="${doc.id}" onclick="edit(this)" class="btn btn-primary">Edit</button>
            <button id="${doc.id}" onclick="del(this)" class="btn btn-danger DeleteBtn">Delete</button>
            </div>
            </div>`;

        });
    });

    let d = document.querySelector("#DeleteBtn");

    let ed = document.querySelector("#editBtn");

    let del = async (e) => {
        let myId = e.getAttribute("id");

        await deleteDoc(doc(db, "Todos", myId));
    }

    let edit = (e) => {
        let myId = e.getAttribute("id");
        let name = e.previousSibling.previousSibling.parentNode;
        console.log(name);
        let pName = e.previousSibling.previousSibling.innerHTML;
        name.innerHTML = `<input id="upName" type="text" class="li p-1"> <button onclick="saveName()" class="btn btn-primary">Save</button> <button onclick="cancelName()" class="btn btn-danger">Cancel</button>`;
        let upName = document.querySelector("#upName");
        let saveName = async () => {
            if (upName.value !== "") {
                let ref = doc(db, "Todos", myId);
                await updateDoc(ref, {
                    todo: upName.value
                });
            }
        }

        let cancelName = () => {

            name.innerHTML = `<div id="${myId}" onclick="letCheck(this)" class="ccheck text-center pb-4"><i class="fa-solid fa-check"></i></div> <p class="li p-1">${pName}</p>
            <button id="${myId}" onclick="edit(this)" class="btn btn-primary">Edit</button>
            <button id="${myId}" onclick="del(this)" class="btn btn-danger DeleteBtn">Delete</button>`;
        }


        window.saveName = saveName;

        window.cancelName = cancelName;
    }

    let letCheck = (e) => {
        let myId = e.getAttribute("id");

        let getCheck = async () => {
            const docRef = doc(db, "Todos", myId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().checked === true) {
                    // console.log("false");
                    let upCheck = async () => {
                        let ref = doc(db, "Todos", myId);
                        await updateDoc(ref, {
                            checked: false
                        });
                    }
                    upCheck();
                    window.upCheck = upCheck;
                } else if (docSnap.data().checked === false) {
                    // console.log("true");
                    let downCheck = async () => {
                        let ref = doc(db, "Todos", myId);
                        await updateDoc(ref, {
                            checked: true
                        });

                    }
                    downCheck();
                    window.downCheck = downCheck;
                }
            }
        }

        getCheck();

        window.getCheck = getCheck;
    };

    let bg = async () => {

        const ref = collection(db, "Todos");
        const q = query(ref, where("checked", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let d = document.getElementById(doc.id);

                d.style.backgroundColor = "#7d55cc";

            });
        })

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let d = document.getElementById(doc.id);
            d.style.backgroundColor = "#7d55cc";
        })

    }

    bg();





    window.del = del;
    window.edit = edit;
    window.letCheck = letCheck;
    window.bg = bg;


}

getData();



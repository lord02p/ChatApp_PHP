var chat_container = document.querySelector(".chat_container");

// function Home() ....
function home() {
    chat_container.innerHTML = `
    <div class="logo">
    <p>Chat Room <i class="fa fa-rocket" style="margin-left: 3px;"></i></p>
</div>
<div class="font_details">
    <div class="face_icon">
        <i class="fa fa-user-circle"></i>
        <p>Hello User</p>
    </div>

    <div class="btns">
        <button onclick="join_room()">Join Room <i class="fa fa-edit"></i></button>
        <button onclick="creat_room()">Creat Room <i class="fa fa-plus-circle"></i></button>
    </div>

    <div class="search_rooms">
        <div class="input_box">
            <input type="text" placeholder="Search Rooms..." onkeyup="search_room()">
            <i class="fa fa-search"></i>
        </div>
    </div>
</div>
<div class="room_details">
    <p><strong>Develop by </strong> <a href=""> Bobby Mahanta</a></p>
</div>

    `;
}
home();


// creat Room div() ...
function creat_room() {
    chat_container.innerHTML = `
    <div class="logo">
    <p>Chat Room <i class="fa fa-rocket" style="margin-left: 3px;"></i></p>
</div>
<div class="font_details">
    <div class="face_icon">
        <i class="fa fa-user-circle"></i>
        <p>Hello User</p>
    </div>
    <div class="room_creat_details" method="post">
        <p>Creat Room Information <i class="fa fa-edit"></i></p>
        <input type="text" id="user_name" placeholder="Your Name...">
        <input type="text" id="room_name" placeholder="Room Name...">
        <div class="room_key">
            <input type="text" id="room_key" placeholder="Creat Room Key...">
            <i class="fa fa-key"></i>
        </div>
        <button onclick="final_creat_room()" class="btn-btn">Creat Room <i class="fa fa-plus-circle"></i></button>
    </div>
</div>
    `;
}

// creat fainal room from database();
function final_creat_room() {
    var room_name = document.getElementById("room_name").value;
    var room_key = document.getElementById("room_key").value;
    var user_name = document.getElementById("user_name").value;

    if (room_key == '' || room_key == '' || user_name == '') {
        alert("pleas Fill all Blank Fields...");
    } else {
        var data_object = {
            "room_name": room_name,
            "room_key": room_key,
            "user_name": user_name,
        };
        var data_jsn = JSON.stringify(data_object);
        fetch("creat_room.php", {
                method: 'POST',
                body: data_jsn,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                if (result[0].room == "true") {
                    alert("Your Room Are Created");
                    document.getElementById("user_namee").value = user_name;
                    room();
                    setInterval(() => {
                        read_data();
                    }, 200);
                } else {
                    confirm("Opps, This room already Exit's");
                }
            })
            .catch((err) => {
                alert("Please Try again.." + err);
            })
    }
}

// finall room room;

function room() {
    chat_container.innerHTML = `
    <div class="dropdown_box">
        <div class="list" id="members">
            <p>All Member</p>
            <i class="fa fa-users"></i>
        </div>

        <div class="set_clr">
            <p>Background</p>
            <input type="color">
        </div>

        <div class="list" onclick="exit_room()">
            <p>Exit</p>
            <i class="fa fa-barcode"></i>
        </div>
    </div>
    <div class="members">
        <div class="close_list" onclick="close_member_list()">
            <i class="fa fa-caret-down"></i>
        </div>
        <div class="all_member">
            <p>Bobby Mahanta</p>
            <p>Lord Mahanta</p>
            <p>Suraj Das</p>
            <p>Roja Panicker</p>
            <p>Imran Khan</p>
        </div>
    </div>
    <div class="logo">
        <p id="room_name">Chat Room</p>
        <i class="fa fa-caret-down" id="dropdown" onclick="dropdown_menu()"></i>
    </div>
<div class="chat_result">
    <div class="right">
        <p>Hello World</p>
    </div>
</div>
<div method="post" class="form">
    <input type="text" name="chat_data" class="chat_data" id="chat_dataa" onkeyup="mood()" placeholder="Message" style="letter-spacing: .8px;">
    <button type="submit" name="submit" id="submit" onclick="sent_data()">SEND</button>
</div>
    `;
}



// function Read Data();
function read_data() {
    var input_user_name = document.getElementById("user_namee").value;
    fetch("read_data.php")
        .then((res) => {
            return res.json();
        })
        .then((result2) => {
            var row = ``;
            Array.from(result2).forEach((d) => {
                var classss = '';
                var user_name = ``;
                if (d.user_name == input_user_name) {
                    classss = "right";
                    user_name = ``;
                } else {
                    classss = "left";
                    user_name = `<span class="user_name">${d.user_name}</span>`;
                }
                row += `
                <div class="${classss}">
                    <p>${user_name} ${d.chat} <span class="massege_date">${d.chat_date}</span></p>
                </div>
                `;
                document.getElementById("room_name").innerText = d.room_name;
            })
            document.querySelector(".chat_result").innerHTML = row;
        })
        .catch((err) => {
            console.log("Err Found :" + err);
        })

}


// user sent massege data();...

function sent_data() {
    var chat_dataa = document.getElementById("chat_dataa").value;
    var input_user_name = document.getElementById("user_namee").value;
    var data_object = {
        "chat_data": chat_dataa,
        "user_name": input_user_name,
    };
    var data_jsn = JSON.stringify(data_object);
    fetch("sent_data.php", {
            method: 'POST',
            body: data_jsn,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((result) => {
            if (result[0].sent == 'true') {
                document.getElementById("chat_dataa").value = '';
                window.scrollTo(0, document.querySelector(".chat_result").scrollHeight);
            } else {
                alert("massege can't sent, Please Try again...");
                document.getElementById("chat_dataa").value = '';
            }
        })
        .catch((err) => {
            alert("err Found sent_data: " + err);
        })
}

// join room Method;
function join_room() {
    chat_container.innerHTML = `
   <div class="logo">
   <p>Chat Room <i class="fa fa-rocket" style="margin-left: 3px;"></i></p>
</div>
<div class="font_details">
   <div class="face_icon">
       <i class="fa fa-user-circle"></i>
       <p>Hello User</p>
   </div>
   <div class="room_creat_details" method="post">
       <p>Join Room Information <i class="fa fa-edit"></i></p>
       <input type="text" id="join_user_name" placeholder="Your Name...">
       <input type="text" id="join_room_name" placeholder="Room Name...">
       <div class="room_key">
           <input type="text" id="join_room_key" placeholder="Room Key...">
           <i class="fa fa-key"></i>
       </div>
       <button onclick="final_join_room()" class="btn-btn">Join Room <i class="fa fa-thumb"></i></button>
   </div>
</div>
   `;
}

// final join room method
function final_join_room() {
    var join_user_name = document.getElementById("join_user_name").value;
    var join_room_name = document.getElementById("join_room_name").value;
    var join_room_key = document.getElementById("join_room_key").value;
    if (join_user_name == '' || join_room_name == '' || join_room_key == '') {
        alert("Please Fill all the blank fields..");
    } else {
        document.getElementById("user_namee").value = join_user_name;
        var data_object = {
            "join_user_name": join_user_name,
            "join_room_name": join_room_name,
            "join_room_key": join_room_key,
        };
        var data_jsn = JSON.stringify(data_object);
        fetch("join_room.php", {
                method: 'POST',
                body: data_jsn,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.json()
                    // document.getElementById("user_namee").value = join_user_name;
            })
            .then((result) => {
                console.log(result);
                if (result[0].sent == 'false') {
                    alert("Please Enter Valid Room key or Room Name ?");
                } else {
                    alert(`Join Room`);
                    room();
                    setInterval(() => {
                        read_data();
                    }, 200);
                }
            })
            .catch((err) => {
                alert("err Found sent_data: " + err);
            })
    }
}

// fetch list
function drop_down() {
    console.log("this is Droop down");
    fetch("fetch_list.php")
        .then((res) => {
            return res.json()
        })
        .then((dataa) => {
            document.querySelector(".members").style.display = "inline";
            console.log(dataa);

        })
        .catch((er) => {
            console.log("err found :" + er);
        })
}

document.getElementById("members").addEventListener("click", () => {
    function members() {
        console.log("here The members function");
    }
})


// sent button hide or show();
function mood() {

}
// drop down menu;
function dropdown_menu() {
    document.querySelector(".dropdown_box").style.display = "flex";
}
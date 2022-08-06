<?php
    session_start();
    include "config.php";
    $input = file_get_contents("php://input");
    $fetch_data = json_decode($input, true);
    $room_name = $fetch_data["room_name"];
    $user_name = $fetch_data["user_name"];
    $room_key = $fetch_data["room_key"];
    $date = date("d/m:y");
    $re = [];
    $sql = "SELECT * FROM chat_data WHERE room_name = '$room_name'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) > 0){
        $re = ["room" => "false"];
    }else{
        $sql2 = "INSERT INTO chat_data(chat, chat_date, room_name, room_key, user_name, room_creator) VALUES ('Room Creat By $user_name', '$date', '$room_name', '$room_key', '$user_name', '$user_name')";
        if($result2 = mysqli_query($conn, $sql2)){
            $_SESSION["room_name"] = $room_name; //room_name dummy Show;
            $_SESSION["user_name"] = $user_name; //use in left and right or save database user_key;
            $_SESSION["room_key"] = $room_key; // room key and search Data base This messeages...
            $_SESSION["room_owner"] = $user_name; // room key and search Data base This messeages...
            $re = ["room" => "true"];
        }else{
            $re = ["room" => "false"];  
        }
    }
    echo json_encode(array($re));

?>
<?php
    session_start();
    include "config.php";
            $input = file_get_contents("php://input");
            $jsn_data = json_decode($input, true);
            $chat_data = $jsn_data["chat_data"];
            $user_name = $jsn_data["user_name"];
            $result_array = [];
            $date = date("d/m/y");
            if($user_name == $_SESSION["user_name"]){
                $room_key = $_SESSION["room_key"];
                $room_name = $_SESSION["room_name"];
                if(isset($_SESSION["room_owner"])){
                    $room_owner = $_SESSION["room_owner"];
                    $sql = "INSERT INTO chat_data (chat, chat_date, room_name, room_key, user_name, room_creator) VALUES ('$chat_data', '$date', '$room_name', '$room_key', '$user_name', '$room_owner')";
                }else{
                    $sql = "INSERT INTO chat_data (chat, chat_date, room_name, room_key, user_name, room_creator) VALUES ('$chat_data', '$date', '$room_name', '$room_key', '$user_name', 'No')";
                }
                if($result = mysqli_query($conn, $sql)){
                    $result_array[] = ["sent" => "true"];
                }else{
                    $result_array[] = ["sent" => "false"];
                }
            }else{
                $result_array[] = ["sent" => "false"];
            }
        
   
    echo json_encode($result_array);
?>
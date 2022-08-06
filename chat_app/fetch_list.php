<?php

    session_start();
    include "config.php";
    if(isset($_SESSION["room_name"])){
        $room_name = $_SESSION["room_name"];
        $result_array = [];
        $sql = "SELECT user_name FROM chat_data WHERE room_name = '$room_name' GROUP BY user_name HAVING COUNT(user_name) > 1 ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0){
            while($finale_result = mysqli_fetch_assoc($result)){
                $result_array[] = $finale_result;
            }
        }else{
            $result_array[] = ["list" => "false"];
        }
    }else{
        $result_array[] = ["list" => "false"];
    }
    echo json_encode($result_array);
?>
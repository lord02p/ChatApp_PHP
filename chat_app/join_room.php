<?php
    session_start();
    include "config.php";
            $input = file_get_contents("php://input");
            $jsn_data = json_decode($input, true);
            $join_user_name = $jsn_data["join_user_name"];
            $join_room_name = $jsn_data["join_room_name"];
            $join_room_key = $jsn_data["join_room_key"];
            $result_array = [];
            $sql = "SELECT * FROM chat_data WHERE room_name = '$join_room_name' AND room_key = '$join_room_key'";
            if($result = mysqli_query($conn, $sql)){
                if(mysqli_num_rows($result) > 0){
                    $result_array[] = ["sent" => "true"];
                    $_SESSION["room_name"] = $join_room_name; //room_name dummy Show;
                    $_SESSION["user_name"] = $join_user_name; //use in left and right or save database user_key;
                    $_SESSION["room_key"] = $join_room_key; // room key and search Data base This messeages...
                }else{
                    $result_array[] = ["sent" => "false"];
                }
            }else{
                $result_array[] = ["sent" => "false"];
            }
    echo json_encode($result_array);
?>
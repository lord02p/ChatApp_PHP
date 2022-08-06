<?php
    session_start();
    include "config.php";
    $result_array = [];
    if(isset($_SESSION["room_name"])){
        $room_name = $_SESSION["room_name"];
        $sql = "SELECT * FROM chat_data WHERE room_name = '$room_name'";
        if($result = mysqli_query($conn, $sql)){
            if(mysqli_num_rows($result) > 0){
                while($final_result = mysqli_fetch_assoc($result)){
                    $result_array[] = $final_result;
                }
            }else{
                $result_array[] = ["sent" => "false"];
            }
        }else{
            $result_array[] = ["sent" => "false"];
        }
    }else{
        $result_array[] = ["sent" => "false"];
    }
    echo json_encode($result_array);
?>
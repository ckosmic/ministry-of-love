<?php
include "/storage/ssd1/125/1201125/public_html/core/init.php";
if(empty($_POST) === false) {
	$username = $_POST["username"];
	$password = $_POST["password"];
	
	if(empty($username) === true || empty($password) === true) {
		$errors[] = "You need to enter a username and password";
	} else if (user_exists($username) === false) {
		$errors[] = "You haven't registered an account";
	} else if (user_active($username) === false) {
		$errors[] = "You haven't activated your account";
	} else {
		$login = login($username, $password);
		if($login === false) {
			$errors[] = "That username or password combination is incorrect";
		} else {
			$_SESSION["user_id"] = $login;
			header("Location: ../fight-the-beast");
			exit();
		}
	}
} else {
	$errors[] = "No data received";
}

if(empty($errors) === false) {
	echo output_errors($errors);
}
?>
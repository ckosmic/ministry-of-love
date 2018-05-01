<?php include "/storage/ssd1/125/1201125/public_html/core/init.php"; ?>
<!DOCTYPE HTML>
<html>
<head>
	<title>Fight the Beast</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="apple-mobile-web-app-title" content="Fight the Beast">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="apple-touch-icon" href="beast/images/custom_icon.png">
	<link rel="apple-touch-startup-image" href="beast/images/startup-6.png">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="/misc/game_engine/engine.js" type="text/javascript"></script>
	<script src="/misc/beast/game.js" type="text/javascript"></script>
	<style>
		body {
			margin:0;
			padding:0;
			font-family: 'Roboto', sans-serif;
			background-color: #0f0f0f;
			color:white;
		}
		#misclist {
			list-style-type: none;
			margin:0;
			padding:0;
		}
		.misclistitem{
			margin-bottom:10px;
		}
		a {
			text-decoration:none;
			color:#CCCCCC;
		}
	</style>
</head>
<body>

<div id="username" style="display:none;"><?php echo $user_data["username"]; ?></div>
<div id="my_data" style="display:none;"><?php echo get_beast_data($user_data["username"]); ?></div>
<div id="beast_data" style="display:none;"><?php echo get_beast_scores(); ?></div>

<div id="divLogin" style="display:none;">
	<form action="/misc/beast/login.php" method="post" style="width:200px; margin:100px auto;">
		<ul id="misclist">
			<li class="misclistitem">
				<div style="">Username:</div>
				<input type="text" name="username" style="width:95%;">
			</li>
			<li class="misclistitem">
				<div style="">Password:</div>
				<input type="password" name="password" style="width:95%;">
			</li>
			<li class="misclistitem" style="text-align:center;">
				<input type="submit" value="LOGIN">
			</li>
			<li class="misclistitem" style="text-align:center;">
				Don't have an account?  <a href="/register">Register</a>
			</li>
		</ul>
	</form>
</div>

</body>
</html>
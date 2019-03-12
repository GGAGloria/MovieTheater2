<?php
	session_start();

	if(!isset($_SESSION['username'])){
		echo "<h1>You have not logged in";
		header("refresh:3; url=index.html");
	}
	else {
		?>
		<head>
			<title>HKU Cinema Buying Tickets</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="stylesheet" media="screen and (max-width: 500px)" href="CSS/buywelcome_mobile.css" type="text/css">
			<link rel="stylesheet" media="screen and (min-width: 500px) and (max-width: 1000px)" href="CSS/buywelcome_tablet.css" type="text/css">
			<link rel="stylesheet" media="screen and (min-width: 1000px)" href="CSS/buywelcome_desktop.css" type="text/css">
		</head>
		
		<div class='navi'>
			<ul>
				<li><a href="buywelcome.php">Buy A Ticket</a></li>
				<li><a href="comment.php">Movie Review</a></li>
				<li><a href="history.php">Purchase History</a></li>
				<li><a href="logout.php">Logout</a></li>

			</ul>
		</div>
		<?php
		
		$db_conn=mysqli_connect("sophia.cs.hku.hk", "tkwang", "tkwang", "tkwang")
		or die("Connection Error!".mysqli_connect_error());

		$query = "SELECT * FROM Film";
		$result = mysqli_query($db_conn,$query) or die("Query error!".mysqli_error($db_conn));

		while ($row=mysqli_fetch_array($result)) {
			$num = $row['FilmId'];
			echo "<h1>".$row['Filmname']."</h1>";
			echo "<h3>Synosis:".$row['Description']."</h3>";
			$imagepath = "\"image/$num.jpg\"";
			echo "<img src=".$imagepath."width=180px height=250px />";
			echo "<div class='group'><div class='text'><h4>Director:".$row['Director']."</h4>";
			echo "<h4>Duration:".$row['Duration']."</h4>";
			echo "<h4>Category:".$row['Category']."</h4>";
			echo "<h4>Language:".$row['Language']."</h4></div>";

			echo "<form action='seatplantry.php' method='post'>";
			echo "<select name='select'>";

			$query2 = "SELECT * FROM Film, BroadCast WHERE Film.FilmId=BroadCast.FilmId";
			$result2 = mysqli_query($db_conn,$query2)
			or die("Query error!".mysqli_error($db_conn));

			while ($row2=mysqli_fetch_array($result2)) {
				if($row['FilmId']==$row2['FilmId']){
					echo "<option value= ".$row2['BroadCastId'].">";
					echo $row2['Dates'];
					echo " ".$row2['Time'];
					echo " ".$row2['day'];
					echo " ".$row2['HouseId'];
					echo "</option>";
				}
			}
			
			echo "</select>";
			echo "<input type='submit' name='submit' value='Submit'>";
			echo "</form></div>";
			echo "<hr></hr>";
		}
		
		mysqli_free_result($result);
		mysqli_free_result($result2);
		mysqli_close($db_conn);
	}
?>


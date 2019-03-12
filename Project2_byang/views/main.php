
<?php
    session_start();
    if (!isset($_SESSION['UserID'])){
        print "<h1> You have not logged in. </h1>";
        header("Refresh:3; url=index.html");
    } else {
?>
        <head>
                <meta charset="UTF-8">
                <title>Elvia's Cinema</title>
                <link rel="stylesheet" href="css/mainstyle.css" type="text/css">
        </head>
        <div class = "nav">
            <ul>
                <li><a href = "buywelcome.php" class = "buy"> Buy A ticket </a></li>
                <li><a href = "comment.php" class = "buttontop"> Movie Review </a></li>
                <li><a href = "history.php" class = "buttontop"> Purchase History </a></li>
                <li><a href = "logout.php" class = "buttontop"> Logout </a></li>
            </ul>
        </div>
        <p> Enjoy the film in our best cinema and meet your love here. </p>
<?php
    }
?>

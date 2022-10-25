<!--<?php
	session_start();

	if (!isset($_SESSION['attempt_history']) || !is_array($_SESSION['attempt_history'])) {
		$_SESSION["attempt_history"] = [];
	}
?>
-->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "https://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<title>web_lab1</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="page">
	    <header>
	        <button class="header_button"onclick="changeInfoDisplay()">&equiv; info</button>
		    <div id="header_info">
			    evgenia ryzhova, p32132<br>
			    lab 1, task #3315</br>
			    current time: <span class="datetime"></span>
		    </div>
	    </header>

        <div id="pg1_main">
            <div class="column">
	            <div class="info_container" id="graph">
		            <img src="images\area.png">
	            </div>
	        </div>

            <div class="column">
	            <div class="info_container" id="input_block">
		            <div>
			            <label for="x">X:</label>
  			            <input type="text" id="x" name="x" oninput="validateX()">
  			            <div id="x_message" class="warning">X is not set!</div>
  		            </div>

  		            <div>
  			            <label>Y:</label>
  			            <div class="y_buttons_block">
  				            <input type="button" class="y_button" value="-5" onclick="chooseY(this)">
  				            <input type="button" class="y_button" value="-4" onclick="chooseY(this)">
  				            <input type="button" class="y_button" value="-3" onclick="chooseY(this)">
  			            </div>
  			            <div class="y_buttons_block">
  				            <input type="button" class="y_button" value="-2" onclick="chooseY(this)">
  				            <input type="button" class="y_button" value="-1" onclick="chooseY(this)">
  				            <input type="button" class="y_button" value="0" onclick="chooseY(this)">
  			            </div>
  			            <div class="y_buttons_block">
  				            <input type="button" class="y_button" value="1" onclick="chooseY(this)">
  				            <input type="button" class="y_button" value="2" onclick="chooseY(this)">
  				            <input type="button" class="y_button" value="3" onclick="chooseY(this)">
  			            </div>
  			            <div id="y_message" class="warning">Y is not chosen!</div>
  		            </div>

  		            <div>
			            <label for="r">R:</label>
			            <select id="r" name="r">
 				            <option value="1">1</option>
				            <option value="2">2</option>
				            <option value="3">3</option>
				            <option value="4">4</option>
				            <option value="5">5</option>
			            </select>
		            </div>
  		            <input class="submit_button" type="submit" value="Send" onclick="submit()">
	            </div>

	            <div class="info_container" id="input_info">
		            <div>
			            X must be a number between -5 and 5 (non-inclusive),
			            Y must be an integer between -5 and 3 (inclusive),
			            R must be an integer between 1 and 5 (inclusive).
		            </div>
		            <div class="warning" id="invalid_request_warning"></div>
	            </div>
	        </div>
	    </div>
    </div>

	

<div>
	<div id="result_wrapper">
		<table id="results_table">
			 <tr class="header">
				<td>X</td>
				<td>Y</td>
				<td>R</td>
				<td>Result</td>
				<td>Current time</td>
				<td>Execution time</td>
			</tr>
			<!--<?php
				foreach ($_SESSION["attempt_history"] as $attempt) {
			?>
			<tr class=<?php echo $attempt["result"] === 1 ? "hit" : "miss"; ?> >
				<td><?=$attempt["x"]?></td>
				<td><?=$attempt["y"]?></td>
				<td><?=$attempt["r"]?></td>
				<td><?php echo $attempt["result"] === 1? 'hit' : 'miss' ?></td>
				<td><?=$attempt["cur_time"]?></td>
				<td><?=$attempt["exec_time"]?></td>
			</tr>
			<?php
		}?> -->
		</table>
	</div>
	</div>


	<script src="lib/jquery-3.6.1.min.js"></script>
	<script type="text/javascript" src="validate.js"></script>
	<script type="text/javascript" src="helpers.js"></script>
</body>
</html>
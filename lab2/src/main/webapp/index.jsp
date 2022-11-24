<%@ page contentType="text/html; charset=UTF-8" %>

<%@ page import="java.util.LinkedList" %>
<%@ page import="app.data.Point" %>
<%@ page import="app.data.HistoryManager" %>
<%@ page import="app.view.TablePointWriter" %>
<%@ page import="app.view.JsonPointWriter" %>

<%!
	private final HistoryManager resultsManager = new HistoryManager();
	private final TablePointWriter tablePointWriter = new TablePointWriter();
	private final JsonPointWriter jsonPointWriter = new JsonPointWriter();
%>

		<!DOCTYPE HTML PUBLIC>
<html>
<head>
	<title>web_lab2</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="page">
	    <header>
	        <button class="header_button" onclick="changeInfoDisplay()">&equiv; info</button>
		    <div id="header_info">
			    evgenia ryzhova, p32132<br>
			    lab 2, task #6664<br>
			    current time: <span class="datetime"></span>
		    </div>
	    </header>

        <div id="pg1_main">
            <div class="column">
	            <div class="info_container" id="graph">
		            <!--<img src="static/area.png" alt="graph">-->
					<canvas id="graph_canvas" width="220" height="220">Interactive graph</canvas>
	            </div>
	        </div>

            <div class="column">
	            <form method="get" action="${pageContext.request.contextPath}/controller" class="info_container" id="input_block">
					<div>
						<label class="var_name">X:</label><br>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_-5" value="-5" oninput="validateX()">
						<label for="x_-5">-5</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_-4" value="-4" oninput="validateX()">
						<label for="x_-4">-4</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_-3" value="-3" oninput="validateX()">
						<label for="x_-3">-3</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_-2" value="-2" oninput="validateX()">
						<label for="x_-2">-2</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_-1" value="-1" oninput="validateX()">
						<label for="x_-1">-1</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_0" value="0" oninput="validateX()">
						<label for="x_0">0</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_1" value="1" oninput="validateX()">
						<label for="x_1">1</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_2" value="2" oninput="validateX()">
						<label for="x_2">2</label>
						<input type="checkbox" class="x_checkbox" name="x[]" id="x_3" value="3" oninput="validateX()">
						<label for="x_3">3</label>

						<div class="warning" id="x_warning">X is not set!</div>
					</div>

					<div>
						<label class="var_name" for="y">Y:</label>
						<input type="text" id="y" name="y" oninput="validateY()">
						<div id="y_message" class="warning">Y is not set!</div>
					</div>

					<div>
						<label class="var_name">R:</label>
						<br>
						<input type="radio" id="r_1" name="r" value="1.0" onclick="validateR()">
						<label for="r_1">1</label>
						<input type="radio" id="r_1.5" name="r" value="1.5" onclick="validateR()">
						<label for="r_1.5">1.5</label>
						<input type="radio" id="r_2" name="r" value="2.0" onclick="validateR()">
						<label for="r_2">2</label>
						<input type="radio" id="r_2.5" name="r" value="2.5" onclick="validateR()">
						<label for="r_2.5">2.5</label>
						<input type="radio" id="r_3" name="r" value="3.0" onclick="validateR()">
						<label for="r_3">3</label>

						<div id="r_warning" class="warning">R is not  set!</div>
					</div>

  		            <input class="submit_button" type="button" value="Send" onclick="submitForm()">
	            </form>

	            <div class="info_container" id="input_info">
		            <div>
			            X must be an integer between -5 and 3 (inclusive),
			            Y must be a number between -3 and 5 (non-inclusive),
			            R must be a number between 1 and 3 (inclusive).
		            </div>
		            <div class="warning" id="invalid_request_warning">
					</div>
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
			</tr>

			<%
				LinkedList<Point> results = resultsManager.getResults(session);
				out.println(tablePointWriter.writePoints(results));
			%>
		</table>
	</div>
</div>
	<script type="text/javascript" src="js/validate.js"></script>
	<script type="text/javascript" src="js/header.js"></script>
	<script type="text/javascript" src="js/graph.js"></script>

<script>
	let points = JSON.parse('<%= jsonPointWriter.writePoints(results)%>');
	drawPoints(points);
</script>

</body>
</html>
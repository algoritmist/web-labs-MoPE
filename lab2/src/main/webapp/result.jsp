<%@ page import="java.util.LinkedList" %>
<%@ page import="app.data.Point" %>
<%@ page import="app.data.LastAttemptManager" %>
<%@ page import="app.view.ResponseMessageMap" %>
<%@ page import="app.view.TablePointWriter" %>
<%! private final ResponseMessageMap responseMessageMap = new ResponseMessageMap(); %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "https://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <title>web_lab2</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="page">
    <header>
        <button class="header_button"onclick="changeInfoDisplay()">&equiv; info</button>
        <div id="header_info">
            evgenia ryzhova, p32132<br>
            lab 2, task #6664<br>
            current time: <span class="datetime"></span>
        </div>
    </header>

    <div class="info_container" >
        <%= responseMessageMap.getMessage(response.getStatus()) %>
    </div>
    <div id="result_wrapper">
        <table id="results_table">
            <tr class="header">
                <td>X</td>
                <td>Y</td>
                <td>R</td>
                <td>Result</td>
            </tr>

            <%!
                private final LastAttemptManager resultsManager = new LastAttemptManager();
                private final TablePointWriter pointWriter = new TablePointWriter();
            %>

            <%
                LinkedList<Point> results = resultsManager.getResults(session);
                out.println(pointWriter.writePoints(results));
            %>
        </table>
    </div>
    <div class="next_page_link">
        <a href="${pageContext.request.contextPath}">&larr;</a>
    </div>
</div>

    <script type="text/javascript" src="js/header.js"></script>
</body>
</html>
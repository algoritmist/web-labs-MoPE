<?php
	session_start();

	$start = microtime(true);

	function validateX($val) {
		if (!isset($val)) {
			return false;
		}
		$val = str_replace(',', '.', $val);
		return is_numeric($val) && $val < 5 && $val > -5;
	}

	function validateY($val) {
	    $y_valid_values = range(-5, 3);
		if(!isset($val)) {
			return false;
		} elseif (is_array($val)) {
			return false; // TODO handle
		} else {
			return in_array($val, $y_valid_values);
		}
	}

	function validateR($val) {
	    $r_valid_values = range(1, 5);
		if (!isset($val)) {
			return false;
		} elseif (is_array($val)) {
			return false; // TODO handle
		} else {
			return in_array($val, $r_valid_values);
		}
	}

	function validateInput($x, $y, $r) {
		return validateX($x) && validateY($y) && validateR($r);
	}

	function check($x, $y, $r) {
		if ($x < 0 && $y < 0) {
			return false;
		} elseif ($x <= 0 && $y >= 0) {
			return $x - $y <= $r;
		} elseif ($x >=0 && $y <= 0) {
			return $x <= $r && $y >= -$r/2;
		} else {
			return $x*$x + $y*$y <= $r/2;
		}
	}

	$x = $_POST["x"];
	$y = $_POST["y"];
	$r = $_POST["r"];

	$result;

	if (validateInput($x, $y, $r)) {
		$result = check($x, $y, $r) ? 1 : 0;
	    $end = microtime(true);
	    $cur_time = date('d-m-y h:i:s');
	    $exec_time = round(($end - $start) * 1000, 6, PHP_ROUND_HALF_UP) . " ms";
	    $response = array(
	        "x" => $x,
	        "y" => $y,
	        "r" => $r,
	        "result" => $result,
	        "cur_time" => $cur_time,
	        "exec_time" => $exec_time,
	        );
		array_unshift($_SESSION['attempt_history'], $response);
		echo json_encode($response);
	} else  {
		$result = -1;
	}
?>
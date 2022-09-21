<?php
require_once "Result.php";
session_start();
date_default_timezone_set("Europe/Moscow");
$time = date("Y-m-d H:i:s");
$y = (float)$_GET['Y'];
$x = $_GET['X'];
$r = $_GET['R'];
if (checkValue($y, $x, $r)) {
    $point = checkPoint($x, $y, $r);
    $answer = array($y, $x, $r, $point, $time);
    $_SESSION['result'][] = $answer;
    drawResult($answer);
} else {
    http_response_code(400);
}

function checkValue($y, $x, $r): bool
{
    return is_numeric($y) && $y <= 5 && $y >= -3 && in_array($x, array(-4, -3, -2, -1, 0, 1, 2, 3, 4)) && in_array($r, array(1, 2, 3, 4, 5));
}

function checkPoint($x, $y, $r): string
{
    if (($x >= 0) && ($y <= $r) && ($x <=  $r / 2) && ($y >= 0)) {
        return 'true';
    }


    if (($x <= 0) && ($y <= 0) && ($y >= -2 * $x - $r)) {
        return 'true';
    }

     if (($x >= 0) && ($y <= 0) && ($x * $x + $y * $y - 0.15 <= ($r/2) * ($r/2))) {
        return 'true';
    }

    return 'false';
}
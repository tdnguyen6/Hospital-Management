<?php

//class A {
//
//    /**
//     * A constructor.
//     */
//    public function __construct()
//    {
//        echo "I'm a new A";
//    }
//
//    public function setX() {
//        echo "X is set";
//    }
//}
//
////$var1 = "A";
////$var2 = "set"."X";
////(new $var1())->$var2();
//require_once __DIR__."/../vendor/autoload.php";
//require_once __DIR__."/../Domain/hms/Models/Room.php";
//$em = (require __DIR__."/../src/functions/getEntityManager.php")('hms');
//$room = $em->find('Room', ['number'=>3, 'type'=>'sdfsd']);
//echo empty($room);

//$dateA = DateTime::createFromFormat('Y-m-d', '1964-2-4');
//$dateB = new DateTime('now');
//$diff = date_diff(new DateTime('now'), $dateA);
//echo $diff->format("%Y");

date_default_timezone_set("Asia/Ho_Chi_Minh");
$checkIn = date("Y-m-d H:i:s");

echo $checkIn;
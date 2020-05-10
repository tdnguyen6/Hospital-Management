<?php
function makecoffee($types = array("cappuccino"), $coffeeMaker = NULL)
{
    $device = is_null($coffeeMaker) ? "hands" : $coffeeMaker;
    return "Making a cup of ".join(", ", $types)." with $device.\n";
}
echo makecoffee(["cappuccino", "lavazza"], "teapot");
?>

//    if (empty($params)) {
//        $entityManager = (require_once __DIR__."/getEntityManager.php")($database);
//        require_once __DIR__."/../../Domain/$database/Models/$table.php";
//        $list = $entityManager->getRepository("$table")->findAll();
//        $data = [];
//        foreach ($list as $l) {
//            array_push($data, $l->get());
//        }
//        $message = "Successfully fetch all records from table $table of database $database";
//        return (require_once __DIR__ . '/ResponseJSON.php')($response, $message, count($data), $data, 200);
//    }
//    if (sizeof($params) === 1 && array_key_exists('id', $params)) {
//        $entityManager = (require_once __DIR__."/getEntityManager.php")($database);
//        $id = $params['id'];
//        $data = [];
//        require_once __DIR__."/../../Domain/$database/Models/$table.php";
//        $record = $entityManager->find("$table", $id);
//        array_push($data, $record->get());
//        $message = "Successfully fetch record with id = $id from table $table of database $database";
//        return (require_once __DIR__ . '/ResponseJSON.php')($response, $message, 1, $data, 200);
//    }

/*public static function create(array $fields, EntityManager $em) : array
{
if (count($fields) == 4
&& array_key_exists("name", $fields)
&& array_key_exists("price", $fields)
&& array_key_exists("visits", $fields)
&& array_key_exists("locations", $fields)
&& $fields["name"] !== ""
&& $fields["price"] !== ""
&& !empty($fields['visits'])
&& !empty($fields['locations'])
) {
$medicalService = new MedicalService();
$medicalService->setName($fields['name']);
$medicalService->setPrice($fields['price']);
foreach ($fields['visits'] as $visitID) {
$visitObj = $em->find('Visit', $visitID);
$medicalService->setVisits($visitObj);
}
foreach ($fields['locations'] as $roomID) {
$roomObj = $em->find('Room', $roomID);
$medicalService->setLocations($roomObj);
}
$em->persist($medicalService);
$em->flush();
return $medicalService->get();
}
return [];
}*/
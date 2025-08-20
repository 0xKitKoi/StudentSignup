<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

$db_path = '/var/www/html/club/database.sqlite';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit;
}


try {
    $db = new PDO("sqlite:$db_path");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $db->prepare("INSERT INTO form_submissions (input1, input2, input3, input4) VALUES (:input1, :input2, :input3, :input4)");
    $stmt->execute([
        ':input1' => $data['input1'],
        ':input2' => $data['input2'],
        ':input3' => $data['input3'],
        ':input4' => $data['input4']
    ]);

    echo json_encode(["message" => "Data saved successfully"]);
} catch(PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>

<?php
require_once './common.php';

try {
    // 現在の置換リストを取得する
    $pdo = makePdo();
    $stmt = $pdo->query('SELECT * FROM '.TBL_DAME.';');
    $result = $stmt->fetchAll();
    echo json_encode($result);
} catch (Exception $e) {
    putlog($e->getMessage());
}

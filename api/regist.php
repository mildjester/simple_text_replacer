<?php
require_once './common.php';

try {
    // 置換リストへ新規追加する
    $before = h($_POST['before']);
    $after = h($_POST['after']);
    if (!cf_isset($before) || !cf_isset($after)) {
        echo json_encode(array('result' => '9', 'message' => 'value not set'));
        exit;
    }
    $pdo = makePdo();
    $stmt = $pdo->prepare('INSERT INTO '.TBL_DAME.'(before, after) VALUES (?, ?)');
    $params = array($before, $after);
    $stmt->execute($params);

    echo json_encode(array('result' => '0'));
    exit;
} catch (Exception $e) {
    putlog($e->getMessage());
}

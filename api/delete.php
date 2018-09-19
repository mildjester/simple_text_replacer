<?php
require_once './common.php';

try {
    // 置換リストへ新規追加する
    $id = h($_POST['id']);
    if (!cf_isset($id)) {
        echo json_encode(array('result' => '9', 'message' => 'value not set'));
        exit;
    }
    $pdo = makePdo();
    $stmt = $pdo->prepare('DELETE FROM '.TBL_DAME.' WHERE id = ?');
    $params = array($id);
    $stmt->execute($params);

    echo json_encode(array('result' => '0'));
    exit;
} catch (Exception $e) {
    putlog($e->getMessage());
}

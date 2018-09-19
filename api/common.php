<?php
define('DB_DAME', 'stxtr.db');
define('TBL_DAME', 'replace_list');

/**
 * ログ出力する
 */
function putlog ($message) {
    file_put_contents('test.log', date('[Y/m/d H:i:s] ').$message.PHP_EOL, FILE_APPEND);
}
/**
 * PDOを生成する
 */
function makePdo() {
    $pdo = new PDO('sqlite:'. DB_DAME);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // テーブルがなければ作成
    $sql  = 'CREATE TABLE IF NOT EXISTS '.TBL_DAME.'(';
    $sql .= 'id INTEGER PRIMARY KEY AUTOINCREMENT,';
    $sql .= 'before VARCHAR(128),';
    $sql .= 'after VARCHAR(128))';
    $pdo->exec($sql);

    return $pdo;
}
/**
 * 特殊文字除去処理
 */
function h($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
/**
 * 値が設定されているかチェックする
 */
function cf_isset($val) {
    if (!isset($val)) {
        return false;
    }
    if (is_array($val) && count($val) == 0) {
        return false;
    }
    if ($val === '') {
        return false;
    }
    return true;
}

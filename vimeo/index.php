<?php
require_once('/opt/www/vimeo/vimeo.php');
$vimeo = new phpVimeo('db41aab8330102609eff8999c0a0ce8d', '9ed8c4bc83849b3b');
$vimeo->setToken('955000e8dfbd235be3f04b9b4b9ac921','290e89d3fca715a92a3dba319859ef6b24f5f16c');

$albumID = $_GET["album_id"];
$perPage = 27;

$result = $vimeo->call('vimeo.albums.getVideos', array('album_id' => $albumID,'per_page' => $perPage, full_response => '1'));

echo $result;
?>
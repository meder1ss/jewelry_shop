<?php
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

//письмо
$message = '';
$message .= '<h1>Your order</h1>';
$message .='<p>Pnone: '.$_POST['ephone'].'</p>';
$message .='<p>Mail: '.$_POST['email'].'</p>';
$message .='<p>Client: '.$_POST['ename'].'</p>';
print_r($message);

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id=>$count) {
    $message .=$json[$id]['name'].' --- ';
    $message .=$count.' --- ';
    $message .=$count*$json[$id]['cost'];
    $message .='<br>';
    $sum = $sum +$count*$json[$id]['cost'];
}
$message .='Summary: '.$sum;

print_r($message);

$to = 'mvaretsa@gmail.com'.',';
$to .=$_POST['email'];
$spectext = '<!DOCTYPE HTML><html><head><title>Order</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Your order', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;}


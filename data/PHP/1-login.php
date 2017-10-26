<?php
header('Content-Type: application/json;charset=UTF-8');
/**
 * Created by PhpStorm.
 * User: 11200
 * Date: 2017/10/25
 * Time: 15:14
 */
@$keys=$_REQUEST["uname"];
if ($keys==null){
  echo "请输入登陆账号!";
}
@$upwd=$_REQUEST["upwd"];
if($upwd==null){
  echo "请输入登陆密码!";
}
require_once ("../init.php");
$sql="SELECT * FROM xm_user WHERE (phone=$keys OR email=$keys  OR xm_account=$keys) AND upwd=$upwd";
$isOK =sql_execute($sql);
if($isOK=="[]"){
  echo '{"code":-1,"msg":"用户名或密码不确"}';
}else{
  echo '{"code":1,"msg":"登录成功"}';
}

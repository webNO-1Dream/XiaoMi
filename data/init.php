<?php
$db_host = '127.0.0.1';
$db_user = 'root';
$db_password = '';
$db_database = 'xiaomi';
$db_port = 3306;
$db_charset = 'UTF8';
//连接数据库
$conn = mysqli_connect(
  $db_host, $db_user, $db_password, $db_database, $db_port);
  mysqli_query($conn, "SET NAMES $db_charset");
  //封装一个执行sql语句的函数，以后调用时只需编写sql语句，即可执行，减少代码量
function sql_execute($sql){
  //php中使用全局变量，需加上global
  global $conn;
  //将传入的sql查询语句执行
  $result = mysqli_query($conn, $sql);
  if(!$result){
    return  "查询执行失败！请检查SQL语句："+$sql;
  }else {
    //执行成功,将抓取多行结果,并返回转换为json格式的字符串
      #$rowList = mysqli_fetch_all($result,MYSQLI_ASSOC);
      $rowList=mysqli_fetch_all($result,MYSQLI_ASSOC);
      return json_encode($rowList);
  }
}
/*
 * 测试数据:
 * $sql="select * from xm_user";
 * echo sql_execute($sql);
*/
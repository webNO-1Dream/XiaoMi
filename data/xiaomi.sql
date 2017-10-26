-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-10-24 11:48:49
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: xiaomi
--

-- --------------------------------------------------------

--
-- 表的结构 banner_auto
--
#设置后续的SQL语句所有编码为UTF8
SET NAMES UTF8;
#丢弃数据库xiaomi，如果存在的话
DROP DATABASE IF EXISTS xiaomi;
#创建数据库xiaomi，保存数据使用字符集UTF8
CREATE DATABASE xiaomi CHARSET=UTF8;
#进入数据库xiaomi
USE xiaomi;
CREATE TABLE banner_auto (
  `banner_auto_id` int(11) NOT NULL,
  `banner_auto_name` varchar(32) NOT NULL,
  `banner_auto_url` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 banner_auto
--

INSERT INTO banner_auto (banner_auto_id, banner_auto_name, banner_auto_url) VALUES
(1, '小米Max 2', 'res/img/index/ul_banner/banner1.jpg'),
(2, '小米6', 'res/img/index/ul_banner/bannner2.jpg\r\n'),
(3, '小米MIX 2', 'res/img/index/ul_banner/bannner3.jpg\r\n'),
(4, '小米电视 4A', 'res/img/index/ul_banner/bannner4.jpg\r\n'),
(5, '小米笔记本 Air', 'res/img/index/ul_banner/bannner5.jpg\r\n'),
(6, '飞利浦智睿吸顶灯', 'res/img/index/ul_banner/bannner6.jpg\r\n');

-- --------------------------------------------------------

--
-- 表的结构 top_ad
--

CREATE TABLE top_ad (
  `top_ad_id` int(11) NOT NULL,
  `top_ad_name` varchar(32) NOT NULL,
  `top_ad_url` varchar(128) NOT NULL,
  `top_ad_msg` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 top_ad
--

INSERT INTO top_ad (top_ad_id, top_ad_name, top_ad_url, top_ad_msg) VALUES
(1, '小米电视品牌日', 'res/img/index/topAD/topAD-1.jpg', '我在星期一加载'),
(2, '小米新品日', 'res/img/index/topAD/topAD-2.jpg', '我在星期二加载'),
(3, '红米 5A', 'res/img/index/topAD/topAD-3.jpg', '我在星期三加载'),
(4, '小米MIX 2', 'res/img/index/topAD/topAD-4.jpg', '我在星期四加载');

-- --------------------------------------------------------

--
-- 表的结构 xm_products
--

CREATE TABLE xm_products (
  `pid` int(11) NOT NULL,
  `family_id` int(11) DEFAULT NULL,
  `pname` varchar(32) DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `orig_price` decimal(7,2) NOT NULL,
  `sm` varchar(128) NOT NULL,
  `md` varchar(128) NOT NULL,
  `lg` varchar(128) NOT NULL,
  `sold_count` int(11) DEFAULT NULL,
  `tips` tinyint(5) DEFAULT '0',
  `introl` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 xm_products
--

INSERT INTO xm_products (pid, family_id, pname, price, orig_price, sm, md, lg, sold_count, tips, introl) VALUES
(1, 3, '小米平板3', '1499.00', '0.00', '', 'res/img/index/header/mipad3.png', '', 1527, 0, ''),
(2, 3, '小米笔记本Air 12.5英寸', '3599.00', '0.00', '', 'res/img/index/header/air12.5.jpg', '', 115, 0, '【FHD窄边框】第七代处理器 128G SSD支持M.2接口SSD硬盘扩容 薄至12.9mm 轻至1.07kg！AKG扬声器！'),
(3, 3, '小米笔记本Air 13.3"', '4999.00', '0.00', '', 'res/img/index/header/air13.3.jpg', '', 233, 0, '【FHD窄边框】第七代处理器 128G SSD支持M.2接口SSD硬盘扩容 薄至12.9mm 轻至1.07kg！AKG扬声器！'),
(4, 3, '小米笔记本Pro 15.6"', '5599.00', '0.00', '', 'res/img/index/header/pro15.6.png', '', 68, 2, '【FHD窄边框】第七代处理器 128G SSD支持M.2接口SSD硬盘扩容 薄至12.9mm 轻至1.07kg！AKG扬声器！');

-- --------------------------------------------------------

--
-- 表的结构 xm_products_family
--

CREATE TABLE xm_products_family (
  `fid` int(11) NOT NULL,
  `fname` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 xm_products_family
--

INSERT INTO xm_products_family (fid, fname) VALUES
(1, '小米手机'),
(2, '红米手机'),
(3, '小米笔记本·平板'),
(4, '小米电视'),
(5, '盒子·影音'),
(6, '路由器'),
(7, '智能硬件'),
(8, '耳机·音箱'),
(9, '电源·电池'),
(10, '配件'),
(11, '箱包·服饰'),
(12, '小米周边');

-- --------------------------------------------------------

--
-- 表的结构 xm_user
--

CREATE TABLE xm_user (
  `uid` int(11) AUTO_INCREMENT UNIQUE ,
  `uname` varchar(32) DEFAULT NULL,
  `upwd` varchar(32) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `xm_account` INT(8) NOT NULL UNIQUE ,
  `gender` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 xm_user
--

INSERT INTO xm_user (uid, uname, upwd, email, phone, avatar, user_name,xm_account, gender) VALUES
(1, 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅',12345678, 0),
(2, '逆风飞翔', '51888', 'Mr.zhuo_xiao@foxmail.com', '13147163968', NULL, '肖卓',13146698, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table banner_auto
--
ALTER TABLE banner_auto
  ADD PRIMARY KEY (`banner_auto_id`);

--
-- Indexes for table top_ad
--
ALTER TABLE top_ad
  ADD PRIMARY KEY (`top_ad_id`);

--
-- Indexes for table xm_products
--
ALTER TABLE xm_products
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table xm_products_family
--
ALTER TABLE xm_products_family
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table xm_user
--
ALTER TABLE xm_user
  ADD PRIMARY KEY (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT banner_auto
--
ALTER TABLE banner_auto
  MODIFY `banner_auto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT top_ad
--
ALTER TABLE top_ad
  MODIFY `top_ad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT xm_products
--
ALTER TABLE xm_products
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT xm_products_family
--
ALTER TABLE xm_products_family
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT xm_user
--
ALTER TABLE xm_user
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

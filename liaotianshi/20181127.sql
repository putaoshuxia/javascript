/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : 20181127

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2018-12-08 17:25:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_table`
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_table
-- ----------------------------

-- ----------------------------
-- Table structure for `msg_table`
-- ----------------------------
DROP TABLE IF EXISTS `msg_table`;
CREATE TABLE `msg_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `message` varchar(500) NOT NULL,
  `data` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of msg_table
-- ----------------------------

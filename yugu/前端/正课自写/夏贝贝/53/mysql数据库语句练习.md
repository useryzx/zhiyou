```Microsoft Windows [版本 10.0.18363.720]
(c) 2019 Microsoft Corporation。保留所有权利。

C:\WINDOWS\system32>mysql -u root -p
Enter password: ****
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.19 MySQL Community Server - GPL

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases
    -> ;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| yugu               |
+--------------------+
5 rows in set (0.01 sec)

mysql> create database ohuo
    -> ;
Query OK, 1 row affected (0.01 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| ohuo               |
| performance_schema |
| sys                |
| yugu               |
+--------------------+
6 rows in set (0.00 sec)

mysql> use ohuo
Database changed
mysql> create table if not exists People(id INT PRMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT)
    -> ;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'PRMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT)' at line 1
mysql> create table if not exists People(id INT PRMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT)；
    -> ^Z^Z^C
mysql> create table if not exists People(id INT PRMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'PRMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT)' at line 1
mysql> create table if not exists People(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(32),age INT);
Query OK, 0 rows affected (0.01 sec)

mysql> drop table ohuo
    -> ;
ERROR 1051 (42S02): Unknown table 'ohuo.ohuo'
mysql> drop ohuo;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'ohuo' at line 1
mysql> drop table ohuo;
ERROR 1051 (42S02): Unknown table 'ohuo.ohuo'
mysql> drop table people
    -> ;
Query OK, 0 rows affected (0.01 sec)

mysql> create table if not exists People(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(32) NOT NULL UNIQUE,age INT);
Query OK, 0 rows affected (0.01 sec)

mysql> INSERT INTO People(name,age) values('yugu',25);
Query OK, 1 row affected (0.01 sec)

mysql> INSERT INTO People(name,age) VALUES('夏贝贝',30);
Query OK, 1 row affected (0.00 sec)

mysql> select * from People
    -> ;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  1 | yugu      |   25 |
|  2 | 夏贝贝    |   30 |
+----+-----------+------+
2 rows in set (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES("瞎了",12);
Query OK, 1 row affected (0.00 sec)

mysql>  select * from People;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  1 | yugu      |   25 |
|  2 | 夏贝贝    |   30 |
|  3 | 瞎了      |   12 |
+----+-----------+------+
3 rows in set (0.00 sec)

mysql> INSERT INTO People (name,age) VALUES ('夏贝',30);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People (name,age) VALUES ("夏贝啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a0啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES("夏贝0啊",30);
Query OK, 1 row affected (0.00 sec)

mysql>  select * from People;
+----+-------------+------+
| id | name        | age  |
+----+-------------+------+
|  1 | yugu        |   25 |
|  2 | 夏贝贝      |   30 |
|  3 | 瞎了        |   12 |
|  4 | 夏贝        |   30 |
|  5 | 夏贝啊      |   30 |
|  6 | 夏贝a0啊    |   30 |
|  7 | 夏贝0啊     |   30 |
+----+-------------+------+
7 rows in set (0.00 sec)

mysql> mysql -v
    -> ;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'mysql -v' at line 1
mysql> mysql -v;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'mysql -v' at line 1
mysql> --help;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '--help' at line 1
mysql> cls;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'cls' at line 1
mysql> desc People
    -> ;
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int         | NO   | PRI | NULL    | auto_increment |
| name  | varchar(32) | NO   | UNI | NULL    |                |
| age   | int         | YES  |     | NULL    |                |
+-------+-------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> SELECT 'yugu' FROM `ohuo`.`people`;
+------+
| yugu |
+------+
| yugu |
| yugu |
| yugu |
| yugu |
| yugu |
| yugu |
| yugu |
| yugu |
| yugu |
| yugu |
+------+
10 rows in set (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a0aaaaaa啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a0aaaa啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a0aaa哈哈哈哈a啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a0a哈哈哈a啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> select name,age from People
    -> ;
+-----------------------------+------+
| name                        | age  |
+-----------------------------+------+
| yugu                        |   25 |
| 夏贝贝                      |   30 |
| 瞎了                        |   12 |
| 夏贝                        |   30 |
| 夏贝啊                      |   30 |
| 夏贝a0啊                    |   30 |
| 夏贝0啊                     |   30 |
| 夏贝贝啊啊啊啊              |   30 |
| 夏贝啊啊啊啊                |   30 |
| 夏贝啊啊啊a  啊             |   30 |
| 夏贝a0aaaaaa啊              |   30 |
| 夏贝a0aaaa啊                |   30 |
| 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 夏贝a0a哈哈哈a啊            |   30 |
+-----------------------------+------+
14 rows in set (0.00 sec)

mysql> select '夏’ from People;
    '> ;
    '> ^C
mysql> ^C
mysql> select '夏’ from  People;
    '> ^C
mysql> select * from People where name='夏贝贝';
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  2 | 夏贝贝    |   30 |
+----+-----------+------+
1 row in set (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a啊",30);
Query OK, 1 row affected (0.00 sec)

mysql> select * from People where name='夏贝贝'AND age<30;
Empty set (0.00 sec)

mysql> select * from People where name='夏贝贝'AND age=30;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  2 | 夏贝贝    |   30 |
+----+-----------+------+
1 row in set (0.00 sec)

mysql> select * from People where name='%贝'AND age=30;
Empty set (0.00 sec)

mysql> select * from People where name LIKE '%贝'AND age=30;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  2 | 夏贝贝    |   30 |
|  4 | 夏贝      |   30 |
+----+-----------+------+
2 rows in set (0.00 sec)

mysql> select * from People where name LIKE '夏%'AND age=30;
+----+-----------------------------+------+
| id | name                        | age  |
+----+-----------------------------+------+
|  2 | 夏贝贝                      |   30 |
|  4 | 夏贝                        |   30 |
|  5 | 夏贝啊                      |   30 |
|  6 | 夏贝a0啊                    |   30 |
|  7 | 夏贝0啊                     |   30 |
|  8 | 夏贝贝啊啊啊啊              |   30 |
| 11 | 夏贝啊啊啊啊                |   30 |
| 12 | 夏贝啊啊啊a  啊             |   30 |
| 13 | 夏贝a0aaaaaa啊              |   30 |
| 14 | 夏贝a0aaaa啊                |   30 |
| 15 | 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 16 | 夏贝a0a哈哈哈a啊            |   30 |
| 17 | 夏贝a啊                     |   30 |
+----+-----------------------------+------+
13 rows in set (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝a啊",350);
ERROR 1062 (23000): Duplicate entry '夏贝a啊' for key 'people.name'
mysql> INSERT INTO People(name,age) VALUES ("夏贝aa啊",350);
Query OK, 1 row affected (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("夏贝aaa啊",2350);
Query OK, 1 row affected (0.00 sec)

mysql> select * from People order by age desc
    -> ;
+----+-----------------------------+------+
| id | name                        | age  |
+----+-----------------------------+------+
| 20 | 夏贝aaa啊                   | 2350 |
| 19 | 夏贝aa啊                    |  350 |
|  2 | 夏贝贝                      |   30 |
|  4 | 夏贝                        |   30 |
|  5 | 夏贝啊                      |   30 |
|  6 | 夏贝a0啊                    |   30 |
|  7 | 夏贝0啊                     |   30 |
|  8 | 夏贝贝啊啊啊啊              |   30 |
| 11 | 夏贝啊啊啊啊                |   30 |
| 12 | 夏贝啊啊啊a  啊             |   30 |
| 13 | 夏贝a0aaaaaa啊              |   30 |
| 14 | 夏贝a0aaaa啊                |   30 |
| 15 | 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 16 | 夏贝a0a哈哈哈a啊            |   30 |
| 17 | 夏贝a啊                     |   30 |
|  1 | yugu                        |   25 |
|  3 | 瞎了                        |   12 |
+----+-----------------------------+------+
17 rows in set (0.00 sec)

mysql> select * from People order by age asc;
+----+-----------------------------+------+
| id | name                        | age  |
+----+-----------------------------+------+
|  3 | 瞎了                        |   12 |
|  1 | yugu                        |   25 |
|  2 | 夏贝贝                      |   30 |
|  4 | 夏贝                        |   30 |
|  5 | 夏贝啊                      |   30 |
|  6 | 夏贝a0啊                    |   30 |
|  7 | 夏贝0啊                     |   30 |
|  8 | 夏贝贝啊啊啊啊              |   30 |
| 11 | 夏贝啊啊啊啊                |   30 |
| 12 | 夏贝啊啊啊a  啊             |   30 |
| 13 | 夏贝a0aaaaaa啊              |   30 |
| 14 | 夏贝a0aaaa啊                |   30 |
| 15 | 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 16 | 夏贝a0a哈哈哈a啊            |   30 |
| 17 | 夏贝a啊                     |   30 |
| 19 | 夏贝aa啊                    |  350 |
| 20 | 夏贝aaa啊                   | 2350 |
+----+-----------------------------+------+
17 rows in set (0.00 sec)

mysql> select * from People limit 2,2
    -> ;
+----+--------+------+
| id | name   | age  |
+----+--------+------+
|  3 | 瞎了   |   12 |
|  4 | 夏贝   |   30 |
+----+--------+------+
2 rows in set (0.00 sec)

mysql> select * from People limit 1,3
    -> ;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  2 | 夏贝贝    |   30 |
|  3 | 瞎了      |   12 |
|  4 | 夏贝      |   30 |
+----+-----------+------+
3 rows in set (0.00 sec)

mysql> select * from People limit 0,2;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  1 | yugu      |   25 |
|  2 | 夏贝贝    |   30 |
+----+-----------+------+
2 rows in set (0.00 sec)

mysql> select * from People;
+----+-----------------------------+------+
| id | name                        | age  |
+----+-----------------------------+------+
|  1 | yugu                        |   25 |
|  2 | 夏贝贝                      |   30 |
|  3 | 瞎了                        |   12 |
|  4 | 夏贝                        |   30 |
|  5 | 夏贝啊                      |   30 |
|  6 | 夏贝a0啊                    |   30 |
|  7 | 夏贝0啊                     |   30 |
|  8 | 夏贝贝啊啊啊啊              |   30 |
| 11 | 夏贝啊啊啊啊                |   30 |
| 12 | 夏贝啊啊啊a  啊             |   30 |
| 13 | 夏贝a0aaaaaa啊              |   30 |
| 14 | 夏贝a0aaaa啊                |   30 |
| 15 | 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 16 | 夏贝a0a哈哈哈a啊            |   30 |
| 17 | 夏贝a啊                     |   30 |
| 19 | 夏贝aa啊                    |  350 |
| 20 | 夏贝aaa啊                   | 2350 |
+----+-----------------------------+------+
17 rows in set (0.00 sec)

mysql> select * from People limit 10,2
    -> ;
+----+-------------------+------+
| id | name              | age  |
+----+-------------------+------+
| 13 | 夏贝a0aaaaaa啊    |   30 |
| 14 | 夏贝a0aaaa啊      |   30 |
+----+-------------------+------+
2 rows in set (0.00 sec)

mysql> select max(age) from People;
+----------+
| max(age) |
+----------+
|     2350 |
+----------+
1 row in set (0.00 sec)

mysql> select min(age) from People;
+----------+
| min(age) |
+----------+
|       12 |
+----------+
1 row in set (0.00 sec)

mysql> select * from People where age=(select min(age) from People;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 1
mysql> select * from People where age=(select min(age) from People);
+----+--------+------+
| id | name   | age  |
+----+--------+------+
|  3 | 瞎了   |   12 |
+----+--------+------+
1 row in set (0.00 sec)

mysql> select * from People where min(age);
ERROR 1111 (HY000): Invalid use of group function
mysql> update People SET name='刘德华',age=55 where id=6;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> edsc People
    -> ;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'edsc People' at line 1
mysql> desc People
    -> ;
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int         | NO   | PRI | NULL    | auto_increment |
| name  | varchar(32) | NO   | UNI | NULL    |                |
| age   | int         | YES  |     | NULL    |                |
+-------+-------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> select * from People;
+----+-----------------------------+------+
| id | name                        | age  |
+----+-----------------------------+------+
|  1 | yugu                        |   25 |
|  2 | 夏贝贝                      |   30 |
|  3 | 瞎了                        |   12 |
|  4 | 夏贝                        |   30 |
|  5 | 夏贝啊                      |   30 |
|  6 | 刘德华                      |   55 |
|  7 | 夏贝0啊                     |   30 |
|  8 | 夏贝贝啊啊啊啊              |   30 |
| 11 | 夏贝啊啊啊啊                |   30 |
| 12 | 夏贝啊啊啊a  啊             |   30 |
| 13 | 夏贝a0aaaaaa啊              |   30 |
| 14 | 夏贝a0aaaa啊                |   30 |
| 15 | 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 16 | 夏贝a0a哈哈哈a啊            |   30 |
| 17 | 夏贝a啊                     |   30 |
| 19 | 夏贝aa啊                    |  350 |
| 20 | 夏贝aaa啊                   | 2350 |
+----+-----------------------------+------+
17 rows in set (0.00 sec)

mysql> delete * from People where id=8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '* from People where id=8' at line 1
mysql> delete from People where id=8;
Query OK, 1 row affected (0.00 sec)

mysql> select * from People;
+----+-----------------------------+------+
| id | name                        | age  |
+----+-----------------------------+------+
|  1 | yugu                        |   25 |
|  2 | 夏贝贝                      |   30 |
|  3 | 瞎了                        |   12 |
|  4 | 夏贝                        |   30 |
|  5 | 夏贝啊                      |   30 |
|  6 | 刘德华                      |   55 |
|  7 | 夏贝0啊                     |   30 |
| 11 | 夏贝啊啊啊啊                |   30 |
| 12 | 夏贝啊啊啊a  啊             |   30 |
| 13 | 夏贝a0aaaaaa啊              |   30 |
| 14 | 夏贝a0aaaa啊                |   30 |
| 15 | 夏贝a0aaa哈哈哈哈a啊        |   30 |
| 16 | 夏贝a0a哈哈哈a啊            |   30 |
| 17 | 夏贝a啊                     |   30 |
| 19 | 夏贝aa啊                    |  350 |
| 20 | 夏贝aaa啊                   | 2350 |
+----+-----------------------------+------+
16 rows in set (0.00 sec)

mysql> INSERT INTO People(name,age) VALUES ("aaa夏贝a啊",30) where id=8;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'where id=8' at line 1
mysql>
```


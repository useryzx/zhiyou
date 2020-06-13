### git是一个分布式代码版本管理工具（SVN集中式），能够对项目进行版本管理并方便多人进行合作开发。
### git安装之后首次使用之前，需要配置用户名和邮箱地址。



``` shell
    git config --global user.name yugu 
    git config --global user.email xxxx@xx.com
```



### 使用git管理某个项目，需要在某项目根目录下初始化git

```shell
git init
```

### git常用命令

```shell
git status
```

查看本地仓库状态

```shell
git add filename
```

添加追踪文件，或将文件的修改添加暂存区

```shell
git commit -m xxxxx
```

提交新版本到工作区


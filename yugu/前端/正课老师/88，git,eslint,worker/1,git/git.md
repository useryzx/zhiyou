### git是一个分布式代码版本管理工具，(SVN)能够对项目进行版本管理并方便多人合作开发。



### git安装之后首次使用之前，需要配置用户名和邮箱地址。



``` shell
git config --global user.name sunhuayu
git config --global user.email sunhuayu
```





### 使用git管理某个项目，需要在项目根目录下初始化git。

```shell
git init
```

初始化成功之后，项目根目录下会创建一个名为.git的隐藏文件夹，这个文件夹中存储的是项目的各个版本的信息，由git进行管理和使用，不要手动修改这个文件夹。



### git常用命令

```shell
git status
```

查询当前项目git状态。

```she
git add .
```

添加追踪文件，或将文件的修改存入暂存区

```shell
git commit -m xxxxxxxxx
```

提交新版本



```shell
git reset --hard xxxxxx
```

还原到某个版本



```shell
git log
```

查询所有版本



```shell
git checkout -- xxxxxx.xxx
```

将某个文件还原为暂存区中的状态



### git对于版本信息，只记录修改，不记录内容。



### 项目根目录下可以添加.gitignore文件，用于设置不需要git管理的文件



---

### git版本管理，还可以使用远程库，方便多人合作开发，多个开发人员从同一个远程库clone项目，然后将开发的代码push到远程库中实现代码的合并。

* 必须保证本地库和远程库版本一致才能push，所以在push之前要先pull(fetch+merge)

* 当多人编辑同一个文件时，如果A先提交，B再提交，B无法提交，而且pull之后合并代码时会产生冲突，需要解决冲突之后才能提交。





### git仓库可以使用分支功能，将版本开发在某个分支上进行，开发按完成之后合并到主干上。

* git仓库创建之后默认只有master分支(主干).
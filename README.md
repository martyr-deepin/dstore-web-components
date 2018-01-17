# 关于
这个项目用于存放第三方依赖库, 比如 golang 包或者 npm 包. 为了解决这些问题:
* cr 打包时, 每次都从上游拉取依赖, 太费时.
* 控制第三方依赖的更新.
* 不需要将第三方包放到本项目内.

# 用法
以 deepin-manual 为例来说明.
deepi-manual 前端页面, 依赖了十几个 npm 包.

## 创建项目分支
在本项目中创建对应的项目分支:
```shell
cd /PATH/TO/vendor-deps
git checkout master
git checkout -b deepin-manual
git push -u origin deepin-manual
```
最终将本地的 `deepin-manual` 分支推送到服务器上去.

## 在自己项目中加入 submodule
把 vendor-deps 项目定位到 src/web/node_modules/, 这样的话, vendor-deps 里面只需要保存
所有的 npm 包即可.
```shell
cd /PATH/TO/deepin-manual
git submodule add -f https://cr.deepin.io/vendor-deps src/web/node_modules
```

现在, 来修改 vendor-deps, 使用 `deepin-manual`分支.
```ini
[submodule "src/web/node_modules"]
	path = src/web/node_modules
	url = https://cr.deepin.io/vendor-deps
```
修改之后:
```ini
[submodule "src/web/node_modules"]
	path = src/web/node_modules
	url = https://cr.deepin.io/vendor-deps
	branch = deepin-manual

```

最后, 拉取 vendor-deps 内容.
```shell
git submodule update --init --recursive
git submodule update --remote
```

## 更新 vendor-deps 中的依赖包
当vendor-deps 被加入到项目之后, 在 deepin-manual 项目里, 安装或者更新 npm 包.

`src/web/package.json` 文件里面已经写好了包依赖.

```shell
cd /PATH/TO/deepin-manual/src/web
npm install
```

这时, node_modules 目录就被更新了. 但还需要把这些更新推送到 vendor-deps 项目里.
```shell
cd /PATH/TO/vendor-deps
git checkout deepin-manual
rsync -av /PATH/TO/deepin-manual/src/web/node_modules/ .
git add .
git commit -m "deepin-manual: Update deps"
git push
```
在以后的操作中, 如果需要更新依赖包的版本, 可以用上面的操作来处理.

## 以后在自己项目中更新
```shell
cd /PATH/TO/deepin-manual
git submodule update --remote
```

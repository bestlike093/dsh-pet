# 素材授权与使用边界

## 来源

`assets/cyrene` 下的立绘、frames、表情、贴纸与音效，来自本仓库作者本人的项目 `bestlike093/cyrene-balance`（commit `c54d9f6`），均为作者自绘 / 自制。

> 早期自制的 `whale-girl-emoji` / `whale-girl-emoji-soft` / `whale-girl-stand` 已从本仓库移除，
> 不作为默认素材，也不随包。默认渲染只认 `assets/cyrene`。

## 使用范围

- 默认素材只用 `assets/cyrene` 里的立绘、帧、表情与贴纸。
- 完整 Live2D 形象需要另行提供分层源文件；模型文件不得随包，只能由用户导入到 `userData/models`。
- `assets-gen/source/` 是归档源图，`assets/` 是构建时由 `scripts/build-assets.mjs` 生成的运行时副本，两者内容一致、只保留一份进包。

## 目录分工

- `assets/` 只放运行时真正要读的文件。`electron-builder` 打包 `assets/**`，这里的每个文件都会进发布包。
- `assets-gen/` 是源图归档，不随包。渲染代码不读这个目录。
- `electron-builder.yml` 额外排除 `*.moc3`、`*.model3.json`、`*.physics3.json`、`*.motion3.json`，`scripts/check-package.mjs` 会对产物再做一次断言。

## 发布限制

- 自制素材可以随包，但每次发布前需要在发布清单里确认一次；不能因为「已经进了仓库」就默认进发布包。
- 第三方版权素材与任何模型文件（`.moc3` / `.model3.json` / 纹理目录）不得进入发布包。
- `samples/`、`ref/`、`preview.html`、`broken-404*`、`sheet-whale-2f*` 不属于运行时素材，`scripts/check-assets-license.mjs` 一旦在 `assets/` 下发现它们就直接判失败。

## 授权

作者自绘 / 自制的素材可由本项目自由使用、修改并随包分发，不再逐次确认；向本项目之外的第三方再分发时，仍以作者说明为准。

## 新增素材的规矩

新增目录前先在这里补一行来源与授权说明，再放图片。`scripts/check-assets-license.mjs` 会核对目录名是否出现在本文件中，没有说明的目录直接判失败。

# Code signing policy

Free code signing provided by [SignPath.io](https://about.signpath.io), certificate by [SignPath Foundation](https://signpath.org).

本页按 SignPath Foundation 的要求，说明本项目的签名范围、团队角色、构建来源与隐私约定。

## 签名范围

只签本项目仓库源码构建出的 Windows 产物：

| 产物 | 说明 |
| --- | --- |
| NSIS 安装包 | 发布到 GitHub Releases 的主安装包 |
| 安装包内的可执行文件与主进程脚本 | 由同一份 CI 构建产出 |

不签任何第三方上游二进制。依赖树里的第三方库按其自身许可分发，不出现在本项目的签名范围内。

## 团队与角色

单人维护的项目，角色按 SignPath 的定义如实声明：

| 角色 | 成员 | 职责 |
| --- | --- | --- |
| Authors（可直接提交） | [@bestlike093](https://github.com/bestlike093) | 修改源码、构建脚本与 CI 配置 |
| Reviewers | [@bestlike093](https://github.com/bestlike093) | 非提交者的 PR 合并前必须经过 review |
| Approvers | [@bestlike093](https://github.com/bestlike093) | 批准每一次签名请求 |

所有成员对 GitHub 账号启用双因素认证。

## 构建来源

签名产物必须能在源码层面复现：

- 构建在 GitHub Actions 的 `windows-latest` 上执行，工作流是 [`.github/workflows/build-installer.yml`](.github/workflows/build-installer.yml)。
- 工作流、构建脚本、`pnpm-lock.yaml` 都在本仓库内，随版本一起审阅。
- 不从网络拉取预编译二进制参与打包；运行时素材已经随仓库提交（原因见 `.gitignore` 注释）。

## 隐私

**This program will not transfer any information to other networked systems unless specifically requested by the user or the person installing or operating it.**

具体到实现：

- 所有联网能力默认关闭。安装完成后不做任何外部请求。
- 只有使用者主动开启对应功能后，才会向相应服务发送必要的请求：

| 功能 | 目标 | 发送内容 |
| --- | --- | --- |
| 对话 | DeepSeek API（端点写死在主进程） | 使用者自己填写的 Key、对话上下文 |
| 语音合成（云端） | 使用者自己填写的接口地址 | 待朗读文本 |
| 语音合成（本地） | `127.0.0.1` 回环地址 | 待朗读文本 |
| 天气 | open-meteo 免密钥接口 | 使用者设置的城市 |
| 余额查询 | 使用者自己填写的 API | 使用者自己填写的 Key |

- 不包含遥测、崩溃上报、使用统计或任何后台回传。
- 密钥加密存储在本机，界面只显示掩码，不写入日志、错误信息或导出文件。
- 数据落盘位置见 README 的「数据放在哪」一节。

## 安装与卸载

- 通过 NSIS 安装包安装，安装程序提供标准卸载入口（设置 → 应用 → 卸载，或开始菜单中的卸载项）。
- 卸载会移除程序目录；用户数据目录（`userData`）按 Windows 惯例保留，可由使用者自行删除。

## 接入状态

申请 SignPath Foundation 免费订阅所需的仓库侧条件已经具备：

- OSI 许可（MIT），无商业双授权
- 公开仓库，全部组件开源
- 持续维护，CI 覆盖构建与测试
- 本页面的签名策略与角色声明声明
- 构建在 CI 中完成，可验证来源

尚待完成：SignPath 审核通过后填入组织、项目、签名策略与产物配置标识，并把签名步骤接入发布工作流。

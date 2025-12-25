## VSCode 中禁止运行脚本问题

在 VSCode 的内置终端中执行 `npm` 等命令时，可能会提示 `在此系统上禁止运行脚本` 的错误。

此时我们需要以管理员身份打开 `powershell`，执行如下命令即可。

```bash
set-ExecutionPolicy RemoteSigned
```
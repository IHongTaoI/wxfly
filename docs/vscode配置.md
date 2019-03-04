```json
{
  // 控制边栏的位置。它可显示在工作台的左侧或右侧。
  "editor.formatOnType": false,
  "workbench.sideBar.location": "right",
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
  "workbench.colorTheme": "Monokai",
  "git.enableSmartCommit": true,
  "editor.wordWrap": "on",
  "search.followSymlinks": false,
  "editor.lineNumbers": "on", //开启行数提示
  "editor.quickSuggestions": {
    //开启自动显示建议
    "other": true,
    "comments": true,
    "strings": true
  },
  "editor.tabSize": 2,
  "editor.renderWhitespace": "boundary",
  "editor.autoClosingBrackets": "beforeWhitespace",
  "editor.autoClosingQuotes": "beforeWhitespace",
  "editor.cursorBlinking": "expand",
  "editor.roundedSelection": false,
  "workbench.editor.tabSizing": "shrink",
  "workbench.iconTheme": "vs-seti",
  "editor.formatOnPaste": false,
  "editor.formatOnSave": false,
  "java.errors.incompleteClasspath.severity": "info",
  "window.zoomLevel": 0.1,
  "prettier.singleQuote": true,
  "workbench.startupEditor": "welcomePage",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-expand-multiline"
    },
    "prettyhtml": {
      "printWidth": 100,
      "singleQuote": false,
      "wrapAttributes": false,
      "sortAttributes": false
    },
    "prettier": {
      "singleQuote": true,
      "semi": false
    }
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    {
      "language": "html",
      "autoFix": true
    }
  ],
  "javascript.preferences.quoteStyle": "single",
}
```
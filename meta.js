module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "项目名称"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "项目描述",
      "default": "A mithril project"
    },
    "author": {
      "type": "string",
      "message": "作者"
    }
  },
  "completeMessage": "开始你的项目:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\n"
};

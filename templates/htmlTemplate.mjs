

export default function renderHTML(content, css) {
  return `<html>
  <header>
    <style>
      ${css}
      .markdown-body {
        padding: 80px;
        max-width: 1000px;
        margin: 0 auto;

        --color-accent-fg: #f00;
      }
    </style>
  </head>
  <body class="markdown-body">
    ${content}
  </body>
</html>`;
}
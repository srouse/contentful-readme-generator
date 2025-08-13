export default function renderHTML(content, css) {
    return `<html>
      <header>
        <style>
          :root {
            --base-size-16: 16px;
            --base-size-24: 24px;
          }
          ${css}

          .markdown-body {
            padding: 80px;
            max-width: 1000px;
            margin: 0 auto;
    
            --color-accent-fg: #f00;
          }

          .markdown-body .edit-link {
            font-size: 11px;
            color: #aaa;
            margin: 0px;
          }

          .markdown-body .build-information {
            font-size: 11px;
            color: #aaa;
          }

          .markdown-body .build-information * {
            margin: 0px;
          }

          h2, h3, h4 {
            margin-top: 30px;
          }
        </style>
      </head>
      <body class="markdown-body">
        ${content}
      </body>
    </html>`;
}
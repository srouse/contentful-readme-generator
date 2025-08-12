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
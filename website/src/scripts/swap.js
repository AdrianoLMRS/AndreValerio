// public/scripts/custom-swap.js

let preservedIframes = new Map();

window.addEventListener('astro:before-swap', (event) => {
    // Substitui a função swap padrão
    event.swap = () => {
        const newDoc = event.newDocument;

        // Captura todos os iframes com data-__swap-persist__
        document.querySelectorAll('[data-__swap-persist__]').forEach((elements) => {
            const placeholder = document.createElement('div');
            placeholder.setAttribute('data-iframe-placeholder', '');
            elements.replaceWith(placeholder);
            preservedIframes.set(placeholder, elements);
        });

        // Realiza o swap padrão
        const html = document.documentElement;
        const newHtml = newDoc.documentElement;

        // Substitui atributos do <html>
        [...newHtml.attributes].forEach((attr) => html.setAttribute(attr.name, attr.value));

        // Substitui o conteúdo do <head>
        const newHead = newHtml.querySelector('head');
        const currentHead = html.querySelector('head');
        currentHead.replaceWith(newHead.cloneNode(true));

        // Substitui o conteúdo do <body>
        const newBody = newHtml.querySelector('body');
        const currentBody = html.querySelector('body');
        currentBody.replaceWith(newBody.cloneNode(true));

        // Restaura os iframes preservados
        document.querySelectorAll('[data-iframe-placeholder]').forEach((placeholder) => {
            const originalIframe = preservedIframes.get(placeholder);
            if (originalIframe) {
                placeholder.replaceWith(originalIframe);
            }
        });

        preservedIframes.clear();
    };
});

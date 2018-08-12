import ejs from 'ejs';

function getTemplatePath(templateName) {
  return `${__dirname}/../../public/${templateName}.ejs`;
}

function renderTemplate(templateName, payload) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(getTemplatePath(templateName), payload, (error, str) => {
      if (error) {
        console.error('template render failed:', error);
        reject(error);
      }
      resolve(str);
    });
  });
}


export { getTemplatePath, renderTemplate };

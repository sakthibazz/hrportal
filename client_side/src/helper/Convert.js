
export default function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
}

export async function downloadResume(resumeUrl) {
  if (resumeUrl !== 'N/A') {
    // Logic to initiate the download using the provided resumeUrl
    // For example, you can create an anchor element and simulate a click to download the file.
    var link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'file.pdf'; // You can set the desired file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Handle the case when the resume is not available
    alert('File not available for download.');
  }
};
export function viewResumeInPDF(base64Data) {
  if (base64Data !== 'N/A') {
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(`
      <html>
        <head>
          <title>Job Desripton</title>
        </head>
        <body>
          <iframe width="100%" height="100%" src="${base64Data}" type="application/pdf"></iframe>
        </body>
      </html>
    `);
    pdfWindow.document.close();
  } else {
    alert('Resume not available for viewing.');
  }
}






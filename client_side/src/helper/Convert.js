import { getDocument } from 'pdfjs-dist/build/pdf'; 
// convert image into base 64 format

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
    link.download = 'resume.pdf'; // You can set the desired file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Handle the case when the resume is not available
    alert('Resume not available for download.');
  }
};

// convert Pdf resumes
export async function convertPdfToString(file) {
  try {
    const loadingTask = getDocument(file);
    const pdf = await loadingTask.promise;

    const textContent = await getPageText(pdf, 1, pdf.numPages);

    return textContent;
  } catch (error) {
    console.error('Error converting PDF to string:', error);
    return null;
  }
}

async function getPageText(pdf, currentPage, totalPages, textContent = '') {
  if (currentPage > totalPages) {
    return textContent;
  }

  const page = await pdf.getPage(currentPage);
  const pageText = await page.getTextContent();
  const pageStrings = pageText.items.map(item => item.str);
  const pageContent = pageStrings.join(' ');

  textContent += pageContent;

  return getPageText(pdf, currentPage + 1, totalPages, textContent);
}




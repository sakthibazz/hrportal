  // Add IDs to your tech stack options
 export const techStackOptions = [
    { value: 'DotNet', label: 'DotNet' },
    { value: 'SAP', label: 'SAP' },
    { value: 'DataEngineering', label: 'Data Engineering' },
    { value: 'PowerBI', label: 'Power BI' },
    { value: 'DBDeveloper', label: 'DB Developer' },
    { value: 'DataScientist', label: 'Data Scientist' },
    { value: 'TestingManual', label: 'Testing (Manual Testing)' },
    { value: 'TestingAutomation', label: 'Testing (Automation Testing)' },
    { value: 'WebFullStack', label: 'Web Full Stack' },
    // Add more options as needed
  ];

  export const jobModeOptions = [
  { value: 'FTE', label: 'FTE' },
  { value: 'Contract', label: 'Contract' },
  { value: 'C2H', label: 'C2H' },
];

export const modeOptions = [
  { value: 'Work from Home', label: 'Work from Home' },
  { value:  'Work from Office', label: 'Work from Office' },
  { value: 'Hybrid', label: 'Hybrid' },
];
export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%', // Adjust the width as needed
      borderColor: state.isFocused ? 'yellow' : 'gray', // Border color on focus
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightblue' : 'white', // Background color on hover/focus
      color: state.isFocused ? 'blue' : 'black', // Text color on hover/focus
    }),
    // Add more custom styles as needed
  };
  
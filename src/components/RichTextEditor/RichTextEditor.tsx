// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import styles

// function RichTextEditor() {
//   const [text, setTex] = useState("");
//   const handleChange = () => {
//     const textOnly = text.replace(/<[^>]*>/g, "");
//     console.log(textOnly.length);
//     return textOnly.length;
//   };

//   const handleEditorChange = (content: React.SetStateAction<string>) => {
//     setText(content);
//   };

//   return (
//       <ReactQuill
//         value={text}
//         onChange={handleEditorChange}
//         placeholder="Write something..."
//       />
//   );
// }

// export default RichTextEditor;


// ... other imports ...




// import { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// interface RichTextEditorProps {
//   value: string;
//   onChange: (content: string) => void;
// }

// function RichTextEditor({ value, onChange }: RichTextEditorProps) {
//       const [text] = useState("");

//   const handleChange = (content: string) => {
//     const textOnly = text.replace(/<[^>]*>/g, "");
//         console.log(textOnly.length);
//         return textOnly.length;   
//          onChange(content);
//   };

//   return (
//     <ReactQuill
//       value={value}
//       onChange={handleChange}
//       placeholder="Write something..."
//     />
//   );
// }

// export default RichTextEditor;




import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

function RichTextEditor() {
  const [text, setText] = useState('');
  // const maxCharacters = 50;
  

  // const handleChange = () => {
  //  console.log(textOnly.length);
  //   return textOnly.length;
  // };


  
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    const textOnly = text.replace(/<[^>]*>/g, '');
    return textOnly.length;


    setText(content);
  };

  const handleReset = () => {
    setText('');
  };


  return (
    <div>
        <ReactQuill
          value={text}
          onChange={handleEditorChange}
          placeholder="Enter Your Task..."
        />
        <div className='flex justify-between text-neutral-500'>
          {/* <div>
            {handleChange()}
            </div> */}
          <button
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
   
  );
}

export default RichTextEditor;
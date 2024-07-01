import React, { useState } from 'react';
import MonacoEditorComponent from '../MonacoEditor/MonacoEditor';
import JDoodleService from '../../services/jdoodleService';
import './IDE.css';
import { FaPython, FaJava, FaJs, FaPhp } from 'react-icons/fa';
import { FaC } from 'react-icons/fa6';
import { SiCplusplus, SiRuby, SiGo } from "react-icons/si";

const IDE = () => {
    const [code, setCode] = useState('print("Hello World")');
    const [language, setLanguage] = useState('python3');
    const [versionIndex, setVersionIndex] = useState('3');
    const [fileName, setFileName] = useState('main.py');
    const [output, setOutput] = useState('');

    const handleRunCode = async () => {
        const result = await JDoodleService.executeCode(language, versionIndex, code);
        setOutput(result.output);
    };

    const clearOutput = () => {
        setOutput('');
    };

    const handleLanguageChange = (newLanguage, newVersionIndex, newCode, fileName) => {
        setOutput('');
        setLanguage(newLanguage);
        setVersionIndex(newVersionIndex);
        setCode(newCode);
        setFileName(fileName);
    };

    const renderLanguageIcons = () => {
        const languages = [
            { 
                icon: <FaPython size="30px" style={{ padding: "5px" }} />, 
                language: 'python3', 
                versionIndex: '3', 
                fileName: 'main.py', 
                code: 'print("Hello World")' 
            },
            { 
                icon: <FaJava size="30px" style={{ padding: "5px" }} />, 
                language: 'java', 
                versionIndex: '4', 
                fileName: 'Main.java', 
                code: 'public class Main { \n    public static void main(String[] args) { \n        System.out.println("Hello World"); \n    } \n}' 
            },
            { 
                icon: <FaJs size="30px" style={{ padding: "5px" }} />, 
                language: 'nodejs', 
                versionIndex: '3', 
                fileName: 'main.js', 
                code: 'console.log("Hello World");' 
            },
            { 
                icon: <SiCplusplus size="30px" style={{ padding: "5px" }} />, 
                language: 'cpp17', 
                versionIndex: '1', 
                fileName: 'main.cpp', 
                code: '#include <iostream>\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}' 
            },
            { 
                icon: <FaC size="30px" style={{ padding: "5px" }} />, 
                language: 'c', 
                versionIndex: '4', 
                fileName: 'main.c', 
                code: '#include <stdio.h>\nint main() {\n    printf("Hello World");\n    return 0;\n}' 
            },
            { 
                icon: <FaPhp size="30px" style={{ padding: "5px" }} />, 
                language: 'php', 
                versionIndex: '3', 
                fileName: 'main.php', 
                code: '<?php\necho "Hello World";\n?>' 
            },
            { 
                icon: <SiRuby size="30px" style={{ padding: "5px" }} />, 
                language: 'ruby', 
                versionIndex: '3', 
                fileName: 'main.rb', 
                code: 'puts "Hello World"' 
            },
            { 
                icon: <SiGo size="30px" style={{ padding: "5px" }} />, 
                language: 'go', 
                versionIndex: '3', 
                fileName: 'main.go', 
                code: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello World")\n}' 
            },
        ];
    
        // Render the icons and handle language change on click.
        return languages.map((lang, index) => (
            <div key={index} className='sidebar__icon' onClick={() => handleLanguageChange(lang.language, lang.versionIndex, lang.code, lang.fileName)}>
                {lang.icon}
            </div>
        ));
    };
    


    return (
        <>
            <div className='sidebar'>
                {renderLanguageIcons()}
            </div>
            <div className='editor-container'>
                <div className='editor-container__header'>
                    <div className='editor-container__filename'>{fileName}</div>
                    <div className='editor-container__controls'>
                        <button className="editor-container__run-button" onClick={handleRunCode}>
                            <span className="run-text">&nbsp;Run&nbsp;Code&nbsp;</span>
                        </button>
                    </div>
                </div>
                <div className='editor'>
                    <MonacoEditorComponent language={language} code={code} setCode={setCode} />
                </div>
            </div>
            <div className='output-container'>
                <div className='output-container__header'>
                    <div className='output-container__title'>Output</div>
                    <button className="output-container__clear-button" onClick={clearOutput}>
                        <span className="clear-text">&nbsp;Clear&nbsp;</span>
                    </button>
                </div>
                <div className='output-container__content'>
                    <div className='output-display'>{output}</div>
                </div>
            </div>
        </>
    );
};

export default IDE;
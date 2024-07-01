import axios from 'axios';

const JDoodleService = {
  executeCode: async (language, versionIndex, code) => {
    const payload = {
      script: code,
      stdin: null,
      language: language,
      versionIndex: versionIndex,
      compileOnly: false,
    };

    try {
      const response = await axios.post(process.env.REACT_APP_PROXY, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error executing code:', error);
      return { output: 'Error executing code' };
    }
  },
};

export default JDoodleService;
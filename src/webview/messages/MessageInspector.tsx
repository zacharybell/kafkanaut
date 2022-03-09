import React from 'react';

import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

const MessageInspector: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <VSCodeButton>Submit</VSCodeButton>
    </div>
  );
};

export default MessageInspector;

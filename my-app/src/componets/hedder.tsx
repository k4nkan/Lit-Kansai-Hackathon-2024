import React from 'react';

type SimpleTextProps = {
  text: string;
};

const SimpleText: React.FC<SimpleTextProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default SimpleText;
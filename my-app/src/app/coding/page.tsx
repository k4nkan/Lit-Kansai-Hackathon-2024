'use client';

import CodeMirrorEditor from "@/componets/CodeMirror";
import Header from "@/componets/hedder";

const Home: React.FC = () => {
  return (
    <div>
      <Header/>
      <CodeMirrorEditor />
    </div>
  );
};

export default Home;

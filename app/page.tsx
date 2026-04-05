import Footer from '@/components/footer';
import Header from '@/components/header/header';
import Main from '@/components/main';
import { readFile } from 'node:fs/promises';

const page = async () => {
  const mockData = await readFile('generated-data.json', 'utf-8');

  return (
    <>
      <Header />
      <Main mockData={JSON.parse(mockData)} />
      <Footer />
    </>
  );
};

export default page;

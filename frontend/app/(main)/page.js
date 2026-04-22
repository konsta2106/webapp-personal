import AboutMe from './about-me';
import Skills from './skills';
import Contact from './contact';

export const metadata = {
  title: 'konsuu.net - Konstantin Suutarinen',
  description: 'Personal hub of Konstantin Suutarinen - Integration Specialist based in Tampere, Finland'
};

export default function Home() {
  return (
    <main className="container">
      <AboutMe />
      <Skills />
      <Contact />
    </main>
  );
}
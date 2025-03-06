import Head from 'next/head';
import AboutMe from './about-me';
import Skills from './skills';
import ContactForm from './contact-form';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Welcome to my portfolio!" />
      </Head>
      <main className="container">
        <AboutMe />
        <Skills />
        <ContactForm />
      </main>
    </>
  );
}
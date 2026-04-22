import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import 'primeicons/primeicons.css';
import CustomNavbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomNavbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
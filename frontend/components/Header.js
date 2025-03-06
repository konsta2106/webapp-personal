
const Header = () => {
    return (
      <header>
      <div id="home" className="header-wraper" style={{ "background": "url(header.png) no-repeat", "position": "relative", "backgroundSize": "cover", "backgroundPosition": "center", "height": "60vh"}}>
        <div className="main-info">
          <h1>TODO</h1>
{/*           <Typed
            className="typed-text"
            strings={['Web Development', 'NodeJS', 'React', 'NextJS', 'APIs', 'API Design']}
            typeSpeed={40}
            backSpeed={50}
            loop
          /> */}
          {/* <a href="#" className="btn-contact-me">Contact Me</a> */}
          {/* <CTA /> */}
        </div>
      </div>
      </header>
    )
  }
  
  export default Header
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af11470a" className="navbar">
        <div className="navcontent">
          <a href="/" aria-current="page" className="link-block w-inline-block w--current">
            {/* <div data-is-ix2-target="1" className="lottie-animation-2" data-w-id="69229c9c-4a59-7387-cf44-721dfef7763c" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-logo-1.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="4" data-duration="0" data-ix2-initial-state="0"></div> */}
            <div data-is-ix2-target="1" className="lottie-hero" data-w-id="69229c9c-4a59-7387-cf44-721dfef7763c" data-animation-type="lottie" data-src="documents/bia-logo.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="1.1666666666666667" data-duration="0" data-ix2-initial-state="0"></div>
          </a>
          <div className="menu">
        <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af11470d" className="button-menu">
          <div className="menu-textcontainer">
            <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af11470f" className="menu-title">Menu</div>
            <div className="menu-title">Close</div>
          </div><img src="images/Group-906.svg" loading="lazy" data-w-id="de49fb38-93c3-52e0-5a91-a9c1af114713" alt="" className="image-29" />
        </div>
        <div className="menucontent">
          <div className="menu-navtitles">
            <Link to="/" aria-current="page" className="menu-navlink w-inline-block w--current">
              <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af114720" className="menutxt">Home</div>
              <div className="menutxt">Home</div>
            </Link>
            <Link to="/creators" className="menu-navlink w-inline-block">
              <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af114717" className="menutxt">Creators</div>
              <div className="menutxt">Creators</div>
            </Link>
            <a href="/brands" className="menu-navlink w-inline-block">
              <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af11471a" className="menutxt">Brands</div>
              <div className="menutxt">Brands</div>
            </a>
            <Link to="/team" className="menu-navlink w-inline-block">
              <div data-w-id="de49fb38-93c3-52e0-5a91-a9c1af11471d" className="menutxt">Team</div>
              <div className="menutxt">Team</div>
            </Link>
          </div>
          <div className="menu-smalllinks">
            <a href="mailto:hello@joinbia.com" className="small-link w-inline-block"><img src="images/email-2-1.svg" loading="lazy" alt="" className="menu-linkimg" /></a>
            <a href="https://twitter.com/join__bia" className="small-link w-inline-block"><img src="images/twitter.svg" loading="lazy" alt="" className="menu-linkimg" /></a>
            <a href="https://www.instagram.com/join.bia/" className="small-link w-inline-block"><img src="images/insta.svg" loading="lazy" alt="" className="menu-linkimg" /></a>
          </div>
          <a href="join.html" className="button mobile w-inline-block">
            <div>Join Waitlist</div>
          </a>
          <a href="join.html" className="menu-marquee disabled w-inline-block">
            <div className="marquee">
              <div className="marquee-content scroll">
                <div className="menu-marquee_text">join bia</div>
                <div className="menu-marquee_text">join bia</div>
                <div className="menu-marquee_text">join bia</div>
              </div>
              <div className="marquee-content scroll">
                <div className="menu-marquee_text">join bia</div>
                <div className="menu-marquee_text">join bia</div>
                <div className="menu-marquee_text">join bia</div>
              </div>
            </div>
          </a>
          <div className="div-block-233">
            <a href="https://joinbia.com/waitlist" className="link-block-2 w-inline-block">
              <div>Join Waitlist</div>
            </a>
            <a href="https://joinbia.com/login" className="link-block-2 w-inline-block">
              <div>Log In</div>
            </a>
          </div>
        </div>
      </div>
        </div>
        <div className="html-embed-2 w-embed">
          
        </div>
      </div>
  )
}

export default Header
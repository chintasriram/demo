import Footer from "pages/Footer";
import Header from "pages/Header";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
// import JoinToday from "pages/MediaKits/components/JoinToday";
// import BiaHomepage from "layouts/BiaHomepage";
// import ForCreator from "./components/ForCreator";
// import ForBrands from "./components/ForBrands";
// import SignUpToday from "./components/SignUpToday";
// import { Grid } from "@mui/material";
// import LandImages from "./cards/LandImages";
// import MobileFooter from "appcomponents/Footer/MobileFooter";
// import homeBg1 from "assets/images/home-bg1.png"
// import homeBg2 from "assets/images/home-bg2.png"
// import homeBg3 from "assets/images/home-bg3.png"
// import homeBg4 from "assets/images/home-bg4.png"

// import '../App.css'

export default function LandingPage() {
  const [isScroll, setIsScroll] = useState(false)

  const [toggleSelected, setToggleSelected] = useState('creator')

  // To detect the page scroll
  window.onscroll = function (e) {
    var distanceScrolled = document.documentElement.scrollTop;
    if (distanceScrolled > 10) {
      setIsScroll(true)
    } else {
      setIsScroll(false)
    }
  }
  window.localStorage.setItem('toggleSelected',toggleSelected); 

//   useEffect(()=>{
//     window.Webflow && window.Webflow.destroy();
//     window.Webflow && window.Webflow.ready();
//     window.Webflow && window.Webflow.require('ix2').init();
//     document.dispatchEvent(new Event('readystatechange'))
// }, [])

  useEffect(() => {
    // window.Webflow && window.Webflow.destroy();
    // window.Webflow && window.Webflow.ready();
    // window.Webflow && window.Webflow.require('ix2').init();
    // document.dispatchEvent(new Event('readystatechange'))

    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('data-wf-page', '641a22016f25b7320b274a80');
    html.setAttribute('data-wf-site', '641a22016f25b787d1274a7f');


  }, [])

  // useLayoutEffect(() => {
  //   const html = document.getElementsByTagName('html')[0];
  //   html.setAttribute('data-wf-page', '641a22016f25b7320b274a80');
  //   html.setAttribute('data-wf-site', '641a22016f25b787d1274a7f');
  // }, [])


  return (
    <React.Fragment>
      <Header />
      <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f8f0" className="main-wrapper">
        <div data-w-id="3a2ae56e-a9bf-26d3-3597-dd5525a5fb97" className="nav-trigger"></div>
        <div className="section_hero">
          <div className="padding-hero">
            <div className="container vertical-64">
              <div data-w-id="76782c4d-217c-f4ef-9231-4e6e778b8aa3" style={{ opacity: 1 }} className="toggle-home">
                <div style={{ color: "rgb(187,220,210)" }} className="toggletext active">Creators</div>
                <div style={{ borderColor: "rgba(255,255,255,0.16)" }} className="toggle" onClick={() => setToggleSelected(toggleSelected === 'creator' ? 'brand' : 'creator')}>
                  <div className="div-block-217 landing-page-block-217"></div>
                </div>
                <div data-w-id="acbd119c-41ed-89d0-90b9-b27774ec516c" style={{ color: "rgba(255,255,255,0.72)" }} className="toggletext">Brands</div>
              </div>
              <div style={{ opacity: 1 }} className="title-container">
                <div className="title__text-container">
                  <div className="titlecontainer">
                  {
                    toggleSelected === 'creator' ? (
                      <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f8f7" className="hero__title landing-page-hero_title">Brand Deals</div>
                    ) : (
                      <div className="hero__title brand">Creator Deals</div>
                    )
                  }
                  </div>
                  <div className="titlecontainer">
                  {
                    toggleSelected === 'creator' ? (
                      <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f8fa" className="hero__title secondline landing-page-hero_title_secondline">Simplified</div>
                    ) : (
                      <div className="hero__title secondline brand">Simplified</div>
                    )
                  }
                  </div>
                </div>
                <div className="div-block-222">
                  {
                    toggleSelected === 'creator' ? (
                      <div data-w-id="28b38ad8-51fd-9281-45a3-7bdc88c619b1" className="bodytext middlealign landing-page creator landing-page-bodytext-creator">One platform to help you manage your social media career. Find more deals. Make more money. All in one place</div>
                    ) : (
                      <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f8fc" className="bodytext middlealign landing-page brand landing-page-bodytext-brand">One platform to manage all of your social media efforts. Find the right creator. Maximize ROI. All in one, self-serve solution.</div>
                    )
                  }
                  
                  
                  
                </div>
                {/* https://joinbia.com/waitlist */} 
                {/* http://localhost:3000/waitlist */}
                {/* Changes ST */}
                <a data-w-id="608acf90-7340-1212-154a-69cc6eff8e6e" href="https://joinbia.com/waitlist" className="button w-inline-block">
                  <div>Join Waitlist</div>
                </a>
              </div>
              <div className="hero-image-mobile"><img src="images/Frame-1618-1.png" loading="lazy" sizes="(max-width: 479px) 88vw, 100vw" srcSet="images/Frame-1618-1-p-500.png 500w, images/Frame-1618-1-p-800.png 800w, images/Frame-1618-1-p-1080.png 1080w, images/Frame-1618-1.png 2268w" alt="" className="lottie-animation mobile" /><img src="images/Frame-1672.png" loading="lazy" sizes="100vw" srcSet="images/Frame-1672-p-500.png 500w, images/Frame-1672-p-800.png 800w, images/Frame-1672-p-1080.png 1080w, images/Frame-1672-p-1600.png 1600w, images/Frame-1672-p-2000.png 2000w, images/Frame-1672-p-2600.png 2600w, images/Frame-1672-p-3200.png 3200w, images/Frame-1672.png 6048w" alt="" className="lottie-animation-brand" /></div>
              <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f901" className="perspective-container landing-page-perspective-container">
                <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f902" className="perspective-mockup landing-page-perspective-mockup">
                  <div data-w-id="413359d1-aa26-26f4-0cdf-867e3020f2d4" data-is-ix2-target="1" className="lottie-animation" data-animation-type="lottie" data-src="documents/bia-deck_-Frame-1618-2.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="1.6833333333333333" data-duration="0" data-ix2-initial-state="1"></div><img src="images/Frame-1672.png" loading="lazy" sizes="100vw" srcSet="images/Frame-1672-p-500.png 500w, images/Frame-1672-p-800.png 800w, images/Frame-1672-p-1080.png 1080w, images/Frame-1672-p-1600.png 1600w, images/Frame-1672-p-2000.png 2000w, images/Frame-1672-p-2600.png 2600w, images/Frame-1672-p-3200.png 3200w, images/Frame-1672.png 6048w" alt="" className="lottie-animation-brand" /><img src="images/sInfluencer---Home-1-2-1.png" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 99vw, 100vw" srcSet="images/sInfluencer---Home-1-2-1-p-500.png 500w, images/sInfluencer---Home-1-2-1-p-800.png 800w, images/sInfluencer---Home-1-2-1-p-1080.png 1080w, images/sInfluencer---Home-1-2-1-p-1600.png 1600w, images/sInfluencer---Home-1-2-1-p-2000.png 2000w, images/sInfluencer---Home-1-2-1.png 2480w" alt="" className="image-28" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div tr-scrollflip-element="component" data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f905" className="section-mediakits">
          <div tr-scrollflip-scrubend="top 25%" tr-scrollflip-sticky="true" className="bigpic-scrollcontainer">
            <div className="div-block-215">
              <div className="trig">
                <div className="media-subcover">
                  <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f914" className="mediakit-creator">Share your media kit in seconds.</div>
                  <div className="mediakit-brand">Easily connect with creators that can</div>
                </div>
                <div className="media-subcover second">
                  <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f917" className="mediakit-creator">Always up to date, always free.</div>
                  <div className="mediakit-brand">best showcase your brand</div>
                </div>
              </div>
              <div className="div-block-231">
                <div className="div-block-218">
                  <div data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f919" className="mediakit-sambucha"><img src="images/samfmedia.png" loading="lazy" data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f91a" sizes="(max-width: 479px) 80vw, (max-width: 767px) 60vw, 50vw" srcSet="images/samfmedia-p-500.png 500w, images/samfmedia-p-800.png 800w, images/samfmedia-p-1080.png 1080w, images/samfmedia-p-1600.png 1600w, images/samfmedia.png 1861w" alt="" className="image" />
                    <div tr-scrollflip-element="target" className="sambucha hidden"></div>
                  </div><img src="images/Frame-1622-2.png" loading="lazy" data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f91c" sizes="(max-width: 479px) 48vw, 38vw" srcSet="images/Frame-1622-2-p-500.png 500w, images/Frame-1622-2-p-800.png 800w, images/Frame-1622-2-p-1080.png 1080w, images/Frame-1622-2.png 1861w" alt="" className="image-copy" /><img src="images/Frame-1627-2.png" loading="lazy" data-w-id="7e4784b9-d94e-a8d7-3302-3ced9262d789" sizes="(max-width: 479px) 40vw, 30vw" srcSet="images/Frame-1627-2-p-500.png 500w, images/Frame-1627-2-p-800.png 800w, images/Frame-1627-2-p-1080.png 1080w, images/Frame-1627-2.png 1861w" alt="" className="kit-3" /><img src="images/Frame-1625-2.png" loading="lazy" data-w-id="c1da589e-2f87-935f-f6bb-d51d8bc4f91d" sizes="(max-width: 479px) 48vw, 38vw" srcSet="images/Frame-1625-2-p-500.png 500w, images/Frame-1625-2-p-800.png 800w, images/Frame-1625-2-p-1080.png 1080w, images/Frame-1625-2-p-1600.png 1600w, images/Frame-1625-2.png 1860w" alt="" className="image-copy right" /><img src="images/Frame-1626-2.png" loading="lazy" data-w-id="716c8788-d288-60f7-133d-9e90d13bc89f" sizes="(max-width: 479px) 40vw, 30vw" srcSet="images/Frame-1626-2-p-500.png 500w, images/Frame-1626-2-p-800.png 800w, images/Frame-1626-2-p-1080.png 1080w, images/Frame-1626-2.png 1861w" alt="" className="kit-3 right" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="creators">
          <div data-w-id="ea1c8b6b-c773-43f8-b212-c853fc4f1eff" className="section-overview">
            <div className="oveview-stickycontain">
              <div className="overview-content">
                <div className="content overview">
                  <div className="overview_content-item-one">
                    <div className="overview_heading-wrap">
                      <p className="subtitle">Find the Perfect Brand Partner</p>
                      <h2 className="text-size-h1">Meet more partners and make more money</h2>
                    </div>
                    <p className="overview_p">Find the right brand for you. Our two-sided marketplace gives you the power to receive offers and apply to campaigns with a single click. Direct and without a middleman.</p>
                    <div data-w-id="4e298bb2-99e9-932d-2d56-7d57a1a1e0bf" data-is-ix2-target="1" className="lottie-1 mobile" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-936.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="4" data-duration="0.5" data-ix2-initial-state="2"></div>
                    <div className="div-block-227">
                      <a data-w-id="d48e0bc9-bc91-17ba-659b-9336eb66d3ff" href="https://joinbia.com/waitlist" className="button white w-inline-block">
                        <div>Join Waitlist</div>
                      </a>
                    </div>
                  </div>
                  <div className="overview_content-item-two">
                    <div className="overview_heading-wrap">
                      <p className="subtitle">Streamline Your Campaigns</p>
                      <h2 className="text-size-h1">Execute start to finish. <br /><em className="italic-text">All in one platform.</em></h2>
                    </div>
                    <p className="overview_p">Simplify your deals through bia&#x27;s campaign management tools. Communicate with partners, execute contracts, and get paid on your terms.</p>
                    <div data-w-id="c18c62f8-6370-76a3-5f11-aff386c94065" data-is-ix2-target="1" className="lottie-2 mobile" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-966-2.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.45" data-duration="0" data-ix2-initial-state="1"></div>
                    <div className="div-block-227">
                      <a data-w-id="d48e0bc9-bc91-17ba-659b-9336eb66d3ff" href="https://joinbia.com/waitlist" className="button white w-inline-block">
                        <div>Join Waitlist</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overiviewvisuals">
                <div className="div-block-221">
                  <div className="visualcontainer">
                    <div data-w-id="18087be8-9602-d98f-09a2-58e225d663b6" data-is-ix2-target="1" className="lottie-1" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-936.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="4" data-duration="0.5" data-ix2-initial-state="2"></div>
                  </div>
                  <div className="visualcontainer">
                    <div data-w-id="18087be8-9602-d98f-09a2-58e225d663b8" data-is-ix2-target="1" className="lottie-2" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-966-2.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.45" data-duration="0" data-ix2-initial-state="1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-more">
            <div className="padding more">
              <div className="content vert-40">
                <div className="text-size-h1 middle">And More</div>
                <div className="grid-more">
                  <div id="w-node-c1da589e-2f87-935f-f6bb-d51d8bc4f94b-0b274a80" className="moregrid-half">
                    <div>
                      <div className="moregrid-half_text">
                        <div className="h4">Contracts</div>
                        <div>Draft and execute partnerships</div>
                      </div>
                    </div>
                    <div className="moregrid-imghalf"><img src="images/Frame-969.png" loading="lazy" alt="" className="halfimg" /></div>
                  </div>
                  <div id="w-node-c1da589e-2f87-935f-f6bb-d51d8bc4f950-0b274a80" className="moregrid-half">
                    <div className="moregrid-half_text">
                      <div className="h4">Invoices</div>
                      <div>Request and track payments</div>
                    </div>
                    <div className="moregrid-imghalf"><img src="images/Frame-1225.png" loading="lazy" alt="" className="halfimg" /></div>
                  </div>
                  <div id="w-node-_0b1a02b3-85b7-63c6-d148-9f6a6a68f90a-0b274a80" className="moregrid-half">
                    <div className="moregrid-half_text">
                      <div className="h4">Planning</div>
                      <div>Schedule and organize meetings</div>
                    </div>
                    <div className="moregrid-imghalf"><img src="images/sFrame-934-2.png" loading="lazy" alt="" className="halfimg" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-problem">
            <div className="padding-problem">
              <div className="container problem">
                <div className="problemcontnet">
                  <div className="problem-padding">
                    <div className="problemtext-container">
                      <div>
                        <p className="subtitle">ONE SOLUTION</p>
                        <div className="text-size-h1">Streamline your entire <br />process with bia</div>
                      </div>
                      <a data-w-id="d48e0bc9-bc91-17ba-659b-9336eb66d3ff" href="https://joinbia.com/waitlist" className="button white w-inline-block">
                        <div>Join Waitlist</div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="div-block-20">
                  <div className="marquee">
                    <div className="marquee-cover-horizontal-balt"></div>
                    <div className="marquee-content scroll"><img src="images/000_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/100_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/300_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/400_1.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                    <div className="marquee-content scroll"><img src="images/000_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/100_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/300_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/400_1.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                  </div>
                  <div className="marquee">
                    <div className="marquee-cover-horizontal-balt"></div>
                    <div className="marquee-content scroll reverse"><img src="images/800.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/700.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/600_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/500_1.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                    <div className="marquee-content scroll reverse"><img src="images/800.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/700.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/600_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/500_1.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                  </div>
                  <div className="marquee">
                    <div className="marquee-cover-horizontal-balt"></div>
                    <div className="marquee-content scroll"><img src="images/900.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1000.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1100.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/300_1.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                    <div className="marquee-content scroll"><img src="images/900.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1000.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1100.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/300_1.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brands">
          <div data-w-id="c538bf88-8f25-4c06-ad1d-82d492b54bc3" className="section-overview">
            <div className="oveview-stickycontain-brand">
              <div className="overview-content">
                <div className="content overview">
                  <div className="overview_content-item-one">
                    <div className="overview_heading-wrap">
                      <p className="subtitle">Find the Perfect Partner</p>
                      <h2 className="text-size-h1">Discover the right creator for your needs</h2>
                    </div>
                    <p className="overview_p">Check rates, verify audiences, and review past partnerships to see whether a creator fits your campaign. Unsure what you want? Post an open campaign and let creators apply to you!</p>
                    <div data-w-id="37ebea5a-b021-925b-54b5-cffc624fee1e" data-is-ix2-target="1" className="brandlottioe-1 mobile" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-941-2.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.5166666666666667" data-duration="0"></div>
                    <div className="div-block-227">
                      <a data-w-id="d48e0bc9-bc91-17ba-659b-9336eb66d3ff" href="https://joinbia.com/waitlist" className="button white w-inline-block">
                        <div>Join Waitlist</div>
                      </a>
                    </div>
                  </div>
                  <div className="overview_content-item-two">
                    <div className="overview_heading-wrap">
                      <p className="subtitle">Streamline Your Campaigns</p>
                      <h2 className="text-size-h1">Execute from start to finish. <em className="italic-text">In one place.</em></h2>
                    </div>
                    <p className="overview_p">From proposals and contracts to payments, bia has modules for every step of the process. You won’t believe you ever did deals any differently.</p>
                    <div data-w-id="212d5962-9a61-7eaf-e5f4-31855917e906" data-is-ix2-target="1" className="brand-lottie-2 mobile" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-939.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.5833333333333334" data-duration="0"></div>
                    <div className="div-block-227">
                      <a data-w-id="d48e0bc9-bc91-17ba-659b-9336eb66d3ff" href="https://joinbia.com/waitlist" className="button white w-inline-block">
                        <div>Join Waitlist</div>
                      </a>
                    </div>
                  </div>
                  <div className="overview_content-item-three">
                    <div className="overview_heading-wrap">
                      <p className="subtitle">MAXIMIZE EVERY DOLLAR</p>
                      <h2 className="text-size-h1">Understand what’s working and what isn’t.</h2>
                    </div>
                    <p className="overview_p">Verify ROI through intuitive dashboards illustrating performance by campaign and creator. Quickly identify areas to double down and places to pull back.</p>
                    <div data-w-id="a3ef7851-11e7-c8f1-0091-c1b49c4ccd7a" data-is-ix2-target="1" className="brand-lottie3 mobile" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-941-1.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.5" data-duration="0"></div>
                    <div className="div-block-227">
                      <a data-w-id="d48e0bc9-bc91-17ba-659b-9336eb66d3ff" href="https://joinbia.com/waitlist" className="button white w-inline-block">
                        <div>Join Waitlist</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overiviewvisuals">
                <div className="div-block-221">
                  <div className="visualcontainer">
                    <div data-w-id="c538bf88-8f25-4c06-ad1d-82d492b54be0" data-is-ix2-target="1" className="brandlottioe-1" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-941-2.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.5166666666666667" data-duration="0" data-ix2-initial-state="0"></div>
                  </div>
                  <div className="visualcontainer">
                    <div data-w-id="c538bf88-8f25-4c06-ad1d-82d492b54bdf" data-is-ix2-target="1" className="brand-lottie-2" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-939.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.5833333333333334" data-duration="0" data-ix2-initial-state="0"></div>
                  </div>
                  <div className="visualcontainer">
                    <div data-w-id="6f6385b6-171b-afd1-09b7-83bcaf546205" data-is-ix2-target="1" className="brand-lottie3" data-animation-type="lottie" data-src="documents/bia-Marketing-Website_-Frame-941-1.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0.5" data-duration="0" data-ix2-initial-state="0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-problem">
            <div className="padding-problem">
              <div className="container problem">
                <div className="problemcontnet">
                  <div className="problem-padding">
                    <div className="problemtext-container">
                      <p className="subtitle">ONE SOLUTION</p>
                      <div className="text-size-h1">Streamline your entire <br />process with bia</div>
                    </div>
                  </div>
                </div>
                <div className="div-block-20">
                  <div className="marquee">
                    <div className="marquee-cover-horizontal-balt"></div>
                    <div className="marquee-content scroll"><img src="images/1101_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1102.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1103.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                    <div className="marquee-content scroll"><img src="images/1101_1.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1102.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1103.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                  </div>
                  <div className="marquee">
                    <div className="marquee-cover-horizontal-balt"></div>
                    <div className="marquee-content scroll reverse"><img src="images/1103.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1108.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1104.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1105.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                    <div className="marquee-content scroll reverse"><img src="images/1103.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1108.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1104.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1105.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                  </div>
                  <div className="marquee">
                    <div className="marquee-cover-horizontal-balt"></div>
                    <div className="marquee-content scroll"><img src="images/1101.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1106.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1107.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                    <div className="marquee-content scroll"><img src="images/1101.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1106.svg" loading="lazy" alt="" className="integrartion-image" /><img src="images/1107.svg" loading="lazy" alt="" className="integrartion-image" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Helmet>

          <script src="js/webflow.js" type="text/javascript"></script>


        </Helmet>
      </div>

    </React.Fragment>
  );
}

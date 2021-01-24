import React, { useState } from "react";
import JoyRide from "react-joyride";
// import Tour from "reactour";

import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";

const TOUR_STEPS = [
  {
    target: ".ls-segment",
    content: "This is my first Step 1",
  },
  {
    target: ".ls-menu",
    content: "This is my first Step 2",
  },
  // {
  //   target: '.footer',
  //   content: 'This is my first Step 3',
  // },
];

const MyTour = () => {
  // const [isTourOpen, setIsTourOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  //   const steps = [
  //     {
  //       selector: '.ls-menu',
  //       content: 'This is my first Step 1',
  //     },
  //     {
  //       selector: '.ls-segment',
  //       content: 'This is my first Step 2',
  //     },
  //     {
  //       selector: '.footer',
  //       content: 'This is my first Step 3',
  //     },
  //   ];
  return (
    <>
      {/* <Tour steps={steps}
      isOpen={isTourOpen}
      onRequestClose={() => setIsTourOpen(false)}/> */}
      {/* <JoyRide steps={TOUR_STEPS} continuous={true}/> */}
      <React.Fragment>
        <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />

        <button className="btn-primary" onClick={() => setOpen(true)}>
          VIEW DEMO
        </button>
      </React.Fragment>
    </>
  );
};

export default MyTour;
